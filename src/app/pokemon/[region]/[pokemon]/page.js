// app/pokemon/[region]/[pokemon]/page.js
import { notFound } from 'next/navigation';

export default async function PokemonDetails({ params }) {
    const { region, pokemon } = params;

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!res.ok) {
        notFound();
    }

    const pokemonData = await res.json();

    return (
        <div>
            <h1>{pokemonData.name} - Región: {region}</h1>
            <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
            <p>Altura: {pokemonData.height}</p>
            <p>Peso: {pokemonData.weight}</p>
        </div>
    );
}


// Opcional para generar rutas estáticas en tiempo de compilación
export async function generateStaticParams() {
    const regions = ['kanto', 'johto'];
    const pokemons = ['pikachu', 'eevee'];

    const paths = [];

    // Generar combinaciones de regiones y pokémon para las rutas estáticas
    regions.forEach((region) => {
        pokemons.forEach((pokemon) => {
            paths.push({ region, pokemon });
        });
    });

    return paths;
}
