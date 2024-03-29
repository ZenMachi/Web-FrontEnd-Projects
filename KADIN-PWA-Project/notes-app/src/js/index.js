// Import our custom CSS
import "../scss/main.scss";
import swRegister from "./utils/sw-register";

import App from "./views/app";
import * as bootstrap from "bootstrap";

const app = new App({
  content: document.getElementById("mainContent"),
  navListContainer: document.querySelectorAll(
    "#navListContainer, #navListOffcanvas"
  ),
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", async () => {
  app.renderPage();

  await swRegister();
});
