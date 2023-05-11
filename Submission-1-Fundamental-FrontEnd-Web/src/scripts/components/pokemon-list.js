import "./pokemon-item.js";

class PokemonList extends HTMLElement {
  constructor() {
    super();
    // this.shadowDOM = this.attachShadow({ mode: "open" });
  }
  set items(items) {
    this._items = items;
    this.render();
  }

  // renderError(message) {
  //   this.shadowDOM.innerHTML = `<style>
  //   .placeholder {
  //     font-weight: lighter;
  //     color: rgba(0, 0, 0, 0.5);
  //     -webkit-user-select: none;
  //     -moz-user-select: none;
  //     -ms-user-select: none;
  //     user-select: none;
  //   }
  //   </style>`;
  //   this.shadowDOM.innerHTML += `<h2 class="placeholder">${message}</h2>`;
  // }

  render() {
    this.innerHTML = "";
    this._items.map((items) => {
      const pokemonListItem = document.createElement("pokemon-item");
      pokemonListItem.className = "col-lg-4 col-md-6 col-sm-12";
      pokemonListItem.style = "margin-top: 32px";
      pokemonListItem.pokemon = items;
      this.appendChild(pokemonListItem);
    });
  }
}

customElements.define("pokemon-list", PokemonList);
