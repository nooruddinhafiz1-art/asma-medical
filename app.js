const VER='0.9.10';
// ASMA MEDICAL – Pharmacy Software (Demo v0.5, see VER) · Software by UltraAccounting, 7602292599
// Offline-first: all data saved on this device (localStorage). Online sync (Supabase) comes in the full version.
const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const inr=n=>'₹'+(Math.round((+n||0)*100)/100).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2});
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')},ym=d=>d.slice(0,7),uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const ZONES=['East','West','North','South'],RACKS=[1,2,3,4,5,6,7,8];
let L=localStorage.lang2||'bn';if(!['none','bn','hi'].includes(L))L='bn';
const TR={bn:{"Search": "খুঁজুন", "New Bill": "নতুন বিল", "Purchase": "কেনা", "Stock": "স্টক", "Expiry": "মেয়াদ", "Order List": "অর্ডার তালিকা", "Reports": "রিপোর্ট", "Settings": "সেটিংস", "Help": "সাহায্য", "Returns": "ফেরত", "Sync": "সিঙ্ক", "Dues": "বাকি", "Medicine": "ওষুধ", "Qty": "পরিমাণ", "MRP": "এমআরপি", "Total": "মোট", "Save & Print": "সেভ ও প্রিন্ট", "Customer": "গ্রাহক", "Today Sale": "আজকের বিক্রি", "Bills": "বিল", "Low stock": "কম স্টক", "Expiring in 90 days": "৯০ দিনে মেয়াদ শেষ", "Rack": "র‍্যাক", "Login": "লগইন", "Users": "ব্যবহারকারী", "All shortcuts": "সব শর্টকাট", "Built and run by": "তৈরি ও পরিচালনা", "Batch": "ব্যাচ", "Category": "শ্রেণি", "Company": "কোম্পানি", "Discount %": "ছাড় %", "Free": "ফ্রি", "From": "থেকে", "GST %": "জিএসটি %", "Invoice no.": "ইনভয়েস নং", "Mobile": "মোবাইল", "Name": "নাম", "PIN (4–6 digits)": "পিন (৪–৬ সংখ্যা)", "Payment": "পেমেন্ট", "Purchase rate": "ক্রয় দর", "Reorder at": "কত হলে অর্ডার", "Role": "পদ", "Salt / composition": "সল্ট / উপাদান", "Side": "দিক", "Supplier": "সাপ্লায়ার", "To": "পর্যন্ত", "Amount": "টাকা", "Amt": "টাকা", "Batch / Exp": "ব্যাচ / মেয়াদ", "Batches": "ব্যাচ", "Bill": "বিল", "Counter / By": "কাউন্টার / কে", "Date": "তারিখ", "Exp": "মেয়াদ", "GST": "জিএসটি", "Item": "জিনিস", "Items": "জিনিস", "PIN": "পিন", "Pay": "পেমেন্ট", "Rate": "দর", "Salt": "সল্ট", "Value": "মূল্য"},hi:{"Search": "खोजें", "New Bill": "नया बिल", "Purchase": "खरीद", "Stock": "स्टॉक", "Expiry": "एक्सपायरी", "Order List": "ऑर्डर सूची", "Reports": "रिपोर्ट", "Settings": "सेटिंग्स", "Help": "सहायता", "Returns": "वापसी", "Sync": "सिंक", "Dues": "बकाया", "Medicine": "दवा", "Qty": "मात्रा", "MRP": "एमआरपी", "Total": "कुल", "Save & Print": "सेव और प्रिंट", "Customer": "ग्राहक", "Today Sale": "आज की बिक्री", "Bills": "बिल", "Low stock": "कम स्टॉक", "Expiring in 90 days": "90 दिन में एक्सपायरी", "Rack": "रैक", "Login": "लॉगिन", "Users": "उपयोगकर्ता", "All shortcuts": "सभी शॉर्टकट", "Built and run by": "निर्माण और संचालन", "Batch": "बैच", "Category": "श्रेणी", "Company": "कंपनी", "Discount %": "छूट %", "Free": "फ्री", "From": "से", "GST %": "जीएसटी %", "Invoice no.": "इनवॉइस नं.", "Mobile": "मोबाइल", "Name": "नाम", "PIN (4–6 digits)": "पिन (4–6 अंक)", "Payment": "भुगतान", "Purchase rate": "खरीद दर", "Reorder at": "कितने पर ऑर्डर", "Role": "पद", "Salt / composition": "सॉल्ट / संरचना", "Side": "दिशा", "Supplier": "सप्लायर", "To": "तक", "Amount": "राशि", "Amt": "राशि", "Batch / Exp": "बैच / एक्सपायरी", "Batches": "बैच", "Bill": "बिल", "Counter / By": "काउंटर / किसने", "Date": "तारीख", "Exp": "एक्सपायरी", "GST": "जीएसटी", "Item": "आइटम", "Items": "आइटम", "PIN": "पिन", "Pay": "भुगतान", "Rate": "दर", "Salt": "सॉल्ट", "Value": "मूल्य"}};
const t=s=>{const x=TR[L]&&TR[L][s];return x?`${s}<small class=l2>${x}</small>`:s};
const L2=(bn,hi)=>L=='bn'?bn:L=='hi'?hi:'';
function setLang(v){L=v;localStorage.lang2=v;nav();ME?go(cur):pLogin()}

// ---------- data ----------
if(globalThis.__IDBERR&&!localStorage.asma&&localStorage.asmaIDB){alert('Saved data could not be opened (browser storage error). Do NOT enter new bills. Close all browser windows and start again. If it repeats, call UltraAccounting 7602292599.');throw new Error('storage')}
let D=JSON.parse(localStorage.asma||globalThis.__ASMA||'null');globalThis.__ASMA=null;
const DS={err:''};
function lsWrite(str){try{localStorage.asma=str;DS.err='';return true}catch(e){if(DS.err!='full'){DS.err='full';setTimeout(()=>{try{whoUI()}catch(e){}},0);alert('⚠ STORAGE FULL - the last change could NOT be saved on this computer!\nDownload a backup now (Settings → Backup) and call UltraAccounting 7602292599.')}return false}}
function persist(){const str=JSON.stringify(D);const db=globalThis.__IDB;if(!db)return Promise.resolve(lsWrite(str));
 return new Promise(res=>{try{const tx=db.transaction('kv','readwrite');tx.objectStore('kv').put(str,'asma');tx.oncomplete=()=>{try{localStorage.asmaIDB='1';localStorage.removeItem('asma')}catch(e){}DS.err='';res(true)};tx.onerror=tx.onabort=()=>res(lsWrite(str))}catch(e){res(lsWrite(str))}})}
function wipeLocal(){localStorage.removeItem('asma');const db=globalThis.__IDB;if(!db)return Promise.resolve();return new Promise(r=>{const tx=db.transaction('kv','readwrite');tx.objectStore('kv').delete('asma');tx.oncomplete=tx.onerror=()=>r()})}
let AB={ok:null,last:'',t:0};
function save(raw){persist();clearTimeout(AB.t);AB.t=setTimeout(autoBk,4000);if(!raw&&globalThis.syncSoon)syncSoon()}
async function autoBk(){if(!/^https?:$/.test((globalThis.location||{}).protocol||'')||!ME||!D.users.some(u=>u.pinH)||!D.settings.dbId)return;try{const r=await fetch('backup',{method:'POST',headers:{'Content-Type':'application/json','X-Asma-Db':D.settings.dbId},body:JSON.stringify(D)});AB.ok=r.ok;AB.err='';if(!r.ok){const tx=await r.text();try{AB.err=JSON.parse(tx).error||tx}catch(e){AB.err=r.status==501?'':tx}}if(r.ok){const j=await r.json();AB.last=new Date().toTimeString().slice(0,5);AB.file=j.file;localStorage.asmaAB=today()+' '+AB.last}}catch(e){AB.ok=false}}
function seed(){
 const m=[ // name, salt, company, category, zone, rack, gst, mrp(per strip/unit), purchase rate, reorder
 ['Montair LC Tab','Montelukast 10mg + Levocetirizine 5mg','Cipla','Respiratory','East',1,12,245,170,10],
 ['Montek LC Tab','Montelukast 10mg + Levocetirizine 5mg','Sun Pharma','Respiratory','East',1,12,230,160,10],
 ['Deriphyllin Retard 150','Etofylline + Theophylline','Zydus','Respiratory','East',1,12,48,33,10],
 ['Asthalin Inhaler 100mcg','Salbutamol','Cipla','Respiratory','East',2,12,155,110,5],
 ['Foracort 200 Inhaler','Formoterol + Budesonide','Cipla','Respiratory','East',2,12,560,400,3],
 ['Seroflo 250 Inhaler','Salmeterol + Fluticasone','Cipla','Respiratory','East',2,12,690,495,3],
 ['Duolin Respules','Levosalbutamol + Ipratropium','Cipla','Respiratory','East',3,12,24,16,20],
 ['Budecort Respules 0.5mg','Budesonide','Cipla','Respiratory','East',3,12,30,21,20],
 ['Ascoril LS Syrup 100ml','Ambroxol + Levosalbutamol + Guaifenesin','Glenmark','Respiratory','East',4,12,128,90,10],
 ['Azithral 500 Tab','Azithromycin 500mg','Alembic','Antibiotic','West',1,12,119,82,10],
 ['Augmentin 625 Duo','Amoxicillin + Clavulanic acid','GSK','Antibiotic','West',1,12,223,158,10],
 ['AKT-4 Kit','Rifampicin + Isoniazid + Pyrazinamide + Ethambutol','Lupin','TB / Chest','West',2,5,95,66,5],
 ['Allegra 120 Tab','Fexofenadine 120mg','Sanofi','Allergy','West',3,12,225,158,10],
 ['Dolo 650 Tab','Paracetamol 650mg','Micro Labs','Fever / Pain','North',1,12,34,23,30],
 ['Calpol 650 Tab','Paracetamol 650mg','GSK','Fever / Pain','North',1,12,32,22,20],
 ['Zerodol SP Tab','Aceclofenac + Paracetamol + Serratiopeptidase','Ipca','Fever / Pain','North',2,12,120,84,10],
 ['Pan 40 Tab','Pantoprazole 40mg','Alkem','Gastro','North',3,12,155,108,15],
 ['Pan D Cap','Pantoprazole + Domperidone','Alkem','Gastro','North',3,12,199,139,15],
 ['Electral ORS','ORS (WHO)','FDC','Gastro','North',4,12,22,15,30],
 ['Glycomet 500 SR','Metformin 500mg','USV','Diabetes','South',1,12,32,22,20],
 ['Janumet 50/500','Sitagliptin + Metformin','MSD','Diabetes','South',1,12,390,280,5],
 ['Amaryl 1mg Tab','Glimepiride 1mg','Sanofi','Diabetes','South',2,12,138,96,10],
 ['Telma 40 Tab','Telmisartan 40mg','Glenmark','Heart / BP','South',3,12,232,162,10],
 ['Amlokind 5 Tab','Amlodipine 5mg','Mankind','Heart / BP','South',3,12,30,20,15],
 ['Ecosprin 75 Tab','Aspirin 75mg','USV','Heart / BP','South',4,12,5,3,30],
 ['Atorva 10 Tab','Atorvastatin 10mg','Zydus','Heart / BP','South',4,12,105,72,10],
 ['Shelcal 500 Tab','Calcium + Vitamin D3','Torrent','Vitamins','West',5,12,128,88,10],
 ['Becosules Cap','Vitamin B-complex + C','Pfizer','Vitamins','West',5,12,49,34,15],
 ['Neurobion Forte Tab','Vitamin B1 + B6 + B12','P&G','Vitamins','West',6,12,36,25,15]];
 const d=new Date(),add=k=>{const x=new Date(d.getFullYear(),d.getMonth()+k,1);return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')};
 D={settings:{shop:'ASMA MEDICAL',addr:'Hospital More, Roypara, Ashapur Road, Chanchal, Malda',phone:'7679389211 / 8001160070',gstin:'',dl:'',device:'Counter 1',billNo:1},items:[],batches:[],sales:[],purchases:[],customers:[],users:[{id:'u1',name:'Owner',role:'owner'}]};
 m.forEach((r,i)=>{const id=uid()+i;D.items.push({id,name:r[0],salt:r[1],company:r[2],cat:r[3],zone:r[4],rack:r[5],gst:r[6],mrp:r[7],reorder:r[9]});
  const q=i%7==0?4:20+(i*7)%40; // a few low-stock items for demo
  const e=i%9==0?add(-1):i%5==0?add(2):add(8+(i%12)); // some expired / near-expiry for demo
  D.batches.push({id:uid()+'b'+i,itemId:id,batch:'B'+(2400+i*13),exp:e,qty:q,ptr:r[8],mrp:r[7]});});
 save()}
if(!D)seed();
if(!D.users){D.users=[{id:'u1',name:'Owner',role:'owner'}];save()}
['cpays','spays','sreturns','preturns','openings'].forEach(k=>D[k]=D[k]||[]);
if(!D.settings.packV){const PK={'Montair LC Tab':10,'Montek LC Tab':10,'Deriphyllin Retard 150':10,'Azithral 500 Tab':5,'Augmentin 625 Duo':10,'Allegra 120 Tab':10,'Dolo 650 Tab':15,'Calpol 650 Tab':15,'Zerodol SP Tab':10,'Pan 40 Tab':15,'Pan D Cap':15,'Glycomet 500 SR':10,'Janumet 50/500':15,'Amaryl 1mg Tab':30,'Telma 40 Tab':15,'Amlokind 5 Tab':10,'Ecosprin 75 Tab':14,'Atorva 10 Tab':15,'Shelcal 500 Tab':15,'Becosules Cap':20,'Neurobion Forte Tab':30};
 D.items.forEach(i=>{if(PK[i.name]){i.pack=PK[i.name];i.packOk=true}else if(/\b(tab|cap)/i.test(i.name)){i.packOk=false;i.pack=i.pack||10}else{i.pack=i.pack||1;i.packOk=true}});D.settings.packV=1;save()}
if(D.settings.packV<2){D.items.forEach(i=>{if((i.pack||1)>1&&!i.packUser)i.packOk=false});D.settings.packV=2;save()}
if(!D.settings.dbId){D.settings.dbId=Date.now().toString(36)+Math.random().toString(36).slice(2,8);save()}
// ---------- login & roles ----------
function sha256js(str){const K=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
 const b=[...new TextEncoder().encode(str)],l=b.length*8;b.push(0x80);while(b.length%64!=56)b.push(0);for(let i=7;i>=0;i--)b.push(Math.floor(l/2**(8*i))&255);
 let H=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];const r=(x,n)=>(x>>>n)|(x<<(32-n));
 for(let o=0;o<b.length;o+=64){const w=new Array(64);for(let i=0;i<16;i++)w[i]=(b[o+4*i]<<24|b[o+4*i+1]<<16|b[o+4*i+2]<<8|b[o+4*i+3])>>>0;
  for(let i=16;i<64;i++){const s0=r(w[i-15],7)^r(w[i-15],18)^(w[i-15]>>>3),s1=r(w[i-2],17)^r(w[i-2],19)^(w[i-2]>>>10);w[i]=(w[i-16]+s0+w[i-7]+s1)>>>0}
  let [a,c,d,e,f,g,h,k]=H;for(let i=0;i<64;i++){const S1=r(f,6)^r(f,11)^r(f,25),ch=(f&g)^(~f&h),t1=(k+S1+ch+K[i]+w[i])>>>0,S0=r(a,2)^r(a,13)^r(a,22),mj=(a&c)^(a&d)^(c&d),t2=(S0+mj)>>>0;k=h;h=g;g=f;f=(e+t1)>>>0;e=d;d=c;c=a;a=(t1+t2)>>>0}
  H=H.map((x,i)=>(x+[a,c,d,e,f,g,h,k][i])>>>0)}
 return H.map(x=>x.toString(16).padStart(8,'0')).join('')}
const PBK_IT=200000,hx=b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('');
async function pbk(m,salt,it){const e=new TextEncoder(),k=await crypto.subtle.importKey('raw',e.encode(m),'PBKDF2',false,['deriveBits']);return hx(await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:e.encode(salt),iterations:it},k,256))}
// slow salted hash (PBKDF2, 200k rounds); old fast hashes still open and are upgraded at login
async function hashPin(u,p){const m='asma|'+u.id+'|'+p;if(globalThis.crypto&&crypto.subtle&&crypto.getRandomValues){try{const salt=hx(crypto.getRandomValues(new Uint8Array(16)));return 'pbk1$'+PBK_IT+'$'+salt+'$'+await pbk(m,salt,PBK_IT)}catch(e){}}return legacyHash(u,p)}
async function checkPin(u,p,h){if(!h)return false;if(String(h).startsWith('pbk1$')){const[,it,salt,v]=h.split('$');try{return (await pbk('asma|'+u.id+'|'+p,salt,+it))===v}catch(e){return false}}return (await legacyHash(u,p))===h}
async function legacyHash(u,p){const m='asma|'+u.id+'|'+p;if(globalThis.crypto&&crypto.subtle){try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(m));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){}}return sha256js(m)}
async function migratePins(){let ch=0;for(const u of D.users)if(u.pin){u.pinH=await hashPin(u,u.pin);delete u.pin;ch=1}if(ch)save()}
const ACL={owner:['search','bill','purchase','stock','expiry','order','returns','dues','reports','cloud','settings','help'],manager:['search','bill','purchase','stock','expiry','order','returns','dues','reports','cloud','help'],staff:['search','bill','expiry','cloud','help']};
const RK={staff:1,manager:2,owner:3};
function eRole(){if(!ME)return'staff';const r=ME.role;return(CL&&CL.shop&&CL.role&&RK[CL.role]<RK[r])?CL.role:r}
let ME=D.users.find(u=>u.id==sessionStorage.uid)||null;
if(ME)setTimeout(autoBk,1500);
function pLogin(){if(!D.users.some(u=>u.pinH))return pSetup();$('#nav').innerHTML='';$('#who').innerHTML='';
 $('#main').innerHTML=`<div class=card style="max-width:380px;margin:40px auto;text-align:center"><img src="logo.png" style="height:90px"><h3>${t('Login')}</h3>
 <select id=lu>${D.users.map(u=>`<option value="${u.id}">${esc(u.name)} (${u.role})</option>`).join('')}</select><br><br>
 <input id=lp type=password inputmode=numeric maxlength=6 placeholder="PIN" onkeydown="if(event.key=='Enter')doLogin()"><br><br><button class=p style="width:100%" onclick="doLogin()">Login</button><br><br><a href=# onclick="forgotPin();return false" class=mut>Forgot Owner PIN?</a>
 </div>${DEV()}`;$('#lp').focus()}
function pSetup(){$('#nav').innerHTML='';$('#who').innerHTML='';
 $('#main').innerHTML=`<div class=card style="max-width:400px;margin:40px auto;text-align:center"><img src="logo.png" style="height:90px"><h3>First-time setup</h3><p class=mut>Create the Owner PIN. Only the Owner can add staff later.</p>
 <input id=s1 type=password inputmode=numeric maxlength=6 placeholder="New Owner PIN (4–6 digits)"><br><br><input id=s2 type=password inputmode=numeric maxlength=6 placeholder="Repeat PIN" onkeydown="if(event.key=='Enter')doSetup()"><br><br><button class=p style="width:100%" onclick="doSetup()">Save</button><hr><p><b>Shop already running on another computer?</b><br><span class=mut>Do NOT make a new PIN. Join with the cloud login; the Owner PIN and staff PINs come automatically.</span></p><button class=b style="width:100%" onclick="pJoin()">☁️ Join existing shop (cloud login)</button></div>${DEV()}`;$('#s1').focus()}
function pJoin(){$('#nav').innerHTML='';$('#who').innerHTML='';cur='cloud';pCloud();$('#main').insertAdjacentHTML('afterbegin','<div class=card><button class=b onclick="pLogin()">← Back</button> <b>New computer:</b> sign in with the email + password the Owner gave you, then press Join. After that, log in with your normal PIN.</div>')}
function recKey(){const A='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',r=new Uint32Array(12);(globalThis.crypto&&crypto.getRandomValues)?crypto.getRandomValues(r):r.forEach((_,k)=>r[k]=Math.random()*1e9);let k='';r.forEach((x,j)=>k+=(j&&j%4==0?'-':'')+A[x%A.length]);return k}
async function makeRec(){const k=recKey();D.settings.recH=await hashPin({id:'recovery'},k);save();alert('OWNER RECOVERY KEY:\n\n'+k+'\n\nWrite it on paper and keep it safe. If the Owner PIN is forgotten, this key resets it. It will not be shown again.');return k}
async function forgotPin(){if(!D.settings.recH)return alert('No recovery key was made on this computer. Restore your latest backup file, or contact UltraAccounting (7602292599).');const k=(prompt('Enter Owner recovery key (XXXX-XXXX-XXXX)')||'').toUpperCase().replace(/[^A-Z0-9]/g,'').replace(/(.{4})(?=.)/g,'$1-');
 if(!await checkPin({id:'recovery'},k,D.settings.recH))return alert('Wrong recovery key');const a=prompt('New Owner PIN (4–6 digits)');if(!/^\d{4,6}$/.test(a||''))return alert('4–6 digits only');if(prompt('Repeat new PIN')!==a)return alert('PINs do not match');
 const o=D.users.find(u=>u.role=='owner');o.pinH=await hashPin(o,a);save();await makeRec();alert('Owner PIN changed. A new recovery key was made; the old one no longer works.');pLogin()}
async function doSetup(){const a=$('#s1').value,b=$('#s2').value;if(!/^\d{4,6}$/.test(a))return alert('4–6 digits only');if(a!==b)return alert('PINs do not match');const o=D.users.find(u=>u.role=='owner')||D.users[0];o.pinH=await hashPin(o,a);save();await makeRec();ME=o;sessionStorage.uid=o.id;whoUI();go(ACL[o.role][0])}
async function doLogin(){const u=D.users.find(x=>x.id==$('#lu').value);const pin=$('#lp').value;if(!u||!u.pinH||!await checkPin(u,pin,u.pinH))return alert('Wrong PIN');
 if(!String(u.pinH).startsWith('pbk1$')&&!(CL&&CL.shop&&CL.role!='owner')){const nh=await hashPin(u,pin);if(nh.startsWith('pbk1$')){u.pinH=nh;save()}}
 ME=u;sessionStorage.uid=u.id;whoUI();go(ACL[eRole()][0]);if(u.role!='staff'&&pin.length<6)setTimeout(()=>alert('Tip: your '+u.role+' PIN has only '+pin.length+' digits. Use a 6-digit PIN (Settings → change PIN) - it is much harder to guess.'),300);if(u.role=='owner'&&!D.settings.recH){alert('Important: make an Owner recovery key now. It is the only way to reset the Owner PIN if it is forgotten.');await makeRec()}setTimeout(autoBk,1500)}
function logout(){ME=null;sessionStorage.removeItem('uid');pLogin()}
function whoUI(){$('#who').innerHTML=(DS.err=='full'?`<span class=pill style="background:#d32f2f;color:#fff">⚠ NOT SAVED - storage full</span> `:'')+(ME?`<span class=pill style="background:#fff3e0;color:#b45f06">👤 ${esc(ME.name)} · ${eRole()}${eRole()!=ME.role?' (cloud limit)':''}</span> <button class=b style="padding:6px 10px" onclick="logout()">Logout</button> ${syncPill()}`:'')}

// ---------- helpers ----------
const item=id=>D.items.find(x=>x.id==id);
const expired=e=>e<ym(today());
const monthsLeft=e=>{const[a,b]=e.split('-').map(Number),n=new Date();return (a-n.getFullYear())*12+(b-(n.getMonth()+1))};
const bn=s=>(s.ser?s.ser+'-':'')+s.no,findBill=n=>{n=String(n).trim().toUpperCase();return D.sales.slice().reverse().find(x=>bn(x).toUpperCase()==n)||D.sales.slice().reverse().find(x=>String(x.no)==n)},ph=x=>String(x||'').replace(/\D/g,'').slice(-10),r2=x=>Math.round(x*1e6)/1e6,packOf=i=>(i&&i.pack)||1;
function fq(i,q){q=r2(q);const p=packOf(i);if(p>1&&q%1){const w=Math.floor(q),t=Math.round((q-w)*p);return (w?w+' + ':'')+t+' loose'}return String(Math.round(q*100)/100)}
const lq=l=>l.loose?Math.round(l.qty*packOf(item(l.itemId)))+' tab':String(Math.round(l.qty*100)/100);
const stOf=l=>l.loose?l.qty/packOf(item(l.itemId)):l.qty;
const stockOf=id=>D.batches.filter(b=>b.itemId==id&&!expired(b.exp)).reduce((a,b)=>a+b.qty,0);
const fefo=id=>D.batches.filter(b=>b.itemId==id&&b.qty>0&&!expired(b.exp)).sort((a,b)=>a.exp.localeCompare(b.exp));
const rk=i=>`<span class=rack>${esc(i.zone)} · Rack ${esc(i.rack)}</span>`;
const GSTRE=/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
const byBc=q=>{q=String(q||'').trim();return q.length>=4?D.items.find(i=>i.bc&&String(i.bc).split(/[ ,]+/).includes(q)):null};
function find(q){q=q.trim().toLowerCase();if(!q)return[];const b=byBc(q);if(b)return[b];return D.items.filter(i=>(i.name+' '+i.salt+' '+i.company).toLowerCase().includes(q)).slice(0,30)}

// ---------- nav ----------
const P=[['search','🔍','Search'],['bill','🧾','New Bill'],['purchase','📦','Purchase'],['stock','💊','Stock'],['expiry','⏰','Expiry'],['order','📝','Order List'],['returns','↩️','Returns'],['dues','💰','Dues'],['reports','📈','Reports'],['cloud','☁️','Sync'],['settings','⚙️','Settings'],['help','❓','Help']];
let cur='search';
function nav(){if(!ME)return;$('#nav').innerHTML=P.filter(p=>ACL[eRole()].includes(p[0])).map(p=>`<button class="${p[0]==cur?'a':''}" onclick="go('${p[0]}')">${p[1]} ${t(p[2])}</button>`).join('')}
function go(p){if(!ME)return pLogin();if(!ACL[eRole()].includes(p))p=ACL[eRole()][0];cur=p;nav();({search:pSearch,bill:pBill,purchase:pPurchase,stock:pStock,expiry:pExpiry,order:pOrder,reports:pReports,settings:pSettings,help:pHelp,returns:pReturns,dues:pDues,cloud:pCloud})[p]();window.scrollTo(0,0)}
function netUI(){const o=navigator.onLine;$('#net').className='pill '+(o?'on':'off');$('#net').textContent=o?'● Online':'● Offline – saved on this computer';$('#dev').textContent='🖥 '+D.settings.device}
addEventListener('online',netUI);addEventListener('offline',netUI);

// ---------- Search (home) ----------
function pSearch(){
 const low=D.items.filter(i=>stockOf(i.id)<=i.reorder).length,ex=D.batches.filter(b=>b.qty>0&&monthsLeft(b.exp)<=3).length;
 const ts=D.sales.filter(s=>s.date==today());
 $('#main').innerHTML=`<div class=kp style="margin-bottom:12px">
 <div class=card>${t('Today Sale')}<div class=big>${inr(ts.reduce((a,s)=>a+s.total,0))}</div><span class=mut>${ts.length} ${t('Bills')}</span></div>
 <div class=card onclick="go('order')" style="cursor:pointer">${t('Low stock')}<div class="big ${low?'red':''}">${low}</div><span class=mut>tap for order list</span></div>
 <div class=card onclick="go('expiry')" style="cursor:pointer">${t('Expiring in 90 days')}<div class="big ${ex?'red':''}">${ex}</div><span class=mut>batches</span></div>
 <div class=card>Medicines<div class=big>${D.items.length}</div><span class=mut>in ${ZONES.length} sides × ${RACKS.length} racks</span></div></div>
 <div class="card hero"><h3>🔍 ${t('Search')}: medicine, salt or company</h3><input id=q placeholder="Type 2–3 letters… e.g. mont, para, azi" autofocus oninput="sRes()"><div id=sr class=res></div></div>`;
 $('#q').focus()}
function sRes(){const q=$('#q').value,r=find(q);
 $('#sr').innerHTML=!q.trim()?'':!r.length?'<p class=mut>No medicine found.</p>':r.map(i=>{const s=stockOf(i.id),b=fefo(i.id)[0];
  const alt=s?'':D.items.filter(x=>x.id!=i.id&&x.salt==i.salt&&stockOf(x.id)>0);
  return`<div class=ri><div class=nm><b>${esc(i.name)}</b> <span class=mut>${esc(i.company)}</span><br><span class=mut>${esc(i.salt)}</span>
  ${alt&&alt.length?`<br><span class=red>Out of stock.</span> Same salt: ${alt.map(x=>`<b>${esc(x.name)}</b> (${rk(x)}, ${stockOf(x.id)})`).join(', ')}`:''}</div>
  <div>${rk(i)}</div><div style="text-align:right;min-width:90px"><b class="${s?'':'red'}">${s} in stock</b><br>${inr(i.mrp)}${b?`<br><span class=mut>Exp ${b.exp}</span>`:''}</div>
  <button class=p onclick="billAdd('${i.id}')">+ Bill</button></div>`}).join('')}

// ---------- Bill ----------
let B={lines:[],cust:'',phone:'',disc:0,pay:'Cash'};
function billAdd(id){go('bill');addLine(id)}
function pBill(){
 $('#main').innerHTML=`<div class=card><h3>🧾 ${t('New Bill')} <span class=mut>No. ${(D.settings.series?D.settings.series+'-':'')+D.settings.billNo} · ${today()}</span></h3>
 <div class=row><label>${t('Customer')}<input id=bc value="${esc(B.cust)}" oninput="B.cust=this.value"></label><label>${t('Mobile')}<input id=bp value="${esc(B.phone)}" oninput="B.phone=this.value"></label><label>Doctor<input id=bdr value="${esc(B.dr||'')}" oninput="B.dr=this.value" placeholder="Dr. name (Rx)"></label><label>Buyer GSTIN <span class=mut>(B2B only)</span><input id=bgs maxlength=15 value="${esc(B.gstin||'')}" oninput="B.gstin=this.value.toUpperCase().trim()" placeholder="19ABCDE1234F1Z5" style="text-transform:uppercase"></label>
 <label>${t('Payment')}<select id=bpay onchange="B.pay=this.value">${['Cash','UPI','Card','Credit'].map(p=>`<option value=${p} ${B.pay==p?'selected':''}>${p=='Credit'?'Credit (udhaar)':p}</option>`).join('')}</select></label><label>${t('Discount %')}<input type=number id=bd value="${B.disc}" oninput="B.disc=+this.value||0;bDraw()"></label></div>
 <div class=dd style="margin-top:10px;display:flex;gap:6px"><button class=b title="Scan with phone camera" onclick="camScan(billScan)">📷</button><input id=bi autocomplete=off spellcheck=false style="flex:1" placeholder="Medicine name or scan barcode… (↑↓ then Enter)" oninput="bSug()" onkeydown="bKey(event)"><div class=list id=bl hidden></div></div></div>
 <div class="card tw" id=bt></div>
 ${lastBills()}<div class=card style="background:#14305c;color:#fff;font-size:13px"><b>⌨ Keyboard:</b> type name → <b>Enter</b> → qty → <b>Enter</b> → next medicine · empty box + <b>Enter</b> = Save & Print · <b>F10</b> Save & Print · <b>F9</b> Save only · <b>F11</b> WhatsApp · <b>Alt+C</b> Customer · <b>Alt+M</b> Mobile · <b>Alt+O</b> Doctor · <b>Alt+P</b> Payment · <b>Alt+D</b> Discount · qty <b>5</b> = 5 strips, <b>5L</b> = 5 loose tablets · <b>Ctrl+Del</b> remove last · <b>Esc</b> back to search · <b>Ctrl+P</b> reprint last bill · <b>Alt+R</b> reprint by bill no.<br>
 <b>Pages:</b> F1 Search · F2 New Bill · F3 Purchase · F4 Stock · F6 Expiry · F7 Order list · F8 Reports</div>`;bDraw();$('#bi').focus()}
let sug=[],sh=0;
function bSug(){sug=find($('#bi').value);sh=0;const l=$('#bl');if(!sug.length){l.hidden=true;return}l.hidden=false;
 l.innerHTML=sug.map((i,k)=>`<div class="${k==sh?'h':''}" onclick="addLine('${i.id}')"><b>${esc(i.name)}</b> · ${rk(i)} · ${fq(i,stockOf(i.id))} in stock · ${inr(i.mrp)}${packOf(i)>1?' / strip of '+packOf(i):''}</div>`).join('')}
function bKey(e){if(e.key=='Enter'){const b=bcLookup($('#bi').value).i;if(b){e.preventDefault();return addLine(b.id)}}if(e.key=='Enter'&&!$('#bi').value&&B.lines.length){e.preventDefault();return bSave(1)}if($('#bl').hidden)return;if(e.key=='ArrowDown'){sh=Math.min(sh+1,sug.length-1);e.preventDefault()}else if(e.key=='ArrowUp'){sh=Math.max(sh-1,0);e.preventDefault()}else if(e.key=='Enter'){e.preventDefault();sug[sh]&&addLine(sug[sh].id);return}else if(e.key=='Escape'){$('#bl').hidden=true;return}else return;
 [...$('#bl').children].forEach((d,k)=>{d.className=k==sh?'h':'';if(k==sh&&d.scrollIntoView)d.scrollIntoView({block:'nearest'})})}
function addLine(id){const i=item(id);if(!stockOf(id))return alert(i.name+' is out of stock (or only expired stock).');
 const ex=B.lines.find(l=>l.itemId==id);if(ex)ex.qty++;else B.lines.push({itemId:id,qty:1,loose:false});
 const bi=$('#bi');if(bi){bi.value='';$('#bl').hidden=true}bDraw();const k=B.lines.findIndex(l=>l.itemId==id),qi=$('#q_'+k);if(qi){qi.focus();qi.select()}}
function bCalc(){let tot=0,gst=0;const rows=B.lines.map(l=>{const i=item(l.itemId),b=fefo(l.itemId)[0];const amt=stOf(l)*i.mrp*(1-B.disc/100);const tx=amt-amt/(1+i.gst/100);tot+=amt;gst+=tx;return{l,i,b,amt}});return{rows,tot:Math.round(tot),gst}}
function bDraw(){const el=$('#bt');if(!el)return;const c=bCalc();
 el.innerHTML=!B.lines.length?'<p class=mut>Search a medicine above and press Enter to add it. The nearest-expiry batch is picked automatically.</p>':`<table><tr><th>${t('Medicine')}</th><th>${t('Rack')}</th><th>${t('Batch / Exp')}</th><th>${t('Qty')}</th><th>${t('MRP')}</th><th>${t('GST')}</th><th>${t('Amount')}</th><th></th></tr>
 ${c.rows.map((r,k)=>`<tr><td><b>${esc(r.i.name)}</b></td><td>${rk(r.i)}</td><td>${r.b?esc(r.b.batch)+' / '+r.b.exp:'-'}${r.b&&monthsLeft(r.b.exp)<=3?' <span class=tag>near expiry</span>':''}</td>
 <td><input id=q_${k} value="${r.l.qty}${r.l.loose?'L':''}" style="width:70px" onchange="bQty(${k},this.value)" onkeydown="if(event.key=='Enter'){event.preventDefault();bQty(${k},this.value);$('#bi').focus()}"> <span class=mut>${r.l.loose?'tab':packOf(r.i)>1?'strip':'pc'}</span></td><td>${inr(r.i.mrp)}</td><td>${r.i.gst}%</td><td><b>${inr(r.amt)}</b></td><td><button class=x onclick="B.lines.splice(${k},1);bDraw()">✕</button></td></tr>`).join('')}</table>
 <div class=tot><span>${t('Total')} <span class=mut>(GST incl. ${inr(c.gst)})</span></span><span>${inr(c.tot)}</span></div>
 <button class=p onclick="bSave(1)">🖨 ${t('Save & Print')}</button> <button class=b onclick="bSave(0)">💾 Save only</button> <button class=b onclick="bSave(2)">📲 Save & WhatsApp</button> <button class=b onclick="B.lines=[];bDraw()">Clear</button>`}
function bQty(k,v){const l=B.lines[k];if(!l)return;const i=item(l.itemId);v=String(v).trim();if(/[lt]/i.test(v)){if(packOf(i)<=1)return alert(i.name+' is sold as a whole unit only.');if(!i.packOk)return alert('Set the correct "Tablets per strip" for '+i.name+' first: Stock → press ⚠ check pack. Loose price = MRP ÷ tablets per strip.')}const lo=/[lt]/i.test(v)&&packOf(i)>1,q=Math.max(1,Math.floor(parseFloat(v)||1)),s=stockOf(l.itemId);
 l.loose=lo;l.qty=q;if(stOf(l)>s+1e-9){alert('Only '+fq(i,s)+' in stock.');l.loose=false;l.qty=Math.max(1,Math.floor(s))}bDraw()}
function bSave(mode){if(!B.lines.length)return;const c=bCalc(),lines=[];
 if(B.gstin&&!GSTRE.test(B.gstin))return alert('Buyer GSTIN is not valid (15 characters, like 19ABCDE1234F1Z5).');if(B.gstin&&B.gstin.slice(0,2)!='19')return alert('This GSTIN is from another state. Inter-state (IGST) bills are not supported yet – make it without GSTIN or ask the developer.');if(B.gstin&&!B.cust.trim())return alert('For a GSTIN bill, enter the buyer firm name in Customer.');
 if(B.pay=='Credit'&&(!B.cust.trim()||ph(B.phone).length!=10))return alert('For Credit (udhaar) bills, customer name and a 10-digit mobile are needed.');
 const need0={};for(const l of B.lines){need0[l.itemId]=r2((need0[l.itemId]||0)+stOf(l))}
 for(const id in need0){const i=item(id);if(need0[id]>stockOf(id)+1e-9)return alert('Not enough stock: '+i.name+' (only '+fq(i,stockOf(id))+')')}
 for(const l of B.lines){const i=item(l.itemId);let need=r2(stOf(l));
  for(const b of fefo(i.id)){if(!need)break;const take=r2(Math.min(need,b.qty));b.qty=r2(b.qty-take);need=r2(need-take);const amt=take*i.mrp*(1-B.disc/100);
   lines.push({itemId:i.id,name:i.name,batch:b.batch,exp:b.exp,qty:take,loose:l.loose,mrp:i.mrp,gst:i.gst,ptr:(b.cost??b.ptr),amt})}}
 const s={id:uid(),ser:D.settings.series||'',no:D.settings.billNo++,date:today(),time:new Date().toTimeString().slice(0,5),cust:B.cust.trim(),phone:ph(B.phone),dr:B.dr||'',gstin:B.gstin||'',pay:B.pay,disc:B.disc,device:D.settings.device,by:ME.name,lines,total:c.tot,gst:c.gst};
 D.sales.push(s);save();B={lines:[],cust:'',phone:'',disc:0,pay:'Cash'};
 if(mode==1)printBill(s);if(mode==2)waBill(s);go('bill')}
function lastBills(){const ls=D.sales.slice(-8).reverse();if(!ls.length)return'';return`<div class="card tw"><h3>🕘 Last bills <span class=mut>(Ctrl+P reprints the latest)</span></h3><table><tr><th>${t('Bill')}</th><th>Time</th><th>${t('Customer')}</th><th>${t('Total')}</th><th>By</th><th></th></tr>${ls.map(s=>`<tr><td>${bn(s)}</td><td>${s.date.slice(5)} ${s.time}</td><td>${esc(s.cust||'-')}</td><td>${inr(s.total)}</td><td>${esc(s.by||'')}</td><td><button class=b onclick="reprint('${s.id}')">🖨 Reprint</button> <button class=b onclick="waBill(D.sales.find(x=>x.id=='${s.id}'))">📲</button></td></tr>`).join('')}</table></div>`}
function reprint(id){const s=id?D.sales.find(x=>x.id==id):D.sales[D.sales.length-1];if(!s)return alert('No bill yet');printBill(s,true)}
function reprintNo(){const n=prompt('Reprint bill no.');if(!n)return;const s=findBill(n);if(!s)return alert('Bill not found');printBill(s,true)}
function inWords(n){n=Math.round(n);if(!n)return'Zero';const o=['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'],te=['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
 const w2=x=>x<20?o[x]:te[Math.floor(x/10)]+(x%10?' '+o[x%10]:''),w3=x=>(x>=100?o[Math.floor(x/100)]+' Hundred'+(x%100?' ':''):'')+(x%100?w2(x%100):'');
 let r='';const cr=Math.floor(n/1e7),la=Math.floor(n/1e5)%100,th=Math.floor(n/1e3)%100,rest=n%1000;
 if(cr)r+=w3(cr)+' Crore ';if(la)r+=w2(la)+' Lakh ';if(th)r+=w2(th)+' Thousand ';if(rest)r+=w3(rest);return r.trim()}
function fmtD(d){const[y,m,dd]=d.split('-');return dd+'-'+m+'-'+y}
function printBill(s,dup){const st=D.settings,P0=st.paper||'a5',two=P0=='a4x2'&&s.lines.length<=10,P=P0=='a4x2'?(two?'a4h':'a4'):P0,th=P=='t80';
 let gross=0,disc=0,taxable=0,gstT=0;const slab={};
 const rows=s.lines.map((l,k)=>{const g=l.qty*l.mrp,net=l.amt,tx=net-net/(1+l.gst/100),tv=net-tx;gross+=g;disc+=g-net;taxable+=tv;gstT+=tx;const sl=slab[l.gst]||(slab[l.gst]={tv:0,tx:0});sl.tv+=tv;sl.tx+=tx;const it=item(l.itemId)||{};
  return th?`<tr><td colspan=4><b>${esc(l.name)}</b></td></tr><tr class=sub><td>${esc(l.batch)} · ${l.exp?l.exp.slice(5)+'/'+l.exp.slice(2,4):''}</td><td class=r>${lq(l)}</td><td class=r>${l.mrp.toFixed(2)}</td><td class=r>${net.toFixed(2)}</td></tr>`
  :`<tr><td class=c>${k+1}</td><td><b>${esc(l.name)}</b>${it.company?`<div class=sub>${esc(it.company)}</div>`:''}</td><td>${esc(it.hsn||'3004')}</td><td>${esc(l.batch)}</td><td class=c>${l.exp?l.exp.slice(5)+'/'+l.exp.slice(2,4):''}</td><td class=r>${lq(l)}</td><td class=r>${l.mrp.toFixed(2)}</td><td class=r>${s.disc||0}</td><td class=r>${l.gst}</td><td class=r><b>${net.toFixed(2)}</b></td></tr>`}).join('');
 const exact=s.lines.reduce((a,l)=>a+l.amt,0),round=s.total-exact;
 const slabRows=Object.entries(slab).map(([r,v])=>`<tr><td class=c>${r}%</td><td class=r>${v.tv.toFixed(2)}</td><td class=r>${(v.tx/2).toFixed(2)}</td><td class=r>${(v.tx/2).toFixed(2)}</td><td class=r>${v.tx.toFixed(2)}</td></tr>`).join('');
 const css=`@page{size:${P=='a4'||P=='a4h'?'A4':P=='a5'?'A5':'80mm auto'};margin:0}
 #print{font-family:Arial,Helvetica,sans-serif;color:#000;width:${P=='a4'||P=='a4h'?'190mm':P=='a5'?'136mm':'72mm'};margin:${th?'2mm 4mm':P=='a4h'?'0 10mm':'6mm 6mm'};font-size:${th?'11px':P=='a5'||P=='a4h'?'10px':'12px'}}
 #print .cp{height:146mm;overflow:hidden;padding-top:5mm;box-sizing:border-box;position:relative}#print .cp+.cp{border-top:1px dashed #000}#print .cl{position:absolute;top:1mm;right:0;font-size:8px;font-weight:700;letter-spacing:1px}
 #print .hd{display:flex;align-items:center;gap:10px;border-bottom:2px solid #000;padding-bottom:6px}#print .hd img{height:${th?'0':'52px'};${th?'display:none':''}}
 #print .nm{font-size:${th?'16px':'20px'};font-weight:800;letter-spacing:.5px}#print .ad{font-size:.92em;line-height:1.35}
 #print .ti{text-align:center;font-weight:800;margin:5px 0;letter-spacing:2px;border:1px solid #000;padding:2px}#print .dup{text-align:center;font-weight:800;font-size:.9em}
 #print .meta{display:grid;grid-template-columns:${th?'1fr':'1fr 1fr'};gap:1px 12px;margin:4px 0 6px;font-size:.95em}#print .meta b{display:inline-block;min-width:${th?'0':'58px'}}
 #print table{width:100%;border-collapse:collapse}#print th{background:#eee!important;-webkit-print-color-adjust:exact;print-color-adjust:exact;border:1px solid #000;padding:3px 4px;font-size:.88em;text-align:left}
 #print td{border:${th?'0':'1px solid #999'};padding:${th?'1px 0':'3px 4px'};vertical-align:top}#print .r{text-align:right}#print .c{text-align:center}#print .sub{font-size:.82em;color:#333}
 #print .tot{display:flex;justify-content:space-between;gap:12px;margin-top:6px}#print .tot table td{border:0;padding:1px 4px}#print .net td{font-size:1.25em;font-weight:800;border-top:2px solid #000!important}
 #print .wd{font-size:.9em;margin-top:4px}#print .ft{display:flex;justify-content:space-between;align-items:flex-end;margin-top:12px;font-size:.88em}#print .sg{text-align:center;min-width:120px;border-top:1px solid #000;padding-top:2px}
 #print .cr{text-align:center;font-size:8px;color:#555;margin-top:8px;border-top:1px dashed #999;padding-top:3px}`;
 const meta=`<div><b>Bill No:</b> ${bn(s)}</div><div><b>Date:</b> ${fmtD(s.date)} ${s.time}</div><div><b>${s.gstin?'Buyer':'Patient'}:</b> ${esc(s.cust||'Cash')}</div>${s.gstin?`<div><b>Buyer GSTIN:</b> ${esc(s.gstin)}</div>`:''}<div><b>Mobile:</b> ${esc(s.phone||'-')}</div><div><b>Doctor:</b> ${esc(s.dr||'-')}</div><div><b>Payment:</b> ${esc(s.pay=='Credit'?'Credit (udhaar)':s.pay)}</div>`;
 const body=`<div class=hd><img src="logo.png"><div style="flex:1;${th?'text-align:center':''}"><div class=nm>${esc(st.shop)}</div><div class=ad>${esc(st.addr)}<br>Ph: ${esc(st.phone)}${st.gstin?' · GSTIN: '+esc(st.gstin):''}${st.dl?'<br>D.L. No: '+esc(st.dl):''}</div></div></div>
 <div class=ti>${st.gstin?'TAX INVOICE':'CASH MEMO / BILL'}</div>${dup?'<div class=dup>*** DUPLICATE COPY ***</div>':''}
 <div class=meta>${meta}</div>
 <table>${th?`<tr><th>Item / Batch · Exp</th><th class=r>Qty</th><th class=r>MRP</th><th class=r>Amt</th></tr>`:`<tr><th class=c>#</th><th>Product</th><th>HSN</th><th>Batch</th><th class=c>Exp</th><th class=r>Qty</th><th class=r>MRP</th><th class=r>Disc%</th><th class=r>GST%</th><th class=r>Amount</th></tr>`}${rows}</table>
 <div class=tot>${th?'':`<div style="flex:1"><table><tr><th class=c>GST</th><th class=r>Taxable</th><th class=r>CGST</th><th class=r>SGST</th><th class=r>Total Tax</th></tr>${slabRows}</table></div>`}
 <div style="min-width:${th?'100%':'45%'}"><table><tr><td>Items: ${s.lines.length}</td><td></td></tr><tr><td>Gross (MRP)</td><td class=r>${gross.toFixed(2)}</td></tr>${disc>0.004?`<tr><td>Discount</td><td class=r>-${disc.toFixed(2)}</td></tr>`:''}<tr><td>Taxable value</td><td class=r>${taxable.toFixed(2)}</td></tr><tr><td>CGST + SGST</td><td class=r>${gstT.toFixed(2)}</td></tr>${Math.abs(round)>0.004?`<tr><td>Round off</td><td class=r>${round.toFixed(2)}</td></tr>`:''}<tr class=net><td>NET AMOUNT</td><td class=r>₹${s.total.toFixed(2)}</td></tr></table></div></div>
 <div class=wd><b>Rupees ${inWords(s.total)} Only</b></div>
 <div class=ft><div>${esc(st.terms||'Goods once sold will be taken back only as per rules. Please check medicines and expiry before leaving.')}<br>Billed by: ${esc(s.by||'')} · ${esc(s.device||'')}<br><b>Get well soon!</b></div>${th?'':`<div class=sg>For ${esc(st.shop)}<br><br><br>Authorised Signatory</div>`}</div>
 <div class=cr>Built &amp; run by UltraAccounting / SK Nuruddin · 7602292599</div>`;
 $('#print').innerHTML=`<style>${css}</style>`+(two?`<div class=cp><div class=cl>ORIGINAL – CUSTOMER COPY ✂</div>${body}</div><div class=cp><div class=cl>DUPLICATE – SHOP COPY</div>${body}</div>`:body);
 setTimeout(()=>print(),150)}
function waBill(s){const txt=`*${D.settings.shop}*\nBill ${bn(s)} · ${s.date}\n`+s.lines.map(l=>`${l.name} x${lq(l)} = ₹${l.amt.toFixed(2)}`).join('\n')+`\n*Total ₹${s.total}*\nThank you 🙏`;
 const ph=(s.phone||'').replace(/\D/g,'');open('https://wa.me/'+(ph.length==10?'91'+ph:ph)+'?text='+encodeURIComponent(txt))}

// ---------- Purchase ----------
let PU={supplier:'',inv:'',lines:[],paid:0,pmode:'Cash'};
function pPurchase(){const opt=D.items.map(i=>`<option value="${i.id}">${esc(i.name)}</option>`).join('');
 $('#main').innerHTML=`<div class=card><h3>📦 ${t('Purchase')} (supplier bill)</h3><div class=row><label>${t('Supplier')}<input value="${esc(PU.supplier)}" oninput="PU.supplier=this.value" placeholder="e.g. Malda Pharma Distributors"></label><label>${t('Invoice no.')}<input value="${esc(PU.inv)}" oninput="PU.inv=this.value"></label><label>Paid now ₹<input type=number id=ppaid value="${PU.paid||0}" oninput="PU.paid=+this.value||0"></label><label>Paid by<select onchange="PU.pmode=this.value">${['Cash','UPI','Bank','Cheque'].map(m=>`<option ${PU.pmode==m?'selected':''}>${m}</option>`).join('')}</select></label></div><p class=mut>Purchase rate is before GST. Anything not paid now goes to the supplier's dues.</p><label>📥 Import supplier bill file (Excel .xlsx or CSV) <input type=file accept=".xlsx,.csv,.txt,.xls" onchange="puImport(this.files[0]);this.value=''"></label></div>
 <div class=card><div class=row><label>Scan barcode<span style="display:flex;gap:4px"><input id=pscan placeholder="scan here" onkeydown="if(event.key=='Enter'){event.preventDefault();puScan(this.value)}"><button class=b title="Scan with phone camera" onclick="camScan(puScan)">📷</button></span></label><label>${t('Medicine')}<select id=pi onchange="puPick()">${opt}</select></label><label>${t('Batch')}<input id=pb></label><label>${t('Expiry')}<input id=pe type=month></label><label>${t('Qty')}<input id=pq type=number></label><label>${t('Free')}<input id=pf type=number value=0></label><label>${t('Purchase rate')}<input id=pr type=number step=.01></label><label>${t('MRP')}<input id=pm type=number step=.01></label><label>${t('GST %')}<select id=pg>${[0,5,12,18].map(g=>`<option ${g==12?'selected':''}>${g}</option>`).join('')}</select></label></div><br>
 <button class=p onclick="puAdd()">+ Add line</button> <button class=b onclick="newItem()">+ New medicine</button></div><div class="card tw" id=pt></div>`;puPick();puDraw()}
function puPick(){const i=item($('#pi').value);if(!i)return;$('#pg').value=String(i.gst??12);$('#pm').value=i.mrp||''}
function puAdd(){const l={itemId:$('#pi').value,batch:$('#pb').value.trim(),exp:$('#pe').value,qty:+$('#pq').value||0,free:+$('#pf').value||0,ptr:+$('#pr').value||0,mrp:+$('#pm').value||item($('#pi').value).mrp,gst:+$('#pg').value};
 if(!l.batch||!l.exp||!l.qty)return alert('Batch, expiry and qty are needed.');if(expired(l.exp))return alert('This batch is already expired.');PU.lines.push(l);puDraw()}
function puTot(ls){const tv=ls.reduce((a,l)=>a+l.qty*l.ptr,0),tx=ls.reduce((a,l)=>a+l.qty*l.ptr*(l.gst??0)/100,0);return{tv,tx,tot:Math.round(tv+tx)}}
function puDraw(){const T=puTot(PU.lines),tot=T.tot;$('#pt').innerHTML=!PU.lines.length?'<p class=mut>Add each medicine from the supplier bill.</p>':`<table><tr><th>${t('Medicine')}</th><th>${t('Batch')}</th><th>${t('Exp')}</th><th>${t('Qty')}+Free</th><th>${t('Rate')}</th><th>${t('MRP')}</th><th>${t('GST')}</th><th>${t('Value')}</th><th></th></tr>${PU.lines.map((l,k)=>`<tr><td>${esc(item(l.itemId).name)}</td><td>${esc(l.batch)}</td><td>${l.exp}</td><td>${l.qty}+${l.free}</td><td>${inr(l.ptr)}</td><td>${inr(l.mrp)}</td><td>${l.gst??0}%</td><td>${inr(l.qty*l.ptr)}</td><td><button class=x onclick="PU.lines.splice(${k},1);puDraw()">✕</button></td></tr>`).join('')}</table><p>Taxable ${inr(T.tv)} · GST (input credit) ${inr(T.tx)}</p><div class=tot><span>Bill total</span><span>${inr(tot)}</span></div><button class=p onclick="puSave()">💾 Save purchase (stock goes up)</button>`}
function puSave(){if(!PU.lines.length)return alert('Add at least one line.');PU.lines.forEach(l=>{const ex=D.batches.find(b=>b.itemId==l.itemId&&b.batch==l.batch);const cost=l.qty+l.free?Math.round(l.ptr*l.qty/(l.qty+l.free)*100)/100:l.ptr;if(ex){const oq=Math.max(ex.qty,0),nq=l.qty+l.free;ex.cost=Math.round(((ex.cost??ex.ptr)*oq+cost*nq)/(oq+nq||1)*100)/100;ex.qty+=nq;if(l.exp)ex.exp=l.exp;ex.ptr=l.ptr;ex.mrp=l.mrp}else D.batches.push({id:uid(),itemId:l.itemId,batch:l.batch,exp:l.exp,qty:l.qty+l.free,ptr:l.ptr,cost,mrp:l.mrp});const i=item(l.itemId);if(i.mrp!=l.mrp){i.mrp=l.mrp;i._d=1}});
 const T=puTot(PU.lines);D.purchases.push({id:uid(),date:today(),supplier:PU.supplier.trim()||'Unknown supplier',inv:PU.inv,lines:PU.lines,taxable:T.tv,gst:T.tx,total:T.tot,paid:Math.min(PU.paid||0,T.tot),pmode:PU.pmode||'Cash',device:D.settings.device,by:ME.name});save();PU={supplier:'',inv:'',lines:[],paid:0,pmode:'Cash'};alert('Purchase saved. Stock updated.');go('purchase')}
function newItem(id){const i=id?item(id):{name:'',salt:'',company:'',cat:'',zone:'East',rack:1,gst:12,mrp:0,reorder:10};
 $('#main').innerHTML=`<div class=card><h3>${id?'✏️ Edit':'+ New'} medicine</h3><div class=row>
 <label>${t('Name')}<input id=nn value="${esc(i.name)}"></label><label>${t('Salt / composition')}<input id=ns value="${esc(i.salt)}"></label><label>${t('Company')}<input id=nc value="${esc(i.company)}"></label><label>${t('Category')}<input id=nk value="${esc(i.cat)}"></label>
 <label>${t('Side')}<select id=nz>${ZONES.map(z=>`<option ${i.zone==z?'selected':''}>${z}</option>`).join('')}</select></label><label>${t('Rack')}<select id=nr>${RACKS.map(r=>`<option ${i.rack==r?'selected':''}>${r}</option>`).join('')}</select></label>
 <label>${t('GST %')}<select id=ng>${[0,5,12,18].map(g=>`<option ${i.gst==g?'selected':''}>${g}</option>`).join('')}</select></label><label>${t('MRP')}<input id=nm type=number step=.01 value="${i.mrp}"></label><label>${t('Reorder at')}<input id=no type=number value="${i.reorder}"></label><label>Barcode <span class=mut>(scan; more than one: comma)</span><input id=nbc value="${esc(i.bc||'')}" onkeydown="if(event.key=='Enter')event.preventDefault()"></label><label>HSN<input id=nhs value="${esc(i.hsn||'3004')}" maxlength=8></label><label>Tablets per strip ${i.packOk===false?'<span class=red>⚠ check</span>':''}<input id=npk type=number min=1 value="${i.pack||1}"></label></div><br>
 <button class=p onclick="niSave('${id||''}')">💾 Save</button> <button class=b onclick="go('stock')">Cancel</button></div>`}
function niSave(id){const v={name:$('#nn').value.trim(),salt:$('#ns').value.trim(),company:$('#nc').value.trim(),cat:$('#nk').value.trim(),zone:$('#nz').value,rack:+$('#nr').value,gst:+$('#ng').value,mrp:+$('#nm').value||0,reorder:+$('#no').value||0,pack:Math.max(1,+$('#npk').value||1),packOk:true,packUser:true,bc:$('#nbc').value.trim().replace(/\s*,\s*/g,','),hsn:($('#nhs').value.trim()||'3004')};
 if(!v.name)return alert('Name is needed.');for(const c of v.bc?v.bc.split(','):[]){const o=byBc(c);if(o&&o.id!=id)return alert('Barcode '+c+' is already on '+o.name+'.')}if(id)Object.assign(item(id),v,{_d:1});else D.items.push({id:uid(),...v,_d:1});save();go('stock')}

// ---------- Stock ----------
let SF={zone:'',rack:''};
function pStock(){const it=D.items.filter(i=>(!SF.zone||i.zone==SF.zone)&&(!SF.rack||i.rack==SF.rack)).sort((a,b)=>(a.zone+a.rack+a.name).localeCompare(b.zone+b.rack+b.name));
 const val=D.batches.filter(b=>!expired(b.exp)).reduce((a,b)=>a+b.qty*b.ptr,0);
 $('#main').innerHTML=`<div class=card><h3>💊 ${t('Stock')} <span class=mut>stock value ${inr(val)} (at purchase rate)</span></h3><div class=row>
 <label>${t('Side')}<select onchange="SF.zone=this.value;pStock()"><option value="">All sides</option>${ZONES.map(z=>`<option ${SF.zone==z?'selected':''}>${z}</option>`).join('')}</select></label>
 <label>${t('Rack')}<select onchange="SF.rack=this.value;pStock()"><option value="">All racks</option>${RACKS.map(r=>`<option ${SF.rack==r?'selected':''}>${r}</option>`).join('')}</select></label>
 <label>&nbsp;<button class=p onclick="newItem()">+ New medicine</button></label>${ME&&ME.role=='owner'?`<label>📥 Import stock list (Excel/CSV)<input type=file accept=".xlsx,.csv,.txt,.xls" onchange="stImport(this.files[0]);this.value=''"></label>`:''}</div></div>
 <div class="card tw"><table><tr><th>${t('Rack')}</th><th>${t('Medicine')}</th><th>${t('Salt')}</th><th>${t('Company')}</th><th>${t('Stock')}</th><th>${t('Batches')}</th><th>${t('MRP')}</th><th></th></tr>
 ${it.map(i=>{const s=stockOf(i.id),bs=D.batches.filter(b=>b.itemId==i.id&&b.qty>0);return`<tr><td>${rk(i)}</td><td><b>${esc(i.name)}</b>${i.packOk===false?` <button class=x title="Check the real strip" onclick="setPack('${i.id}')">⚠ check pack (${packOf(i)}?)</button>`:packOf(i)>1?` <span class=mut>(${packOf(i)}/strip)</span>`:''}</td><td class=mut>${esc(i.salt)}</td><td>${esc(i.company)}</td><td class="${s<=i.reorder?'red':''}"><b>${fq(i,s)}</b></td>
 <td>${bs.map(b=>`${esc(b.batch)} <span class="tag ${expired(b.exp)?'ex':''}">${b.exp}</span> ×${fq(i,b.qty)}`).join('<br>')}</td><td>${inr(i.mrp)}</td><td><button class=b onclick="newItem('${i.id}')">✏️</button></td></tr>`}).join('')}</table></div>`}

// ---------- Expiry ----------
function pExpiry(){const bs=D.batches.filter(b=>b.qty>0&&monthsLeft(b.exp)<=3).sort((a,b)=>a.exp.localeCompare(b.exp));
 $('#main').innerHTML=`<div class="card tw"><h3>⏰ ${t('Expiry')}: expired and next 3 months</h3><p class=mut>Return these to the supplier before expiry, or sell them first (billing already picks the nearest expiry automatically).</p>
 ${!bs.length?'<p class=grn>Nothing expiring. 👍</p>':`<table><tr><th>${t('Medicine')}</th><th>${t('Rack')}</th><th>${t('Batch')}</th><th>${t('Expiry')}</th><th>${t('Qty')}</th><th>${t('Value')}</th><th></th></tr>${bs.map(b=>{const i=item(b.itemId),m=monthsLeft(b.exp);return`<tr><td><b>${esc(i.name)}</b></td><td>${rk(i)}</td><td>${esc(b.batch)}</td><td><span class="tag ${m<0?'ex':''}">${b.exp} ${m<0?'EXPIRED':m==0?'this month':m+' mo left'}</span></td><td>${fq(i,b.qty)}</td><td>${inr(b.qty*b.ptr)}</td><td>${ACL[eRole()].includes('returns')?`<button class=b onclick="prStart('${b.id}')">↩ Return to supplier</button>`:''}</td></tr>`}).join('')}</table>`}</div>`}

// ---------- Order list ----------
function pOrder(){const it=D.items.filter(i=>stockOf(i.id)<=i.reorder);const by={};it.forEach(i=>(by[i.company]=by[i.company]||[]).push(i));
 $('#main').innerHTML=`<div class=card><h3>📝 ${t('Order List')} (low stock)</h3><p class=mut>Medicines at or below their reorder level, grouped by company.</p>${!it.length?'<p class=grn>All stock is fine.</p>':Object.keys(by).sort().map(c=>`<div class=card><b>${esc(c)}</b><table>${by[c].map(i=>`<tr><td>${esc(i.name)}</td><td>${rk(i)}</td><td class=red>${stockOf(i.id)} left</td><td>order ${Math.max(i.reorder*2-stockOf(i.id),1)}</td></tr>`).join('')}</table></div>`).join('')+`<button class=p onclick="waOrder()">📲 Send order list on WhatsApp</button>`}</div>`}
function waOrder(){const it=D.items.filter(i=>stockOf(i.id)<=i.reorder);open('https://wa.me/?text='+encodeURIComponent(`*${D.settings.shop} – Order list ${today()}*\n`+it.map(i=>`${i.name} (${i.company}) – ${Math.max(i.reorder*2-stockOf(i.id),1)}`).join('\n')))}

// ---------- Reports ----------
let RF={from:today().slice(0,8)+'01',to:today()};
function pReports(){const inR=x=>x.date>=RF.from&&x.date<=RF.to,ss=D.sales.filter(inR),sr=D.sreturns.filter(inR),pu=D.purchases.filter(inR),pr=D.preturns.filter(inR);
 const tot=ss.reduce((a,s)=>a+s.total,0),gst=ss.reduce((a,s)=>a+s.gst,0),cost=ss.reduce((a,s)=>a+s.lines.reduce((x,l)=>x+l.qty*l.ptr,0),0);
 const rt=sr.reduce((a,r)=>a+r.amt,0),rg=sr.reduce((a,r)=>a+(r.gst||0),0),rc=sr.reduce((a,r)=>a+r.lines.reduce((x,l)=>x+l.qty*l.ptr,0),0);
 const pur=pu.reduce((a,p)=>a+p.total,0),itc=pu.reduce((a,p)=>a+(p.gst||0),0)-pr.reduce((a,r)=>a+(r.gst||0),0),outg=gst-rg;
 const pay={};ss.forEach(s=>pay[s.pay]=(pay[s.pay]||0)+s.total);const byU={};ss.forEach(s=>byU[s.by||'-']=(byU[s.by||'-']||0)+s.total);
 const udh=custDues().reduce((a,c)=>a+Math.max(c.bal,0),0),sdue=supDues().reduce((a,x)=>a+Math.max(x.bal,0),0);
 $('#main').innerHTML=`<div class=card><h3>📈 ${t('Reports')}</h3><div class=row><label>${t('From')}<input type=date value="${RF.from}" onchange="RF.from=this.value;pReports()"></label><label>${t('To')}<input type=date value="${RF.to}" onchange="RF.to=this.value;pReports()"></label></div></div>
 <div class=kp><div class=card>Net sale<div class=big>${inr(tot-rt)}</div><span class=mut>${ss.length} bills${rt?' · returns '+inr(rt):''}</span></div><div class=card>Profit<div class="big grn">${inr((tot-gst-cost)-(rt-rg-rc))}</div><span class=mut>after discount, free qty and returns</span></div><div class=card>Purchases<div class=big>${inr(pur)}</div><span class=mut>incl. GST</span></div><div class=card>Udhaar to collect<div class="big red">${inr(udh)}</div><span class=mut>supplier dues ${inr(sdue)}</span></div></div><br>
 <div class="card tw"><h3>GST summary</h3><table><tr><th>Output GST (on sales, less returns)</th><th>Input GST / ITC (on purchases, less returns)</th><th>Net GST payable</th></tr><tr><td>${inr(outg)}</td><td>${inr(itc)}</td><td><b class="${outg-itc>0?'red':'grn'}">${inr(outg-itc)}</b></td></tr></table><p class=mut>For guidance only; confirm with your CA before filing.</p><button class=b onclick="gstr1()">⬇ GSTR-1 files (B2CS, HSN, Documents) for this period</button></div>
 <div class=card><b>By payment:</b> ${Object.entries(pay).map(([k,v])=>`${k=='Credit'?'Credit (udhaar)':k}: ${inr(v)}`).join(' · ')||'<span class=mut>No sales in this period.</span>'}<br><b>By user:</b> ${Object.entries(byU).map(([k,v])=>`${esc(k)}: ${inr(v)}`).join(' · ')||'-'}</div>
 <div class="card tw"><table><tr><th>${t('Bill')}</th><th>${t('Date')}</th><th>${t('Customer')}</th><th>${t('Items')}</th><th>${t('Pay')}</th><th>${t('Counter / By')}</th><th>${t('Total')}</th><th></th></tr>${ss.slice().reverse().map(s=>`<tr><td>${bn(s)}</td><td>${s.date} ${s.time}</td><td>${esc(s.cust||'-')}</td><td>${s.lines.length}</td><td>${s.pay}</td><td>${esc(s.device)} · ${esc(s.by||'')}</td><td><b>${inr(s.total)}</b></td><td><button class=b onclick="printBill(D.sales.find(x=>x.id=='${s.id}'),true)">🖨</button></td></tr>`).join('')}</table></div>`}


// ---------- Returns ----------
let SR=null,PR={supplier:'',reason:'Expiry',lines:[]};
const retDone=(sid,k)=>D.sreturns.filter(r=>r.saleId==sid).reduce((a,r)=>a+r.lines.filter(x=>x.k==k).reduce((b,x)=>b+x.qty,0),0);
function pReturns(){const sups=[...new Set(D.purchases.map(p=>p.supplier))].sort();
 const bs=D.batches.filter(b=>b.qty>0).sort((a,b)=>a.exp.localeCompare(b.exp));
 $('#main').innerHTML=`<div class=card><h3>↩️ Sale return <span class=mut>(customer brings medicine back)</span></h3>
 <div class=row><label>${t('Bill')} no.<input id=srn value="${SR?SR.no:''}" onkeydown="if(event.key=='Enter')srLoad()"></label><label>&nbsp;<button class=p onclick="srLoad()">Load bill</button></label></div><div id=srb></div></div>
 <div class=card><h3>📤 Purchase / expiry return <span class=mut>(send back to supplier)</span></h3>
 <div class=row><label>${t('Supplier')}<input id=prs list=supl value="${esc(PR.supplier)}" oninput="PR.supplier=this.value"><datalist id=supl>${sups.map(x=>`<option>${esc(x)}</option>`).join('')}</datalist></label>
 <label>Reason<select onchange="PR.reason=this.value">${['Expiry','Near expiry','Damaged','Wrong item','Other'].map(r=>`<option ${PR.reason==r?'selected':''}>${r}</option>`).join('')}</select></label></div>
 <div class=row><label style="flex:3">${t('Batch')}<select id=prb>${bs.map(b=>{const i=item(b.itemId);return`<option value="${b.id}">${expired(b.exp)?'⚠ ':''}${esc(i.name)} · ${esc(b.batch)} · ${b.exp} · ${fq(i,b.qty)} in stock</option>`}).join('')}</select></label><label>${t('Qty')} (strips)<input id=prq type=number step=.1></label><label>&nbsp;<button class=b onclick="prAdd()">+ Add</button></label></div>
 <div id=prt></div></div>
 <div class="card tw"><h3>Recent returns</h3><table><tr><th>No.</th><th>${t('Date')}</th><th>Type</th><th>Party</th><th>${t('Amount')}</th><th>Mode / reason</th></tr>${[...D.sreturns.map(r=>({...r,ty:'Sale return',party:(r.cust||'Cash')+' (bill '+r.billNo+')',m:r.mode})),...D.preturns.map(r=>({...r,ty:'To supplier',party:r.supplier,m:r.reason}))].sort((a,b)=>(b.date+b.id).localeCompare(a.date+a.id)).slice(0,15).map(r=>`<tr><td>${r.no}</td><td>${r.date}</td><td>${r.ty}</td><td>${esc(r.party)}</td><td>${inr(r.amt)}</td><td>${esc(r.m)}</td></tr>`).join('')}</table></div>`;
 srDraw();prDraw()}
function srLoad(){const n=$('#srn').value.trim(),sl=findBill(n);if(!sl)return alert('Bill not found');SR={id:sl.id,no:bn(sl),q:{}};srDraw()}
function srDraw(){const el=$('#srb');if(!el||!SR)return;const sl=D.sales.find(x=>x.id==SR.id);
 el.innerHTML=`<p><b>Bill ${bn(sl)}</b> · ${sl.date} · ${esc(sl.cust||'Cash')} ${esc(sl.phone||'')} · ${sl.pay} · ${inr(sl.total)}</p><table><tr><th>${t('Medicine')}</th><th>${t('Batch')}</th><th>Sold</th><th>Already returned</th><th>Return now</th></tr>${sl.lines.map((l,k)=>{const dn=retDone(sl.id,k),left=r2(l.qty-dn);return`<tr><td>${esc(l.name)}</td><td>${esc(l.batch)}</td><td>${lq(l)}</td><td>${dn?fq(item(l.itemId),dn):'-'}</td><td>${left>0?`<input type=number step=1 min=0 style="width:80px" value="${SR.q[k]||''}" oninput="SR.q[${k}]=+this.value||0"> <span class=mut>${l.loose?'tab':'strip'} · max ${l.loose?Math.round(left*packOf(item(l.itemId)))+' tab':fq(item(l.itemId),left)}</span>`:'<span class=mut>fully returned</span>'}</td></tr>`}).join('')}</table>
 <div class=row><label>Refund<select id=srm>${sl.pay=='Credit'?'<option>Adjust in udhaar</option>':`<option>Cash refund</option>`}</select></label><label>&nbsp;<button class=p onclick="srSave()">💾 Save return (stock goes back)</button></label></div>`}
function srSave(){const sl=D.sales.find(x=>x.id==SR.id),lines=[];let amt=0;const f=sl.total/(sl.lines.reduce((a,l)=>a+l.amt,0)||1),prev=D.sreturns.filter(r=>r.saleId==sl.id).reduce((a,r)=>a+r.amt,0);
 for(const[k,u]of Object.entries(SR.q)){const l=sl.lines[k],q0=l.loose?u/packOf(item(l.itemId)):u,q=r2(Math.min(q0,l.qty-retDone(sl.id,+k)));if(!(q>0))continue;const a=l.amt*f*q/l.qty;amt+=a;lines.push({k:+k,itemId:l.itemId,name:l.name,batch:l.batch,exp:l.exp,qty:q,amt:a,gst:l.gst,ptr:l.ptr});
  const b=D.batches.find(x=>x.itemId==l.itemId&&x.batch==l.batch);if(b)b.qty=r2(b.qty+q);else D.batches.push({id:uid(),itemId:l.itemId,batch:l.batch,exp:l.exp,qty:q,ptr:l.ptr,cost:l.ptr,mrp:l.mrp})}
 if(!lines.length)return alert('Enter a quantity to return.');
 const allBack=sl.lines.every((l,k)=>r2(l.qty-retDone(sl.id,k)-lines.filter(x=>x.k==k).reduce((a,x)=>a+x.qty,0))<=1e-6);
 amt=allBack?Math.round((sl.total-prev)*100)/100:Math.min(Math.round(amt*100)/100,Math.round((sl.total-prev)*100)/100);
 D.sreturns.push({id:uid(),no:D.sreturns.length+1,date:today(),saleId:sl.id,billNo:bn(sl),cust:sl.cust,phone:sl.phone,lines,amt,gst:lines.reduce((a,x)=>a+x.amt-x.amt/(1+x.gst/100),0),mode:$('#srm').value,by:ME.name});save();
 alert('Return saved: '+inr(amt)+($('#srm').value=='Cash refund'?' – give this cash back.':' – reduced from udhaar.'));SR=null;pReturns()}
function prStart(bid){PR={supplier:'',reason:'Expiry',lines:[]};const b=D.batches.find(x=>x.id==bid),p=D.purchases.slice().reverse().find(p=>p.lines.some(l=>l.itemId==b.itemId&&l.batch==b.batch));if(p)PR.supplier=p.supplier;PR.lines.push({bid,qty:b.qty});go('returns')}
function prAdd(){const bid=$('#prb').value,q=+$('#prq').value,b=D.batches.find(x=>x.id==bid);if(!b||!(q>0))return alert('Choose a batch and qty.');if(q>b.qty+1e-9)return alert('Only '+fq(item(b.itemId),b.qty)+' in stock.');PR.lines.push({bid,qty:q});prDraw()}
function prVal(l){const b=D.batches.find(x=>x.id==l.bid),i=item(b.itemId);return l.qty*b.ptr*(1+(i.gst||0)/100)}
function prDraw(){const el=$('#prt');if(!el)return;if(!PR.lines.length){el.innerHTML='<p class=mut>Add the batches you are sending back. Expired ones are marked ⚠ and listed first.</p>';return}
 el.innerHTML=`<table><tr><th>${t('Medicine')}</th><th>${t('Batch')}</th><th>${t('Exp')}</th><th>${t('Qty')}</th><th>${t('Rate')}</th><th>${t('Value')} (incl. GST)</th><th></th></tr>${PR.lines.map((l,k)=>{const b=D.batches.find(x=>x.id==l.bid),i=item(b.itemId);return`<tr><td>${esc(i.name)}</td><td>${esc(b.batch)}</td><td>${b.exp}</td><td>${fq(i,l.qty)}</td><td>${inr(b.ptr)}</td><td>${inr(prVal(l))}</td><td><button class=x onclick="PR.lines.splice(${k},1);prDraw()">✕</button></td></tr>`}).join('')}</table>
 <div class=tot><span>Credit note value</span><span>${inr(PR.lines.reduce((a,l)=>a+prVal(l),0))}</span></div><button class=p onclick="prSave()">💾 Save return (stock goes down)</button>`}
function prSave(){if(!PR.supplier.trim())return alert('Supplier name is needed.');const lines=[];let amt=0,gst=0;
 for(const l of PR.lines){const b=D.batches.find(x=>x.id==l.bid),i=item(b.itemId),q=r2(Math.min(l.qty,b.qty));if(!(q>0))continue;b.qty=r2(b.qty-q);const tv=q*b.ptr,tx=tv*(i.gst||0)/100;amt+=tv+tx;gst+=tx;lines.push({itemId:i.id,name:i.name,batch:b.batch,exp:b.exp,qty:q,ptr:b.ptr,cost:b.cost??b.ptr,gst:i.gst})}
 if(!lines.length)return;D.preturns.push({id:uid(),no:D.preturns.length+1,date:today(),supplier:PR.supplier.trim(),reason:PR.reason,lines,amt:Math.round(amt*100)/100,gst,by:ME.name});save();
 alert('Return saved. '+inr(amt)+' reduced from '+PR.supplier+' dues.');PR={supplier:'',reason:'Expiry',lines:[]};pReturns()}

// ---------- Dues (udhaar / suppliers) ----------
function custDues(){const m={};const g=(ph,nm)=>m[ph]||(m[ph]={phone:ph,name:nm||'',credit:0,ret:0,paid:0,last:''});
 D.sales.filter(s=>s.pay=='Credit').forEach(s=>{const c=g(ph(s.phone),s.cust);c.credit+=s.total;c.name=s.cust||c.name;if(s.date>c.last)c.last=s.date});
 D.sreturns.filter(r=>r.mode=='Adjust in udhaar').forEach(r=>{g(ph(r.phone),r.cust).ret+=r.amt});
 D.cpays.forEach(p=>{const c=g(ph(p.phone),p.name);c.paid+=p.amt;if(p.date>c.last)c.last=p.date});
 return Object.values(m).map(c=>({...c,bal:Math.round((c.credit-c.ret-c.paid)*100)/100})).sort((a,b)=>b.bal-a.bal)}
function supDues(){const m={};const g=n=>m[n]||(m[n]={name:n,pur:0,paid:0,ret:0});
 D.purchases.forEach(p=>{const x=g(p.supplier);x.pur+=p.total;x.paid+=p.paid||0});D.spays.forEach(p=>g(p.supplier).paid+=p.amt);D.preturns.forEach(r=>g(r.supplier).ret+=r.amt);
 return Object.values(m).map(x=>({...x,bal:Math.round((x.pur-x.paid-x.ret)*100)/100})).sort((a,b)=>b.bal-a.bal)}
function pDues(){const cd=custDues(),sd=supDues(),ct=cd.reduce((a,c)=>a+Math.max(c.bal,0),0),st=sd.reduce((a,x)=>a+Math.max(x.bal,0),0);
 $('#main').innerHTML=`<div class=kp><div class=card>Customers owe you<div class="big red">${inr(ct)}</div><span class=mut>${cd.filter(c=>c.bal>0).length} customers</span></div><div class=card>You owe suppliers<div class=big>${inr(st)}</div><span class=mut>${sd.filter(x=>x.bal>0).length} suppliers</span></div></div><br>
 <div class="card tw"><h3>👥 Customer udhaar</h3><p class=mut>Bills made with Payment = Credit (udhaar) appear here by mobile number.</p>${!cd.length?'<p class=mut>No udhaar yet.</p>':`<table><tr><th>${t('Customer')}</th><th>${t('Mobile')}</th><th>Credit</th><th>Paid / returned</th><th>Balance</th><th>Last</th><th></th></tr>${cd.map(c=>`<tr><td><b>${esc(c.name)}</b></td><td>${esc(c.phone)}</td><td>${inr(c.credit)}</td><td>${inr(c.paid+c.ret)}</td><td class="${c.bal>0?'red':'grn'}"><b>${c.bal<0?inr(-c.bal)+' advance':inr(c.bal)}</b></td><td>${c.last}</td><td>${c.bal>0?`<button class=p onclick="cRecv('${esc(c.phone)}')">Receive</button> <button class=b onclick="cRemind('${esc(c.phone)}')">📲 Remind</button>`:''}</td></tr>`).join('')}</table>`}</div>
 <div class="card tw"><h3>🏭 Supplier dues</h3>${!sd.length?'<p class=mut>No purchases yet.</p>':`<table><tr><th>${t('Supplier')}</th><th>Purchases</th><th>Paid</th><th>Returns</th><th>Balance</th><th></th></tr>${sd.map(x=>`<tr><td><b>${esc(x.name)}</b></td><td>${inr(x.pur)}</td><td>${inr(x.paid)}</td><td>${inr(x.ret)}</td><td class="${x.bal>0?'red':'grn'}"><b>${inr(x.bal)}</b></td><td>${x.bal>0?`<button class=p onclick="sPay('${esc(x.name).replace(/'/g,"\\'")}')">Pay</button>`:''}</td></tr>`).join('')}</table>`}</div>`}
function cRecv(ph){const c=custDues().find(x=>x.phone==ph);const a=Math.round((+prompt(`Amount received from ${c.name} (balance ${inr(c.bal)})`,c.bal)||0)*100)/100;if(!(a>0))return;if(a>c.bal+0.001)return alert('Amount is more than the balance ('+inr(c.bal)+').');const m=prompt('Mode: Cash / UPI / Card','Cash')||'Cash';
 D.cpays.push({id:uid(),date:today(),phone:ph,name:c.name,amt:a,mode:m,by:ME.name});save();alert('Received '+inr(a)+'. New balance '+inr(c.bal-a));pDues()}
function cRemind(ph){const c=custDues().find(x=>x.phone==ph);open('https://wa.me/91'+String(ph).replace(/\D/g,'').slice(-10)+'?text='+encodeURIComponent(`Namaskar ${c.name},\n${D.settings.shop} – your pending amount is ₹${c.bal.toFixed(2)} (as of ${today()}).\nPlease pay at your convenience. Thank you 🙏\n${D.settings.phone}`))}
function sPay(n){const x=supDues().find(y=>y.name==n);const a=Math.round((+prompt(`Amount paid to ${n} (balance ${inr(x.bal)})`,x.bal)||0)*100)/100;if(!(a>0))return;if(a>x.bal+0.001)return alert('Amount is more than the balance ('+inr(x.bal)+').');const m=prompt('Mode: Cash / UPI / Bank / Cheque','Bank')||'Bank';
 D.spays.push({id:uid(),date:today(),supplier:n,amt:a,mode:m,by:ME.name});save();pDues()}


// ---------- Cloud sync (Supabase) ----------
// Every bill / purchase / return / payment is uploaded once as a row that is never edited (append-only).
// Stock is rebuilt from opening stock + all those rows, so two counters can never overwrite each other.
const KINDS={opening:'openings',sale:'sales',purchase:'purchases',sreturn:'sreturns',preturn:'preturns',cpay:'cpays',spay:'spays'};
const SHARED=['shop','addr','phone','gstin','dl','terms','paper'];
const CAN={owner:k=>true,manager:k=>k!='opening',staff:k=>k=='sale'||k=='cpay'};
var CL=JSON.parse(localStorage.asmaCloud||'null'),SY={busy:false,last:'',err:'',t:0,again:false};
const clSave=()=>localStorage.asmaCloud=JSON.stringify(CL);
const strip=o=>{const c={...o};delete c._s;delete c._d;return c};
const pending=()=>Object.values(KINDS).reduce((a,k)=>a+(D[k]||[]).filter(x=>!x._s).length,0)+(CL&&CL.role!='staff'?D.items.filter(i=>i._d).length:0);
function syncPill(){if(!CL||!CL.shop)return'';const p=pending();return`<span class=pill style="background:${SY.err?'#fde8e8':p?'#fff8e1':'#e7f6ec'};color:#333" title="${esc(SY.err)}">☁ ${SY.err?(SY.err=='offline'?'offline':'sync problem'):p?p+' to upload':'synced '+SY.last}</span>`}
async function clAuth(body,grant){const r=await fetch(CL.url+'/auth/v1/token?grant_type='+grant,{method:'POST',headers:{apikey:CL.key,'Content-Type':'application/json'},body:JSON.stringify(body)});const j=await r.json().catch(()=>({}));
 if(!r.ok)throw new Error(j.error_description||j.msg||j.message||'Sign-in failed');CL.at=j.access_token;CL.rt=j.refresh_token;CL.exp=Date.now()+((j.expires_in||3600)-60)*1000;CL.uid=j.user.id;CL.email=j.user.email;clSave()}
async function api(path,opt={}){if(!CL.at||Date.now()>CL.exp)await clAuth({refresh_token:CL.rt},'refresh_token');
 const r=await fetch(CL.url+path,{...opt,headers:{apikey:CL.key,Authorization:'Bearer '+CL.at,'Content-Type':'application/json',...(opt.headers||{})}});const tx=await r.text();let j=null;try{j=tx?JSON.parse(tx):null}catch(e){}
 if(!r.ok)throw new Error((j&&(j.message||j.msg||j.error_description||j.error))||('HTTP '+r.status));return j}
const rpc=(f,b)=>api('/rest/v1/rpc/'+f,{method:'POST',body:JSON.stringify(b)});
const sharedOf=()=>{const o={};SHARED.forEach(k=>o[k]=D.settings[k]??null);return JSON.stringify({s:o})};
const usersOf=()=>JSON.stringify({u:D.users.map(u=>({...u})).sort((a,b)=>a.id<b.id?-1:1),r:D.settings.recH||null});
function rebuild(){const bm={},key=(i,b)=>i+'|'+b,get=l=>bm[key(l.itemId,l.batch)]||(bm[key(l.itemId,l.batch)]={id:uid(),itemId:l.itemId,batch:l.batch,exp:l.exp,qty:0,ptr:l.ptr||0,cost:l.cost??l.ptr??0,mrp:l.mrp||0});
 D.openings.forEach(o=>o.batches.forEach(b=>{const x=get(b);x.qty=r2(x.qty+b.qty);x.exp=b.exp;x.ptr=b.ptr;x.cost=b.cost??b.ptr;x.mrp=b.mrp}));
 const live=a=>a.filter(x=>!x.hist);
 live(D.purchases).forEach(p=>p.lines.forEach(l=>{const x=get(l),nq=l.qty+(l.free||0),c=nq?Math.round(l.ptr*l.qty/nq*100)/100:l.ptr,oq=Math.max(x.qty,0);x.cost=Math.round((x.cost*oq+c*nq)/(oq+nq||1)*100)/100;x.qty=r2(x.qty+nq);if(l.exp)x.exp=l.exp;x.ptr=l.ptr;x.mrp=l.mrp}));
 live(D.sales).forEach(s=>s.lines.forEach(l=>{const x=get(l);x.qty=r2(x.qty-l.qty)}));
 live(D.sreturns).forEach(r=>r.lines.forEach(l=>{const x=get(l);x.qty=r2(x.qty+l.qty)}));
 live(D.preturns).forEach(r=>r.lines.forEach(l=>{const x=get(l);x.qty=r2(x.qty-l.qty)}));
 const old={};D.batches.forEach(b=>old[key(b.itemId,b.batch)]=b.id);D.batches=Object.values(bm).map(b=>({...b,id:old[key(b.itemId,b.batch)]||b.id}))}
function take(e){const col=D[KINDS[e.kind]];if(!col)return false;const ex=col.find(x=>x.id==e.id);if(ex){ex._s=1;return false}col.push({...e.data,_s:1});return true}
function syncSoon(){if(!CL||!CL.shop)return;clearTimeout(SY.t);SY.t=setTimeout(sync,2500)}
async function sync(){if(!CL||!CL.shop)return;if(SY.busy){SY.again=true;return}if(globalThis.navigator&&navigator.onLine===false){SY.err='offline';whoUI();return}
 SY.busy=true;let changed=false;const errs=[];const sh=CL.shop;
 try{
  // 0. current cloud role of this login (owner may have changed or removed it)
  const me=await api(`/rest/v1/members?select=role&shop_id=eq.${sh}&user_id=eq.${CL.uid}`);
  if(!me.length)throw new Error('This login was removed from the shop. Ask the owner.');
  if(me[0].role!=CL.role){CL.role=me[0].role;clSave();changed=true}
  // full reset by the owner (any counter): epoch went up -> clear this computer's business data before uploading anything old
  const ep=(((await api(`/rest/v1/shops?select=epoch&id=eq.${sh}`))||[])[0]||{}).epoch||0;
  if(CL.ep==null){CL.ep=ep;clSave()}else if(ep!=CL.ep){wipeBiz();CL.ep=ep;CL.cur=0;CL.icur='';clSave();changed=true;setTimeout(()=>alert('The owner did a FULL RESET of the shop. Medicines, stock and bills on this computer were cleared.'),0)}
  // rows this login is not allowed to upload never reach the server: take them out of stock and keep them aside
  const rej=[];for(const[kind,col]of Object.entries(KINDS)){if(CAN[CL.role](kind))continue;const bad=D[col].filter(x=>!x._s);if(bad.length){D[col]=D[col].filter(x=>x._s);bad.forEach(x=>rej.push({kind,at:new Date().toISOString(),doc:x}))}}
  if(rej.length){D.rejected=(D.rejected||[]).concat(rej);rebuild();changed=true;setTimeout(()=>alert(rej.length+' entry(s) were made with a higher PIN than this cloud login allows ('+CL.role+'). They were NOT uploaded and were taken out of stock. They are kept in the backup file under "rejected".'),0)}
  // 1. upload new rows, kind by kind (a refused kind does not block the others)
  for(const[kind,col]of Object.entries(KINDS)){const rows=D[col].filter(x=>!x._s);for(let i=0;i<rows.length;i+=200){const part=rows.slice(i,i+200);
   try{await api('/rest/v1/entries?on_conflict=shop_id,id',{method:'POST',headers:{Prefer:'resolution=ignore-duplicates,return=minimal'},body:JSON.stringify(part.map(x=>({id:x.id,shop_id:sh,kind,data:strip(x),device:D.settings.device||''})))});part.forEach(x=>x._s=1)}catch(e){errs.push(kind+': '+e.message);break}}}
  const di=D.items.filter(i=>i._d);if(di.length&&CL.role!='staff'){try{await api('/rest/v1/items?on_conflict=shop_id,id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify(di.map(i=>({shop_id:sh,id:i.id,data:strip(i)})))});di.forEach(i=>delete i._d)}catch(e){errs.push('medicines: '+e.message)}}
  // 2. download rows from other counters
  for(;;){const r=await api(`/rest/v1/entries?select=seq,id,kind,data&shop_id=eq.${sh}&seq=gt.${CL.cur||0}&order=seq.asc&limit=1000`);
   for(const e of r){if(take(e))changed=true;CL.cur=Math.max(CL.cur||0,e.seq)}clSave();if(r.length<1000)break}
  // look back: a row with a smaller seq can become visible after a bigger one (commit order). Re-check the last 500 ids.
  const since=SY.full?new Date(Date.now()-3600e3).toISOString():'1970-01-01T00:00:00Z';
  const back=await api(`/rest/v1/entries?select=seq,id&shop_id=eq.${sh}&seq=gt.${Math.max(0,(CL.cur||0)-500)}&created_at=gte.${encodeURIComponent(since)}&order=seq.asc`);
  const known=new Set();Object.values(KINDS).forEach(k=>D[k].forEach(x=>known.add(x.id)));(D.rejected||[]).forEach(x=>known.add(x.doc.id));
  const miss=back.filter(e=>!known.has(e.id)).map(e=>e.id);
  for(let i=0;i<miss.length;i+=50){const got=await api(`/rest/v1/entries?select=seq,id,kind,data&shop_id=eq.${sh}&id=in.(${miss.slice(i,i+50).map(encodeURIComponent).join(',')})`);got.forEach(e=>{if(take(e))changed=true})}
  SY.full=true;
  const ir=await api(`/rest/v1/items?select=id,data,updated_at&shop_id=eq.${sh}&updated_at=gte.${encodeURIComponent(CL.icur||'1970-01-01T00:00:00Z')}&order=updated_at.asc`);
  for(const e of ir){const k=D.items.findIndex(i=>i.id==e.id);if(k<0){D.items.push(strip(e.data));changed=true}else if(!D.items[k]._d&&JSON.stringify(strip(D.items[k]))!=JSON.stringify(strip(e.data))){D.items[k]=strip(e.data);changed=true}CL.icur=e.updated_at}clSave();
  // 3. shop settings + PIN users (the owner's computer is the source)
  const shop=((await api(`/rest/v1/shops?select=name,settings&id=eq.${sh}`))||[])[0];const loc=sharedOf();
  if(CL.role=='owner'&&!CL.pull&&loc!==CL.setH){await api(`/rest/v1/shops?id=eq.${sh}`,{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({settings:JSON.parse(loc)})});CL.setH=loc}
  else if(shop&&shop.settings&&shop.settings.s){const rem=JSON.stringify({s:shop.settings.s});if(rem!==loc){Object.assign(D.settings,shop.settings.s);changed=true}CL.setH=sharedOf()}
  const lu=usersOf();
  if(CL.role=='owner'&&!CL.pull&&lu!==CL.usH){const rows=D.users.map(u=>({shop_id:sh,id:u.id,role:u.role,data:u})).concat([{shop_id:sh,id:'__rec',role:'owner',data:{recH:D.settings.recH||null}}]);
   await api('/rest/v1/shop_users?on_conflict=shop_id,id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify(rows)});
   for(const id of (CL.uids||[]).filter(id=>!D.users.some(u=>u.id==id)))await api(`/rest/v1/shop_users?shop_id=eq.${sh}&id=eq.${encodeURIComponent(id)}`,{method:'DELETE',headers:{Prefer:'return=minimal'}});
   CL.usH=lu;CL.uids=D.users.map(u=>u.id)}
  else{const ur=await api(`/rest/v1/shop_users?select=id,role,data&shop_id=eq.${sh}`);const us=ur.filter(x=>x.id!='__rec').map(x=>x.data),rc=ur.find(x=>x.id=='__rec');
   if(us.length){const before=usersOf();D.users=us;D.settings.recH=rc?rc.data.recH:null;if(usersOf()!==before){changed=true;if(ME&&!D.users.some(u=>u.id==ME.id&&u.pinH==ME.pinH)){ME=null;sessionStorage.removeItem('uid')}else if(ME)ME=D.users.find(u=>u.id==ME.id)}CL.usH=usersOf();CL.uids=D.users.map(u=>u.id)}}
  if(CL.pull){delete CL.pull;CL.setH=sharedOf();CL.usH=usersOf();CL.uids=D.users.map(u=>u.id)}
  clSave();
  if(changed){rebuild();if(D.settings.series){const mx=Math.max(0,...D.sales.filter(x=>(x.ser||'')==D.settings.series).map(x=>+x.no||0));if(mx>=D.settings.billNo)D.settings.billNo=mx+1}}
  SY.err=errs.join(' · ');SY.last=new Date().toTimeString().slice(0,5);save(1);
  if(changed){if(!ME)pLogin();else if(['stock','expiry','order','reports','dues','returns','search'].includes(cur))go(cur)}
 }catch(e){SY.err=e.message;save(1)}finally{SY.busy=false;whoUI();if(cur=='cloud'&&$('#clst'))$('#clst').innerHTML=clStatus();if(SY.again){SY.again=false;syncSoon()}}}
function clStatus(){if(!CL||!CL.at)return'<span class=mut>Not connected</span>';return`Signed in as <b>${esc(CL.email)}</b>${CL.shop?` · shop <b>${esc(CL.shopName||'')}</b> · cloud role <b>${CL.role}</b> · counter <b>${esc(D.settings.series||'-')}</b><br>Last sync: ${SY.last||'-'} · waiting to upload: ${pending()}${(D.rejected||[]).length?` · <span class=red>not allowed, kept aside: ${D.rejected.length}</span>`:''}${SY.err?`<br><span class=red>⚠ ${esc(SY.err)}</span>`:''}`:''}`}
const CLOUD_DEF={url:'https://oiowfuqtmygebcojnfty.supabase.co',key:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pb3dmdXF0bXlnZWJjb2puZnR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxMjU5OTQsImV4cCI6MjEwODcwMTk5NH0.TXMhqJGfvGog-Z78_js6ZwtlDzgPV_hfw_WWnh_bK3U'};
function pCloud(){const c=CL||{};
 $('#main').innerHTML=`<div class=card><h3>☁️ Cloud sync (Supabase)</h3><p id=clst>${clStatus()}</p>
 <p class=mut>All counters share the same bills, stock, udhaar and medicines. Bills are uploaded once and can never be changed or deleted on the server. Each counter needs its own login and its own counter letter (A, B, C…) so bill numbers never clash. The software still works without internet; it uploads when the internet is back.</p></div>
 ${!c.at?`<div class=card><h3>1. Connect</h3><div class=row><label>Supabase Project URL<input id=c_url value="${esc(c.url||CLOUD_DEF.url)}" placeholder="https://xxxx.supabase.co"></label><label>anon public key<input id=c_key value="${esc(c.key||CLOUD_DEF.key)}"></label></div>
 <div class=row><label>Email<input id=c_em value="${esc(c.email||'')}"></label><label>Password<input id=c_pw type=password></label></div><br>
 <button class=p onclick="clLogin()">Sign in</button> <button class=b onclick="clSignup()">Create new login</button>
 <p class=mut>ASMA MEDICAL cloud is already set up and filled in. Staff/counter: ask the Owner for your email + password, then press <b>Sign in</b>.</p></div>`
 :!c.shop?`<div class=card><h3>2. Shop</h3><div class=row><label>This counter's letter<input id=c_ser maxlength=2 value="${esc(D.settings.series||'A')}" style="text-transform:uppercase"></label></div><div id=c_sh class=mut>Checking…</div><br><button class=b onclick="clOut(1)">Sign out</button></div>`
 :`<div class=card><button class=p onclick="sync()">🔄 Sync now</button> <button class=b onclick="clOut()">Disconnect this computer</button></div>
 ${c.role=='owner'&&ME&&ME.role=='owner'?`<div class=card><h3>Counter / staff logins</h3><p class=mut>Make the login here: type the staff's email, a password (8+ letters) and role, press <b>Create login</b>. Give them that email + password; on their computer they press <b>Sign in</b> on the Sync page. To change a password, type the same email with a new password. New sign-ups from outside are blocked. Server rules: Staff can only make bills and receive udhaar; Manager can also purchase, make returns and edit medicines; only the Owner changes shop settings and logins.</p>
 <div class=row><label>Email<input id=m_em autocomplete=off></label><label>Password<input id=m_pw type=text autocomplete=off placeholder="8+ letters"></label><label>Role<select id=m_ro><option>staff</option><option>manager</option></select></label><label>&nbsp;<button class=p onclick="clAdd()">Create login</button></label></div><div id=c_mem class=mut>Loading…</div></div>`:''}`}`;
 if(c.at&&!c.shop)clShops();if(c.shop&&c.role=='owner'&&ME&&ME.role=='owner')clMembers()}
async function clLogin(){const url=$('#c_url').value.trim().replace(/\/+$/,''),key=$('#c_key').value.trim();if(!/^https:\/\/.+/.test(url)||key.length<20)return alert('Enter the Project URL and anon key');CL={url,key};
 try{await clAuth({email:$('#c_em').value.trim(),password:$('#c_pw').value},'password');pCloud()}catch(e){CL=null;localStorage.removeItem('asmaCloud');alert(e.message)}}
async function clSignup(){const url=$('#c_url').value.trim().replace(/\/+$/,''),key=$('#c_key').value.trim(),em=$('#c_em').value.trim(),pw=$('#c_pw').value;if(!url||!key||!em||pw.length<8)return alert('Enter URL, key, email and a password of at least 8 characters');
 const r=await fetch(url+'/auth/v1/signup',{method:'POST',headers:{apikey:key,'Content-Type':'application/json'},body:JSON.stringify({email:em,password:pw})});const j=await r.json().catch(()=>({}));if(!r.ok){const m=j.msg||j.error_description||j.message||'Sign up failed';return alert(/not allowed|disabled/i.test(m)?'New sign-up is closed for safety. Ask the Owner to create your login (Owner computer → Sync → Create login), then press Sign in.':m)}
 if(j.access_token){CL={url,key,at:j.access_token,rt:j.refresh_token,exp:Date.now()+((j.expires_in||3600)-60)*1000,uid:j.user.id,email:j.user.email};clSave();pCloud()}else alert('Login created. If Supabase sent a confirmation email, open it first, then press Sign in.')}
async function clShops(){try{const ms=await api(`/rest/v1/members?select=shop_id,role,shops(name)&user_id=eq.${CL.uid}`);
 if(ms.length){const cs=await api(`/rest/v1/counters?select=letter,device_id&shop_id=eq.${ms[0].shop_id}`);const mine=cs.find(c=>c.device_id==D.settings.dbId),used=cs.map(c=>c.letter);$('#c_ser').value=mine?mine.letter:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').find(l=>!used.includes(l))}
 $('#c_sh').innerHTML=(ms.map(m=>`<p><button class=p onclick="clJoin('${m.shop_id}','${m.role}','${esc((m.shops||{}).name||'').replace(/'/g,'')}')">⬇ Join "${esc((m.shops||{}).name||'shop')}" as ${m.role}</button><br><span class=mut>This computer's local data is replaced by the shop's cloud data (a backup file is downloaded first).</span></p>`).join(''))+
 (ME&&ME.role=='owner'?`<p><button class=b onclick="clCreate()">⬆ Create shop in cloud from THIS computer's data</button><br><span class=mut>Do this once, on the main computer that has the real data.</span></p>`:'')||'<span class=mut>This login is not added to any shop yet. Ask the Owner to add it.</span>'}catch(e){$('#c_sh').innerHTML='<span class=red>'+esc(e.message)+'</span>'}}
async function clClaim(shop,ser){try{await rpc('claim_counter',{p_shop:shop,p_letter:ser,p_device:D.settings.dbId,p_name:D.settings.device||''});return true}catch(e){alert(e.message);return false}}
function clSer(){const v=($('#c_ser').value||'').trim().toUpperCase();if(!/^[A-Z][A-Z0-9]?$/.test(v)){alert('Counter letter: A, B, C… (one letter)');return null}return v}
async function clCreate(){const ser=clSer();if(!ser)return;if(!confirm('Upload all data of this computer as the shop "'+D.settings.shop+'"?'))return;
 try{const id=await rpc('create_shop',{p_name:D.settings.shop});if(!await clClaim(id,ser))return;CL.shop=id;CL.role='owner';CL.shopName=D.settings.shop;CL.cur=0;CL.icur='';CL.setH='';CL.usH='';CL.uids=[];
  D.settings.series=ser;D.openings=[{id:'open-'+uid(),date:today(),device:D.settings.device,batches:D.batches.filter(b=>b.qty).map(b=>({itemId:b.itemId,batch:b.batch,exp:b.exp,qty:b.qty,ptr:b.ptr,cost:b.cost??b.ptr,mrp:b.mrp}))}];
  ['sales','purchases','sreturns','preturns','cpays','spays'].forEach(k=>D[k].forEach(x=>{x.hist=1;delete x._s}));D.items.forEach(i=>i._d=1);clSave();save(1);await sync();alert(SY.err?'Shop created, but some data did not upload yet: '+SY.err:'Shop created in the cloud.');pCloud()}catch(e){alert(e.message)}}
async function clJoin(id,role,name){const ser=clSer();if(!ser)return;if(!await clClaim(id,ser))return;if(!confirm('Replace ALL local data on this computer with the cloud data of "'+name+'"?'))return;bk();
 const keep={device:D.settings.device,series:ser,dbId:D.settings.dbId,billNo:1,packV:D.settings.packV,lastBackup:D.settings.lastBackup};
 D.items=[];D.batches=[];Object.values(KINDS).forEach(k=>D[k]=[]);D.settings={...D.settings,...keep};
 CL.shop=id;CL.role=role;CL.shopName=name;CL.cur=0;CL.icur='';CL.setH=sharedOf();CL.usH='';CL.uids=[];CL.pull=1;clSave();save(1);await sync();
 alert(SY.err?'Joined, but: '+SY.err:'Joined. Log in with your PIN.');logout()}
async function clOut(q){if(!q){if(!confirm('Disconnect this computer from the cloud? Local data stays.'))return;if(!(ME&&ME.role=='owner'&&CL.role=='owner')){const pw=prompt('Password of the cloud login '+CL.email+':');if(!pw)return;try{await clAuth({email:CL.email,password:pw},'password')}catch(e){return alert('Wrong password')}}}CL=null;localStorage.removeItem('asmaCloud');whoUI();pCloud()}
async function clMembers(){try{const ms=await api(`/rest/v1/members?select=email,role&shop_id=eq.${CL.shop}&order=created_at`);$('#c_mem').innerHTML=`<table><tr><th>Email</th><th>Role</th><th></th></tr>${ms.map(m=>`<tr><td>${esc(m.email||'')}</td><td>${m.role}</td><td>${m.email&&m.email!=CL.email?`<button class=x onclick="clRemove('${esc(m.email)}')">Remove</button>`:''}</td></tr>`).join('')}</table>`}catch(e){$('#c_mem').innerHTML='<span class=red>'+esc(e.message)+'</span>'}}
async function clAdd(){const em=$('#m_em').value.trim(),pw=$('#m_pw').value;if(!em)return alert('Enter email');if(pw&&pw.length<8)return alert('Password must be at least 8 characters');try{await rpc('create_login',{p_shop:CL.shop,p_email:em,p_password:pw||null,p_role:$('#m_ro').value});alert('Login ready: '+em+(pw?'\nPassword: '+pw:'')+'\nOn the counter computer: Sync → Sign in.');$('#m_em').value='';$('#m_pw').value='';clMembers()}catch(e){alert(e.message)}}
async function clRemove(em){if(!confirm('Remove '+em+'?'))return;try{await rpc('remove_member',{p_shop:CL.shop,p_email:em});clMembers()}catch(e){alert(e.message)}}
setInterval(()=>{if(CL&&CL.shop)sync()},30000);if(globalThis.addEventListener)addEventListener('online',()=>syncSoon());

// ---------- Settings ----------
function pSettings(){const s=D.settings;
 $('#main').innerHTML=`<div class=card><h3>⚙️ ${t('Settings')}</h3><div class=row>${[['shop','Shop name'],['addr','Address'],['phone','Phone'],['gstin','GSTIN'],['dl','Drug licence no.'],['terms','Bill footer note'],['device','This computer name (Counter 1, Counter 2…)']].map(([k,n])=>`<label>${n}<input id=s_${k} value="${esc(s[k])}"></label>`).join('')}</div><br><button class=p onclick="stSave()">💾 Save</button></div>
 <div class=card><h3>🖨 Bill print</h3><div class=row><label>Paper size<select onchange="setPaper(this.value)">${[['a4x2','A4 – 2 copies (customer + shop), cut in half'],['a5','A5 paper (half page)'],['a4','A4 full page (long bills)'],['t80','80 mm thermal roll']].map(([v,n])=>`<option value=${v} ${(D.settings.paper||'a5')==v?'selected':''}>${n}</option>`).join('')}</select></label><label>&nbsp;<button class=b onclick="reprint()">🖨 Test print last bill</button></label></div></div>
 <div class=card><h3>👥 Users (multi-login)</h3><p class=mut>Owner: everything · Manager: everything except Settings · Staff: Search, Bill, Expiry only. Every bill saves who made it.</p>
 <table><tr><th>${t('Name')}</th><th>${t('Role')}</th><th>${t('PIN')}</th><th></th></tr>${D.users.map(u=>`<tr><td>${esc(u.name)}</td><td>${u.role}</td><td>••••</td><td><button class=b onclick="uPin('${u.id}')">Change PIN</button> ${u.id!=ME.id?`<button class=x onclick="uDel('${u.id}')">✕</button>`:''}</td></tr>`).join('')}</table><br>
 <div class=row><label>${t('Name')}<input id=un></label><label>${t('Role')}<select id=ur><option>staff</option><option>manager</option><option>owner</option></select></label><label>${t('PIN (4–6 digits)')}<input id=upn inputmode=numeric maxlength=6></label><label>&nbsp;<button class=p onclick="uAdd()">+ Add user</button></label></div></div>
 <div class=card><h3>Backup</h3><p>${AB.ok?`<b class=grn>✅ Auto backup is ON</b> – saved a few seconds after every change into the <b>backups</b> folder next to app.py (last: ${localStorage.asmaAB||AB.last}). A new copy every hour is kept for 60 days; a smaller or empty copy never replaces a bigger one. Tip: put this folder in Google Drive for desktop to keep a copy online.`:(AB.err?`<b class=red>⚠ Last auto backup was refused: ${esc(AB.err.slice(0,120))}</b>`:`<b class=red>⚠ Auto backup is OFF</b> – start the software with <b>START.bat</b> or <b>python app.py</b> to turn it on.`)}</p><p class=mut>Data lives on this computer. Also download a backup to a pen drive regularly (last download: ${D.settings.lastBackup||'never'}). PINs are stored as secure hashes, never as plain numbers.</p><button class=b onclick="bk()">⬇ Download backup</button> <button class=b onclick="makeRec()">🔑 ${D.settings.recH?'Make new':'Make'} Owner recovery key</button> <label class=b style="display:inline-block;padding:10px 16px;border-radius:8px;cursor:pointer;font-size:15px;color:var(--n);font-weight:600">⬆ Restore<input type=file accept=.json hidden onchange="rs(this.files[0])"></label></div>
 <div class=card style="border:2px solid var(--r)"><h3 class=red>Demo reset</h3><button class=b onclick="if(prompt('Type RESET to reload demo medicines')==='RESET'){if(CL&&CL.shop)return alert('Disconnect from the cloud first.');wipeLocal().then(()=>location.reload())}">Reload demo data</button> <button class=x onclick="startReal()">🏁 Start real shop (remove demo data)</button> <button class=x onclick="fullReset()">🧹 Full reset (all counters)</button></div>
 <p class=mut style="text-align:center">Software by UltraAccounting · 7602292599 · Demo v${VER}</p>`}
async function uAdd(){const n=$('#un').value.trim(),p=$('#upn').value.trim();if(!n||!/^\d{4,6}$/.test(p))return alert('Name and a 4–6 digit PIN are needed.');const u={id:uid(),name:n,role:$('#ur').value};u.pinH=await hashPin(u,p);D.users.push(u);save();pSettings()}
function uDel(id){if(!confirm('Remove this user?'))return;D.users=D.users.filter(u=>u.id!=id);save();pSettings()}
async function uPin(id){const p=prompt('New PIN (4–6 digits)');if(p==null)return;if(!/^\d{4,6}$/.test(p))return alert('4–6 digits only');const u=D.users.find(u=>u.id==id);u.pinH=await hashPin(u,p);save();alert('PIN changed')}
function setPaper(v){D.settings.paper=v;save()}
function setPack(id){const i=item(id),v=prompt(`${i.name}\nLook at the real strip. How many tablets/capsules in ONE strip?`,packOf(i));if(v==null)return;const n=Math.floor(+v);if(!(n>=1))return alert('Enter a number');i.pack=n;i.packOk=true;i.packUser=true;i._d=1;save();go(cur)}
function stSave(){['shop','addr','phone','gstin','dl','terms','device'].forEach(k=>D.settings[k]=$('#s_'+k).value.trim());save();netUI();alert('Saved')}
function dl(name,txt){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+txt],{type:'text/csv'}));a.download=name;a.click()}
const csv=rows=>rows.map(r=>r.map(c=>{c=String(c??'');return /[",\n]/.test(c)?'"'+c.replace(/"/g,'""')+'"':c}).join(',')).join('\r\n');
function gstr1Data(from,to){const inR=x=>x.date>=from&&x.date<=to,r2=x=>Math.round(x*100)/100,rate={},hsn={};
 const add=(l,sg,amt,isB2b)=>{const g=+l.gst||0,tv=amt/(1+g/100),tx=amt-tv,i=item(l.itemId)||{},h=String(i.hsn||'3004');if(!isB2b)rate[g]=(rate[g]||0)+sg*tv;
  const k=h+'|'+g,o=hsn[k]||(hsn[k]={h,g,d:'',q:0,v:0,tv:0,tx:0});if(!o.d)o.d=(i.cat||'Medicines');o.q+=sg*(+l.qty||0);o.v+=sg*amt;o.tv+=sg*tv;o.tx+=sg*tx};
 const ss=D.sales.filter(inR),b2b=[],fd=d=>{const[y,m,dd]=d.split('-');return dd+'-'+['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m-1]+'-'+y};
 ss.forEach(s=>{const sum=s.lines.reduce((a,l)=>a+l.amt,0)||1,f=s.total/sum;if(s.gstin){const br={};s.lines.forEach(l=>{const g=+l.gst||0;br[g]=(br[g]||0)+l.amt*f/(1+g/100)});Object.entries(br).forEach(([g,tv])=>b2b.push([s.gstin,s.cust||'',bn(s),fd(s.date),r2(s.total),'19-West Bengal','N','','Regular B2B','',r2(+g),r2(tv),0]))}s.lines.forEach(l=>add(l,1,l.amt*f,!!s.gstin))});
 const cdn=[];D.sreturns.filter(inR).forEach(r=>{const sl=D.sales.find(s=>s.id==r.saleId);r.lines.forEach(x=>{const l=sl&&sl.lines[x.k]||x;add({...l,gst:x.gst??l.gst,qty:x.qty},-1,x.amt,!!(sl&&sl.gstin))});if(sl&&sl.gstin){const br={};r.lines.forEach(x=>{const g=+x.gst||0;br[g]=(br[g]||0)+x.amt/(1+g/100)});Object.entries(br).forEach(([g,tv])=>cdn.push([sl.gstin,sl.cust||'','CN-'+r.no,fd(r.date),'C','19-West Bengal','N','Regular B2B',r2(r.amt),'',r2(+g),r2(tv),0]))}});
 const ser={};ss.forEach(s=>{const k=s.ser||'';(ser[k]=ser[k]||[]).push(+s.no)});
 return{b2b,cdn,b2cs:Object.entries(rate).filter(([g,v])=>Math.abs(v)>=.01).map(([g,v])=>['OE','19-West Bengal',r2(+g),'',r2(v),0,'']),
  hsn:Object.values(hsn).filter(o=>Math.abs(o.v)>=.01).map(o=>[o.h,o.d,'NOS-NUMBERS',r2(o.q),r2(o.v),r2(o.tv),0,r2(o.tx/2),r2(o.tx/2),0,o.g]),
  docs:Object.entries(ser).map(([k,ns])=>{ns.sort((a,b)=>a-b);return['Invoices for outward supply',(k?k+'-':'')+ns[0],(k?k+'-':'')+ns[ns.length-1],ns.length,Math.max(0,ns[ns.length-1]-ns[0]+1-ns.length)]})}}
function gstr1(){const g=gstr1Data(RF.from,RF.to),tag=RF.from+'_to_'+RF.to;
 dl('b2cs_'+tag+'.csv',csv([['Type','Place Of Supply','Rate','Applicable % of Tax Rate','Taxable Value','Cess Amount','E-Commerce GSTIN'],...g.b2cs]));
 setTimeout(()=>dl('hsn_'+tag+'.csv',csv([['HSN','Description','UQC','Total Quantity','Total Value','Taxable Value','Integrated Tax Amount','Central Tax Amount','State/UT Tax Amount','Cess Amount','Rate'],...g.hsn])),400);
 if(g.b2b.length)setTimeout(()=>dl('b2b_'+tag+'.csv',csv([['GSTIN/UIN of Recipient','Receiver Name','Invoice Number','Invoice date','Invoice Value','Place Of Supply','Reverse Charge','Applicable % of Tax Rate','Invoice Type','E-Commerce GSTIN','Rate','Taxable Value','Cess Amount'],...g.b2b])),1200);
 if(g.cdn.length)setTimeout(()=>dl('cdnr_'+tag+'.csv',csv([['GSTIN/UIN of Recipient','Receiver Name','Note Number','Note Date','Note Type','Place Of Supply','Reverse Charge','Note Supply Type','Note Value','Applicable % of Tax Rate','Rate','Taxable Value','Cess Amount'],...g.cdn])),1600);
 setTimeout(()=>dl('docs_'+tag+'.csv',csv([['Nature of Document','Sr. No. From','Sr. No. To','Total Number','Cancelled'],...g.docs])),800);
 alert((3+(g.b2b.length?1:0)+(g.cdn.length?1:0))+' files downloaded for GSTR-1: B2CS (customers without GSTIN), HSN, Documents'+(g.b2b.length?', B2B (GSTIN bills)':'')+(g.cdn.length?', CDNR (returns on GSTIN bills)':'')+'. Returns on normal bills are already subtracted. Give them to your CA or import in the GST offline tool.')}
function bk(){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(D)],{type:'application/json'}));a.download='asma-backup-'+today()+'.json';a.click();D.settings.lastBackup=today();save();go(cur)}
function rs(f){if(!f)return;f.text().then(x=>{const d=JSON.parse(x);if(!d.items)return alert('Not a valid backup');if(CL&&CL.shop)return alert('This computer is connected to the cloud. Disconnect it on the Sync page first.');if(!confirm('Replace all data with this backup?'))return;D=d;persist().then(()=>location.reload())})}

const DEV=()=>`<div class=card style="max-width:520px;margin:16px auto;text-align:center;border:2px solid #0b7a3b">
 <div class=mut>${t('Built and run by')}</div><h3 style="margin:4px 0">UltraAccounting <span style="font-weight:400;color:#555">/ SK Nuruddin</span></h3>
 <div class=mut>Want software like this for your business? Pharmacy · Petrol pump · Clinic · Court · Accounts — Chanchal, Malda${L2('<br>আপনার ব্যবসার জন্য এমন সফটওয়্যার চান?','<br>अपने व्यापार के लिए ऐसा सॉफ्टवेयर चाहिए?')}</div><br>
 <a style="display:inline-block;background:#14305c;color:#fff;text-decoration:none;padding:10px 16px;border-radius:8px;font-weight:700" href="tel:+917602292599">📞 Call 7602292599</a> <a style="display:inline-block;background:#0b7a3b;color:#fff;text-decoration:none;padding:10px 16px;border-radius:8px;font-weight:700" target=_blank href="https://wa.me/917602292599?text=${encodeURIComponent('UltraAccounting: I would like a demo of software like ASMA MEDICAL')}">💬 WhatsApp</a></div>`;
const HELP=[["🔐", "Login", "Select your name, type your PIN and press Enter. Press Logout at the top when you finish. Forgot your PIN? Ask the Owner to set a new one in Settings → Users.", "নিজের নাম বেছে PIN লিখে Enter চাপুন। কাজ শেষে উপরে Logout চাপুন। PIN ভুলে গেলে মালিককে বলুন, তিনি Settings → Users থেকে নতুন PIN দেবেন।", "अपना नाम चुनें, PIN लिखें और Enter दबाएँ। काम खत्म होने पर ऊपर Logout दबाएँ। PIN भूल गए तो मालिक से कहें, वे Settings → Users में नया PIN देंगे।"], ["🧾", "Making a bill (keyboard only)", "Press F2 → type 2–3 letters of the medicine → choose with ↑↓ → Enter → type qty → Enter → next medicine. When done, press Enter in the empty box to Save & Print. F9 saves only, F11 sends on WhatsApp. Ctrl+Del removes the last line.", "F2 চাপুন → ওষুধের নামের ২–৩টি অক্ষর লিখুন → ↑↓ দিয়ে বাছুন → Enter → পরিমাণ লিখুন → Enter → পরের ওষুধ। শেষে খালি বক্সে Enter চাপলে সেভ ও প্রিন্ট। F9 শুধু সেভ, F11 হোয়াটসঅ্যাপ। Ctrl+Del শেষ লাইন মুছে দেয়।", "F2 दबाएँ → दवा के नाम के 2–3 अक्षर लिखें → ↑↓ से चुनें → Enter → मात्रा लिखें → Enter → अगली दवा। अंत में खाली बॉक्स में Enter दबाने पर सेव और प्रिंट। F9 सिर्फ सेव, F11 व्हाट्सऐप। Ctrl+Del आखिरी लाइन हटाता है।"], ["🔍", "Finding a medicine", "Press F1 and type a name, salt or company. Each medicine shows its side (East/West/North/South) and rack number, plus other brands with the same salt.", "F1 চাপুন, নাম, সল্ট বা কোম্পানি লিখুন। প্রতিটি ওষুধ কোন দিকে (পূর্ব/পশ্চিম/উত্তর/দক্ষিণ) কোন র‍্যাকে আছে দেখাবে, একই সল্টের অন্য ব্র্যান্ডও দেখাবে।", "F1 दबाएँ, नाम, सॉल्ट या कंपनी लिखें। हर दवा किस तरफ (पूर्व/पश्चिम/उत्तर/दक्षिण) और किस रैक में है दिखेगा, साथ में उसी सॉल्ट की दूसरी दवाएँ भी।"], ["📦", "Stock arrived (Purchase)", "Press F3 → supplier and bill no. → choose medicine → batch, expiry, qty, rate, MRP → Add → Save. Stock goes up automatically. For a new medicine, also fill its side and rack.", "F3 → সাপ্লায়ার ও বিল নং → ওষুধ বাছুন → ব্যাচ, মেয়াদ, পরিমাণ, রেট, এমআরপি → Add → Save। স্টক নিজে থেকেই বাড়বে। নতুন ওষুধ হলে দিক ও র‍্যাকও দিন।", "F3 → सप्लायर और बिल नं. → दवा चुनें → बैच, एक्सपायरी, मात्रा, रेट, एमआरपी → Add → Save। स्टॉक अपने आप बढ़ जाएगा। नई दवा हो तो तरफ और रैक भी भरें।"], ["⏰", "Expiry and Order List", "F6 Expiry shows medicines expiring within 90 days in red/yellow: sell or return those first. F7 Order List shows low-stock medicines; send it to the supplier on WhatsApp.", "F6 মেয়াদ: ৯০ দিনের মধ্যে মেয়াদ শেষ হবে এমন ওষুধ লাল/হলুদে দেখায়, আগে সেগুলো বিক্রি বা ফেরত দিন। F7 অর্ডার তালিকা: কম স্টকের ওষুধ, হোয়াটসঅ্যাপে সাপ্লায়ারকে পাঠান।", "F6 एक्सपायरी: 90 दिन में खत्म होने वाली दवाएँ लाल/पीले में दिखती हैं, पहले उन्हें बेचें या लौटाएँ। F7 ऑर्डर सूची: कम स्टॉक वाली दवाएँ, व्हाट्सऐप से सप्लायर को भेजें।"], ["📈", "Reports and Backup", "F8 Reports shows today's sales, by user and by payment type. The Owner should download a Backup from Settings every day so data is never lost.", "F8 রিপোর্টে আজকের বিক্রি, ব্যবহারকারী ও পেমেন্ট অনুযায়ী হিসাব। মালিক রোজ Settings থেকে Backup ডাউনলোড করুন, যাতে ডেটা কখনো না হারায়।", "F8 रिपोर्ट में आज की बिक्री, यूज़र और पेमेंट के हिसाब से। मालिक रोज़ Settings से Backup डाउनलोड करें, ताकि डेटा कभी न खोए।"], ["🌐", "No internet?", "Billing keeps working without internet. \"Offline\" shows at the top; nothing to worry about.", "নেট না থাকলেও বিল চলবে। উপরে \"Offline\" দেখাবে, চিন্তার কিছু নেই।", "इंटरनेट न हो तब भी बिल चलता रहेगा। ऊपर \"Offline\" दिखेगा, चिंता की कोई बात नहीं।"], ["💊", "Loose tablets", "In the bill, type 5 for 5 strips or 5L for 5 loose tablets. Set 'Tablets per strip' when adding a medicine. Stock shows like '24 + 7 loose'.", "বিলে 5 লিখলে ৫ স্ট্রিপ, 5L লিখলে ৫টি খোলা ট্যাবলেট। ওষুধ যোগ করার সময় 'Tablets per strip' দিন।", "बिल में 5 लिखें तो 5 स्ट्रिप, 5L लिखें तो 5 खुली गोलियाँ। दवा जोड़ते समय 'Tablets per strip' भरें।"], ["💰", "Udhaar (credit) and supplier dues", "Choose Payment = Credit (udhaar) with customer name and mobile. The Dues page shows who owes how much; press Receive when they pay, or Remind to send a WhatsApp. Supplier dues come from purchases minus payments and returns.", "Payment-এ Credit (udhaar) বেছে গ্রাহকের নাম ও মোবাইল দিন। Dues পাতায় কার কত বাকি দেখাবে; টাকা দিলে Receive চাপুন, Remind চাপলে হোয়াটসঅ্যাপ যাবে।", "Payment में Credit (udhaar) चुनें और ग्राहक का नाम व मोबाइल भरें। Dues पेज पर किसका कितना बकाया है दिखेगा; पैसा मिलने पर Receive दबाएँ, Remind से व्हाट्सऐप जाएगा।"], ["↩️", "Returns", "Sale return: open Returns, type the bill no., enter the qty coming back, choose Cash refund or Adjust in udhaar. Stock goes back to the same batch. Supplier return: choose supplier and batch (expired ones first) and save; it reduces the supplier's dues.", "বিক্রি ফেরত: Returns-এ বিল নং দিন, কত ফেরত লিখুন, নগদ ফেরত বা বাকিতে বাদ বেছে নিন। সাপ্লায়ার ফেরত: সাপ্লায়ার ও ব্যাচ বেছে সেভ করুন।", "बिक्री वापसी: Returns में बिल नं. डालें, वापसी मात्रा लिखें, नकद वापसी या बकाया में घटाएँ चुनें। सप्लायर वापसी: सप्लायर और बैच चुनकर सेव करें।"], ["☁️", "Cloud sync (many counters)", "Owner: Sync page → connect Supabase → Create shop (main computer, letter A). Other counters: create their own login, Owner adds it, then Join with letter B, C… Bills show like A-105, B-37. Works offline and uploads later. Full steps: supabase/SETUP.txt.", "Owner: Sync পাতা → Supabase যুক্ত করুন → Create shop (মূল কম্পিউটার, অক্ষর A)। অন্য কাউন্টার: নিজের লগইন বানান, Owner যোগ করবে, তারপর B, C… অক্ষরে Join করুন। ইন্টারনেট ছাড়াও চলে, পরে আপলোড হয়।", "Owner: Sync पेज → Supabase जोड़ें → Create shop (मुख्य कंप्यूटर, अक्षर A)। दूसरे काउंटर: अपना लॉगिन बनाएँ, Owner जोड़ेगा, फिर B, C… अक्षर से Join करें। इंटरनेट के बिना भी चलता है, बाद में अपलोड होता है।"]];
const SC=[["F1", "Search", "খুঁজুন", "खोजें"], ["F2", "New Bill", "নতুন বিল", "नया बिल"], ["F3", "Purchase", "কেনা", "खरीद"], ["F4", "Stock", "স্টক", "स्टॉक"], ["F6", "Expiry", "মেয়াদ", "एक्सपायरी"], ["F7", "Order List", "অর্ডার তালিকা", "ऑर्डर सूची"], ["F8", "Reports", "রিপোর্ট", "रिपोर्ट"], ["Enter", "Next field / add medicine", "পরের ঘর / ওষুধ যোগ", "अगला खाना / दवा जोड़ें"], ["Empty box + Enter", "Save & Print", "সেভ ও প্রিন্ট", "सेव और प्रिंट"], ["F10 / Ctrl+S", "Save & Print", "সেভ ও প্রিন্ট", "सेव और प्रिंट"], ["F9", "Save only", "শুধু সেভ", "सिर्फ सेव"], ["F11", "Save & WhatsApp", "সেভ ও হোয়াটসঅ্যাপ", "सेव और व्हाट्सऐप"], ["Alt+C / M / P / D", "Customer / Mobile / Payment / Discount", "গ্রাহক / মোবাইল / পেমেন্ট / ছাড়", "ग्राहक / मोबाइल / पेमेंट / छूट"], ["Ctrl+Del", "Remove last line", "শেষ লাইন মুছুন", "आखिरी लाइन हटाएँ"], ["Esc", "Back to search box", "সার্চ বক্সে ফিরুন", "सर्च बॉक्स पर वापस"], ["Ctrl+P", "Reprint last bill", "শেষ বিল আবার প্রিন্ট", "आखिरी बिल दोबारा प्रिंट"], ["Alt+R", "Reprint by bill no.", "বিল নং দিয়ে আবার প্রিন্ট", "बिल नं. से दोबारा प्रिंट"], ["Alt+H", "Help", "সাহায্য", "सहायता"]];
function pHelp(){$('#main').innerHTML=`<div class=card><h3>❓ ${t('Help')}</h3><p class=mut>Stuck? Look here. Press <b>Alt+H</b> on any page to open this.${L2('<br>আটকে গেলে এখানে দেখুন। যেকোনো পাতায় Alt+H চাপুন।','<br>कुछ समझ न आए तो यहाँ देखें। किसी भी पेज पर Alt+H दबाएँ।')}</p><div class=card style="border-left:4px solid var(--g)"><h3>🔑 PIN or password? / নতুন কম্পিউটার</h3><p><b>PIN (4–6 digits)</b> – every day, to open the software. Each person has their own PIN. New staff on the same computer: Settings → Users → name, role, PIN. No password needed.</p><p><b>Cloud password (8+ letters)</b> – only on the <b>Sync</b> page, with the shop Gmail: when you join a new computer/phone, or after Sign out.</p><p><b>New computer or phone:</b> 1) On the Owner computer: Sync → Counter / staff logins → email + password + role → Create login. 2) On the new device: open asma-medical.onrender.com → Sync → type that email + password → Sign in → counter letter B, C… Same PINs work there.</p><p class=mut>Forgot Owner PIN: login page → Forgot Owner PIN → recovery key. Help: UltraAccounting 7602292599.</p></div>
 <input id=hq placeholder="Search help (bill, expiry, PIN...)" oninput="hF()"></div><div id=hl></div>
 <div class=card><h3>⌨ ${t('All shortcuts')}</h3><table>${SC.map(r=>`<tr><td><b>${r[0]}</b></td><td>${r[1]}${L2(`<small class=l2>${r[2]}</small>`,`<small class=l2>${r[3]}</small>`)}</td></tr>`).join('')}</table></div>${DEV()}`;hF();$('#hq').focus()}
function hF(){const q=($('#hq').value||'').toLowerCase();$('#hl').innerHTML=HELP.filter(h=>!q||h.join(' ').toLowerCase().includes(q)).map(h=>`<div class=card><h3>${h[0]} ${h[1]}</h3><p>${h[2]}</p>${L2(`<p class=l2p>${h[3]}</p>`,`<p class=l2p>${h[4]}</p>`)}</div>`).join('')||'<div class=card>Nothing found. Call the developer below.</div>'}
const FK={F1:'search',F2:'bill',F3:'purchase',F4:'stock',F6:'expiry',F7:'order',F8:'reports'};
addEventListener('focusin',e=>{const t=e.target;if(t&&t.tagName=='INPUT'&&!t.hasAttribute('autocomplete')&&t.type!='password')t.setAttribute('autocomplete','off')});
addEventListener('keydown',e=>{if(!ME)return;
 if(e.ctrlKey&&e.key.toLowerCase()=='p'){e.preventDefault();return reprint()}
 if(e.altKey&&e.key.toLowerCase()=='r'){e.preventDefault();return reprintNo()}
 if(e.altKey&&e.key.toLowerCase()=='h'){e.preventDefault();return go('help')}
 if(FK[e.key]){e.preventDefault();return go(FK[e.key])}
 if(cur!='bill')return;
 if(e.key=='F10'||(e.ctrlKey&&e.key.toLowerCase()=='s')){e.preventDefault();return bSave(1)}
 if(e.key=='F9'){e.preventDefault();return bSave(0)}
 if(e.key=='F11'){e.preventDefault();return bSave(2)}
 if(e.ctrlKey&&e.key=='Delete'){e.preventDefault();B.lines.pop();bDraw();return $('#bi').focus()}
 if(e.key=='Escape'&&document.activeElement.id!='bi'){e.preventDefault();return $('#bi').focus()}
 if(e.altKey){const m={c:'#bc',m:'#bp',o:'#bdr',p:'#bpay',d:'#bd'}[e.key.toLowerCase()];if(m){e.preventDefault();$(m).focus();$(m).select&&$(m).select()}}});
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js?v='+VER);
if(navigator.storage&&navigator.storage.persist)navigator.storage.persist();
$('#lng').value=L;netUI();whoUI();migratePins().then(()=>ME?go(ACL[eRole()][0]):pLogin());

// ---------- Barcode: camera scan (phone) + GS1 ----------
function gs1(v){v=String(v||'').replace(/^\]d2|^\]C1|^\]Q3/,'');const o={};
 if(/\(\d{2,4}\)/.test(v)){v.replace(/\((\d{2,4})\)([^(]*)/g,(m,a,b)=>{o[a]=b.trim()})}
 else if(/^01\d{14}/.test(v)){let s=v,G='\x1d';while(s.length){const a=s.slice(0,2);if(a=='01'){o['01']=s.slice(2,16);s=s.slice(16)}else if(a=='17'||a=='15'||a=='11'){o[a]=s.slice(2,8);s=s.slice(8)}else if(a=='10'||a=='21'){const e=s.indexOf(G,2);o[a]=s.slice(2,e<0?undefined:e);s=e<0?'':s.slice(e+1)}else break}}
 if(!o['01'])return null;const r={gtin:o['01'],batch:o['10']||''};if(o['17'])r.exp='20'+o['17'].slice(0,2)+'-'+o['17'].slice(2,4);return r}
function bcLookup(v){v=String(v||'').trim();const g=gs1(v);let i=byBc(v);if(!i&&g)i=byBc(g.gtin)||byBc(g.gtin.replace(/^0/,''));return{i,g}}
function camScan(cb){if(!globalThis.isSecureContext)return alert('Camera works only on https (Render link) or on this computer (START.bat / localhost).');
 if(!('BarcodeDetector' in globalThis))return alert('This browser cannot read barcodes with the camera. Use Chrome on an Android phone, or a USB barcode scanner.');
 const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;background:#000d;z-index:99;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px';
 ov.innerHTML='<video playsinline muted style="max-width:95vw;max-height:70vh;border:3px solid #2e7d32;border-radius:10px"></video><div style="color:#fff">Hold the barcode inside the box</div><button class=b>✕ Close</button>';document.body.appendChild(ov);
 const vid=ov.querySelector('video');let st=null,done=false;const stop=()=>{done=true;st&&st.getTracks().forEach(t=>t.stop());ov.remove()};ov.querySelector('button').onclick=stop;
 navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}}).then(async s=>{st=s;vid.srcObject=s;await vid.play();
  let det;try{det=new BarcodeDetector({formats:['ean_13','ean_8','upc_a','upc_e','code_128','code_39','qr_code','data_matrix']})}catch(e){det=new BarcodeDetector()}
  const loop=async()=>{if(done)return;try{const r=await det.detect(vid);if(r.length){const v=r[0].rawValue;stop();navigator.vibrate&&navigator.vibrate(80);return cb(v)}}catch(e){}setTimeout(loop,200)};loop()})
 .catch(e=>{stop();alert('Camera not allowed: '+e.message)})}
function billScan(v){const{i}=bcLookup(v);if(i)addLine(i.id);else alert('No medicine has barcode '+v+'. Add it in Stock → Edit → Barcode.')}
function puScan(v){const{i,g}=bcLookup(v);if(!i)return alert('No medicine has barcode '+v+'. Add it in Stock → Edit → Barcode (or import the supplier file).');
 $('#pi').value=i.id;puPick();if(g&&g.batch)$('#pb').value=g.batch;if(g&&g.exp)$('#pe').value=g.exp;const s=$('#pscan');if(s)s.value='';(g&&g.batch&&g.exp?$('#pq'):$('#pb')).focus()}

// ---------- Supplier file import (Excel .xlsx / CSV) ----------
async function inflate(u8){const ds=new DecompressionStream('deflate-raw');return new Uint8Array(await new Response(new Blob([u8]).stream().pipeThrough(ds)).arrayBuffer())}
async function unzip(buf){const u=new Uint8Array(buf),dv=new DataView(buf),out={};let e=-1;for(let i=u.length-22;i>=Math.max(0,u.length-70000);i--)if(dv.getUint32(i,true)==0x06054b50){e=i;break}
 if(e<0)throw new Error('Not an .xlsx file');const n=dv.getUint16(e+10,true);let p=dv.getUint32(e+16,true);const td=new TextDecoder();
 for(let k=0;k<n;k++){const m=dv.getUint16(p+10,true),cs=dv.getUint32(p+20,true),nl=dv.getUint16(p+28,true),xl=dv.getUint16(p+30,true),cl=dv.getUint16(p+32,true),lo=dv.getUint32(p+42,true),name=td.decode(u.subarray(p+46,p+46+nl));
  const ds=lo+30+dv.getUint16(lo+26,true)+dv.getUint16(lo+28,true),data=u.subarray(ds,ds+cs);out[name]={m,data};p+=46+nl+xl+cl}
 const get=async f=>{const x=out[f];if(!x)return null;return td.decode(x.m==8?await inflate(x.data):x.data)};return{names:Object.keys(out),get}}
const xdec=s=>s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&#(\d+);/g,(m,d)=>String.fromCharCode(+d)).replace(/&amp;/g,'&');
const colN=c=>c.split('').reduce((a,ch)=>a*26+ch.charCodeAt(0)-64,0)-1;
async function readXlsx(buf){const z=await unzip(buf);const ss=[],sx=await z.get('xl/sharedStrings.xml');
 if(sx)(sx.match(/<si>[\s\S]*?<\/si>/g)||[]).forEach(si=>ss.push(xdec((si.match(/<t[^>]*>[\s\S]*?<\/t>/g)||[]).map(t=>t.replace(/<[^>]+>/g,'')).join(''))));
 const sh=z.names.filter(n=>/^xl\/worksheets\/sheet\d+\.xml$/.test(n)).sort((a,b)=>parseInt(a.match(/\d+/))-parseInt(b.match(/\d+/)))[0];if(!sh)throw new Error('No sheet found');
 const x=await z.get(sh),rows=[];(x.match(/<row[^>]*>[\s\S]*?<\/row>|<row[^>]*\/>/g)||[]).forEach(r=>{const row=[];
  (r.match(/<c [^>]*\/>|<c [^>]*>[\s\S]*?<\/c>/g)||[]).forEach(c=>{const ref=(c.match(/ r="([A-Z]+)\d+"/)||[])[1],t=(c.match(/ t="(\w+)"/)||[])[1],v=(c.match(/<v>([\s\S]*?)<\/v>/)||[])[1];
   let val=t=='s'?ss[+v]:t=='inlineStr'?xdec((c.match(/<t[^>]*>([\s\S]*?)<\/t>/)||[])[1]||''):v!=null?xdec(v):'';if(t!='s'&&t!='inlineStr'&&t!='str'&&val!==''&&!isNaN(val))val=+val;row[ref?colN(ref):row.length]=val??''});
  rows.push(Array.from(row,c=>c??''))});return rows}
function readCsv(txt){txt=txt.replace(/^\ufeff/,'');const first=txt.split(/\r?\n/)[0]||'',d=[',',';','\t','|'].sort((a,b)=>first.split(b).length-first.split(a).length)[0],rows=[];let row=[],f='',q=false;
 for(let i=0;i<txt.length;i++){const ch=txt[i];if(q){if(ch=='"'){if(txt[i+1]=='"'){f+='"';i++}else q=false}else f+=ch}else if(ch=='"')q=true;else if(ch==d){row.push(f);f=''}else if(ch=='\n'||ch=='\r'){if(ch=='\r'&&txt[i+1]=='\n')i++;row.push(f);rows.push(row);row=[];f=''}else f+=ch}
 if(f||row.length){row.push(f);rows.push(row)}return rows.filter(r=>r.some(c=>String(c).trim()))}
const IMPF={name:'Medicine name',batch:'Batch',exp:'Expiry',qty:'Qty',free:'Free',ptr:'Purchase rate',mrp:'MRP',gst:'GST %',hsn:'HSN',bc:'Barcode',pack:'Pack'};
function impGuess(h){h=String(h||'').toLowerCase().replace(/[^a-z%. ]/g,' ').replace(/\s+/g,' ').trim();if(!h)return'';
 if(/hsn/.test(h))return'hsn';if(/salt|composition|generic|content|molecule/.test(h))return'salt';if(/company|mfr|mfg|manufact|marketed/.test(h))return'company';if(/rack|shelf|location|\bloc\b|box/.test(h))return'rack';if(/(stock|closing|balance|bal qty|cl qty)/.test(h)&&!/value|val|amt|amount/.test(h))return'qty';if(/bar ?code|ean|gtin/.test(h))return'bc';if(/mrp/.test(h))return'mrp';if(/batch|lot/.test(h))return'batch';if(/exp/.test(h))return'exp';
 if(/free|sch|bonus|f qty|fqty|^fr/.test(h))return'free';if(/(gst|tax|igst)/.test(h)&&!/amt|amount|value|val/.test(h))return'gst';if(/pack|pkg|unit/.test(h))return'pack';
 if(/^(qty|quantity|qnty|bill qty|billed|pcs|nos)|\bqty\b/.test(h))return'qty';if(/rate|ptr|pur|price|cost/.test(h)&&!/amt|amount|value|disc/.test(h))return'ptr';
 if(/item|product|description|particular|medicine|name|drug/.test(h)&&!/company|mfr|mfg|supplier/.test(h))return'name';return''}
function impHeader(rows){let best=0,bi=0;for(let r=0;r<Math.min(20,rows.length);r++){const s=new Set(rows[r].map(impGuess).filter(Boolean)).size;if(s>best){best=s;bi=r}}return best>=3?bi:-1}
function impExp(v){if(v===''||v==null)return'';if(typeof v=='number'&&v>20000){const d=new Date(Date.UTC(1899,11,30)+v*864e5);return d.toISOString().slice(0,7)}
 const s=String(v).trim().toLowerCase(),M=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'],y=x=>x.length==2?'20'+x:x,p=x=>String(x).padStart(2,'0');let m;
 if(m=s.match(/^(\d{4})[-\/.](\d{1,2})/))return m[1]+'-'+p(m[2]);if(m=s.match(/^(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{2}|\d{4})$/))return y(m[3])+'-'+p(m[2]);
 if(m=s.match(/^(\d{1,2})[-\/.\s](\d{2}|\d{4})$/))return y(m[2])+'-'+p(m[1]);if(m=s.match(/^([a-z]{3})[a-z]*[-\/.\s']*(\d{2}|\d{4})$/))return M.indexOf(m[1])>=0?y(m[2])+'-'+p(M.indexOf(m[1])+1):'';
 if(m=s.match(/^(\d{2})(\d{2})$/))return'20'+m[2]+'-'+m[1];return''}
const nrm=s=>String(s||'').toLowerCase().replace(/\b(tab|tabs|tablet|tablets|cap|caps|capsule|syp|syrup|inj)\b/g,'').replace(/[^a-z0-9]/g,'');
function impMatch(r){if(r.bc){const b=bcLookup(r.bc).i;if(b)return b.id}const n=nrm(r.name);if(!n)return'';const ex=D.items.find(i=>nrm(i.name)==n);if(ex)return ex.id;
 let best='',bl=0;D.items.forEach(i=>{const a=nrm(i.name);if(a.length>=4&&(n.startsWith(a)||a.startsWith(n))&&a.length>bl){best=i.id;bl=a.length}});return best}
let IMP=null;
async function puImport(f){if(!f)return;try{let rows;if(/\.xls$/i.test(f.name))return alert('Old .xls file: open it in Excel and "Save As" .xlsx or CSV, then import again.');
 rows=/\.xlsx$/i.test(f.name)?await readXlsx(await f.arrayBuffer()):readCsv(await f.text());const h=impHeader(rows);if(h<0)return alert('Could not find the header row (Item, Batch, Expiry, Qty…) in this file.');
 const map={};rows[h].forEach((c,k)=>{const g=impGuess(c);if(g&&map[g]==null)map[g]=k});IMP={rows,h,map,file:f.name};impDraw()}catch(e){alert('Could not read the file: '+e.message)}}
function impRows(src=IMP){const{rows,h,map}=src,num=v=>{const n=parseFloat(String(v).replace(/[^0-9.\-]/g,''));return isNaN(n)?0:n},g=(r,k)=>map[k]==null?'':r[map[k]]??'';
 return rows.slice(h+1).map(r=>{const o={name:String(g(r,'name')).trim(),batch:String(g(r,'batch')).trim(),exp:impExp(g(r,'exp')),qty:num(g(r,'qty')),free:num(g(r,'free')),ptr:num(g(r,'ptr')),mrp:num(g(r,'mrp')),gst:num(g(r,'gst')),hsn:String(g(r,'hsn')).replace(/\.0$/,'').trim(),bc:String(g(r,'bc')).replace(/\.0$/,'').trim(),salt:String(g(r,'salt')).trim(),company:String(g(r,'company')).trim(),rack:String(g(r,'rack')).trim(),pack:(String(g(r,'pack')).match(/(\d+)\s*(?:'s|s|tab|cap)?\s*$/i)||[])[1]};
  if(o.gst&&o.gst<1)o.gst=Math.round(o.gst*100);if(![0,5,12,18,28].includes(o.gst))o.gst=[0,5,12,18].reduce((a,b)=>Math.abs(b-o.gst)<Math.abs(a-o.gst)?b:a,12);return o}).filter(o=>o.name&&(src!==IMP||o.qty>0)&&!/^(total|grand total|sub total)/i.test(o.name))}
function impDraw(){const rs=impRows();IMP.list=rs.map((r,k)=>({...r,itemId:(IMP.list&&IMP.list[k]&&IMP.list[k].name==r.name)?IMP.list[k].itemId:impMatch(r)}));const cols=IMP.rows[IMP.h];
 const opt=D.items.map(i=>`<option value="${i.id}">${esc(i.name)}</option>`).join('');
 $('#pt').innerHTML=`<h3>📥 Import: ${esc(IMP.file)} <span class=mut>${rs.length} lines</span></h3><p class=mut>Check which column is which (found automatically). Then check the medicine on each line. New medicines are created with "⚠ check pack".</p>
 <div class=row>${Object.entries(IMPF).map(([k,l])=>`<label>${l}<select onchange="IMP.map['${k}']=this.value===''?null:+this.value;impDraw()"><option value="">—</option>${cols.map((c,j)=>`<option value="${j}" ${IMP.map[k]===j?'selected':''}>${esc(String(c))}</option>`).join('')}</select></label>`).join('')}</div>
 <table><tr><th>In file</th><th>Medicine in software</th><th>Batch</th><th>Exp</th><th>Qty+Free</th><th>Rate</th><th>MRP</th><th>GST</th><th></th></tr>${IMP.list.map((r,k)=>{const bad=!r.batch||!r.exp?'Batch/expiry missing':expired(r.exp)?'Expired':'';return`<tr><td>${esc(r.name)}</td><td><select onchange="IMP.list[${k}].itemId=this.value"><option value="">➕ New: ${esc(r.name)}</option>${opt.replace(`value="${r.itemId}"`,`value="${r.itemId}" selected`)}</select></td><td>${esc(r.batch)}</td><td>${r.exp||'?'}</td><td>${r.qty}+${r.free}</td><td>${inr(r.ptr)}</td><td>${inr(r.mrp)}</td><td>${r.gst}%</td><td class=red>${bad}</td></tr>`}).join('')}</table><br>
 <button class=p onclick="impAdd()">✔ Add these lines to the purchase</button> <button class=b onclick="IMP=null;puDraw()">Cancel</button>`}
function impAdd(){let n=0,skip=0,made=0;IMP.list.forEach(r=>{if(!r.batch||!r.exp||expired(r.exp)){skip++;return}let id=r.itemId;
  if(!id){const ex=D.items.find(i=>nrm(i.name)==nrm(r.name));if(ex)id=ex.id;else{id=uid();D.items.push({id,name:r.name,salt:'',company:'',cat:'',zone:ZONES[0],rack:RACKS[0],gst:r.gst,mrp:r.mrp,reorder:10,pack:+r.pack||1,packOk:false,hsn:r.hsn||'3004',bc:r.bc||'',_d:1});made++}}
  else{const i=item(id);if(r.bc&&!byBc(r.bc)){i.bc=i.bc?i.bc+','+r.bc:r.bc;i._d=1}if(r.hsn&&(!i.hsn||i.hsn=='3004')&&r.hsn!='3004'){i.hsn=r.hsn;i._d=1}}
  PU.lines.push({itemId:id,batch:r.batch,exp:r.exp,qty:r.qty,free:r.free,ptr:r.ptr,mrp:r.mrp||item(id).mrp,gst:r.gst});n++});
 IMP=null;if(made)save();puDraw();alert(n+' lines added'+(made?', '+made+' new medicines created (set their rack and pack later)':'')+(skip?'. '+skip+' lines skipped (batch/expiry missing or expired) – add them by hand.':'.')+' Check and press Save purchase.')}

// ---------- Start real shop + opening stock import ----------
function wipeBiz(){D.items=[];D.batches=[];Object.values(KINDS).forEach(k=>D[k]=[]);D.rejected=[];D.settings.billNo=1;D.settings.realShop=today()}
async function fullReset(){if(!ME||ME.role!='owner')return alert('Only the Owner can do this.');const on=CL&&CL.shop;if(on&&CL.role!='owner')return alert('Only the cloud owner login can reset the shop.');
 if(prompt('FULL RESET'+(on?' of the shop on ALL counters and the cloud':'')+':\nremoves ALL medicines, stock, bills, purchases, returns and udhaar. Users, PINs, logins and shop details stay. A backup file downloads first.\n\nType RESET to continue:')!=='RESET')return;
 bk();if(on){if(globalThis.navigator&&navigator.onLine===false)return alert('Internet is needed for a cloud reset.');try{const e=await rpc('reset_shop',{p_shop:CL.shop});wipeBiz();CL.ep=e;CL.cur=0;CL.icur='';clSave()}catch(e){return alert('Reset failed: '+e.message)}}else wipeBiz();
 save(1);if(on)sync();alert('Done. The shop is empty. Add medicines from Stock → Import stock list, Purchase, or Stock → New medicine.');go('stock')}
function startReal(){if(!ME||ME.role!='owner')return alert('Only the Owner can do this.');if(CL&&CL.shop)return alert('Demo is already removed. To empty a connected shop use 🧹 Full reset.');
 if(prompt('This removes ALL medicines, stock, bills, purchases, returns and udhaar. Users, PINs and shop details stay. A backup file downloads first.\n\nType START to continue:')!=='START')return;
 bk();D.items=[];D.batches=[];Object.values(KINDS).forEach(k=>D[k]=[]);D.rejected=[];D.settings.billNo=1;D.settings.realShop=today();save(1);alert('Done. Now add your medicines: Stock → Import stock list (Excel/CSV), or Purchase.');go('stock')}
let STI=null;
function rackOf(v){v=String(v||'').trim();if(!v)return null;const z=ZONES.find(z=>v.toUpperCase().startsWith(z[0].toUpperCase())),n=+((v.match(/(\d+)/)||[])[1]);return{zone:z||ZONES[0],rack:RACKS.includes(n)?n:RACKS[0]}}
async function stImport(f){if(!f)return;if(!ME||ME.role!='owner')return alert('Only the Owner can import opening stock.');if(CL&&CL.shop&&CL.role!='owner')return alert('Only the Owner cloud login can import stock.');
 try{if(/\.xls$/i.test(f.name))return alert('Old .xls file: open it in Excel and "Save As" .xlsx or CSV, then import again.');const rows=/\.xlsx$/i.test(f.name)?await readXlsx(await f.arrayBuffer()):readCsv(await f.text());const h=impHeader(rows);
  if(h<0)return alert('Could not find the header row (Item, Batch, Expiry, Stock…) in this file.');const map={};rows[h].forEach((c,k)=>{const g=impGuess(c);if(g&&map[g]==null)map[g]=k});STI={rows,h,map,file:f.name};stDraw()}catch(e){alert('Could not read the file: '+e.message)}}
const STF={name:'Medicine name',salt:'Salt',company:'Company',batch:'Batch',exp:'Expiry',qty:'Stock qty',ptr:'Purchase rate',mrp:'MRP',gst:'GST %',hsn:'HSN',bc:'Barcode',pack:'Pack',rack:'Rack'};
function stDraw(){const rs=impRows(STI),cols=STI.rows[STI.h];STI.list=rs.map(r=>({...r,itemId:impMatch(r)}));const nI=new Set(STI.list.filter(r=>!r.itemId).map(r=>nrm(r.name))).size,withSt=STI.list.filter(r=>r.batch&&r.exp&&!expired(r.exp)).length;
 $('#main').innerHTML=`<div class="card tw"><h3>📥 Opening stock: ${esc(STI.file)}</h3><p class=mut>${STI.list.length} lines · ${nI} new medicines · ${withSt} lines with stock (batch + expiry). Lines without batch/expiry only create the medicine. Expired batches are skipped. Stock is ADDED to what is already there.</p>
 <div class=row>${Object.entries(STF).map(([k,l])=>`<label>${l}<select onchange="STI.map['${k}']=this.value===''?null:+this.value;stDraw()"><option value="">—</option>${cols.map((c,j)=>`<option value="${j}" ${STI.map[k]===j?'selected':''}>${esc(String(c))}</option>`).join('')}</select></label>`).join('')}</div>
 <table><tr><th>Medicine</th><th>Match</th><th>Company</th><th>Batch</th><th>Exp</th><th>Stock</th><th>Rate</th><th>MRP</th><th>GST</th><th>Rack</th></tr>${STI.list.slice(0,300).map(r=>`<tr><td>${esc(r.name)}</td><td>${r.itemId?'✔ '+esc(item(r.itemId).name):'<span class=grn>New</span>'}</td><td>${esc(r.company)}</td><td>${esc(r.batch)}</td><td class="${r.exp&&expired(r.exp)?'red':''}">${r.exp||'-'}</td><td>${r.qty}</td><td>${inr(r.ptr)}</td><td>${inr(r.mrp)}</td><td>${r.gst}%</td><td>${r.rack?esc(r.rack):'-'}</td></tr>`).join('')}</table>${STI.list.length>300?'<p class=mut>Showing first 300 lines.</p>':''}<br>
 <button class=p onclick="stAdd()">✔ Import ${STI.list.length} lines</button> <button class=b onclick="STI=null;go('stock')">Cancel</button></div>`}
function stAdd(){let made=0,bt=0,skip=0;const op={id:'open-'+uid(),date:today(),device:D.settings.device,batches:[]};
 STI.list.forEach(r=>{let id=r.itemId||(D.items.find(i=>nrm(i.name)==nrm(r.name))||{}).id;const rk=rackOf(r.rack);
  if(!id){id=uid();D.items.push({id,name:r.name,salt:r.salt||'',company:r.company||'',cat:'',zone:rk?rk.zone:ZONES[0],rack:rk?rk.rack:RACKS[0],gst:r.gst,mrp:r.mrp,reorder:10,pack:+r.pack||1,packOk:false,hsn:r.hsn||'3004',bc:r.bc&&!byBc(r.bc)?r.bc:'',_d:1});made++}
  else{const i=item(id);let ch=0;if(r.salt&&!i.salt){i.salt=r.salt;ch=1}if(r.company&&!i.company){i.company=r.company;ch=1}if(r.bc&&!byBc(r.bc)){i.bc=i.bc?i.bc+','+r.bc:r.bc;ch=1}if(r.hsn&&r.hsn!='3004'&&(!i.hsn||i.hsn=='3004')){i.hsn=r.hsn;ch=1}if(rk&&r.rack){i.zone=rk.zone;i.rack=rk.rack;ch=1}if(ch)i._d=1}
  if(!(r.qty>0)||!r.batch||!r.exp)return;if(expired(r.exp)){skip++;return}const i=item(id),b={itemId:id,batch:r.batch,exp:r.exp,qty:r.qty,ptr:r.ptr,cost:r.ptr,mrp:r.mrp||i.mrp};op.batches.push(b);bt++;
  const ex=D.batches.find(x=>x.itemId==id&&x.batch==r.batch);if(ex){ex.qty=r2(ex.qty+r.qty);ex.exp=r.exp;ex.ptr=r.ptr;ex.cost=r.ptr;ex.mrp=b.mrp}else D.batches.push({id:uid(),...b})});
 if(op.batches.length)D.openings.push(op);STI=null;save();alert(made+' new medicines, '+bt+' stock batches added'+(skip?', '+skip+' expired batches skipped':'')+'. New medicines show "⚠ check pack" – confirm strip size and rack.');go('stock')}
