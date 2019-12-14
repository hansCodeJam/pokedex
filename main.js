const pokedex = document.getElementById('pokedex');

for(let i = 1; i < 151; i++) {
    const fetchPokemon = () => {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        fetch(url)
        .then((res)=> {
            return res.json();
        })
        .then ((data)=> {
            console.log(data);
            const pokemon = {
             name: data.name,
             id: data.id,
             image: data.sprites['front_default'],
             type: data.types
                .map((type)=> type.type.name)
                .join(', ')
    
            };
            
            
            displayPokemon(pokemon);
        });
    }

    const displayPokemon = (pokemon) => {
        const pokemonHTMLString = pokemon.map(pokeman => `
            <li>
                <img src="${pokeman.image}"/>
                <h2>${pokeman.id}. ${pokeman.name}</h2>
                <p>Type: ${pokeman.type}</p>
            </li>
            `)
        pokedex.innerHTML = pokemonHTMLString;
    }
    
    fetchPokemon();

}
