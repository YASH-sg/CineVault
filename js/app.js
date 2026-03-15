// =============================================
//  CINEVAULT — MAIN APP  (Day 3–4)
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

// ---- Mini card (for Trending / Top Rated rows) ----
function buildMiniCard(movie) {
  const card = document.createElement('div');
  card.className = 'mini-card';
  card.innerHTML = `
    <img class="mini-poster" src="${movie.poster}" alt="${movie.title}" loading="lazy" />
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
        <button class="card-trailer-btn" data-key="${movie.trailerKey}" data-title="${movie.title}">▶ Trailer</button>
        <p class="overlay-desc">${movie.description}</p>
        <span class="overlay-hint">Click for details →</span>
      </div>
      <span class="card-genre-badge">${movie.genre}</span>
      <button class="card-watchlist-btn ${saved ? 'saved' : ''}"
        title="${saved ? 'Remove from Watchlist' : 'Add to Watchlist'}"
        data-wl-id="${movie.id}">
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

  // Stars
  card.querySelector('.card-stars-wrap').appendChild(buildCardStars(movie));

  // Trailer button (stop propagation so modal doesn't also open)
  card.querySelector('.card-trailer-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    openTrailer(movie.trailerKey, movie.title);
  });

  // Watchlist button
  card.querySelector('.card-watchlist-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleWatchlist(movie.id);
  });

  // Open modal on card body click (not stars/buttons)
  card.addEventListener('click', (e) => {
    const skip = ['INPUT', 'LABEL', 'BUTTON'];
    if (skip.includes(e.target.tagName)) return;
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

  // Hide skeleton once grid is shown
  if (skeleton) skeleton.classList.add('hidden');
}

// ---- Loading screen ----
function runLoadingScreen(onDone) {
  const fill   = document.getElementById('loaderFill');
  const text   = document.getElementById('loaderText');
  const screen = document.getElementById('loadingScreen');
  const steps  = ['Fetching movies…', 'Building universe…', 'Almost there…', 'Lights, camera…'];
  let progress = 0;
  let step     = 0;

  const tick = setInterval(() => {
    progress += Math.random() * 22 + 10;
    if (progress > 100) progress = 100;
    if (fill) fill.style.width = progress + '%';
    if (text && steps[step]) { text.textContent = steps[step++]; }
    if (progress >= 100) {
      clearInterval(tick);
      setTimeout(() => {
        screen.classList.add('fade-out');
        setTimeout(onDone, 500);
      }, 300);
    }
  }, 350);
}

// ---- Bootstrap ----
document.addEventListener('DOMContentLoaded', () => {
  buildSkeletons(8);

  runLoadingScreen(() => {
    // Trending row: movies flagged as trending
    const trending = MOVIES.filter(m => m.trending);
    renderHorizontalRow('trendingScroll', trending);

    // Top Rated row: sorted by average rating desc
    const topRated = [...MOVIES]
      .sort((a, b) => getAverageRating(b) - getAverageRating(a))
      .slice(0, 8);
    renderHorizontalRow('topRatedScroll', topRated);

    // Hero
    initHero();

    // Main grid
    renderMovies();
  });
});
