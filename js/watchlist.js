// =============================================
//  CINEVAULT — WATCHLIST
//  js/watchlist.js
// =============================================

function updateWatchlistBadge() {
  const count = Storage.getWatchlist().length;
  const badge = document.getElementById('navWatchlistCount');
  if (badge) badge.textContent = count;
}

function toggleWatchlist(movieId, silent = false) {
  const movie = MOVIES.find(m => m.id === movieId);
  if (!movie) return;

  if (Storage.isInWatchlist(movieId)) {
    Storage.removeFromWatchlist(movieId);
    if (!silent) showToast(`Removed <strong>${movie.title}</strong> from Watchlist`, 'info');
  } else {
    Storage.addToWatchlist(movieId);
    if (!silent) showToast(`Added <strong>${movie.title}</strong> to Watchlist ⭐`, 'success');
  }

  updateWatchlistBadge();
  refreshWatchlistButtons(movieId);

  // Re-render panel if open
  if (!document.getElementById('watchlistPanel').classList.contains('hidden')) {
    renderWatchlistPanel();
  }
}

function refreshWatchlistButtons(movieId) {
  const saved = Storage.isInWatchlist(movieId);

  // Card button
  const cardBtn = document.querySelector(`[data-movie-id="${movieId}"] .card-watchlist-btn`);
  if (cardBtn) {
    cardBtn.textContent = saved ? '♥' : '♡';
    cardBtn.classList.toggle('saved', saved);
    cardBtn.title = saved ? 'Remove from Watchlist' : 'Add to Watchlist';
  }

  // Modal button
  const modalBtn = document.getElementById('modalWatchlistBtn');
  if (modalBtn && String(modalBtn.dataset.movieId) === String(movieId)) {
    modalBtn.textContent = saved ? '♥ In Watchlist' : '♡ Add to Watchlist';
    modalBtn.classList.toggle('saved', saved);
  }

  // Hero button
  const heroBtn = document.getElementById('heroWatchlistBtn');
  if (heroBtn && String(heroBtn.dataset.movieId) === String(movieId)) {
    heroBtn.textContent = saved ? '♥ In Watchlist' : '＋ Watchlist';
  }
}

function renderWatchlistPanel() {
  const list = document.getElementById('watchlistList');
  const ids  = Storage.getWatchlist();
  const movies = ids.map(id => MOVIES.find(m => m.id === id)).filter(Boolean);

  if (movies.length === 0) {
    list.innerHTML = '<p class="watchlist-empty">No movies saved yet.<br>Click ♡ on any card.</p>';
    return;
  }

  list.innerHTML = '';
  movies.forEach(movie => {
    const item = document.createElement('div');
    item.className = 'watchlist-item';
    item.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}" />
      <div class="watchlist-item-info">
        <div class="watchlist-item-title">${movie.title}</div>
        <div class="watchlist-item-meta">${movie.genre} · ${movie.year} · ${getAverageRating(movie).toFixed(1)}★</div>
      </div>
      <button class="watchlist-item-remove" title="Remove">✕</button>
    `;
    item.querySelector('.watchlist-item-remove').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWatchlist(movie.id);
    });
    item.addEventListener('click', () => {
      closeWatchlist();
      openModal(movie);
    });
    list.appendChild(item);
  });
}

function openWatchlist() {
  renderWatchlistPanel();
  document.getElementById('watchlistPanel').classList.remove('hidden');
  document.getElementById('watchlistBackdrop').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeWatchlist() {
  document.getElementById('watchlistPanel').classList.add('hidden');
  document.getElementById('watchlistBackdrop').classList.add('hidden');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  updateWatchlistBadge();

  document.getElementById('navWatchlistBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    openWatchlist();
  });
  document.getElementById('watchlistClose')?.addEventListener('click', closeWatchlist);
  document.getElementById('watchlistBackdrop')?.addEventListener('click', closeWatchlist);
});
