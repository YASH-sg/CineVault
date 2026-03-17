// =============================================
//  CINEVAULT — RECENTLY VIEWED  (Day 6)
//  js/recentlyViewed.js
// =============================================

const MAX_RECENT = 6;

// ---- Storage helpers ----
function getRecentIds() {
  try { return JSON.parse(localStorage.getItem('cv_recent') || '[]'); }
  catch { return []; }
}

function pushRecent(movieId) {
  let ids = getRecentIds().filter(id => id !== movieId); // remove if already exists
  ids.unshift(movieId);                                   // add to front
  ids = ids.slice(0, MAX_RECENT);                        // cap at MAX_RECENT
  localStorage.setItem('cv_recent', JSON.stringify(ids));
}

function clearRecent() {
  localStorage.removeItem('cv_recent');
  renderRecentlyViewed();
  showToast('Recently viewed cleared', 'info', 2000);
}

// ---- Render ----
function renderRecentlyViewed() {
  const section = document.getElementById('recentlyViewedSection');
  const scroll  = document.getElementById('recentlyViewedScroll');
  if (!section || !scroll) return;

  const ids    = getRecentIds();
  const movies = ids.map(id => MOVIES.find(m => m.id === id)).filter(Boolean);

  if (movies.length === 0) {
    section.classList.add('hidden');
    return;
  }

  section.classList.remove('hidden');
  scroll.innerHTML = '';

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'mini-card recent-card';
    card.innerHTML = `
      <div class="mini-poster-wrap">
        <img class="mini-poster" src="${movie.poster}" alt="${movie.title}" loading="lazy" />
        <div class="mini-overlay">
          <span class="mini-play">▶</span>
        </div>
      </div>
      <div class="mini-title">${movie.title}</div>
      <div class="mini-rating">${getAverageRating(movie).toFixed(1)}★ · ${movie.year}</div>
    `;
    card.addEventListener('click', () => openModal(movie));
    scroll.appendChild(card);
  });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  renderRecentlyViewed();

  document.getElementById('clearRecentBtn')?.addEventListener('click', clearRecent);
});
