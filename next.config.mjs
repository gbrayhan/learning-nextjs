/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [{
            // Aplicar a todas las rutas
            source: '/(.*)', headers: [{
                key: 'Cache-Control', value: 'public, max-age=60, must-revalidate',
            },],
        }, {
            // Aplicar a las rutas de la API si las tienes
            source: '/api/(.*)', headers: [{
                key: 'Cache-Control', value: 'public, max-age=60, s-maxage=60, stale-while-revalidate=30',
            },],
        },];
    },


};

export default nextConfig;
