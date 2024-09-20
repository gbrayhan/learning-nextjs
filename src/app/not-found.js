// app/not-found.js o pages/not-found.js
import Link from 'next/link';

export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>404 - Página no encontrada</h1>
            <p>Lo sentimos, pero la página que buscas no existe.</p>
            <Link href="/">
                Volver al inicio
            </Link>
        </div>
    );
}
