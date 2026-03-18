// =============================================
//  CINEVAULT — TMDB API INTEGRATION
//  js/tmdb.js
// =============================================

const TMDB_KEY     = 'b97ecbb981daabeb98e1f27bc9b17cde';
const TMDB_BASE    = 'https://api.themoviedb.org/3';
const TMDB_IMG     = 'https://image.tmdb.org/t/p/w500';
const TMDB_BACKDROP= 'https://image.tmdb.org/t/p/w1280';

// Genre ID → name map (TMDB standard)
const GENRE_MAP = {
  28:'Action', 12:'Adventure', 16:'Animation', 35:'Comedy',
  80:'Crime', 99:'Documentary', 18:'Drama', 10751:'Family',
  14:'Fantasy', 36:'History', 27:'Horror', 10402:'Music',
  9648:'Mystery', 10749:'Romance', 878:'Sci-Fi', 10770:'TV Movie',
  53:'Thriller', 10752:'War', 37:'Western'
};

/**
 * Fetch a page of popular movies and map them to our internal format.
 * Falls back to the static MOVIES array if the API call fails.
 */
async function fetchPopularMovies(page = 1) {
  try {
    const res  = await fetch(`${TMDB_BASE}/movie/popular?api_key=${TMDB_KEY}&language=en-US&page=${page}`);
    if (!res.ok) throw new Error(`TMDB error ${res.status}`);
    const data = await res.json();
    return data.results
      .filter(m => m.poster_path && m.backdrop_path)
      .map(mapTmdbMovie);
  } catch (err) {
    console.warn('TMDB fetch failed, using static data.', err);
    return null; // signal fallback
  }
}

/**
 * Fetch trailer key for a movie id.
 */
async function fetchTrailerKey(tmdbId) {
  try {
    const res  = await fetch(`${TMDB_BASE}/movie/${tmdbId}/videos?api_key=${TMDB_KEY}&language=en-US`);
    const data = await res.json();
    const trailer = data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube')
                 || data.results.find(v => v.site === 'YouTube');
    return trailer ? trailer.key : null;
  } catch {
    return null;
  }
}

/**
 * Fetch cast for a movie id (top 5 names).
 */
async function fetchCast(tmdbId) {
  try {
    const res  = await fetch(`${TMDB_BASE}/movie/${tmdbId}/credits?api_key=${TMDB_KEY}`);
    const data = await res.json();
    return data.cast.slice(0, 5).map(c => c.name).join(', ');
  } catch {
    return 'Cast unavailable';
  }
}

/**
 * Map a raw TMDB movie object → our internal movie shape.
 */
function mapTmdbMovie(m) {
  const genreNames = (m.genre_ids || [])
    .map(id => GENRE_MAP[id])
    .filter(Boolean);

  return {
    id:          m.id,
    title:       m.title,
    genre:       genreNames[0] || 'Drama',
    year:        m.release_date ? parseInt(m.release_date.split('-')[0]) : 2024,
    poster:      m.poster_path   ? TMDB_IMG      + m.poster_path   : '',
    backdrop:    m.backdrop_path ? TMDB_BACKDROP  + m.backdrop_path : '',
    description: m.overview || 'No description available.',
    cast:        'Loading…',        // filled in lazily when modal opens
    trailerKey:  null,              // filled in lazily when modal opens
    baseRating:  m.vote_average / 2, // TMDB is /10, we use /5
    votes:       m.vote_count,
    trending:    m.popularity > 100,
    tmdbId:      m.id
  };
}

/**
 * Enrich a movie with trailer + cast when the modal opens.
 * Updates the movie object in MOVIES[] in place.
 */
async function enrichMovie(movie) {
  if (movie.trailerKey !== null && movie.cast !== 'Loading…') return; // already loaded

  const [trailerKey, cast] = await Promise.all([
    fetchTrailerKey(movie.tmdbId),
    fetchCast(movie.tmdbId)
  ]);

  movie.trailerKey = trailerKey || 'dQw4w9WgXcQ'; // fallback key
  movie.cast       = cast;

  // Patch the live modal if still open
  const castEl = document.querySelector('.modal-cast');
  if (castEl) castEl.textContent = cast;
}
