// app/pokemon/page.js
import React from 'react';
import './pokemon.css';  // Importamos el CSS que crearemos

async function getPokemonDetails(pokemonUrl) {
    try {
        const res = await fetch(pokemonUrl);
        const pokemonData = await res.json();
        return pokemonData;
    } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        return null;
    }
}

async function fetchPokemonList() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10', {
        cache: 'no-store',
    });
    const data = await res.json();

    const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
            const details = await getPokemonDetails(pokemon.url);
            return {
                name: pokemon.name,
                image: details?.sprites?.front_default || '',
                types: details?.types.map((typeObj) => typeObj.type.name).join(', ') || 'Unknown',
            };
        })
    );

    return pokemonDetails;
}

export default async function PokemonPage() {
    let pokemonList = [];

    try {
        pokemonList = await fetchPokemonList();
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }

    return (
        <div className="pokemon-container">
            <h1 className="title">Pokémon List</h1>
            {pokemonList.length === 0 ? (
                <p>No se pudieron obtener los datos de Pokémon. Inténtalo más tarde.</p>
            ) : (
                <div className="pokemon-grid">
                    {pokemonList.map((pokemon, index) => (
                        <div key={index} className="pokemon-card">
                            <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
                            <h3 className="pokemon-name">{pokemon.name}</h3>
                            <p className="pokemon-types">Tipos: {pokemon.types}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
