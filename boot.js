// ASMA MEDICAL – loads saved data from IndexedDB (no 5 MB browser limit) before the app starts.
(function(){window.__DEMO=/[?&]demo\b/.test(location.search);var started=false;function go(){if(started)return;started=true;var s=document.createElement('script');s.src='app.js';document.body.appendChild(s)}
 function fail(){window.__IDBERR=1;go()}
 try{if(!window.indexedDB)return go();var rq=indexedDB.open(window.__DEMO?'asmaDemo':'asma',1);
  rq.onupgradeneeded=function(){rq.result.createObjectStore('kv')};
  rq.onsuccess=function(){var db=rq.result;try{var g=db.transaction('kv').objectStore('kv').get('asma');g.onsuccess=function(){window.__IDB=db;if(typeof g.result=='string')window.__ASMA=g.result;go()};g.onerror=fail}catch(e){fail()}};
  rq.onerror=fail;rq.onblocked=fail}catch(e){fail()}})();
