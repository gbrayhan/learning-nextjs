// pages/index.js

import Link from 'next/link';

export default function Home() {
  const popularStocks = ['AAPL', 'GOOGL', 'MSFT', 'TSLA'];

  return (
      <main>
        <h1>Acciones Populares</h1>
        <ul>
          {popularStocks.map((symbol) => (
              <li key={symbol}>
                <Link href={`/stocks/${symbol}`}>
                  {symbol}
                </Link>
              </li>
          ))}
        </ul>
      </main>
  );
}
