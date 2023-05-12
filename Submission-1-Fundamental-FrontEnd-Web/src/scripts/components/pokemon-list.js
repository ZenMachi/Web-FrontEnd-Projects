import "./pokemon-item.js";

class PokemonList extends HTMLElement {
  constructor() {
    super();
  }
  set items(items) {
    this._items = items;
    this.render();
  }

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
