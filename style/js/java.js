//Variable to hold all searched pokemon in an array
var caughtPokemon=[];

// displays the searched pokemon
function createCaughtPokemon() {
    var searchPokemon = document.querySelector("#search-pokemon").value;

    caughtPokemon.push(searchPokemon);

    var ulist = document.querySelector("#caught-ulist");
    var savedPokemon = searchPokemon;
    var li = document.createElement("caught-li");

    // appends the searched pokemon to the list at the top of the page for Caught pokemon
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(savedPokemon));
    ulist.appendChild(li);

    //Locally stores the searched pokemon 
    localStorage.setItem('caughtPokemon', JSON.stringify(caughtPokemon));
}

// return the pokemon from localstorage
function returnLocalStorage() {
    
    var saved = JSON.parse(localStorage.getItem("caughtPokemon"));

    if (!saved){
        return false;
    }

    saved.push(caughtPokemon);
    
    for(i = 0; i < saved.length - 1; i++){
        var pokemon = saved[i];
        var ulist = document.querySelector("#caught-ulist");
        var li = document.createElement("caught-li");

        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(pokemon));
        ulist.appendChild(li);
        console.log(pokemon)
        caughtPokemon.push(pokemon);
    }
}

//when clicked clears localstorage
function clearStorage(){
    localStorage.clear();
    caughtPokemon = [];
    location.reload();    
}



//Function to call Api
function getPokemon() {
    var searchPokemon = document.querySelector("#search-pokemon").value;
    var pokemonName = document.querySelector("#pokemon-name")
    pokemonName.innerHTML = '';

    console.log(searchPokemon)

    if(!searchPokemon){
        alert("You need to enter something")
        return false;
    }

    // Fetch call
    fetch("https://pokeapi.co/api/v2/pokemon/" + searchPokemon.toLowerCase())
    .then(function(response){
        if (response.ok) {
            console.log(response)
            return response.json();
        }
        else {
            alert('Error: Not found');
            return ;
        }
    })
    .then(function(response){
        //Attaching fetched image of pokemon to display on page
        pokemonName.innerHTML = searchPokemon;
        
        var imgEl = document.querySelector("#pokemon-image")

        imgEl.innerHTML = '';
        var img = document.createElement('img');
        img.setAttribute('src', response.sprites.front_default)

        imgEl.appendChild(img);
    })
    createCaughtPokemon()

    document.querySelector("#search-pokemon").value = "";
}

//call returnLocalStorage function on load
returnLocalStorage()