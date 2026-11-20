var C="parade-v1";
var LOCAL=["./","index.html","manifest.json","icon-180.png","icon-192.png","icon-512.png"];
var LIBS=["https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js","https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){
 return Promise.all(LOCAL.concat(LIBS).map(function(u){return c.add(u).catch(function(){})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!=C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){if(e.request.method!="GET")return;
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(r){
  return r||fetch(e.request).then(function(n){var cp=n.clone();caches.open(C).then(function(c){c.put(e.request,cp)});return n}).catch(function(){return caches.match("index.html")})}))});
