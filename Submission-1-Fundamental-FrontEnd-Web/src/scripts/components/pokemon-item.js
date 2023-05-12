class PokemonItem extends HTMLElement {
  constructor() {
    super();
  }

  set pokemon(pokemon) {
    this._pokemon = pokemon;
    this.render();
  }

  render() {
    this.innerHTML = `
    <style>
    .image-pokemon {
        max-width: 300px;
      }
      </style>
    
        <div class="card rounded-4 element-${this._pokemon.type}">
          <div class="card-body">
            <img
              class="image-pokemon card-img rounded mx-auto d-block"
              src="${this._pokemon.image}"
              alt=""
            />
            <h5 class="text-capitalize">Name\u2003: ${this._pokemon.name}</h5>
            <h5 class="text-capitalize">Type\u2002\u2003: ${this._pokemon.type}</h5>
          </div>
        </div>
      `;
  }
}

customElements.define("pokemon-item", PokemonItem);
