'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "febf5722019056f8407bb4dc79511a8a",
"assets/AssetManifest.json": "54be76e362079be5d883e675679f3806",
"assets/assets/dialogs/0.json": "495c962fcabf417d3be22d10ec5bb9a4",
"assets/assets/dialogs/1.json": "6bcd080441104a116bf6939633c36208",
"assets/assets/dialogs/2.json": "9c78cd0da03b210c6baa8680bae494e7",
"assets/assets/dialogs/3.json": "b13474167dfe37c45441add977c1f3c0",
"assets/assets/dialogs/4.json": "b4466307d0d616cdb14c07b6bc818cbc",
"assets/assets/dialogs/5.json": "8fa5eeb45a8e18ab3678ad56c13d18c0",
"assets/assets/dialogs/6.json": "f1708a7f9a5138cf4ee4c377acccd97c",
"assets/assets/dialogs/7.json": "a2c5d87d6925797c563e0c8cd450081b",
"assets/assets/dialogs/8.json": "d2d4051641464a6831f595cf3949d608",
"assets/assets/dialogs/info.json": "53057efae359db7d662ca469fccac25f",
"assets/assets/dictionary/0.json": "b001989d20ef209637eb445f17b4211d",
"assets/assets/dictionary/1.json": "04bb08daac1c826b968e6c593f4da913",
"assets/assets/dictionary/10.json": "85b190cb4cf5ce1c94d05828da169349",
"assets/assets/dictionary/2.json": "0ca13505087e50dfa6ff42498f708276",
"assets/assets/dictionary/3.json": "e6e0cb5e72593daa3646b50bbb448bef",
"assets/assets/dictionary/4.json": "f9cc0de73a0cd2c911771e0a7f9ecb85",
"assets/assets/dictionary/5.json": "1df51d4438888276b581f58601175fbe",
"assets/assets/dictionary/6.json": "af1826c3d560061c2ef70a7bc341613a",
"assets/assets/dictionary/7.json": "e0f93cbb7335b27b5a92ae32f5348c8f",
"assets/assets/dictionary/8.json": "30038f892e7e648340a93f7ad7110f04",
"assets/assets/dictionary/9.json": "e5a8e0c7ccd0a26d8ff12e92cb8c2d80",
"assets/assets/tasks/0.json": "9049eb7afd74a498505572d9d213f7df",
"assets/assets/tasks/1.json": "33c0ea5e37a060247cb59d38e0970cb4",
"assets/assets/tasks/2.json": "10ed33012b09ef08bbdb1f0d4157a75a",
"assets/assets/tasks/3.json": "253729be672a0120187c691002f5f6fd",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "5a38795de44d7009733e6fddd369a7c6",
"assets/NOTICES": "4b1f25db786d1d75c9f796b737f4e7d2",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/fluttertoast/assets/toastify.js": "e7006a0a033d834ef9414d48db3be6fc",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "45bec3a754fba62b2d8f23c38895f029",
"canvaskit/canvaskit.wasm": "f5debd91d060226cf6c84571122e8064",
"canvaskit/chromium/canvaskit.js": "0447cabd24385be0436ab8429d76621c",
"canvaskit/chromium/canvaskit.wasm": "1b50f86e582b778987eb850503c2f91e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/skwasm.js": "831c0eebc8462d12790b0fadf3ab6a8a",
"canvaskit/skwasm.wasm": "dbf3501500f8e4edb30dc6597676d3b6",
"canvaskit/skwasm.worker.js": "7ec8c65402d6cd2a341a5d66aa3d021f",
"favicon.png": "0b543c5109bdc5bae7375e8f23acb484",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "d4b5d612e6522dff744a3546e09b7a0a",
"/": "d4b5d612e6522dff744a3546e09b7a0a",
"main.dart.js": "fa9785384e666795b8dfe2655d59fa74",
"manifest.json": "419df26244985a7bb3184826989aca5d",
"version.json": "a0e6e9893f0b54f72289af5448b36112"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
