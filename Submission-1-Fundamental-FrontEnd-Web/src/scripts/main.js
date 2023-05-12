import "../scripts/components/pokemon-list.js";
import "../scripts/components/search-bar.js";

const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
const searchElement = document.querySelector("search-bar");

function main() {
  fetchPokemon();
  document.addEventListener("DOMContentLoaded", () => {
    searchElement.clickEvent = function () {
      // searchPokemon();
      if (!searchElement.value == null || !searchElement.value == "") {
        searchPokemon();
      } else {
        alert("This Can't be Empty");
      }
    };
    // const searchElement = document.getElementById("btnSearch");
    // searchElement.addEventListener("click", function () {
    //   console.log("test sat");
    // });
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
    // console.log(pokemon);
    displayPokemon(pokemon);
    // displayPokemon(pokemon);
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
    // console.log(pokemon);

    displayPokemon(pokemon);
  });

  // const pokeArray = [];
  // const searchElement = document.querySelector("search-bar");
  // const url = `${baseUrl}${searchElement.value}`;
  // fetch(url)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(pokeArray.push(data));
  //     const pokemon = {
  //       name: data.name,
  //       id: data.id,
  //       image: data.sprites["front_default"],
  //       type: data.types.map((types) => types.type.name).join(", "),
  //     };

  //     // console.log(pokemon);
  //     // displayPokemon(pokemon);
  //   });
};

// const displayPokemon = (pokemon) => {
//   const listPokemon = document.getElementById("listPokemon");
//   const pokemonHTMLString = pokemon.map(
//     (
//       pokeman
//     ) => `<div class="col-lg-3 col-md-6 col-sm-12" style="margin-top: 12px">
//   <div class="card">
//     <div class="card-body">
//       <img
//         class="image-pokemon card-img rounded mx-auto d-block"
//         src="${pokeman.image}"
//         alt=""
//       />
//       <h5>Name &emsp: ${pokeman.name}</h5>
//       <h5>Type &emsp: ${pokeman.type}</h5>
//     </div>
//   </div>
// </div>`
//   );
//   console.log(pokemon);
//   listPokemon.innerHTML = pokemonHTMLString;
// };

const displayPokemon = (items) => {
  const pokemonListElement = document.querySelector("pokemon-list");
  pokemonListElement.items = items;
};

export default main;
