'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"assets/assets/images/loading_background.jpg": "4b07b728faa9195ac46f0c9570be6307",
"assets/assets/fonts/Trispace/Trispace-Bold.ttf": "c429b4307ee01cf2761be36e6fe52871",
"assets/assets/fonts/Trispace/Trispace-Thin.ttf": "9008f832d7b4bf463df071775a432668",
"assets/assets/fonts/Trispace/Trispace-SemiBold.ttf": "ec11387f78712ea5815d14cf229da6a3",
"assets/assets/fonts/Trispace/Trispace-ExtraBold.ttf": "d3ae0bed8f7285069adc850d8c2472d1",
"assets/assets/fonts/Trispace/Trispace-Light.ttf": "7f0d6d41489684351d3164e32099af57",
"assets/assets/fonts/Trispace/Trispace-ExtraLight.ttf": "6b67b365c47534f850c7e50517dbba54",
"assets/assets/fonts/Trispace/Trispace-Medium.ttf": "a3a2adb33b87e3024a8606dd291d8b28",
"assets/assets/fonts/Trispace/Trispace-Regular.ttf": "a1f9fdc75251f6059a82a768e1285c4a",
"assets/assets/fonts/FiraSans/FiraSans-LightItalic.ttf": "6d15364fb3883d074dea8096229942a7",
"assets/assets/fonts/FiraSans/FiraSans-SemiBold.ttf": "934104ff7f5dde5e3a31ddd7967f1601",
"assets/assets/fonts/FiraSans/FiraSans-ExtraLight.ttf": "882c94daf9a5a47d4450feef12da7c22",
"assets/assets/fonts/FiraSans/FiraSans-Bold.ttf": "a1acb00f5bffd4e7b86f0cfb89fa184a",
"assets/assets/fonts/FiraSans/FiraSans-MediumItalic.ttf": "accc827815df0405d6c359d7c4864737",
"assets/assets/fonts/FiraSans/FiraSans-ExtraLightItalic.ttf": "c606dc72dd989c9b294d4377851f78a0",
"assets/assets/fonts/FiraSans/FiraSans-Regular.ttf": "895f5b025a6cc4924b263f6beb06c777",
"assets/assets/fonts/FiraSans/FiraSans-Thin.ttf": "979e1f11f340455e5a96e81b0e7de352",
"assets/assets/fonts/FiraSans/FiraSans-Light.ttf": "034229170eceddca9e300e8d2a4c8208",
"assets/assets/fonts/FiraSans/FiraSans-Italic.ttf": "a64f4d7e638fd4a29cf8db587c6cf256",
"assets/assets/fonts/FiraSans/FiraSans-BlackItalic.ttf": "6d2de0fc6c58b97d71ac902b17a09d67",
"assets/assets/fonts/FiraSans/FiraSans-ExtraBold.ttf": "288ae68143ba59504bdcca56644f4c66",
"assets/assets/fonts/FiraSans/FiraSans-Medium.ttf": "d7fafde2fe8dd421fc8db1a7f48965d6",
"assets/assets/fonts/FiraSans/FiraSans-SemiBoldItalic.ttf": "2ea63246f4a65f79a68a4903473c2de7",
"assets/assets/fonts/FiraSans/FiraSans-ExtraBoldItalic.ttf": "e324c570f2d246f453acb8cbddfb30ba",
"assets/assets/fonts/FiraSans/FiraSans-BoldItalic.ttf": "2a3831c8cc982915d1a627598ead29b4",
"assets/assets/fonts/FiraSans/FiraSans-Black.ttf": "e38d2dbca82fb8eece1840a541f281c6",
"assets/assets/fonts/FiraSans/FiraSans-ThinItalic.ttf": "68cf3ce6260664b260e5474d7169cd39",
"assets/FontManifest.json": "59524e4221978dc0b3600f472afdfe82",
"assets/NOTICES": "f37b77a8eeb5b1a7a1e8dd791223e6f9",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/AssetManifest.json": "526f872a7a1f39695d73262b98022acf",
"index.html": "c140814dcd6f8da03e5e229d892be484",
"/": "c140814dcd6f8da03e5e229d892be484",
"manifest.json": "e21296eb64d5c7c916d47e59e234c5b3",
"main.dart.js": "118872f46b71ac247c724952ca3bceac",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"version.json": "82c9ef01e003208f7b26f04aeb7de6cc"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
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
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
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
