// app/PokemonDetails.js
import React from 'react';

// Simulamos un fetch para obtener los detalles de un Pokémon
async function fetchPokemonDetails(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    return data;
}

export default async function PokemonDetails({ id = 1 }) {
    const pokemonDetails = await fetchPokemonDetails(id);

    return (
        <div>
            <h2>{pokemonDetails.name}</h2>
            <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
            <p><strong>Height:</strong> {pokemonDetails.height}</p>
            <p><strong>Weight:</strong> {pokemonDetails.weight}</p>
            <p><strong>Types:</strong> {pokemonDetails.types.map((type) => type.type.name).join(', ')}</p>
        </div>
    );
}
