const pokedex = document.getElementById('pokedex');

const filterInputFunctionName = () => {
    let input = document.getElementById('input')
    let filter = input.value.toUpperCase();
    const ul = pokedex;
    let li = ul.getElementsByTagName('li');

    for (let i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h2")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

const filterInputFunctionType = () => {
    let input = document.getElementById('input-1')
    let filter = input.value.toUpperCase();
    const ul = pokedex;
    let li = ul.getElementsByTagName('li');

    for (let i = 0; i < li.length; i++) {
        a = li[i].getElementsTagName("p")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

// const filterInputFunctionAbilities = () => {
//     let input = document.getElementById('input-2')
//     let filter = input.value.toUpperCase();
//     let ul = pokedex;
//     let li = ul.getElementsByTagName('li');

//     for (let i = 0; i < li.length; i++) {
//         a = li[i].getElementsByTagName("p")[2];
//         txtValue = a.textContent || a.innerText;
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//             li[i].style.display = "";
//         } else {
//             li[i].style.display = "none";
//         }
//     }
// }

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            ability: result.abilities.map((ability) => ability.ability.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle-1" id="p1">Type: ${pokeman.type}</p>
            <p class="card-subtitle-2" id="p2">Abilities: ${pokeman.ability}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();