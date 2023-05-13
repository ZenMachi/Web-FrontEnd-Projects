import { precacheAndRoute } from "workbox-precaching";

// Do precaching
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("push", (event) => {
  console.log("Service Worker: Pushed");
});
