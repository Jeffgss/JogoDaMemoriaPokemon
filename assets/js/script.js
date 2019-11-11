var baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
var background = "https://st2.depositphotos.com/1906711/11944/v/450/depositphotos_119441904-stock-illustration-pokeball-hanging-in-the-air.jpg";

var pokemonsSelecteds = [];
var pokemonList = [];

// Pegar as cartas do link na baseUrl
function createList () {
    for (var index = 1; index <= 10; index++) {
        pokemonList.push(`${baseUrl}${index}.png`);
    }
} 

// Checa se está correta a seleçoes das cartas
function checkIsRight(pokemon) {
    console.log(pokemonsSelecteds);
    if (pokemonsSelecteds.length === 0) {
        pokemonsSelecteds.push(pokemon);
        return;
    }
    var [pokemon1] = pokemonsSelecteds;
    var pokemon2 = pokemon;
    setTimeout(() => {
        if (pokemon1.src !== pokemon2.src) {
            unshowCard(pokemon1);
            unshowCard(pokemon2);
        }
        pokemonsSelecteds = [];
    }, 500);
}

function unshowCard(element) {
    element.src = element.getAttribute('data-background');
}

function showCard(event) {
    event.target.src = event.target.getAttribute('data-img');
    checkIsRight(event.target);
}

function createCardElement(pokemonUrl){
    var element = document.createElement("div");
    var imgElement = document.createElement("img");
    imgElement.src = pokemonUrl;
    setTimeout(() => imgElement.src = background, 2000);
    imgElement.setAttribute('data-img', pokemonUrl);
    imgElement.setAttribute('data-background', background);
    element.appendChild(imgElement);
    element.className = "poke-card";
    element.addEventListener('click', showCard);
    var grid = document.getElementById("grid");
    grid.appendChild(element);
}

function sortList() {
    pokemonList.sort(function(a, b) { return (0.5 - Math.random()) })
}

function createGrid() {
    var grid = document.getElementById("grid");
    grid.innerHTML = "";
    sortList();
    populateGrid();
    setTimeout(() => {
        sortList();
        populateGrid();
    },0);
}

function populateGrid() {
    for (var index = 0; index < pokemonList.length; index++) {
        var pokemonUrl = pokemonList[index];
        createCardElement(pokemonUrl);
    }
}

window.addEventListener('load', function() {
    createList();
    createGrid();
    var button = document.getElementById("start");
    button.addEventListener("click", function() {
        createGrid();
    });
});