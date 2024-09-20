import React, { Suspense } from 'react';

// Importamos los componentes diferidos
import PokemonList from "@/components/PokemonList";
import PokemonDetails from "@/components/PokemonDetails";

export default function PokemonPage() {
    return (
        <div>
            <header>
                <h1>Pokémon Viewer</h1>
                <p>Explore and view details of your favorite Pokémon!</p>
            </header>

            <main style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: '1' }}>
                    {/* Suspense para la lista de Pokémon */}
                    <Suspense fallback={<div>Loading Pokémon List...</div>}>
                        <PokemonList />
                    </Suspense>
                </div>

                <div style={{ flex: '2', paddingLeft: '20px' }}>
                    {/* Suspense para los detalles del Pokémon seleccionado */}
                    <Suspense fallback={<div>Select a Pokémon to view details...</div>}>
                        <PokemonDetails />
                    </Suspense>
                </div>
            </main>
        </div>
    );
}
