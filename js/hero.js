// =============================================
//  CINEVAULT — ANIMATED HERO  (fixed)
//  js/hero.js
// =============================================

let FEATURED     = [];   // populated by initHero() AFTER MOVIES[] is loaded
let heroIndex    = 0;
let heroInterval = null;

function renderHero(index) {
  const movie  = FEATURED[index];
  const heroBg = document.getElementById('heroBg');
  const title  = document.getElementById('heroTitle');
  const tags   = document.getElementById('heroTags');
  const desc   = document.getElementById('heroDesc');
  const trailer= document.getElementById('heroTrailerBtn');
  const wlBtn  = document.getElementById('heroWatchlistBtn');

  if (!heroBg || !movie) return;

  // Fade backdrop
  heroBg.style.transition = 'opacity 0.5s ease';
  heroBg.style.opacity    = '0';
  setTimeout(() => {
    heroBg.style.backgroundImage = `url('${movie.backdrop}')`;
    heroBg.style.opacity         = '1';
  }, 250);

  // Text content
  title.textContent = movie.title;
  desc.textContent  = movie.description;
  tags.innerHTML    = `
    <span class="hero-tag">${movie.genre}</span>
    <span class="hero-tag">${movie.year}</span>
    <span class="hero-tag">${getAverageRating(movie).toFixed(1)}★</span>
  `;

  // Trailer button
  trailer.onclick = () => {
    if (movie.trailerKey) {
      openTrailer(movie.trailerKey, movie.title);
    } else {
      showToast('Trailer loading, try again shortly…', 'info');
    }
  };

  // Watchlist button
  const updateWlBtn = () => {
    const saved       = Storage.isInWatchlist(movie.id);
    wlBtn.textContent = saved ? '♥ In Watchlist' : '＋ Watchlist';
  };
  updateWlBtn();
  wlBtn.dataset.movieId = movie.id;
  wlBtn.onclick = () => {
    toggleWatchlist(movie.id);
    updateWlBtn();
  };

  // Dot indicators
  document.querySelectorAll('.hero-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function buildHeroDots() {
  const dotsEl = document.getElementById('heroDots');
  if (!dotsEl) return;
  dotsEl.innerHTML = '';
  FEATURED.forEach((_, i) => {
    const btn       = document.createElement('button');
    btn.className   = 'hero-dot' + (i === 0 ? ' active' : '');
    btn.addEventListener('click', () => {
      heroIndex = i;
      renderHero(heroIndex);
      resetHeroInterval();
    });
    dotsEl.appendChild(btn);
  });
}

function nextHero() {
  if (FEATURED.length === 0) return;
  heroIndex = (heroIndex + 1) % FEATURED.length;
  renderHero(heroIndex);
}

function resetHeroInterval() {
  clearInterval(heroInterval);
  heroInterval = setInterval(nextHero, 6000);
}

// Called by app.js AFTER MOVIES[] is populated
function initHero() {
  // Build FEATURED list from the now-populated MOVIES array
  FEATURED = [
    ...MOVIES.filter(m => m.trending),
    ...MOVIES.filter(m => !m.trending)
  ].slice(0, 5);

  if (FEATURED.length === 0) {
    console.warn('Hero: no movies available yet');
    return;
  }

  heroIndex = 0;
  buildHeroDots();
  renderHero(0);
  resetHeroInterval();
}