// Proxy vers l'API maxxtech : le navigateur de l'utilisateur ne parle plus
// jamais directement a api.maxxtech.co.ke, il parle a NOTRE propre domaine
// Vercel. Ca evite le blocage CORS du navigateur et cache la cle API.
// Convention Vercel : ce fichier place dans /api/ devient automatiquement
// accessible a l'adresse /api/movie-proxy, sans configuration supplementaire.

const API_BASE = 'https://api.maxxtech.co.ke';
const API_KEY = 'carlymaxx';

export default async function handler(req, res) {
    const { endpoint, ...params } = req.query;

    if (!endpoint || !endpoint.startsWith('/')) {
        res.status(400).json({ success: false, message: 'Parametre endpoint manquant ou invalide' });
        return;
    }

    const upstream = new URL(API_BASE + endpoint);
    upstream.searchParams.set('apikey', API_KEY);
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) upstream.searchParams.set(key, value);
    }

    try {
        const upstreamRes = await fetch(upstream.toString());
        const body = await upstreamRes.text();
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'public, max-age=120');
        res.status(upstreamRes.status).send(body);
    } catch (err) {
        res.status(502).json({ success: false, message: 'Erreur de connexion au proxy' });
    }
}
