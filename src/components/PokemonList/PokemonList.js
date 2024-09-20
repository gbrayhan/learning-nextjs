// app/PokemonList.js
import React from 'react';
import Link from 'next/link';

// Simulamos un fetch para obtener los Pokémon
async function fetchPokemonList() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
    const data = await res.json();
    return data.results;
}

export default async function PokemonList() {
    const pokemonList = await fetchPokemonList();

    return (
        <div>
            <h2>Pokémon List</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {pokemonList.map((pokemon, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                        <Link href={`/pokemon/${index + 1}`}>
                            {pokemon.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
