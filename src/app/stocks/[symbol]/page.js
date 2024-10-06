// app/stocks/[symbol]/page.jsx

import React from 'react';

// Revalidar la página cada 60 segundos para ISR
export const revalidate = 60;

// Permitir generación dinámica de páginas para símbolos no pre-renderizados
export const dynamicParams = true;

// Pre-generar páginas para acciones populares durante la build
export async function generateStaticParams() {
    const popularStocks = ['AAPL', 'GOOGL', 'MSFT', 'TSLA'];

    return popularStocks.map((symbol) => ({
        symbol,
    }));
}

// Función para obtener datos de la API de Alpha Vantage
async function fetchStockData(symbol) {
    const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('Error en la solicitud a Alpha Vantage');
    }

    const data = await res.json();

    if (data['Error Message'] || data['Note']) {
        throw new Error(data['Error Message'] || data['Note']);
    }

    return data;
}

// Componente de la página dinámica de la acción
export default async function StockPage({ params }) {
    const { symbol } = params;

    try {
        const data = await fetchStockData(symbol);
        const timeSeries = data['Time Series (Daily)'];

        if (!timeSeries) {
            throw new Error('No se encontraron datos de la serie temporal.');
        }

        const latestDate = Object.keys(timeSeries)[0];
        const latestData = timeSeries[latestDate];

        return (
            <main>
                <h1>{symbol} - Datos de la Acción</h1>
                <p>Última Actualización: {latestDate}</p>
                <ul>
                    <li>Apertura: ${parseFloat(latestData['1. open']).toFixed(2)}</li>
                    <li>Cierre: ${parseFloat(latestData['4. close']).toFixed(2)}</li>
                    <li>Máximo: ${parseFloat(latestData['2. high']).toFixed(2)}</li>
                    <li>Mínimo: ${parseFloat(latestData['3. low']).toFixed(2)}</li>
                </ul>
            </main>
        );
    } catch (error) {
        return <p>Error al obtener datos para {symbol}: {error.message}</p>;
    }
}
