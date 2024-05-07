
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

const searchInput = getElement('.search-input'),
      searchButton = getElement('.search-button'),
      container = getElement('.pokemon'),
      erroMessage = getElement('.error');

var pokeName, // Nome ou numero passado na caixa de busca
    pokemon, // Responsavel por guardar os dados recebidos da API
    card; // Responsavel por receber o HTML 




function getElement(element) {
  return document.querySelector(element);
}


function requestPokeInfo(url, name) {
  fetch(url + name)
    .then(response => response.json())
    .then(data => {
      pokemon = data;
    })
    .catch(err => console.log(err));
}


function createCard () {
  card = `
    <div class="pokemon-info">
    <img src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}">
        <h2 class="name">Name: ${pokemon.name}</h1>
        <h3 class="number">Nº ${pokemon.id}</h2>
        <h4 class="type">Type: ${pokemon.types.map(item => item.type.name).toString()}</h3>
        <h4 class="weight">Weight: ${pokemon.weight  / 10}kg</h3>
        <h4 class="height">Height: ${pokemon.height  / 10}m</h3>
    </div>`;
  return card;
}

function startApp(pokeName) {
  requestPokeInfo(baseUrl, pokeName);

  setTimeout(function () {

    if(pokemon.detail) {
      erroMessage.style.display = 'block';
      container.style.display = 'none';
    }else{
      erroMessage.style.display = 'none';
      container.style.display = 'grid';
      container.innerHTML = createCard();
    }
  }, 2000);
}

searchButton.addEventListener('click', event => {
  event.preventDefault();
  pokeName = searchInput.value.toLowerCase();
  startApp(pokeName);
  container.classList.add('fade');

  // Reseta o efeito fade removendo a classe fade
  setTimeout(() => {
    container.classList.remove('fade');
  }, 3000);
});