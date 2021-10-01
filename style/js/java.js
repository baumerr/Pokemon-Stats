function getPokemon() {
    fetch("https://pokeapi.co/api/v2/pokemon/charmander")
    .then(function(response){
        if(response.ok) {
            console.log(response)
            return response.json();
        }
        else {
            alert('error: Not found');
            return;
        }
    })
    .then(function(response){
        console.log(response)
        var imgEl = document.querySelector("#pokemon-image")

        imgEl.innerHTML = '';
        var img = document.createElement('img');
        img.setAttribute('src', response.sprites.front_default)

        imgEl.appendChild(img);
    })
}