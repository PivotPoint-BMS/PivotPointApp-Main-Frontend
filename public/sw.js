if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const r=e=>a(e,n),d={module:{uri:n},exports:t,require:r};s[n]=Promise.all(c.map((e=>d[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/250.png",revision:"fd3dc7fde79737b8f63857bd1988a29f"},{url:"/403.png",revision:"8aeedfb2cd502bc9a5e74fcc5521ffd8"},{url:"/404-dark.svg",revision:"46e171a004ab04bf76bcf1045833f857"},{url:"/404.png",revision:"6ee5b3da3f498cdeb0c7a4ae767de4e2"},{url:"/404.svg",revision:"9ea669ca0a9b6920f3af1e67952bbf92"},{url:"/Fingerprint-bro.svg",revision:"15b49eccc85efd8481ace80f263ba480"},{url:"/IMG_1675757212962.jpg",revision:"4787def397f59709e74c6d737fb1a9c1"},{url:"/Transformer_decoder.png",revision:"1dcad850e25c516fee17a32ed76452e1"},{url:"/_next/static/LOmxcZFQCcrxuJnJ6uryh/_buildManifest.js",revision:"0882738268304df699b7397bd6781c2e"},{url:"/_next/static/LOmxcZFQCcrxuJnJ6uryh/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1705-0ba9f5ebabc34839.js",revision:"0ba9f5ebabc34839"},{url:"/_next/static/chunks/1b8dab7b-c0bf223777213d0e.js",revision:"c0bf223777213d0e"},{url:"/_next/static/chunks/228771e0-a13a86732b90df9c.js",revision:"a13a86732b90df9c"},{url:"/_next/static/chunks/2729-d58c4054414a988b.js",revision:"d58c4054414a988b"},{url:"/_next/static/chunks/294-ee8c4ae2dbff01b7.js",revision:"ee8c4ae2dbff01b7"},{url:"/_next/static/chunks/3196-d61697f10b5b20eb.js",revision:"d61697f10b5b20eb"},{url:"/_next/static/chunks/328-1d7006b2c03e5dc8.js",revision:"1d7006b2c03e5dc8"},{url:"/_next/static/chunks/4094-49d05e5e1d19686f.js",revision:"49d05e5e1d19686f"},{url:"/_next/static/chunks/4420-66ee449adffea08c.js",revision:"66ee449adffea08c"},{url:"/_next/static/chunks/4800-87335e9516f3177a.js",revision:"87335e9516f3177a"},{url:"/_next/static/chunks/5224-50a3e15199dc4145.js",revision:"50a3e15199dc4145"},{url:"/_next/static/chunks/5678-53da11417cf5bc6c.js",revision:"53da11417cf5bc6c"},{url:"/_next/static/chunks/5a3f41a5-41b43adb7f9f9298.js",revision:"41b43adb7f9f9298"},{url:"/_next/static/chunks/65291039-207513b01ae96579.js",revision:"207513b01ae96579"},{url:"/_next/static/chunks/653-1ece875de92ecd41.js",revision:"1ece875de92ecd41"},{url:"/_next/static/chunks/6914-63ad3e6400f554c5.js",revision:"63ad3e6400f554c5"},{url:"/_next/static/chunks/6c44d60f.eef9d04c51673035.js",revision:"eef9d04c51673035"},{url:"/_next/static/chunks/7229.126319be8a5a94e6.js",revision:"126319be8a5a94e6"},{url:"/_next/static/chunks/9698-55addf66b4f4f0de.js",revision:"55addf66b4f4f0de"},{url:"/_next/static/chunks/9929-4c703a14d8e59640.js",revision:"4c703a14d8e59640"},{url:"/_next/static/chunks/c9184924-547f7e9dae91b183.js",revision:"547f7e9dae91b183"},{url:"/_next/static/chunks/fc83e031-9b69ef8fbe1faf2b.js",revision:"9b69ef8fbe1faf2b"},{url:"/_next/static/chunks/framework-1f1fb5c07f2be279.js",revision:"1f1fb5c07f2be279"},{url:"/_next/static/chunks/main-dc414827baec385d.js",revision:"dc414827baec385d"},{url:"/_next/static/chunks/pages/404-6f9b3209935f5fb2.js",revision:"6f9b3209935f5fb2"},{url:"/_next/static/chunks/pages/_app-b1ed986a03192529.js",revision:"b1ed986a03192529"},{url:"/_next/static/chunks/pages/_error-02cc11fd74b4e5ff.js",revision:"02cc11fd74b4e5ff"},{url:"/_next/static/chunks/pages/app-7f531f726c320527.js",revision:"7f531f726c320527"},{url:"/_next/static/chunks/pages/app/crm/contacts-leads-4aeb57c3781b892c.js",revision:"4aeb57c3781b892c"},{url:"/_next/static/chunks/pages/app/crm/contacts-leads/contact/%5Bid%5D-023beb8596a6cea8.js",revision:"023beb8596a6cea8"},{url:"/_next/static/chunks/pages/app/crm/contacts-leads/create-e874a83c5a7ce619.js",revision:"e874a83c5a7ce619"},{url:"/_next/static/chunks/pages/app/crm/contacts-leads/lead/%5Bid%5D-8eb7f2ef1ae87bdb.js",revision:"8eb7f2ef1ae87bdb"},{url:"/_next/static/chunks/pages/app/crm/contacts-leads/lead/edit/%5Bid%5D-20ffe74f4396b983.js",revision:"20ffe74f4396b983"},{url:"/_next/static/chunks/pages/app/crm/customer-segmentation-24d90cbae9e97d3d.js",revision:"24d90cbae9e97d3d"},{url:"/_next/static/chunks/pages/app/crm/customer-service-0d3101232279ff28.js",revision:"0d3101232279ff28"},{url:"/_next/static/chunks/pages/app/crm/dashboard-a10e2f997a779c06.js",revision:"a10e2f997a779c06"},{url:"/_next/static/chunks/pages/app/crm/sales-pipeline-e5cb50d7c2b852c5.js",revision:"e5cb50d7c2b852c5"},{url:"/_next/static/chunks/pages/app/crm/sentiment-analysis-c98779f035df5b63.js",revision:"c98779f035df5b63"},{url:"/_next/static/chunks/pages/app/fm/assets-fe70e58a37284cb5.js",revision:"fe70e58a37284cb5"},{url:"/_next/static/chunks/pages/app/fm/bank-accounts-17d9eb85b19af481.js",revision:"17d9eb85b19af481"},{url:"/_next/static/chunks/pages/app/fm/business-plan-bf99b83460e45031.js",revision:"bf99b83460e45031"},{url:"/_next/static/chunks/pages/app/fm/cash-77210ca6859a9216.js",revision:"77210ca6859a9216"},{url:"/_next/static/chunks/pages/app/fm/dashboard-e1938d4cf648eb8a.js",revision:"e1938d4cf648eb8a"},{url:"/_next/static/chunks/pages/app/fm/expences-incomes-fa9e5f220e97e3bd.js",revision:"fa9e5f220e97e3bd"},{url:"/_next/static/chunks/pages/app/fm/funding-8439ffb1df4cf25c.js",revision:"8439ffb1df4cf25c"},{url:"/_next/static/chunks/pages/app/fm/invoice-8d1a4c7d2f403863.js",revision:"8d1a4c7d2f403863"},{url:"/_next/static/chunks/pages/app/fm/risk-58e85a97aebfe583.js",revision:"58e85a97aebfe583"},{url:"/_next/static/chunks/pages/app/fm/tax-de2ca66eeceb74b6.js",revision:"de2ca66eeceb74b6"},{url:"/_next/static/chunks/pages/app/hrm/accounts-96d4a24af7729af3.js",revision:"96d4a24af7729af3"},{url:"/_next/static/chunks/pages/app/hrm/benefits-37b2b86a3fac3394.js",revision:"37b2b86a3fac3394"},{url:"/_next/static/chunks/pages/app/hrm/dashboard-fc93c9668c31d9c3.js",revision:"fc93c9668c31d9c3"},{url:"/_next/static/chunks/pages/app/hrm/payroll-22033b9621a4ff58.js",revision:"22033b9621a4ff58"},{url:"/_next/static/chunks/pages/app/hrm/recruitment-632575c46a3bf270.js",revision:"632575c46a3bf270"},{url:"/_next/static/chunks/pages/app/pm/dashboard-7c688d34f524e810.js",revision:"7c688d34f524e810"},{url:"/_next/static/chunks/pages/app/pm/pipelines-ed34ade9153da3ba.js",revision:"ed34ade9153da3ba"},{url:"/_next/static/chunks/pages/app/pm/planning-66d81f88b3080209.js",revision:"66d81f88b3080209"},{url:"/_next/static/chunks/pages/app/pm/tracking-5fdf1a013a105f42.js",revision:"5fdf1a013a105f42"},{url:"/_next/static/chunks/pages/app/scm/dashboard-7b8a553626960e95.js",revision:"7b8a553626960e95"},{url:"/_next/static/chunks/pages/app/scm/invoices-1124376115853787.js",revision:"1124376115853787"},{url:"/_next/static/chunks/pages/app/scm/invoices/%5Bid%5D-96c5ec5ebf2eaa7a.js",revision:"96c5ec5ebf2eaa7a"},{url:"/_next/static/chunks/pages/app/scm/invoices/create-d1f514a8e0e9e7c1.js",revision:"d1f514a8e0e9e7c1"},{url:"/_next/static/chunks/pages/app/scm/invoices/edit/%5Bid%5D-4955c4c5a8d2672e.js",revision:"4955c4c5a8d2672e"},{url:"/_next/static/chunks/pages/app/scm/product-service-d363537652f41764.js",revision:"d363537652f41764"},{url:"/_next/static/chunks/pages/app/scm/product-service/product/create-802de550507b5140.js",revision:"802de550507b5140"},{url:"/_next/static/chunks/pages/app/scm/supplier/%5Bid%5D-4b8dbddb0d2c0c84.js",revision:"4b8dbddb0d2c0c84"},{url:"/_next/static/chunks/pages/app/scm/suppliers-fd95196ef23b3029.js",revision:"fd95196ef23b3029"},{url:"/_next/static/chunks/pages/app/scm/transportation-59c0f00bd3ec07d1.js",revision:"59c0f00bd3ec07d1"},{url:"/_next/static/chunks/pages/app/scm/transportation/deliveries/%5Bid%5D-697cf5991c741ecf.js",revision:"697cf5991c741ecf"},{url:"/_next/static/chunks/pages/app/scm/transportation/deliveries/create/s2w-70e4a1978311053b.js",revision:"70e4a1978311053b"},{url:"/_next/static/chunks/pages/app/scm/transportation/deliveries/create/w2c-f14a020b013f1a43.js",revision:"f14a020b013f1a43"},{url:"/_next/static/chunks/pages/app/scm/transportation/deliveries/create/w2w-87e047813b24db38.js",revision:"87e047813b24db38"},{url:"/_next/static/chunks/pages/app/scm/warehousing-1d5da59427d300f4.js",revision:"1d5da59427d300f4"},{url:"/_next/static/chunks/pages/app/scm/warehousing/warehouse/%5Bid%5D-66f234d3d431716e.js",revision:"66f234d3d431716e"},{url:"/_next/static/chunks/pages/app/user/company-30561d46a3edc73e.js",revision:"30561d46a3edc73e"},{url:"/_next/static/chunks/pages/app/user/profile-118a1a7b68849936.js",revision:"118a1a7b68849936"},{url:"/_next/static/chunks/pages/app/workflow-fe068720bde70175.js",revision:"fe068720bde70175"},{url:"/_next/static/chunks/pages/auth/company-setup-4ea6342a2f4a5a6d.js",revision:"4ea6342a2f4a5a6d"},{url:"/_next/static/chunks/pages/auth/login-249e9928369c4410.js",revision:"249e9928369c4410"},{url:"/_next/static/chunks/pages/auth/new-password-d02613dd6c07e2e3.js",revision:"d02613dd6c07e2e3"},{url:"/_next/static/chunks/pages/auth/payment-a45ed65ba6c8563c.js",revision:"a45ed65ba6c8563c"},{url:"/_next/static/chunks/pages/auth/register-641e11da3b780bd9.js",revision:"641e11da3b780bd9"},{url:"/_next/static/chunks/pages/auth/reset-password-a8328025dda7d2d7.js",revision:"a8328025dda7d2d7"},{url:"/_next/static/chunks/pages/feedback-618481497ffc9fbb.js",revision:"618481497ffc9fbb"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-9876d873e58ee49f.js",revision:"9876d873e58ee49f"},{url:"/_next/static/css/17957034f593725b.css",revision:"17957034f593725b"},{url:"/_next/static/css/26a111c12299df67.css",revision:"26a111c12299df67"},{url:"/_next/static/css/b0cb1c4644c3902d.css",revision:"b0cb1c4644c3902d"},{url:"/_next/static/css/f01b17eaec2bd08b.css",revision:"f01b17eaec2bd08b"},{url:"/_next/static/media/403.43862f2a.png",revision:"8aeedfb2cd502bc9a5e74fcc5521ffd8"},{url:"/_next/static/media/404.f414843e.png",revision:"6ee5b3da3f498cdeb0c7a4ae767de4e2"},{url:"/_next/static/media/avatar_placeholder.a3a9735a.png",revision:"eb2b82c57dda81c9aa7546a27b8399c1"},{url:"/_next/static/media/car.f2c873b4.png",revision:"48e4f8d0d0269017b5484b86e5da04e5"},{url:"/_next/static/media/large.694c25c3.png",revision:"dc093e89fc4cc5314552975ec753e409"},{url:"/_next/static/media/logo.8b4a5adc.svg",revision:"8c188bf4feaced8fc8da70ce294b1418"},{url:"/_next/static/media/medium.1c2cbe4b.png",revision:"87299048ba3918679c80e951364bce96"},{url:"/_next/static/media/no-data.2e37bad4.png",revision:"8ff7094e6918c400a7d99c38ddd1a314"},{url:"/_next/static/media/shopify.40e10c01.png",revision:"3036d9ca89a9a51ea6945c7492721b15"},{url:"/_next/static/media/slack.0e59e14e.png",revision:"8abf8433ff17cd0874e5ae9ac6c05457"},{url:"/_next/static/media/small.3438cbec.png",revision:"6654f847000c2b595a8a1d3d1f661973"},{url:"/_next/static/media/trello.200b58dd.png",revision:"1559a098a8d93ffe1988852a58a3804a"},{url:"/arabic-2.png",revision:"2c48c5075ca3f26a8173deb159b0e7c8"},{url:"/arabic.png",revision:"4f9ca66ef394d2a82f8b8c9b3e51d812"},{url:"/avatar_placeholder.png",revision:"eb2b82c57dda81c9aa7546a27b8399c1"},{url:"/english.png",revision:"2f6d382fb7ec5a336e732c1fd211f210"},{url:"/favicon.ico",revision:"858cc374358c3f3ce34675a456fbcbdd"},{url:"/fonts/PublicSans-Bold.ttf",revision:"e2ebf780f846271f822b52d26d24af1d"},{url:"/fonts/PublicSans-Light.ttf",revision:"95cd874cbac7d1f61ecdd43283f800fb"},{url:"/fonts/PublicSans-Regular.ttf",revision:"d2d3b740e46522981f945573253b0a1a"},{url:"/french.png",revision:"ac818731b8160c8d5a16adc327b625a6"},{url:"/icon-192x192.png",revision:"950cd56bdc79adc77fda7aaf567b4c0b"},{url:"/icon-256x256.png",revision:"edfca0ebacb00f39ede82060fb78cb90"},{url:"/icon-384x384.png",revision:"f62c226c42f237acc1327504d57ddca2"},{url:"/icon-512x512.png",revision:"03412deadbcebfd97a179b55f85beb77"},{url:"/logo.svg",revision:"8c188bf4feaced8fc8da70ce294b1418"},{url:"/manifest.json",revision:"c31c072722f32ca5ea03aa22c0b01510"},{url:"/no-data-dark.png",revision:"aa81fa7006467c00bc781629747a05dc"},{url:"/no-data.png",revision:"8ff7094e6918c400a7d99c38ddd1a314"},{url:"/self-attention-output.png",revision:"087b831f622f83e4529c1bbf646530f0"},{url:"/shopify.png",revision:"3036d9ca89a9a51ea6945c7492721b15"},{url:"/slack.png",revision:"8abf8433ff17cd0874e5ae9ac6c05457"},{url:"/transformer_architecture.png",revision:"6d335c4bd879cc8ccbd1ee6da1b90846"},{url:"/transformer_multi-headed_self-attention-recap.png",revision:"3cd76d3e0d8a20d87dfa586b56cc1ad3"},{url:"/trello.png",revision:"1559a098a8d93ffe1988852a58a3804a"},{url:"/vehicules/car.png",revision:"48e4f8d0d0269017b5484b86e5da04e5"},{url:"/vehicules/large.png",revision:"dc093e89fc4cc5314552975ec753e409"},{url:"/vehicules/medium.png",revision:"87299048ba3918679c80e951364bce96"},{url:"/vehicules/small.png",revision:"6654f847000c2b595a8a1d3d1f661973"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
