const pokemonNumber = document.querySelector(".pokemonNumber");
const pokemonName = document.querySelector(".pokemonName");
const pokemonImage = document.querySelector(".pokemonImage");
const buttonNext = document.querySelector(".buttonNext");
const buttonPrev = document.querySelector(".buttonPrev");
const input = document.querySelector(".inputSearch");
const form = document.querySelector(".form");
const pokeballSpinner = document.querySelector("#ball");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonNumber.innerText = "";
  pokemonImage.style.display = "none";
  pokemonName.innerText = "";
  pokeballSpinner.classList.add("ball");

  const data = await fetchPokemon(pokemon);

  pokeballSpinner.classList.remove("ball");

  if (data) {
    console.log(data);
    pokemonNumber.innerText = `${data.id} - `;
    pokemonName.innerText = data.name;
    pokemonImage.style.display = "block";
    pokemonImage.setAttribute(
      "src",
      ` ${data.sprites.versions["generation-v"]["black-white"].animated.front_default}`
    );
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerText = "Não encontrado";
    pokemonNumber.innerText = "";
  }
  input.value = "";
};

form.addEventListener("submit", () => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon--;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon++;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
