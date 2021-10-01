function getPokemon() {
    var searchPokemon = document.querySelector("#search-pokemon").value;
    var pokemonName = document.querySelector("#pokemon-name")
    pokemonName.innerHTML = '';

    console.log(searchPokemon)

    if(!searchPokemon){
        alert("You need to enter something")
        return false;
    }

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
        pokemonName.innerHTML = searchPokemon;
        
        var imgEl = document.querySelector("#pokemon-image")

        imgEl.innerHTML = '';
        var img = document.createElement('img');
        img.setAttribute('src', response.sprites.front_default)

        imgEl.appendChild(img);
    })
}