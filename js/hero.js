// =============================================
//  CINEVAULT — ANIMATED HERO
//  js/hero.js
// =============================================

// Pick featured movies (trending ones first, then fill up to 5)
const FEATURED = [
  ...MOVIES.filter(m => m.trending),
  ...MOVIES.filter(m => !m.trending)
].slice(0, 5);

let heroIndex    = 0;
let heroInterval = null;

function renderHero(index) {
  const movie   = FEATURED[index];
  const heroBg  = document.getElementById('heroBg');
  const title   = document.getElementById('heroTitle');
  const tags    = document.getElementById('heroTags');
  const desc    = document.getElementById('heroDesc');
  const trailer = document.getElementById('heroTrailerBtn');
  const wlBtn   = document.getElementById('heroWatchlistBtn');

  if (!heroBg || !movie) return;

  // Fade bg
  heroBg.style.opacity = '0';
  setTimeout(() => {
    heroBg.style.backgroundImage = `url('${movie.backdrop}')`;
    heroBg.style.opacity = '1';
  }, 200);

  // Update text
  title.textContent = movie.title;
  desc.textContent  = movie.description;

  tags.innerHTML = `
    <span class="hero-tag">${movie.genre}</span>
    <span class="hero-tag">${movie.year}</span>
    <span class="hero-tag">${getAverageRating(movie).toFixed(1)}★</span>
  `;

  // Trailer button
  trailer.onclick = () => openTrailer(movie.trailerKey, movie.title);

  // Watchlist button
  const saved = Storage.isInWatchlist(movie.id);
  wlBtn.textContent = saved ? '♥ In Watchlist' : '＋ Watchlist';
  wlBtn.dataset.movieId = movie.id;
  wlBtn.onclick = () => {
    toggleWatchlist(movie.id);
    const nowSaved = Storage.isInWatchlist(movie.id);
    wlBtn.textContent = nowSaved ? '♥ In Watchlist' : '＋ Watchlist';
  };

  // Dots
  document.querySelectorAll('.hero-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function buildHeroDots() {
  const dotsEl = document.getElementById('heroDots');
  if (!dotsEl) return;
  dotsEl.innerHTML = '';
  FEATURED.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'hero-dot' + (i === 0 ? ' active' : '');
    btn.addEventListener('click', () => {
      heroIndex = i;
      renderHero(heroIndex);
      resetHeroInterval();
    });
    dotsEl.appendChild(btn);
  });
}

function nextHero() {
  heroIndex = (heroIndex + 1) % FEATURED.length;
  renderHero(heroIndex);
}

function resetHeroInterval() {
  clearInterval(heroInterval);
  heroInterval = setInterval(nextHero, 6000);
}

function initHero() {
  buildHeroDots();
  renderHero(0);
  resetHeroInterval();
}
