// Revalida cada 60 segundos, lo que permite tener datos actualizados
export const revalidate = 60;

// Permite la generación dinámica de páginas para símbolos no pre-renderizados
export const dynamicParams = true;

// Alpha Vantage API key from environment variables
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

// Pre-generar algunas páginas para acciones populares en la build
export async function generateStaticParams() {
    const popularStocks = ['AAPL', 'GOOGL', 'MSFT', 'TSLA'];

    return popularStocks.map((symbol) => ({
        symbol: symbol,
    }));
}

// Función que obtiene los datos de la API de Alpha Vantage
async function fetchStockData(symbol) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    // Verificar si hubo un error en la solicitud
    if (!data || data['Error Message']) {
        throw new Error('Error fetching stock data');
    }

    return data;
}

// Página dinámica que muestra los datos de una acción en particular
export default async function StockPage({params}) {
    const {symbol} = params;

    try {
        const data = await fetchStockData(symbol);

        // Extraer el precio más reciente de la acción
        const latestDate = Object.keys(data['Time Series (Daily)'])[0];
        const latestData = data['Time Series (Daily)'][latestDate];

        return (
            <main>
                <h1>{symbol} Stock Data</h1>
                <p>Last Updated: {latestDate}</p>
                <p>Open: {latestData['1. open']}</p>
                <p>Close: {latestData['4. close']}</p>
                <p>High: {latestData['2. high']}</p>
                <p>Low: {latestData['3. low']}</p>
            </main>
        );
    } catch (error) {
        return <p>Error fetching stock data for {symbol}</p>;
    }
}
