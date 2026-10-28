-- ASMA MEDICAL – Supabase cloud sync schema (v0.9.3)
-- Built and run by UltraAccounting / SK Nuruddin – 7602292599
-- Paste this whole file in Supabase → SQL Editor → Run. Safe to run again.
--
-- Design:
--  * entries  = every bill, purchase, return and payment as ONE row that is never edited
--               or deleted (append-only). Two counters can never overwrite each other.
--  * items    = medicine master (owner/manager can edit; last edit wins).
--  * shops.settings = shop details only (no secrets).
--  * shop_users = PIN logins. A login only sees PIN hashes of its own rank and below
--               (staff counter: staff PINs only). The recovery hash is owner-only.
--  * counters = each computer's bill letter (A, B, C...), unique per shop.
--  * Role rules are enforced on the SERVER by Row Level Security:
--      owner   – everything
--      manager – bills, purchases, returns, payments, medicines
--      staff   – bills and udhaar receipts only

create table if not exists public.shops (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  settings jsonb not null default '{}'::jsonb,
  created_by uuid not null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.members (
  shop_id uuid not null references public.shops(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','manager','staff')),
  email text,
  created_at timestamptz not null default now(),
  primary key (shop_id, user_id)
);

create table if not exists public.entries (
  seq bigint generated always as identity primary key,
  id text not null,
  shop_id uuid not null references public.shops(id) on delete cascade,
  kind text not null check (kind in ('opening','sale','purchase','sreturn','preturn','cpay','spay')),
  data jsonb not null,
  device text,
  created_by uuid not null default auth.uid(),
  created_at timestamptz not null default now(),
  unique (shop_id, id)
);
create index if not exists entries_shop_seq on public.entries (shop_id, seq);

create table if not exists public.items (
  shop_id uuid not null references public.shops(id) on delete cascade,
  id text not null,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid default auth.uid(),
  primary key (shop_id, id)
);
create index if not exists items_shop_upd on public.items (shop_id, updated_at);


create table if not exists public.shop_users (
  shop_id uuid not null references public.shops(id) on delete cascade,
  id text not null,
  role text not null check (role in ('owner','manager','staff')),
  data jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (shop_id, id)
);

create table if not exists public.counters (
  shop_id uuid not null references public.shops(id) on delete cascade,
  letter text not null check (letter ~ '^[A-Z][A-Z0-9]?$'),
  device_id text not null,
  device_name text,
  user_id uuid not null default auth.uid(),
  created_at timestamptz not null default now(),
  primary key (shop_id, letter)
);

-- keep updated_at honest (set by the server, not the device clock)
create or replace function public.touch() returns trigger language plpgsql as $$
begin new.updated_at := now(); new.updated_by := auth.uid(); return new; end $$;
drop trigger if exists items_touch on public.items;
create trigger items_touch before insert or update on public.items for each row execute function public.touch();
create or replace function public.touch_shop() returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;
drop trigger if exists shops_touch on public.shops;
create trigger shops_touch before update on public.shops for each row execute function public.touch_shop();

-- role of the signed-in user in a shop (null = not a member)
create or replace function public.my_role(s uuid) returns text
language sql stable security definer set search_path = public as $$
  select role from public.members where shop_id = s and user_id = auth.uid()
$$;

alter table public.shops   enable row level security;
alter table public.members enable row level security;
alter table public.entries enable row level security;
alter table public.items   enable row level security;
alter table public.shop_users enable row level security;
alter table public.counters enable row level security;

create or replace function public.rank(r text) returns int language sql immutable as $$ select case r when 'owner' then 3 when 'manager' then 2 when 'staff' then 1 else 0 end $$;

drop policy if exists shops_read on public.shops;
create policy shops_read on public.shops for select using (public.my_role(id) is not null);
drop policy if exists shops_owner_update on public.shops;
create policy shops_owner_update on public.shops for update
  using (public.my_role(id) = 'owner') with check (public.my_role(id) = 'owner');

drop policy if exists members_read on public.members;
create policy members_read on public.members for select using (public.my_role(shop_id) is not null);

drop policy if exists entries_read on public.entries;
create policy entries_read on public.entries for select using (public.my_role(shop_id) is not null);
drop policy if exists entries_insert on public.entries;
create policy entries_insert on public.entries for insert with check (
  created_by = auth.uid() and (
    public.my_role(shop_id) = 'owner'
    or (public.my_role(shop_id) = 'manager' and kind <> 'opening')
    or (public.my_role(shop_id) = 'staff'   and kind in ('sale','cpay'))
  ));
-- no update / delete policy on entries: nobody can change or delete a saved bill.

drop policy if exists items_read on public.items;
create policy items_read on public.items for select using (public.my_role(shop_id) is not null);
drop policy if exists items_insert on public.items;
create policy items_insert on public.items for insert with check (public.my_role(shop_id) in ('owner','manager'));
drop policy if exists items_update on public.items;
create policy items_update on public.items for update
  using (public.my_role(shop_id) in ('owner','manager')) with check (public.my_role(shop_id) in ('owner','manager'));


drop policy if exists su_read on public.shop_users;
create policy su_read on public.shop_users for select using (public.rank(role) <= public.rank(public.my_role(shop_id)) and public.my_role(shop_id) is not null);
drop policy if exists su_ins on public.shop_users;
create policy su_ins on public.shop_users for insert with check (public.my_role(shop_id) = 'owner');
drop policy if exists su_upd on public.shop_users;
create policy su_upd on public.shop_users for update using (public.my_role(shop_id) = 'owner') with check (public.my_role(shop_id) = 'owner');
drop policy if exists su_del on public.shop_users;
create policy su_del on public.shop_users for delete using (public.my_role(shop_id) = 'owner');

drop policy if exists counters_read on public.counters;
create policy counters_read on public.counters for select using (public.my_role(shop_id) is not null);
-- counters are only written through claim_counter()

-- create a shop; the caller becomes its owner
create or replace function public.create_shop(p_name text) returns uuid
language plpgsql security definer set search_path = public as $$
declare s uuid; em text;
begin
  if auth.uid() is null then raise exception 'Sign in first'; end if;
  if exists (select 1 from public.shops) then raise exception 'A shop already exists in this database. Ask the owner to add your login.'; end if;
  select email into em from auth.users where id = auth.uid();
  insert into public.shops(name, created_by) values (coalesce(nullif(trim(p_name),''),'My shop'), auth.uid()) returning id into s;
  insert into public.members(shop_id, user_id, role, email) values (s, auth.uid(), 'owner', em);
  return s;
end $$;

-- owner adds or changes a counter/staff login (that person must have signed up first)
create or replace function public.add_member(p_shop uuid, p_email text, p_role text) returns text
language plpgsql security definer set search_path = public as $$
declare u uuid;
begin
  if public.my_role(p_shop) is distinct from 'owner' then raise exception 'Only the owner can add logins'; end if;
  if p_role not in ('manager','staff','owner') then raise exception 'Bad role'; end if;
  select id into u from auth.users where lower(email) = lower(trim(p_email));
  if u is null then raise exception 'No account with this email. Create it first (Sign up).'; end if;
  if u = auth.uid() then raise exception 'You cannot change your own role'; end if;
  insert into public.members(shop_id, user_id, role, email) values (p_shop, u, p_role, lower(trim(p_email)))
  on conflict (shop_id, user_id) do update set role = excluded.role;
  return 'ok';
end $$;

create or replace function public.remove_member(p_shop uuid, p_email text) returns text
language plpgsql security definer set search_path = public as $$
begin
  if public.my_role(p_shop) is distinct from 'owner' then raise exception 'Only the owner can remove logins'; end if;
  delete from public.members m using auth.users u
   where m.shop_id = p_shop and m.user_id = u.id and lower(u.email) = lower(trim(p_email)) and u.id <> auth.uid();
  return 'ok';
end $$;


-- give this computer a bill letter; a letter can never be taken by another computer
create or replace function public.claim_counter(p_shop uuid, p_letter text, p_device text, p_name text) returns text
language plpgsql security definer set search_path = public as $$
declare ex record; l text := upper(trim(p_letter));
begin
  if public.my_role(p_shop) is null then raise exception 'Not a member of this shop'; end if;
  if l !~ '^[A-Z][A-Z0-9]?$' then raise exception 'Counter letter must be A, B, C...'; end if;
  if coalesce(length(p_device),0) < 8 then raise exception 'Bad device id'; end if;
  select * into ex from public.counters where shop_id = p_shop and letter = l;
  if found and ex.device_id <> p_device then
    raise exception 'Counter letter % is already used by another computer (%). Choose another letter.', l, coalesce(ex.device_name,'?');
  end if;
  insert into public.counters(shop_id, letter, device_id, device_name, user_id) values (p_shop, l, p_device, p_name, auth.uid())
  on conflict (shop_id, letter) do update set device_name = excluded.device_name;
  return l;
end $$;

-- v0.9 kept PIN users inside shops.settings; remove them from there
update public.shops set settings = (settings - 'users') || jsonb_build_object('s', coalesce(settings->'s','{}'::jsonb) - 'recH')
 where settings ? 'users' or (settings->'s') ? 'recH';

revoke all on public.shop_users, public.counters from anon;
grant select, insert, update, delete on public.shop_users to authenticated;
grant select on public.counters to authenticated;
revoke execute on function public.claim_counter(uuid,text,text,text) from public, anon;
grant execute on function public.claim_counter(uuid,text,text,text) to authenticated;
revoke all on public.shops, public.members, public.entries, public.items from anon;
grant select, update on public.shops to authenticated;
grant select on public.members to authenticated;
grant select, insert on public.entries to authenticated;
grant select, insert, update on public.items to authenticated;
revoke execute on function public.create_shop(text), public.add_member(uuid,text,text), public.remove_member(uuid,text), public.my_role(uuid) from public, anon;
grant execute on function public.create_shop(text), public.add_member(uuid,text,text), public.remove_member(uuid,text), public.my_role(uuid) to authenticated;

-- v0.9.3: lets a brand-new browser ask "does this database already have a shop?" (true/false only,
-- no data). If yes, the app asks for the cloud login instead of offering First-time setup.
create or replace function public.shop_exists() returns boolean
language sql stable security definer set search_path = public as $$ select exists (select 1 from public.shops) $$;
revoke execute on function public.shop_exists() from public;
grant execute on function public.shop_exists() to anon, authenticated;
