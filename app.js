/**
 * LUMENFLIX - Streaming Platform
 * VERSION CORRIGEE - Timeout + Mock Data + Fallback
 */

const API_BASE = '/api/movie-proxy';
const FETCH_TIMEOUT = 5000;

const GENRE_ICONS = {
    'Action': 'fa-bomb', 'Adventure': 'fa-compass', 'Animation': 'fa-ghost',
    'Comedy': 'fa-laugh-beam', 'Crime': 'fa-user-secret', 'Documentary': 'fa-film',
    'Drama': 'fa-theater-masks', 'Family': 'fa-users', 'Fantasy': 'fa-dragon',
    'History': 'fa-landmark', 'Horror': 'fa-skull', 'Music': 'fa-music',
    'Mystery': 'fa-search', 'Romance': 'fa-heart', 'Sci-Fi': 'fa-rocket',
    'Thriller': 'fa-bolt', 'War': 'fa-shield-alt', 'Western': 'fa-hat-cowboy',
    'Action & Adventure': 'fa-running', 'Kids': 'fa-child', 'News': 'fa-newspaper',
    'Reality': 'fa-video', 'Talk': 'fa-comments', 'Soap': 'fa-heart-broken'
};

const MOCK_DATA = {
    hero: {
        imdb_id: 'tt0816692', title: 'Interstellar', year: 2014, rating: 8.7, runtime: 169,
        genres: ['Sci-Fi', 'Adventure', 'Drama'],
        poster: 'https://image.tmdb.org/t/p/w300/gEU2QniL6C8z19uVOtYnZ5UYj52.jpg',
        background: 'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
        summary: 'Dans un futur proche, la Terre est devenue hostile pour l\'humanite. Un groupe d\'explorateurs utilise un trou de ver recemment decouvert pour depasser les limites du voyage spatial.'
    },
    movies: [
        {imdb_id:'tt0816692', title:'Interstellar', year:2014, rating:8.7, genres:['Sci-Fi','Adventure'], poster:'https://image.tmdb.org/t/p/w300/gEU2QniL6C8z19uVOtYnZ5UYj52.jpg'},
        {imdb_id:'tt0468569', title:'The Dark Knight', year:2008, rating:9.0, genres:['Action','Crime'], poster:'https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg'},
        {imdb_id:'tt1375666', title:'Inception', year:2010, rating:8.8, genres:['Sci-Fi','Action'], poster:'https://image.tmdb.org/t/p/w300/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg'},
        {imdb_id:'tt0110912', title:'Pulp Fiction', year:1994, rating:8.9, genres:['Crime','Drama'], poster:'https://image.tmdb.org/t/p/w300/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'},
        {imdb_id:'tt0137523', title:'Fight Club', year:1999, rating:8.8, genres:['Drama'], poster:'https://image.tmdb.org/t/p/w300/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'},
        {imdb_id:'tt0109830', title:'Forrest Gump', year:1994, rating:8.8, genres:['Drama','Romance'], poster:'https://image.tmdb.org/t/p/w300/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg'},
        {imdb_id:'tt0133093', title:'The Matrix', year:1999, rating:8.7, genres:['Sci-Fi','Action'], poster:'https://image.tmdb.org/t/p/w300/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'},
        {imdb_id:'tt0099685', title:'Goodfellas', year:1990, rating:8.7, genres:['Crime','Drama'], poster:'https://image.tmdb.org/t/p/w300/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg'},
        {imdb_id:'tt0114369', title:'Se7en', year:1995, rating:8.6, genres:['Crime','Thriller'], poster:'https://image.tmdb.org/t/p/w300/6yoghtyTpznpBik8EngEmjSKQHE.jpg'},
        {imdb_id:'tt0172495', title:'Gladiator', year:2000, rating:8.5, genres:['Action','Drama'], poster:'https://image.tmdb.org/t/p/w300/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg'},
        {imdb_id:'tt0102926', title:'The Silence of the Lambs', year:1991, rating:8.6, genres:['Horror','Crime'], poster:'https://image.tmdb.org/t/p/w300/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg'},
        {imdb_id:'tt0120815', title:'Saving Private Ryan', year:1998, rating:8.6, genres:['War','Drama'], poster:'https://image.tmdb.org/t/p/w300/uqx37cS8cpE0kHZ9hN5nB5e1y5b.jpg'},
    ],
    series: [
        {id:1396, name:'Breaking Bad', year:'2008', rating:9.5, genres:['Drama','Crime'], poster:'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg'},
        {id:1399, name:'Game of Thrones', year:'2011', rating:9.3, genres:['Fantasy','Drama'], poster:'https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg'},
        {id:66732, name:'Stranger Things', year:'2016', rating:8.7, genres:['Sci-Fi','Horror'], poster:'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg'},
        {id:71912, name:'The Witcher', year:'2019', rating:8.2, genres:['Fantasy','Action'], poster:'https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa0M2b2nY.jpg'},
        {id:71446, name:'Money Heist', year:'2017', rating:8.3, genres:['Crime','Drama'], poster:'https://image.tmdb.org/t/p/w500/MoEKaPFHABtA1xKoOteirGaHl1.jpg'},
        {id:76479, name:'The Boys', year:'2019', rating:8.7, genres:['Action','Sci-Fi'], poster:'https://image.tmdb.org/t/p/w500/mY7SeH4HFFxW1hI7tXl0Y0l0Y0.jpg'},
        {id:60574, name:'Peaky Blinders', year:'2013', rating:8.8, genres:['Crime','Drama'], poster:'https://image.tmdb.org/t/p/w500/bGZn5RVzMMXg5wxX3qL9j9q0Y0.jpg'},
        {id:70523, name:'Dark', year:'2017', rating:8.8, genres:['Sci-Fi','Mystery'], poster:'https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJZH5Zz6y8X9Z.jpg'},
    ],
    categories: [
        {id:28, name:'Action'}, {id:12, name:'Adventure'}, {id:16, name:'Animation'},
        {id:35, name:'Comedy'}, {id:80, name:'Crime'}, {id:99, name:'Documentary'},
        {id:18, name:'Drama'}, {id:14, name:'Fantasy'}, {id:27, name:'Horror'},
        {id:10749, name:'Romance'}, {id:878, name:'Sci-Fi'}, {id:53, name:'Thriller'}
    ]
};

class LumenFlixApp {
    constructor() {
        this.currentView = 'home';
        this.previousView = null;
        this.currentMovie = null;
        this.currentSeries = null;
        this.currentSeason = 1;
        this.searchResults = { movies: [], series: [] };
        this.movieCategories = [];
        this.seriesCategories = [];
        this.heroData = null;
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000;
        this.apiAvailable = true;
        this.loadCount = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavbarScroll();
        // Afficher les mocks IMMEDIATEMENT
        this.renderHero(MOCK_DATA.hero);
        // Les 12 films de secours sont repartis en 3 groupes distincts pour eviter les doublons visuels
        this.renderCarousel('trendingMovies', MOCK_DATA.movies.slice(0,4), 'movie');
        this.renderCarousel('popularMovies', MOCK_DATA.movies.slice(4,8), 'movie');
        this.renderCarousel('topRatedMovies', MOCK_DATA.movies.slice(8,12), 'movie');
        this.renderCarousel('popularSeries', MOCK_DATA.series.slice(0,4), 'series');
        this.renderCarousel('trendingSeries', MOCK_DATA.series.slice(4,8), 'series');
        // Puis essayer l'API en arriere-plan
        this.loadHomeData();
        this.loadCategories();
    }

    async fetchAPI(endpoint, params = {}) {
        const url = new URL(API_BASE, window.location.origin);
        url.searchParams.append('endpoint', endpoint);
        Object.entries(params).forEach(([k, v]) => {
            if (v !== undefined && v !== null) url.searchParams.append(k, v);
        });

        const cacheKey = url.toString();
        const cached = this.cache.get(cacheKey);
        if (cached && Date.now() - cached.time < this.cacheTimeout) {
            return cached.data;
        }

        // Timeout avec AbortController
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

        try {
            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: { 'Accept': 'application/json' },
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const json = await response.json();
            if (json.success === false) throw new Error(json.message || 'API Error');
            
            const data = json.data || json;
            this.cache.set(cacheKey, { data, time: Date.now() });
            this.apiAvailable = true;
            return data;
        } catch (error) {
            clearTimeout(timeoutId);
            console.error('[API] ERROR:', endpoint, error.message);
            this.apiAvailable = false;
            throw error;
        }
    }

    showLoading() {
        this.loadCount++;
        document.getElementById('loadingOverlay').classList.add('active');
    }

    hideLoading() {
        this.loadCount = Math.max(0, this.loadCount - 1);
        if (this.loadCount === 0) {
            document.getElementById('loadingOverlay').classList.remove('active');
        }
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            if (query.length >= 2) {
                searchTimeout = setTimeout(() => this.performSearch(query), 400);
            } else if (query.length === 0) {
                this.goHome();
            }
        });
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query) this.performSearch(query);
            }
        });
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });
    }

    setupNavbarScroll() {}

    toggleSearch() {
        const searchBox = document.getElementById('searchBox');
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            document.getElementById('searchInput').focus();
        }
    }

    closeSearch() {
        document.getElementById('searchInput').value = '';
        document.getElementById('searchBox').classList.remove('active');
    }

    toggleMobileMenu() {
        document.getElementById('mobileMenu').classList.toggle('active');
    }

    switchView(viewName) {
        const views = ['homeView', 'moviesView', 'seriesView', 'categoriesView', 
                       'categoryBrowseView', 'searchView', 'movieDetailsView', 
                       'seriesDetailsView', 'playerView', 'actorView'];
        views.forEach(v => {
            const el = document.getElementById(v);
            if (el) el.classList.add('hidden');
        });
        const target = document.getElementById(viewName);
        if (target) {
            target.classList.remove('hidden');
            window.scrollTo(0, 0);
        }
        this.previousView = this.currentView;
        this.currentView = viewName;
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    }

    goHome() {
        this.switchView('homeView');
        const homeLink = document.querySelector('.nav-links a[href="#"]');
        if (homeLink) homeLink.classList.add('active');
        this.loadHomeData();
    }

    goBack() {
        if (this.previousView && this.previousView !== 'playerView') {
            this.switchView(this.previousView);
        } else {
            this.goHome();
        }
    }

    async loadHomeData() {
        this.showLoading();
        const results = { trending: null, popular: null, topRated: null, seriesPopular: null, seriesTrending: null };
        
        await Promise.all([
            this.fetchAPI('/movie/trending').then(d => results.trending = d).catch(e => console.warn('trending:', e.message)),
            this.fetchAPI('/movie/popular', { page: 1 }).then(d => results.popular = d).catch(e => console.warn('popular:', e.message)),
            this.fetchAPI('/movie/top-rated', { page: 1 }).then(d => results.topRated = d).catch(e => console.warn('topRated:', e.message)),
            this.fetchAPI('/series/popular', { page: 1 }).then(d => results.seriesPopular = d).catch(e => console.warn('seriesPopular:', e.message)),
            this.fetchAPI('/series/tmdb-trending', { period: 'week', page: 1 }).then(d => results.seriesTrending = d).catch(e => console.warn('seriesTrending:', e.message)),
        ]);

        const hasData = Object.values(results).some(r => r !== null);
        if (hasData) {
            const heroMovies = results.trending?.results || [];
            if (heroMovies.length > 0) {
                this.heroData = heroMovies[0];
                this.renderHero(this.heroData);
            }
            this.renderCarousel('trendingMovies', results.trending?.results?.slice(0,15) || MOCK_DATA.movies.slice(0,4), 'movie');
            this.renderCarousel('popularMovies', results.popular?.results?.slice(0,15) || MOCK_DATA.movies.slice(4,8), 'movie');
            this.renderCarousel('topRatedMovies', results.topRated?.results?.slice(0,15) || MOCK_DATA.movies.slice(8,12), 'movie');
            this.renderCarousel('popularSeries', results.seriesPopular?.results?.slice(0,15) || MOCK_DATA.series.slice(0,4), 'series');
            this.renderCarousel('trendingSeries', results.seriesTrending?.results?.slice(0,15) || MOCK_DATA.series.slice(4,8), 'series');
            if (this.apiAvailable) this.showToast('Donnees mises a jour', 'success');
        } else {
            this.showToast('Mode hors-ligne active', 'error');
        }
        this.hideLoading();
    }

    renderHero(movie) {
        const bg = document.getElementById('heroBg');
        const title = document.getElementById('heroTitle');
        const meta = document.getElementById('heroMeta');
        const desc = document.getElementById('heroDesc');
        if (!bg || !title) return;

        const poster = movie.background || movie.poster || '';
        if (poster) bg.style.backgroundImage = `url(${poster})`;
        title.textContent = movie.title || 'Titre inconnu';
        const genres = Array.isArray(movie.genres) ? movie.genres.slice(0, 3).join(', ') : '';
        meta.innerHTML = `
            <span class="rating"><i class="fas fa-star"></i> ${movie.rating || 'N/A'}</span>
            <span>${movie.year || ''}</span>
            <span>${genres}</span>
            <span>${movie.runtime ? movie.runtime + ' min' : ''}</span>
        `;
        desc.textContent = movie.summary || movie.overview || movie.description || '';
    }

    playHero() {
        if (this.heroData) this.playMovie(this.heroData.imdb_id, this.heroData.title);
    }

    showHeroDetails() {
        if (this.heroData) this.showMovieDetails(this.heroData.imdb_id);
    }

    renderCarousel(containerId, items, type) {
        const container = document.getElementById(containerId);
        if (!container) return;
        if (!items || items.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Aucun contenu</p></div>';
            return;
        }
        container.innerHTML = items.map(item => this.createCard(item, type)).join('');
    }

    createCard(item, type) {
        const isSeries = type === 'series' || item.type === 'series';
        const title = item.title || item.name || 'Sans titre';
        const poster = item.poster || '';
        const rating = item.rating || 'N/A';
        const year = item.year || '';
        const genres = Array.isArray(item.genres) ? item.genres.slice(0, 2).join(', ') : '';
        const id = item.imdb_id || item.id;
        const cardClass = isSeries ? 'card card-wide' : 'card';
        const clickHandler = isSeries 
            ? `onclick="app.showSeriesDetails(${item.id})"`
            : `onclick="app.showMovieDetails('${id}')"`;
        const hue = title.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % 360;
        const fallbackBg = `linear-gradient(135deg, hsl(${hue}, 60%, 20%), hsl(${hue}, 60%, 10%))`;

        return `
            <div class="${cardClass}" ${clickHandler}>
                <div class="card-poster" style="background: ${fallbackBg}">
                    <img src="${poster}" alt="${title.replace(/"/g, '&quot;')}" loading="lazy" 
                         onerror="this.style.display='none'; this.parentElement.classList.add('no-image');">
                    <div class="card-rating"><i class="fas fa-star"></i> ${rating}</div>
                    <div class="card-overlay">
                        <div class="card-play"><i class="fas fa-play"></i></div>
                    </div>
                    <div class="card-fallback-title">${title}</div>
                </div>
                <div class="card-info">
                    <div class="card-title">${title}</div>
                    <div class="card-meta">
                        <span>${year}</span>
                        ${isSeries ? '<span><i class="fas fa-tv"></i> Serie</span>' : ''}
                    </div>
                    ${genres ? `<div class="card-genres">${genres}</div>` : ''}
                </div>
            </div>
        `;
    }

    scrollCarousel(containerId, direction) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const card = container.querySelector('.card');
        const scrollAmount = direction * (card?.offsetWidth + 16 || 300);
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    async showMovies() {
        this.switchView('moviesView');
        const link = document.querySelector('.nav-links a[href="#movies"]');
        if (link) link.classList.add('active');
        await this.filterMovies('popular', null);
    }

    async filterMovies(filter, clickedTab = null) {
        this.showLoading();
        try {
            document.querySelectorAll('#moviesView .filter-tab').forEach(t => t.classList.remove('active'));
            if (clickedTab) clickedTab.classList.add('active');
            else {
                const firstTab = document.querySelector('#moviesView .filter-tab');
                if (firstTab) firstTab.classList.add('active');
            }

            let data;
            try {
                switch(filter) {
                    case 'popular': data = await this.fetchAPI('/movie/popular', { page: 1 }); break;
                    case 'top-rated': data = await this.fetchAPI('/movie/top-rated', { page: 1 }); break;
                    case 'now-playing': data = await this.fetchAPI('/movie/now-playing', { page: 1 }); break;
                    case 'upcoming': data = await this.fetchAPI('/movie/upcoming', { page: 1 }); break;
                    case 'trending': data = await this.fetchAPI('/movie/trending'); break;
                    default: data = await this.fetchAPI('/movie/popular', { page: 1 });
                }
            } catch (apiErr) {
                data = { results: MOCK_DATA.movies, page: 1, total_pages: 1 };
            }

            this.renderGrid('moviesGrid', data.results || [], 'movie');
            this.renderPagination('moviesPagination', data.page || 1, data.total_pages || 1, 
                (page) => this.loadMoviePage(filter, page));
        } catch (e) {
            this.renderGrid('moviesGrid', MOCK_DATA.movies, 'movie');
        } finally {
            this.hideLoading();
        }
    }

    async loadMoviePage(filter, page) {
        this.showLoading();
        try {
            let endpoint = '/movie/popular';
            switch(filter) {
                case 'top-rated': endpoint = '/movie/top-rated'; break;
                case 'now-playing': endpoint = '/movie/now-playing'; break;
                case 'upcoming': endpoint = '/movie/upcoming'; break;
                case 'trending': endpoint = '/movie/tmdb-trending'; break;
            }
            const params = { page };
            if (filter === 'trending') params.period = 'week';
            
            let data;
            try { data = await this.fetchAPI(endpoint, params); }
            catch (apiErr) { data = { results: MOCK_DATA.movies, page: page, total_pages: 1 }; }
            
            this.renderGrid('moviesGrid', data.results || [], 'movie');
            this.renderPagination('moviesPagination', data.page || page, data.total_pages || 1,
                (p) => this.loadMoviePage(filter, p));
            window.scrollTo(0, 0);
        } catch (e) {
            console.error(e);
        } finally {
            this.hideLoading();
        }
    }

    async showSeries() {
        this.switchView('seriesView');
        const link = document.querySelector('.nav-links a[href="#series"]');
        if (link) link.classList.add('active');
        await this.filterSeries('popular', null);
    }

    async filterSeries(filter, clickedTab = null) {
        this.showLoading();
        try {
            document.querySelectorAll('#seriesView .filter-tab').forEach(t => t.classList.remove('active'));
            if (clickedTab) clickedTab.classList.add('active');
            else {
                const firstTab = document.querySelector('#seriesView .filter-tab');
                if (firstTab) firstTab.classList.add('active');
            }

            let data;
            try {
                switch(filter) {
                    case 'popular': data = await this.fetchAPI('/series/popular', { page: 1 }); break;
                    case 'top-rated': data = await this.fetchAPI('/series/top-rated', { page: 1 }); break;
                    case 'on-air': data = await this.fetchAPI('/series/on-air', { page: 1 }); break;
                    case 'trending': data = await this.fetchAPI('/series/tmdb-trending', { period: 'week', page: 1 }); break;
                    default: data = await this.fetchAPI('/series/popular', { page: 1 });
                }
            } catch (apiErr) {
                data = { results: MOCK_DATA.series, page: 1, total_pages: 1 };
            }

            this.renderGrid('seriesGrid', data.results || [], 'series');
            this.renderPagination('seriesPagination', data.page || 1, data.total_pages || 1,
                (page) => this.loadSeriesPage(filter, page));
        } catch (e) {
            this.renderGrid('seriesGrid', MOCK_DATA.series, 'series');
        } finally {
            this.hideLoading();
        }
    }

    async loadSeriesPage(filter, page) {
        this.showLoading();
        try {
            let endpoint = '/series/popular';
            switch(filter) {
                case 'top-rated': endpoint = '/series/top-rated'; break;
                case 'on-air': endpoint = '/series/on-air'; break;
                case 'trending': endpoint = '/series/tmdb-trending'; break;
            }
            const params = { page };
            if (filter === 'trending') params.period = 'week';
            
            let data;
            try { data = await this.fetchAPI(endpoint, params); }
            catch (apiErr) { data = { results: MOCK_DATA.series, page: page, total_pages: 1 }; }
            
            this.renderGrid('seriesGrid', data.results || [], 'series');
            this.renderPagination('seriesPagination', data.page || page, data.total_pages || 1,
                (p) => this.loadSeriesPage(filter, p));
            window.scrollTo(0, 0);
        } catch (e) {
            console.error(e);
        } finally {
            this.hideLoading();
        }
    }

    renderGrid(containerId, items, type) {
        const container = document.getElementById(containerId);
        if (!container) return;
        if (!items || items.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1;">
                    <i class="fas fa-film"></i>
                    <h3>Aucun contenu trouve</h3>
                    <p>Essayez une autre categorie ou recherche</p>
                </div>
            `;
            return;
        }
        container.innerHTML = items.map(item => this.createCard(item, type)).join('');
    }

    renderPagination(containerId, currentPage, totalPages, callback) {
        const container = document.getElementById(containerId);
        if (!container || totalPages <= 1) {
            if (container) container.innerHTML = '';
            return;
        }
        const cbKey = `__cb_${containerId}`;
        this[cbKey] = callback;

        let html = '';
        const prevDisabled = currentPage <= 1 ? 'disabled' : '';
        const prevOnclick = currentPage > 1 ? `onclick="app.${cbKey}(${currentPage - 1})"` : '';
        html += `<button class="page-btn" ${prevDisabled} ${prevOnclick}><i class="fas fa-chevron-left"></i></button>`;
        
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);
        if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

        if (start > 1) html += `<button class="page-btn" onclick="app.${cbKey}(1)">1</button>`;
        if (start > 2) html += `<span class="page-btn" style="cursor:default;">...</span>`;
        for (let i = start; i <= end; i++) {
            html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="app.${cbKey}(${i})">${i}</button>`;
        }
        if (end < totalPages - 1) html += `<span class="page-btn" style="cursor:default;">...</span>`;
        if (end < totalPages) html += `<button class="page-btn" onclick="app.${cbKey}(${totalPages})">${totalPages}</button>`;
        
        const nextDisabled = currentPage >= totalPages ? 'disabled' : '';
        const nextOnclick = currentPage < totalPages ? `onclick="app.${cbKey}(${currentPage + 1})"` : '';
        html += `<button class="page-btn" ${nextDisabled} ${nextOnclick}><i class="fas fa-chevron-right"></i></button>`;
        
        container.innerHTML = html;
    }

    async loadCategories() {
        try {
            const [movieCats, seriesCats] = await Promise.all([
                this.fetchAPI('/movie/categories').catch(() => ({ categories: MOCK_DATA.categories })),
                this.fetchAPI('/series/categories').catch(() => ({ categories: [] }))
            ]);
            this.movieCategories = movieCats.categories || [];
            this.seriesCategories = seriesCats.categories || [];
        } catch (e) {
            this.movieCategories = MOCK_DATA.categories;
            this.seriesCategories = [];
        }
    }

    async showCategories() {
        this.switchView('categoriesView');
        const link = document.querySelector('.nav-links a[href="#categories"]');
        if (link) link.classList.add('active');
        
        const grid = document.getElementById('categoriesGrid');
        if (!this.movieCategories.length) await this.loadCategories();
        
        const allCategories = [...this.movieCategories, ...this.seriesCategories];
        const uniqueCategories = allCategories.filter((cat, idx, self) => 
            idx === self.findIndex(c => c.name === cat.name)
        );

        grid.innerHTML = uniqueCategories.map(cat => {
            const icon = GENRE_ICONS[cat.name] || 'fa-film';
            const safeName = cat.name.replace(/'/g, "\\'");
            return `
                <div class="category-card" onclick="app.browseCategory('${safeName}', ${cat.id})">
                    <div class="category-card-content">
                        <i class="fas ${icon}"></i>
                        <span>${cat.name}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    async browseCategory(genreName, genreId) {
        this.switchView('categoryBrowseView');
        document.getElementById('categoryBrowseTitle').textContent = genreName;
        this.showLoading();
        try {
            let movies = { results: [] };
            let series = { results: [] };
            try { movies = await this.fetchAPI('/movie/genre', { genre: genreName.toLowerCase(), page: 1 }); } catch (e) {}
            try { series = await this.fetchAPI('/series/category', { genre: genreName.toLowerCase(), page: 1, sort: 'popularity.desc' }); } catch (e) {}

            const movieItems = (movies.results || []).map(m => ({...m, type: 'movie'}));
            const seriesItems = (series.results || []).map(s => ({...s, type: 'series'}));
            this.renderGrid('categoryBrowseGrid', [...movieItems, ...seriesItems], 'mixed');
            document.getElementById('categoryBrowsePagination').innerHTML = '';
        } catch (e) {
            document.getElementById('categoryBrowseGrid').innerHTML = `
                <div class="error-state" style="grid-column: 1/-1;">
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>Erreur de chargement</h3>
                    <button class="btn btn-primary" onclick="app.browseCategory('${genreName.replace(/'/g, "\\'")}', ${genreId})">Reessayer</button>
                </div>
            `;
        } finally {
            this.hideLoading();
        }
    }

    async performSearch(query) {
        if (!query || query.length < 2) return;
        this.switchView('searchView');
        document.getElementById('searchQueryText').textContent = `"${query}"`;
        this.showLoading();
        try {
            let data;
            try { data = await this.fetchAPI('/media/search', { q: query }); }
            catch (apiErr) {
                data = {
                    movies: MOCK_DATA.movies.filter(m => m.title.toLowerCase().includes(query.toLowerCase())),
                    series: MOCK_DATA.series.filter(s => s.name.toLowerCase().includes(query.toLowerCase()))
                };
            }
            this.searchResults = { movies: data.movies || [], series: data.series || [] };
            this.switchSearchTab('all');
        } catch (e) {
            document.getElementById('searchGrid').innerHTML = `
                <div class="error-state" style="grid-column: 1/-1;">
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>Erreur de recherche</h3>
                </div>
            `;
        } finally {
            this.hideLoading();
        }
    }

    switchSearchTab(tab) {
        document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
        const tabEl = document.getElementById(`searchTab${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
        if (tabEl) tabEl.classList.add('active');
        
        let items = [];
        if (tab === 'all') {
            items = [
                ...this.searchResults.movies.map(m => ({...m, type: 'movie'})),
                ...this.searchResults.series.map(s => ({...s, type: 'series'}))
            ];
        } else if (tab === 'movies') {
            items = this.searchResults.movies.map(m => ({...m, type: 'movie'}));
        } else if (tab === 'series') {
            items = this.searchResults.series.map(s => ({...s, type: 'series'}));
        }
        this.renderGrid('searchGrid', items, 'mixed');
    }

    async showMovieDetails(imdbId) {
        this.showLoading();
        try {
            let data;
            try { data = await this.fetchAPI('/movie/info', { imdb: imdbId }); }
            catch (apiErr) { data = {...MOCK_DATA.hero, recommended: MOCK_DATA.movies.slice(1, 6)}; }
            
            this.currentMovie = data;
            this.switchView('movieDetailsView');
            
            const bgEl = document.getElementById('movieDetailsBg');
            if (bgEl) bgEl.style.backgroundImage = `url(${data.background || data.poster || ''})`;
            
            const posterEl = document.getElementById('movieDetailsPoster');
            if (posterEl) { posterEl.src = data.poster || ''; posterEl.alt = data.title || ''; }
            
            const titleEl = document.getElementById('movieDetailsTitle');
            if (titleEl) titleEl.textContent = data.title || 'Sans titre';
            
            const genres = Array.isArray(data.genres) ? data.genres.map(g => `<span class="genre-tag">${g}</span>`).join('') : '';
            const metaEl = document.getElementById('movieDetailsMeta');
            if (metaEl) {
                metaEl.innerHTML = `
                    <span class="rating"><i class="fas fa-star"></i> ${data.rating || 'N/A'}</span>
                    <span class="year">${data.year || ''}</span>
                    <span>${data.runtime ? data.runtime + ' min' : ''}</span>
                    <span>${data.mpa_rating || ''}</span>
                    ${genres}
                `;
            }
            
            const descEl = document.getElementById('movieDetailsDesc');
            if (descEl) descEl.textContent = data.description || data.summary || '';
            
            const cast = data.cast || [];
            const castEl = document.getElementById('movieDetailsCast');
            if (castEl) {
                castEl.innerHTML = `
                    <h3>Distribution</h3>
                    <div class="cast-list">
                        ${cast.slice(0, 8).map(c => `<span class="cast-tag">${c.name}</span>`).join('')}
                    </div>
                `;
            }
            
            this.renderCarousel('movieRecommendations', data.recommended?.slice(0, 15) || MOCK_DATA.movies.slice(0, 5), 'movie');
        } catch (e) {
            this.showToast('Erreur de chargement des details', 'error');
        } finally {
            this.hideLoading();
        }
    }

    async playCurrentMovie() {
        if (!this.currentMovie) return;
        await this.playMovie(this.currentMovie.imdb_id, this.currentMovie.title);
    }

    pickBestDownload(downloads) {
        if (!downloads || !downloads.length) return null;
        const qualityRank = { '2160p': 4, '1080p': 3, '720p': 2, '3D': 1 };
        const withSeeds = downloads.filter(d => (d.seeds || 0) > 0);
        const pool = withSeeds.length ? withSeeds : downloads;
        return [...pool].sort((a, b) => {
            const rankDiff = (qualityRank[b.quality] || 0) - (qualityRank[a.quality] || 0);
            return rankDiff !== 0 ? rankDiff : (b.seeds || 0) - (a.seeds || 0);
        })[0];
    }

    async downloadCurrentMovie() {
        if (!this.currentMovie) return;
        this.showLoading();
        try {
            const data = await this.fetchAPI('/movie/download', { imdb: this.currentMovie.imdb_id });
            const best = this.pickBestDownload(data.downloads);
            if (best && best.magnet) {
                window.open(best.magnet, '_blank');
                this.showToast(`Lien torrent ouvert (${best.quality} ${best.type}) - une appli torrent est necessaire`);
            } else {
                this.showToast('Lien de telechargement indisponible', 'error');
            }
        } catch (e) {
            this.showToast('Erreur de telechargement', 'error');
        } finally {
            this.hideLoading();
        }
    }

    async showSeriesDetails(seriesId) {
        this.showLoading();
        try {
            let data;
            try { data = await this.fetchAPI('/series/info', { id: seriesId }); }
            catch (apiErr) {
                data = {
                    ...MOCK_DATA.series[0], id: seriesId,
                    cast: [{name: 'Bryan Cranston'}, {name: 'Aaron Paul'}],
                    recommended: MOCK_DATA.series.slice(1, 4)
                };
            }
            
            this.currentSeries = data;
            this.currentSeason = 1;
            this.switchView('seriesDetailsView');
            
            const bgEl = document.getElementById('seriesDetailsBg');
            if (bgEl) bgEl.style.backgroundImage = `url(${data.poster || ''})`;
            
            const posterEl = document.getElementById('seriesDetailsPoster');
            if (posterEl) { posterEl.src = data.poster || ''; posterEl.alt = data.name || ''; }
            
            const titleEl = document.getElementById('seriesDetailsTitle');
            if (titleEl) titleEl.textContent = data.name || 'Sans titre';
            
            const genres = Array.isArray(data.genres) ? data.genres.map(g => `<span class="genre-tag">${g}</span>`).join('') : '';
            const metaEl = document.getElementById('seriesDetailsMeta');
            if (metaEl) {
                metaEl.innerHTML = `
                    <span class="rating"><i class="fas fa-star"></i> ${data.rating || 'N/A'}</span>
                    <span class="year">${data.premiered ? data.premiered.split('-')[0] : (data.year || '')}</span>
                    <span>${data.status || ''}</span>
                    <span>${data.runtime ? data.runtime + ' min' : ''}</span>
                    ${genres}
                `;
            }
            
            const descEl = document.getElementById('seriesDetailsDesc');
            if (descEl) descEl.textContent = data.description || data.summary || '';
            
            const cast = data.cast || [];
            const castEl = document.getElementById('seriesDetailsCast');
            if (castEl) {
                castEl.innerHTML = `
                    <h3>Distribution</h3>
                    <div class="cast-list">
                        ${cast.slice(0, 8).map(c => `<span class="cast-tag">${c.name}</span>`).join('')}
                    </div>
                `;
            }
            
            await this.loadEpisodes(seriesId, 1);
            this.renderCarousel('seriesRecommendations', data.recommended?.slice(0, 15) || MOCK_DATA.series.slice(0, 4), 'series');
        } catch (e) {
            this.showToast('Erreur de chargement des details', 'error');
        } finally {
            this.hideLoading();
        }
    }

    async loadEpisodes(seriesId, season) {
        this.currentSeason = season;
        try {
            let data;
            try { data = await this.fetchAPI('/series/episodes', { id: seriesId, season }); }
            catch (apiErr) {
                data = {
                    seasons_available: [1, 2, 3],
                    episodes: Array.from({length: 8}, (_, i) => ({
                        number: i + 1, title: `Episode ${i + 1}`, airdate: '2024-01-15', runtime: 45
                    }))
                };
            }
            
            const seasonsAvailable = data.seasons_available || [season];
            const tabsEl = document.getElementById('seasonsTabs');
            if (tabsEl) {
                tabsEl.innerHTML = seasonsAvailable.map(s => `
                    <button class="season-tab ${s == season ? 'active' : ''}" 
                            onclick="app.loadEpisodes(${seriesId}, ${s})">Saison ${s}</button>
                `).join('');
            }
            
            const episodes = data.episodes || [];
            const gridEl = document.getElementById('episodesGrid');
            if (gridEl) {
                gridEl.innerHTML = episodes.map((ep, idx) => `
                    <div class="episode-card" onclick="app.playSeriesEpisode(${seriesId}, ${season}, ${ep.number || idx + 1}, '${(this.currentSeries?.imdb_id || '').replace(/'/g, "\\'")}')">
                        <div class="episode-number">${ep.number || idx + 1}</div>
                        <div class="episode-info">
                            <div class="episode-title">${ep.title || `Episode ${ep.number || idx + 1}`}</div>
                            <div class="episode-meta">
                                ${ep.airdate ? `<span><i class="fas fa-calendar"></i> ${ep.airdate}</span>` : ''}
                                ${ep.runtime ? `<span><i class="fas fa-clock"></i> ${ep.runtime} min</span>` : ''}
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        } catch (e) {
            const gridEl = document.getElementById('episodesGrid');
            if (gridEl) {
                gridEl.innerHTML = `
                    <div class="error-state" style="grid-column: 1/-1;">
                        <i class="fas fa-exclamation-circle"></i>
                        <h3>Erreur de chargement des episodes</h3>
                    </div>
                `;
            }
        }
    }

    async playCurrentSeries() {
        if (!this.currentSeries) return;
        await this.playSeriesEpisode(this.currentSeries.id, 1, 1, this.currentSeries.imdb_id);
    }

    async playMovie(imdbId, title) {
        this.showLoading();
        try {
            let data;
            try { data = await this.fetchAPI('/movie/stream', { imdb: imdbId }); }
            catch (apiErr) {
                this.showToast('Stream indisponible en mode hors-ligne', 'error');
                this.hideLoading();
                return;
            }
            
            if (data.recommended) {
                this.switchView('playerView');
                document.getElementById('playerFrame').src = data.recommended;
                document.getElementById('playerInfo').innerHTML = `
                    <h3>${title || 'Lecture en cours'}</h3>
                    <p>Source: ${data.count || 0} streams disponibles</p>
                `;
            } else {
                this.showToast('Stream indisponible', 'error');
            }
        } catch (e) {
            this.showToast('Erreur de lecture', 'error');
        } finally {
            this.hideLoading();
        }
    }

    async playSeriesEpisode(seriesId, season, episode, imdbId) {
        this.showLoading();
        try {
            const params = { season, episode };
            if (imdbId) params.imdb = imdbId;
            else params.id = seriesId;
            
            let data;
            try { data = await this.fetchAPI('/series/stream', params); }
            catch (apiErr) {
                this.showToast('Stream indisponible en mode hors-ligne', 'error');
                this.hideLoading();
                return;
            }
            
            if (data.recommended) {
                this.switchView('playerView');
                document.getElementById('playerFrame').src = data.recommended;
                const seriesName = this.currentSeries?.name || 'Serie';
                document.getElementById('playerInfo').innerHTML = `
                    <h3>${seriesName} - S${season}E${episode}</h3>
                    <p>Source: ${data.count || 0} streams disponibles</p>
                `;
            } else {
                this.showToast('Stream indisponible', 'error');
            }
        } catch (e) {
            this.showToast('Erreur de lecture', 'error');
        } finally {
            this.hideLoading();
        }
    }

    closePlayer() {
        document.getElementById('playerFrame').src = '';
        this.goBack();
    }

    async searchActor(name) {
        this.showLoading();
        try {
            let data;
            try { data = await this.fetchAPI('/movie/actor', { name }); }
            catch (apiErr) { data = { query: name, actors: [{ movies: MOCK_DATA.movies.slice(0, 4) }] }; }
            
            document.getElementById('actorName').textContent = `Films avec ${data.query || name}`;
            this.switchView('actorView');
            this.renderGrid('actorGrid', data.actors?.[0]?.movies || [], 'movie');
        } catch (e) {
            this.showToast('Erreur de recherche', 'error');
        } finally {
            this.hideLoading();
        }
    }

    async showTrending() {
        this.switchView('moviesView');
        const link = document.querySelector('.nav-links a[href="#trending"]');
        if (link) link.classList.add('active');
        await this.filterMovies('trending', null);
    }
}

const app = new LumenFlixApp();
