if (!self.define) {
  let e,
    a = {}
  const s = (s, c) => (
    (s = new URL(s + ".js", c).href),
    a[s] ||
      new Promise((a) => {
        if ("document" in self) {
          const e = document.createElement("script")
          ;(e.src = s), (e.onload = a), document.head.appendChild(e)
        } else (e = s), importScripts(s), a()
      }).then(() => {
        let e = a[s]
        if (!e) throw new Error(`Module ${s} didn’t register its module`)
        return e
      })
  )
  self.define = (c, i) => {
    const n = e || ("document" in self ? document.currentScript.src : "") || location.href
    if (a[n]) return
    let t = {}
    const r = (e) => s(e, n),
      d = { module: { uri: n }, exports: t, require: r }
    a[n] = Promise.all(c.map((e) => d[e] || r(e))).then((e) => (i(...e), t))
  }
}
define(["./workbox-588899ac"], function (e) {
  "use strict"
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "/250.png", revision: "fd3dc7fde79737b8f63857bd1988a29f" },
        { url: "/403.png", revision: "8aeedfb2cd502bc9a5e74fcc5521ffd8" },
        { url: "/404-dark.svg", revision: "46e171a004ab04bf76bcf1045833f857" },
        { url: "/404.png", revision: "6ee5b3da3f498cdeb0c7a4ae767de4e2" },
        { url: "/404.svg", revision: "9ea669ca0a9b6920f3af1e67952bbf92" },
        { url: "/Fingerprint-bro.svg", revision: "15b49eccc85efd8481ace80f263ba480" },
        { url: "/IMG_1675757212962.jpg", revision: "4787def397f59709e74c6d737fb1a9c1" },
        { url: "/Transformer_decoder.png", revision: "1dcad850e25c516fee17a32ed76452e1" },
        {
          url: "/_next/static/MtU9GK1Sr_C5XlB2Xrvqc/_buildManifest.js",
          revision: "d26f9ead807c591cc2ae8d789a7dbe45",
        },
        {
          url: "/_next/static/MtU9GK1Sr_C5XlB2Xrvqc/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        { url: "/_next/static/chunks/1705-dcbe328d4dad965f.js", revision: "dcbe328d4dad965f" },
        { url: "/_next/static/chunks/1b8dab7b-c0bf223777213d0e.js", revision: "c0bf223777213d0e" },
        { url: "/_next/static/chunks/2138-ae7fcc4c4fd4b0ff.js", revision: "ae7fcc4c4fd4b0ff" },
        { url: "/_next/static/chunks/228771e0-a13a86732b90df9c.js", revision: "a13a86732b90df9c" },
        { url: "/_next/static/chunks/2512-d97c686d5d82f83e.js", revision: "d97c686d5d82f83e" },
        { url: "/_next/static/chunks/2729-a9afe04231ba6c99.js", revision: "a9afe04231ba6c99" },
        { url: "/_next/static/chunks/294-ee8c4ae2dbff01b7.js", revision: "ee8c4ae2dbff01b7" },
        { url: "/_next/static/chunks/3196-b0464943d2e867d0.js", revision: "b0464943d2e867d0" },
        { url: "/_next/static/chunks/328-1d7006b2c03e5dc8.js", revision: "1d7006b2c03e5dc8" },
        { url: "/_next/static/chunks/4094-49d05e5e1d19686f.js", revision: "49d05e5e1d19686f" },
        { url: "/_next/static/chunks/4420-4c0b22f844cdfba6.js", revision: "4c0b22f844cdfba6" },
        { url: "/_next/static/chunks/4800-2795060bc0baf288.js", revision: "2795060bc0baf288" },
        { url: "/_next/static/chunks/5224-50a3e15199dc4145.js", revision: "50a3e15199dc4145" },
        { url: "/_next/static/chunks/5a3f41a5-41b43adb7f9f9298.js", revision: "41b43adb7f9f9298" },
        { url: "/_next/static/chunks/65291039-207513b01ae96579.js", revision: "207513b01ae96579" },
        { url: "/_next/static/chunks/653-1ece875de92ecd41.js", revision: "1ece875de92ecd41" },
        { url: "/_next/static/chunks/6914-63ad3e6400f554c5.js", revision: "63ad3e6400f554c5" },
        { url: "/_next/static/chunks/6c44d60f.eef9d04c51673035.js", revision: "eef9d04c51673035" },
        { url: "/_next/static/chunks/7229.126319be8a5a94e6.js", revision: "126319be8a5a94e6" },
        { url: "/_next/static/chunks/8165-983616dc9355b802.js", revision: "983616dc9355b802" },
        { url: "/_next/static/chunks/8168-8f3e4aa3e6644350.js", revision: "8f3e4aa3e6644350" },
        { url: "/_next/static/chunks/c9184924-547f7e9dae91b183.js", revision: "547f7e9dae91b183" },
        { url: "/_next/static/chunks/fc83e031-1aca375ced74a86f.js", revision: "1aca375ced74a86f" },
        { url: "/_next/static/chunks/framework-1f1fb5c07f2be279.js", revision: "1f1fb5c07f2be279" },
        { url: "/_next/static/chunks/main-dc414827baec385d.js", revision: "dc414827baec385d" },
        { url: "/_next/static/chunks/pages/404-d1606fe67c89ddf1.js", revision: "d1606fe67c89ddf1" },
        {
          url: "/_next/static/chunks/pages/_app-d46316eebfe6eefb.js",
          revision: "d46316eebfe6eefb",
        },
        {
          url: "/_next/static/chunks/pages/_error-02cc11fd74b4e5ff.js",
          revision: "02cc11fd74b4e5ff",
        },
        { url: "/_next/static/chunks/pages/app-1f6c15450ffbc8d6.js", revision: "1f6c15450ffbc8d6" },
        {
          url: "/_next/static/chunks/pages/app/crm/contacts-leads-3417dfbc51101af1.js",
          revision: "3417dfbc51101af1",
        },
        {
          url: "/_next/static/chunks/pages/app/crm/contacts-leads/contact/%5Bid%5D-1a870e03713ca8cf.js",
          revision: "1a870e03713ca8cf",
        },
        {
          url: "/_next/static/chunks/pages/app/crm/contacts-leads/create-d3ce42d4a9389a03.js",
          revision: "d3ce42d4a9389a03",
        },
        {
          url: "/_next/static/chunks/pages/app/crm/contacts-leads/lead/%5Bid%5D-a23fb960cefa4a7d.js",
          revision: "a23fb960cefa4a7d",
        },
        {
          url: "/_next/static/chunks/pages/app/crm/contacts-leads/lead/edit/%5Bid%5D-ed8d19a9cc589f8a.js",
          revision: "ed8d19a9cc589f8a",
        },
        {
          url: "/_next/static/chunks/pages/app/crm/customer-segmentation-1ca31d9edfe5c8b9.js",
          revision: "1ca31d9edfe5c8b9",
        },
        {
          url: "/_next/static/chunks/pages/app/crm/customer-service-a7d75013c5bec3a9.js",
          revision: "a7d75013c5bec3a9",
        },
        {
          url: "/_next/static/chunks/pages/app/crm/dashboard-63e60e32d80e9b35.js",
          revision: "63e60e32d80e9b35",
        },
        {
          url: "/_next/static/chunks/pages/app/crm/sales-pipeline-95ab174c8623920d.js",
          revision: "95ab174c8623920d",
        },
        {
          url: "/_next/static/chunks/pages/app/crm/sentiment-analysis-74eb116844148bbd.js",
          revision: "74eb116844148bbd",
        },
        {
          url: "/_next/static/chunks/pages/app/fm/assets-fe70e58a37284cb5.js",
          revision: "fe70e58a37284cb5",
        },
        {
          url: "/_next/static/chunks/pages/app/fm/bank-accounts-327df26f5c6f2d33.js",
          revision: "327df26f5c6f2d33",
        },
        {
          url: "/_next/static/chunks/pages/app/fm/business-plan-c597d7a60cc79b32.js",
          revision: "c597d7a60cc79b32",
        },
        {
          url: "/_next/static/chunks/pages/app/fm/cash-77210ca6859a9216.js",
          revision: "77210ca6859a9216",
        },
        {
          url: "/_next/static/chunks/pages/app/fm/dashboard-8384c27f8d49bac8.js",
          revision: "8384c27f8d49bac8",
        },
        {
          url: "/_next/static/chunks/pages/app/fm/expences-incomes-fa9e5f220e97e3bd.js",
          revision: "fa9e5f220e97e3bd",
        },
        {
          url: "/_next/static/chunks/pages/app/fm/funding-8439ffb1df4cf25c.js",
          revision: "8439ffb1df4cf25c",
        },
        {
          url: "/_next/static/chunks/pages/app/fm/invoice-8d1a4c7d2f403863.js",
          revision: "8d1a4c7d2f403863",
        },
        {
          url: "/_next/static/chunks/pages/app/fm/risk-58e85a97aebfe583.js",
          revision: "58e85a97aebfe583",
        },
        {
          url: "/_next/static/chunks/pages/app/fm/tax-de2ca66eeceb74b6.js",
          revision: "de2ca66eeceb74b6",
        },
        {
          url: "/_next/static/chunks/pages/app/hrm/accounts-22e7564d518c7f21.js",
          revision: "22e7564d518c7f21",
        },
        {
          url: "/_next/static/chunks/pages/app/hrm/benefits-37b2b86a3fac3394.js",
          revision: "37b2b86a3fac3394",
        },
        {
          url: "/_next/static/chunks/pages/app/hrm/dashboard-af2705d2df40dcbf.js",
          revision: "af2705d2df40dcbf",
        },
        {
          url: "/_next/static/chunks/pages/app/hrm/payroll-22033b9621a4ff58.js",
          revision: "22033b9621a4ff58",
        },
        {
          url: "/_next/static/chunks/pages/app/hrm/recruitment-632575c46a3bf270.js",
          revision: "632575c46a3bf270",
        },
        {
          url: "/_next/static/chunks/pages/app/pm/dashboard-2515471613702b64.js",
          revision: "2515471613702b64",
        },
        {
          url: "/_next/static/chunks/pages/app/pm/pipelines-ed34ade9153da3ba.js",
          revision: "ed34ade9153da3ba",
        },
        {
          url: "/_next/static/chunks/pages/app/pm/planning-66d81f88b3080209.js",
          revision: "66d81f88b3080209",
        },
        {
          url: "/_next/static/chunks/pages/app/pm/tracking-5fdf1a013a105f42.js",
          revision: "5fdf1a013a105f42",
        },
        {
          url: "/_next/static/chunks/pages/app/scm/dashboard-37fdae31fe28b61a.js",
          revision: "37fdae31fe28b61a",
        },
        {
          url: "/_next/static/chunks/pages/app/scm/invoices-42e903e3db0a0624.js",
          revision: "42e903e3db0a0624",
        },
        {
          url: "/_next/static/chunks/pages/app/scm/invoices/%5Bid%5D-7cb2d30f7127b95e.js",
          revision: "7cb2d30f7127b95e",
        },
        {
          url: "/_next/static/chunks/pages/app/scm/invoices/create-ffa61094508267d6.js",
          revision: "ffa61094508267d6",
        },
        {
          url: "/_next/static/chunks/pages/app/scm/invoices/edit/%5Bid%5D-3ad2f4e4e68629c5.js",
          revision: "3ad2f4e4e68629c5",
        },
        {
          url: "/_next/static/chunks/pages/app/scm/product-service-2f344d04b21de04a.js",
          revision: "2f344d04b21de04a",
        },
        {
          url: "/_next/static/chunks/pages/app/scm/product-service/product/create-f5316e649bcc5d95.js",
          revision: "f5316e649bcc5d95",
        },
        {
          url: "/_next/static/chunks/pages/app/scm/supplier/%5Bid%5D-a6785f605c6a1418.js",
          revision: "a6785f605c6a1418",
        },
        {
          url: "/_next/static/chunks/pages/app/scm/suppliers-3204f9b4b61866bc.js",
          revision: "3204f9b4b61866bc",
        },
        {
          url: "/_next/static/chunks/pages/app/scm/transportation-d193c40fe1763f5c.js",
          revision: "d193c40fe1763f5c",
        },
        {
          url: "/_next/static/chunks/pages/app/scm/transportation/deliveries/%5Bid%5D-ae0a14deec13c27b.js",
          revision: "ae0a14deec13c27b",
        },
        {
          url: "/_next/static/chunks/pages/app/scm/transportation/deliveries/create/s2w-60baba3843ab52f4.js",
          revision: "60baba3843ab52f4",
        },
        {
          url: "/_next/static/chunks/pages/app/scm/transportation/deliveries/create/w2c-ff0e526b7ea83aad.js",
          revision: "ff0e526b7ea83aad",
        },
        {
          url: "/_next/static/chunks/pages/app/scm/transportation/deliveries/create/w2w-fa70eaa33a27ef0f.js",
          revision: "fa70eaa33a27ef0f",
        },
        {
          url: "/_next/static/chunks/pages/app/scm/warehousing-c0d601e6a88cc375.js",
          revision: "c0d601e6a88cc375",
        },
        {
          url: "/_next/static/chunks/pages/app/scm/warehousing/warehouse/%5Bid%5D-1f15b087b89f16dd.js",
          revision: "1f15b087b89f16dd",
        },
        {
          url: "/_next/static/chunks/pages/app/user/company-5bee3d03b5fe582f.js",
          revision: "5bee3d03b5fe582f",
        },
        {
          url: "/_next/static/chunks/pages/app/user/profile-13eb9a6a33122b2b.js",
          revision: "13eb9a6a33122b2b",
        },
        {
          url: "/_next/static/chunks/pages/app/workflow-74b0afcd712e922a.js",
          revision: "74b0afcd712e922a",
        },
        {
          url: "/_next/static/chunks/pages/auth/company-setup-54b479daba9cce92.js",
          revision: "54b479daba9cce92",
        },
        {
          url: "/_next/static/chunks/pages/auth/login-5bd5f94fef71903f.js",
          revision: "5bd5f94fef71903f",
        },
        {
          url: "/_next/static/chunks/pages/auth/new-password-5d5053051aea8a49.js",
          revision: "5d5053051aea8a49",
        },
        {
          url: "/_next/static/chunks/pages/auth/payment-6a29c182a0199fd8.js",
          revision: "6a29c182a0199fd8",
        },
        {
          url: "/_next/static/chunks/pages/auth/register-33b32f62833d8ffa.js",
          revision: "33b32f62833d8ffa",
        },
        {
          url: "/_next/static/chunks/pages/auth/reset-password-62ea290b6e079cab.js",
          revision: "62ea290b6e079cab",
        },
        {
          url: "/_next/static/chunks/pages/feedback-7bab4d74f216519f.js",
          revision: "7bab4d74f216519f",
        },
        {
          url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
          revision: "837c0df77fd5009c9e46d446188ecfd0",
        },
        { url: "/_next/static/chunks/webpack-d4c8ec0d460fd92d.js", revision: "d4c8ec0d460fd92d" },
        { url: "/_next/static/css/17957034f593725b.css", revision: "17957034f593725b" },
        { url: "/_next/static/css/26a111c12299df67.css", revision: "26a111c12299df67" },
        { url: "/_next/static/css/d50cd807272cad2c.css", revision: "d50cd807272cad2c" },
        { url: "/_next/static/css/f01b17eaec2bd08b.css", revision: "f01b17eaec2bd08b" },
        {
          url: "/_next/static/media/403.43862f2a.png",
          revision: "8aeedfb2cd502bc9a5e74fcc5521ffd8",
        },
        {
          url: "/_next/static/media/404.f414843e.png",
          revision: "6ee5b3da3f498cdeb0c7a4ae767de4e2",
        },
        {
          url: "/_next/static/media/avatar_placeholder.a3a9735a.png",
          revision: "eb2b82c57dda81c9aa7546a27b8399c1",
        },
        {
          url: "/_next/static/media/car.f2c873b4.png",
          revision: "48e4f8d0d0269017b5484b86e5da04e5",
        },
        {
          url: "/_next/static/media/large.694c25c3.png",
          revision: "dc093e89fc4cc5314552975ec753e409",
        },
        {
          url: "/_next/static/media/logo.8b4a5adc.svg",
          revision: "8c188bf4feaced8fc8da70ce294b1418",
        },
        {
          url: "/_next/static/media/medium.1c2cbe4b.png",
          revision: "87299048ba3918679c80e951364bce96",
        },
        {
          url: "/_next/static/media/no-data.2e37bad4.png",
          revision: "8ff7094e6918c400a7d99c38ddd1a314",
        },
        {
          url: "/_next/static/media/shopify.40e10c01.png",
          revision: "3036d9ca89a9a51ea6945c7492721b15",
        },
        {
          url: "/_next/static/media/slack.0e59e14e.png",
          revision: "8abf8433ff17cd0874e5ae9ac6c05457",
        },
        {
          url: "/_next/static/media/small.3438cbec.png",
          revision: "6654f847000c2b595a8a1d3d1f661973",
        },
        {
          url: "/_next/static/media/trello.200b58dd.png",
          revision: "1559a098a8d93ffe1988852a58a3804a",
        },
        { url: "/arabic-2.png", revision: "2c48c5075ca3f26a8173deb159b0e7c8" },
        { url: "/arabic.png", revision: "4f9ca66ef394d2a82f8b8c9b3e51d812" },
        { url: "/avatar_placeholder.png", revision: "eb2b82c57dda81c9aa7546a27b8399c1" },
        { url: "/english.png", revision: "2f6d382fb7ec5a336e732c1fd211f210" },
        { url: "/favicon.ico", revision: "858cc374358c3f3ce34675a456fbcbdd" },
        { url: "/french.png", revision: "ac818731b8160c8d5a16adc327b625a6" },
        { url: "/icon-192x192.png", revision: "950cd56bdc79adc77fda7aaf567b4c0b" },
        { url: "/icon-256x256.png", revision: "edfca0ebacb00f39ede82060fb78cb90" },
        { url: "/icon-384x384.png", revision: "f62c226c42f237acc1327504d57ddca2" },
        { url: "/icon-512x512.png", revision: "03412deadbcebfd97a179b55f85beb77" },
        { url: "/logo.svg", revision: "8c188bf4feaced8fc8da70ce294b1418" },
        { url: "/manifest.json", revision: "e1fe61e6ce1f134585c964ce47cff99e" },
        { url: "/no-data-dark.png", revision: "aa81fa7006467c00bc781629747a05dc" },
        { url: "/no-data.png", revision: "8ff7094e6918c400a7d99c38ddd1a314" },
        { url: "/self-attention-output.png", revision: "087b831f622f83e4529c1bbf646530f0" },
        { url: "/shopify.png", revision: "3036d9ca89a9a51ea6945c7492721b15" },
        { url: "/slack.png", revision: "8abf8433ff17cd0874e5ae9ac6c05457" },
        { url: "/transformer_architecture.png", revision: "6d335c4bd879cc8ccbd1ee6da1b90846" },
        {
          url: "/transformer_multi-headed_self-attention-recap.png",
          revision: "3cd76d3e0d8a20d87dfa586b56cc1ad3",
        },
        { url: "/trello.png", revision: "1559a098a8d93ffe1988852a58a3804a" },
        { url: "/vehicules/car.png", revision: "48e4f8d0d0269017b5484b86e5da04e5" },
        { url: "/vehicules/large.png", revision: "dc093e89fc4cc5314552975ec753e409" },
        { url: "/vehicules/medium.png", revision: "87299048ba3918679c80e951364bce96" },
        { url: "/vehicules/small.png", revision: "6654f847000c2b595a8a1d3d1f661973" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: a, event: s, state: c }) =>
              a && "opaqueredirect" === a.type
                ? new Response(a.body, { status: 200, statusText: "OK", headers: a.headers })
                : a,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        const a = e.pathname
        return !a.startsWith("/api/auth/") && !!a.startsWith("/api/")
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        return !e.pathname.startsWith("/api/")
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      "GET"
    )
})
