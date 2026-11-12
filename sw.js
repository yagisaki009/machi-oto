/* オフライン用：一度ひらいたら端末に保存して、電波がなくても動くようにする */
var CACHE = 'machi-oto-v1';
var FILES = ['./', 'index.html', 'scene.js', 'machi.jpg', 'manifest.webmanifest', 'icon-180.png', 'icon-512.png', 'sounds/s_04d9c00f.m4a', 'sounds/s_0e10b5bd.m4a', 'sounds/s_0f195c97.m4a', 'sounds/s_11127647.m4a', 'sounds/s_11d8f55a.m4a', 'sounds/s_13c9b85a.m4a', 'sounds/s_1564be69.m4a', 'sounds/s_1ba870ff.m4a', 'sounds/s_1ebea33d.m4a', 'sounds/s_1fde742f.m4a', 'sounds/s_2bf013ad.m4a', 'sounds/s_2f31b8ea.m4a', 'sounds/s_33832328.m4a', 'sounds/s_3538f902.m4a', 'sounds/s_3b5433bb.m4a', 'sounds/s_3cda4652.m4a', 'sounds/s_3da20939.m4a', 'sounds/s_47c81e44.m4a', 'sounds/s_4a6a73a9.m4a', 'sounds/s_4beb8a35.m4a', 'sounds/s_4c33299e.m4a', 'sounds/s_4c51330c.m4a', 'sounds/s_4ccece58.m4a', 'sounds/s_4cf338a1.m4a', 'sounds/s_582718e4.m4a', 'sounds/s_5923ce61.m4a', 'sounds/s_5a93eb45.m4a', 'sounds/s_5c0ae35e.m4a', 'sounds/s_5c416698.m4a', 'sounds/s_5e9dae94.m4a', 'sounds/s_5ec54a4a.m4a', 'sounds/s_6338ccfd.m4a', 'sounds/s_66681c19.m4a', 'sounds/s_684a8aa8.m4a', 'sounds/s_68ba4b65.m4a', 'sounds/s_6dd46dbd.m4a', 'sounds/s_6f3ff028.m4a', 'sounds/s_6fd9a092.m4a', 'sounds/s_716d4ee7.m4a', 'sounds/s_7a2674eb.m4a', 'sounds/s_7cb38408.m4a', 'sounds/s_7cfbac79.m4a', 'sounds/s_7e157136.m4a', 'sounds/s_8662749b.m4a', 'sounds/s_8666b3bf.m4a', 'sounds/s_89e0fdc2.m4a', 'sounds/s_8b5c34c0.m4a', 'sounds/s_913813e3.m4a', 'sounds/s_958190eb.m4a', 'sounds/s_9d1e5e68.m4a', 'sounds/s_9fd958eb.m4a', 'sounds/s_a2b84d9f.m4a', 'sounds/s_b0ebaf5c.m4a', 'sounds/s_b33391f1.m4a', 'sounds/s_b5f7d815.m4a', 'sounds/s_bb68226f.m4a', 'sounds/s_bf86f7d6.m4a', 'sounds/s_c1731632.m4a', 'sounds/s_c9a11ea9.m4a', 'sounds/s_ceefb389.m4a', 'sounds/s_d43784e4.m4a', 'sounds/s_d4c563e9.m4a', 'sounds/s_da8472d7.m4a', 'sounds/s_db134f40.m4a', 'sounds/s_e3be4826.m4a', 'sounds/s_e421285c.m4a', 'sounds/s_e506c05e.m4a', 'sounds/s_e799e8f7.m4a', 'sounds/s_ebe422e1.m4a', 'sounds/s_edaf4ed9.m4a', 'sounds/s_ef42f837.m4a', 'sounds/s_efa1dd56.m4a', 'sounds/s_f44f50fb.m4a', 'sounds/s_fa745865.m4a', 'sounds/s_faff500c.m4a', 'sounds/v_aquakid.m4a', 'sounds/v_bluekids.m4a', 'sounds/v_boat.m4a', 'sounds/v_bus.m4a', 'sounds/v_camerakid.m4a', 'sounds/v_densha.m4a', 'sounds/v_dogboy.m4a', 'sounds/v_fuji.m4a', 'sounds/v_fune.m4a', 'sounds/v_greenkids.m4a', 'sounds/v_haitatsu.m4a', 'sounds/v_hashinoko.m4a', 'sounds/v_hatkids.m4a', 'sounds/v_hiker.m4a', 'sounds/v_kakariin.m4a', 'sounds/v_kirin.m4a', 'sounds/v_koala.m4a', 'sounds/v_koujinohito.m4a', 'sounds/v_kujirakid.m4a', 'sounds/v_panda.m4a', 'sounds/v_papa.m4a', 'sounds/v_papakid.m4a', 'sounds/v_ramen.m4a', 'sounds/v_rocket.m4a', 'sounds/v_shateki.m4a', 'sounds/v_shiikuin.m4a', 'sounds/v_shinkansen.m4a', 'sounds/v_skytree.m4a', 'sounds/v_slidekid.m4a', 'sounds/v_sunaboy.m4a', 'sounds/v_sunagirl.m4a', 'sounds/v_sushi.m4a', 'sounds/v_udon.m4a', 'sounds/v_usagigirl.m4a', 'sounds/v_ushikid.m4a', 'sounds/v_youchienbus.m4a'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    /* 同じサイトのほかのアプリ（電車・まち・がっき）の保存データは消さない。自分の古い版だけ消す */
    var mine = CACHE.replace(/v\d+$/, '');
    return Promise.all(keys.map(function (k) { if (k !== CACHE && k.indexOf(mine) === 0) return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
/* 保存してあるものをすぐ返す（電波が弱くても待たない）。裏で新しい版があれば取っておく */
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(caches.open(CACHE).then(function (c) {
    return c.match(req, { ignoreSearch: true }).then(function (hit) {
      var net = fetch(req).then(function (res) {
        if (res && res.ok && req.url.indexOf(self.location.origin) === 0) c.put(req, res.clone());
        return res;
      });
      if (hit) { net['catch'](function () {}); return hit; }
      return net['catch'](function () { return c.match('index.html'); });
    });
  }));
});
