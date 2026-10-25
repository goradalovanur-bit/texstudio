const V='ts-v2',T='ts-tex';
const A=['./','index.html','manifest.json','XeTeXEngine.js','DvipdfmxEngine.js','swiftlatexxetex.js','swiftlatexxetex.wasm','swiftlatexdvipdfm.js','swiftlatexdvipdfm.wasm','pdf.min.js','pdf.worker.min.js','icon-192.png','icon-512.png','DejaVuSerif.ttf','DejaVuSerif-Bold.ttf','DejaVuSerif-Italic.ttf','DejaVuSerif-BoldItalic.ttf'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V&&x!=T).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin===location.origin){
  if(r.mode==='navigate'||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/sw.js')){
   e.respondWith(fetch(r).then(n=>{const k=n.clone();caches.open(V).then(c=>c.put(r,k));return n}).catch(()=>caches.match(r,{ignoreSearch:true})));return}
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r)));return}
 if(u.pathname.includes('/xetex/')||u.pathname.includes('/pdftex/')){
  e.respondWith(caches.open(T).then(async c=>{const m=await c.match(r);if(m)return m;const n=await fetch(r);if(n.ok)c.put(r,n.clone());return n}));
 }
});
