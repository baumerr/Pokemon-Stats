//Variable to hold all searched pokemon in an array
var caughtPokemon = [];

// displays the searched pokemon
function createCaughtPokemon() {
  var searchPokemon = document.querySelector("#search-pokemon").value;

  caughtPokemon.push(searchPokemon);

  var ulist = document.querySelector("#caught-ulist");
  var savedPokemon = pokemonDisplayName(searchPokemon);
  var li = document.createElement("caught-li");

  // appends the searched pokemon to the list at the top of the page for Caught pokemon
  li.className = "list-group-item";
  li.appendChild(document.createTextNode(savedPokemon));
  ulist.appendChild(li);

  //Locally stores the searched pokemon
  localStorage.setItem("caughtPokemon", JSON.stringify(caughtPokemon));
}

// return the pokemon from localstorage
function returnLocalStorage() {
  var saved = JSON.parse(localStorage.getItem("caughtPokemon"));

  if (!saved) {
    return false;
  }

  saved.push(caughtPokemon);

  for (i = 0; i < saved.length - 1; i++) {
    var pokemon = saved[i];
    var ulist = document.querySelector("#caught-ulist");
    var li = document.createElement("caught-li");

    li.className = "list-group-item";
    li.appendChild(document.createTextNode(pokemon));
    ulist.appendChild(li);
    console.log(pokemon);
    caughtPokemon.push(pokemon);
  }
}

//when clicked clears localstorage
function clearStorage() {
  localStorage.clear();
  caughtPokemon = [];
  location.reload();
}

function pokemonDisplayName(searchPokemon) {
  var small = searchPokemon.toLowerCase();
  return searchPokemon.charAt(0).toUpperCase() + small.slice(1);
}

//Function to call Api
function getPokemon(event) {
  event.preventDefault();
  
  var searchPokemon = document.querySelector("#search-pokemon").value;
  var pokemonName = document.querySelector("#pokemon-name");
  pokemonName.innerHTML = "";

  console.log(searchPokemon);

  if (!searchPokemon) {
    alert("You need to enter something");
    return false;
  } else {
    console.log("yo");
  }

  // Fetch call
  fetch("https://pokeapi.co/api/v2/pokemon/" + searchPokemon.toLowerCase())
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert("Error: Not found");
        return;
      }
    })
    .then(function (response) {
      console.log(response);
      console.log(response.stats[0].base_stat);

      // displaying stats
      var hpEl = document.querySelector("#hp");
      var hp = response.stats[0].base_stat;
      hpEl.innerHTML = "<span>" + "HP: " + hp + "</span>";

      var attackEl = document.querySelector("#attack");
      var attack = response.stats[1].base_stat;
      attackEl.innerHTML = "<span>" + "Attack: " + attack + "</span>";

      var defenceEl = document.querySelector("#defence");
      var defence = response.stats[2].base_stat;
      defenceEl.innerHTML = "<span>" + "Defence: " + defence + "</span>";

      var specialAttackEl = document.querySelector("#special-attack");
      var specialAttack = response.stats[3].base_stat;
      specialAttackEl.innerHTML =
        "<span>" + "Special Attack: " + specialAttack + "</span>";

      var specialDefenceEl = document.querySelector("#special-defence");
      var specialDefence = response.stats[4].base_stat;
      specialDefenceEl.innerHTML =
        "<span>" + "Special Defence: " + specialDefence + "</span>";

      var speedEl = document.querySelector("#speed");
      var speed = response.stats[5].base_stat;
      speedEl.innerHTML = "<span>" + "Speed   : " + speed + "</span>";

      //Attaching fetched image of pokemon to display on page
      pokemonName.innerHTML = pokemonDisplayName(searchPokemon);

      var pokeId = response.id;
      console.log(pokeId);

      if (pokeId < 10) {
        return fetch(
          "https://api.github.com/repos/ZeChrales/PogoAssets/contents/pokemon_icons/pokemon_icon_00" +
            pokeId +
            "_00.png"
        );
      } else if (pokeId > 10 && pokeId < 100) {
        return fetch(
          "https://api.github.com/repos/ZeChrales/PogoAssets/contents/pokemon_icons/pokemon_icon_0" +
            pokeId +
            "_00.png"
        );
      } else {
        return fetch(
          "https://api.github.com/repos/ZeChrales/PogoAssets/contents/pokemon_icons/pokemon_icon_" +
            pokeId +
            "_00.png"
        );
      }
    })
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      var imgEl = document.querySelector("#pokemon-image");

      imgEl.innerHTML = "";
      var img = document.createElement("img");
      img.setAttribute("src", response.download_url);

      imgEl.appendChild(img);
    })
    .catch(function (event) {
      console.log(event);
      console.log("it's not working");
    });

  createCaughtPokemon();

  document.querySelector("#search-pokemon").value = "";
}

var startSearch = document.getElementById("user-submit");
startSearch.addEventListener("submit", getPokemon);

//call returnLocalStorage function on load
returnLocalStorage();
