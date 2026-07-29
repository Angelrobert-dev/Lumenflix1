// Proxy vers l'API maxxtech : le navigateur de l'utilisateur ne parle plus
// jamais directement a api.maxxtech.co.ke, il parle a NOTRE propre domaine
// Netlify. Ca evite le blocage CORS du navigateur et cache la cle API.

const API_BASE = 'https://api.maxxtech.co.ke';
const API_KEY = 'carlymaxx';

export default async (request) => {
    const url = new URL(request.url);
    const endpoint = url.searchParams.get('endpoint');

    if (!endpoint || !endpoint.startsWith('/')) {
        return new Response(
            JSON.stringify({ success: false, message: 'Parametre endpoint manquant ou invalide' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const upstream = new URL(API_BASE + endpoint);
    upstream.searchParams.set('apikey', API_KEY);
    for (const [key, value] of url.searchParams) {
        if (key !== 'endpoint') upstream.searchParams.set(key, value);
    }

    try {
        const upstreamRes = await fetch(upstream.toString());
        const body = await upstreamRes.text();
        return new Response(body, {
            status: upstreamRes.status,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=120'
            }
        });
    } catch (err) {
        return new Response(
            JSON.stringify({ success: false, message: 'Erreur de connexion au proxy' }),
            { status: 502, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

export const config = { path: '/api/movie-proxy' };
