class AppBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <header class="mb-5">
    <nav class="d-flex position-relative">
      <ul class="d-flex align-items-center mb-5 p-0 mx-auto">
        <li>
        <a href="javascript:window.location.reload(true)">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
            alt="Pokedex image"
          />
          </a>
        </li>
      </ul>
    </nav>
  </header>`;
  }
}

customElements.define("app-bar", AppBar);
