// =============================================
//  CINEVAULT — MAIN APP  (TMDB-powered)
//  js/app.js
// =============================================

// ---- Skeleton loader ----
function buildSkeletons(count = 8) {
  const grid = document.getElementById('skeletonGrid');
  if (!grid) return;
  grid.innerHTML = '';
  for (let i = 0; i < count; i++) {
    grid.innerHTML += `
      <div class="skeleton-card">
        <div class="skeleton-poster"></div>
        <div class="skeleton-body">
          <div class="skeleton-line wide"></div>
          <div class="skeleton-line short"></div>
          <div class="skeleton-line mid"></div>
        </div>
      </div>`;
  }
}

// ---- Mini card (Trending / Top Rated / Recently Viewed rows) ----
function buildMiniCard(movie) {
  const card = document.createElement('div');
  card.className = 'mini-card';
  card.innerHTML = `
    <div class="mini-poster-wrap">
      <img class="mini-poster" src="${movie.poster}" alt="${movie.title}" loading="lazy" />
      <div class="mini-overlay"><span class="mini-play">▶</span></div>
    </div>
    <div class="mini-title">${movie.title}</div>
    <div class="mini-rating">${getAverageRating(movie).toFixed(1)}★</div>
  `;
  card.addEventListener('click', () => openModal(movie));
  return card;
}

function renderHorizontalRow(containerId, movies) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = '';
  movies.forEach(m => el.appendChild(buildMiniCard(m)));
}

// ---- Full movie card ----
function buildMovieCard(movie) {
  const avg   = getAverageRating(movie);
  const votes = getVoteCount(movie);
  const saved = Storage.isInWatchlist(movie.id);

  const card = document.createElement('article');
  card.className = 'movie-card';
  card.setAttribute('data-movie-id', movie.id);

  card.innerHTML = `
    <div class="card-poster">
      <img src="${movie.poster}" alt="${movie.title}" loading="lazy" />
      <div class="card-overlay">
        <button class="card-trailer-btn">▶ Trailer</button>
        <p class="overlay-desc">${movie.description}</p>
        <span class="overlay-hint">Click for details →</span>
      </div>
      <span class="card-genre-badge">${movie.genre}</span>
      <button class="card-watchlist-btn ${saved ? 'saved' : ''}"
        title="${saved ? 'Remove from Watchlist' : 'Add to Watchlist'}">
        ${saved ? '♥' : '♡'}
      </button>
    </div>
    <div class="card-body">
      <h3 class="card-title" title="${movie.title}">${movie.title}</h3>
      <p class="card-year">${movie.year}</p>
      <div class="card-rating-display">
        <span class="avg-score">${avg.toFixed(1)}★</span>
        <span class="avg-label">${votes.toLocaleString()} votes</span>
      </div>
      <p class="rate-label">Your Rating</p>
      <div class="card-stars-wrap"></div>
    </div>
  `;

  card.querySelector('.card-stars-wrap').appendChild(buildCardStars(movie));

  card.querySelector('.card-trailer-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    if (!movie.trailerKey) {
      showToast('Trailer not available yet', 'error');
      return;
    }
    openTrailer(movie.trailerKey, movie.title);
  });

  card.querySelector('.card-watchlist-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleWatchlist(movie.id);
  });

  card.addEventListener('click', (e) => {
    if (['INPUT','LABEL','BUTTON'].includes(e.target.tagName)) return;
    openModal(movie);
  });

  return card;
}

// ---- Main render ----
function renderMovies() {
  const grid       = document.getElementById('movieGrid');
  const skeleton   = document.getElementById('skeletonGrid');
  const emptyState = document.getElementById('emptyState');
  const filtered   = getFilteredMovies();
  const pageMovies = getPageMovies(filtered);

  grid.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
    grid.classList.add('hidden');
  } else {
    emptyState.classList.add('hidden');
    grid.classList.remove('hidden');
    pageMovies.forEach((movie, index) => {
      const card = buildMovieCard(movie);
      card.style.animationDelay = `${index * 45}ms`;
      grid.appendChild(card);
    });
  }

  renderPagination(filtered);
  updateResultsLabel(filtered.length);
  if (skeleton) skeleton.classList.add('hidden');
}

// ---- Loading screen ----
function runLoadingScreen(steps, onDone) {
  const fill   = document.getElementById('loaderFill');
  const text   = document.getElementById('loaderText');
  const screen = document.getElementById('loadingScreen');
  let progress = 0;
  let step     = 0;

  const tick = setInterval(() => {
    progress += Math.random() * 18 + 8;
    if (progress > 95) progress = 95;
    if (fill) fill.style.width = progress + '%';
    if (text && steps[step]) text.textContent = steps[step++];
    if (step >= steps.length) clearInterval(tick);
  }, 400);

  // Called externally when data is ready
  window._finishLoader = () => {
    clearInterval(tick);
    if (fill) fill.style.width = '100%';
    setTimeout(() => {
      screen.classList.add('fade-out');
      setTimeout(onDone, 500);
    }, 300);
  };
}

// ---- Bootstrap ----
document.addEventListener('DOMContentLoaded', async () => {
  buildSkeletons(8);

  runLoadingScreen(
    ['Connecting to TMDB…', 'Fetching popular movies…', 'Loading posters…', 'Almost ready…'],
    () => {
      // Trending row
      const trending = MOVIES.filter(m => m.trending).slice(0, 10);
      renderHorizontalRow('trendingScroll', trending);

      // Top Rated row
      const topRated = [...MOVIES]
        .sort((a, b) => getAverageRating(b) - getAverageRating(a))
        .slice(0, 10);
      renderHorizontalRow('topRatedScroll', topRated);

      // Hero
      initHero();

      // Grid
      renderMovies();
    }
  );

  // Fetch from TMDB
  const tmdbMovies = await fetchPopularMovies(1);

  if (tmdbMovies && tmdbMovies.length > 0) {
    MOVIES = tmdbMovies;
    showToast(`Loaded ${MOVIES.length} movies from TMDB 🎬`, 'success', 3000);
  } else {
    // Fallback to static data
    MOVIES = STATIC_MOVIES;
    showToast('Using offline movie data', 'info', 3000);
  }

  window._finishLoader();
});
