import "../scripts/components/pokemon-list.js";
import "../scripts/components/search-bar.js";

const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
const searchElement = document.querySelector("search-bar");

function main() {
  fetchPokemon();
  document.addEventListener("DOMContentLoaded", () => {
    searchElement.clickEvent = function () {
      if (!searchElement.value == null || !searchElement.value == "") {
        searchPokemon();
      } else {
        alert("This Can't be Empty");
      }
    };
  });
}

const fetchPokemon = () => {
  const pokeArray = [];
  for (let i = 1; i <= 150; i++) {
    const url = `${baseUrl}${i}`;
    pokeArray.push(fetch(url).then((response) => response.json()));
  }

  Promise.all(pokeArray).then((results) => {
    const pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites["front_default"],
      type: data.types[0].type.name,
    }));
    displayPokemon(pokemon);
  });
};

const searchPokemon = () => {
  const pokeArray = [];
  const url = `${baseUrl}${searchElement.value.toLowerCase()}`;
  pokeArray.push(fetch(url).then((response) => response.json()));

  Promise.all(pokeArray).then((results) => {
    const pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites["front_default"],
      type: data.types.map((types) => types.type.name).join(", "),
    }));
    displayPokemon(pokemon);
  });
};

const displayPokemon = (items) => {
  const pokemonListElement = document.querySelector("pokemon-list");
  pokemonListElement.items = items;
};

export default main;
