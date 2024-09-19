import React from 'react';

// Este componente se renderiza en el servidor
export default async function PokemonPage() {
    // Fetch de datos directamente dentro del componente
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
    const data = await res.json();
    const pokemons = data.results;

    return (
        <div>
            <h1>Pokémon List</h1>
            <ul>
                {pokemons.map((pokemon, index) => (
                    <li key={index}>{pokemon.name}</li>
                ))}
            </ul>
        </div>
    );
}
