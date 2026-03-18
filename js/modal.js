// =============================================
//  CINEVAULT — MODAL  (TMDB-enriched)
//  js/modal.js
// =============================================

async function openModal(movie) {
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  const avg     = getAverageRating(movie);
  const votes   = getVoteCount(movie);
  const saved   = Storage.isInWatchlist(movie.id);

  // Show modal immediately with what we have
  content.innerHTML = `
    <div class="modal-hero">
      <img class="modal-poster" src="${movie.poster}" alt="${movie.title}" loading="lazy" />
      <div class="modal-meta">
        <span class="modal-genre">${movie.genre}</span>
        <h2 class="modal-title">${movie.title}</h2>
        <p class="modal-year">${movie.year}</p>
        <div class="modal-cast-label">Cast</div>
        <p class="modal-cast">${movie.cast}</p>
        <div class="modal-rating-row">
          <span class="modal-avg" id="modalAvgScore" data-movie-id="${movie.id}">${avg.toFixed(1)}</span>
          <span style="color:var(--accent);font-size:1.2rem">★</span>
          <span class="modal-vote-count" id="modalVoteCount">${votes.toLocaleString()} votes</span>
        </div>
      </div>
    </div>
    <div class="modal-body">
      <div class="modal-desc-label">Synopsis</div>
      <p class="modal-description">${movie.description}</p>

      <div class="modal-user-rating">
        <h4>Rate this movie</h4>
        <div id="modalStarContainer"></div>
      </div>

      <div class="modal-action-row">
        <button class="modal-trailer-btn" id="modalTrailerBtn">
          ${movie.trailerKey ? '▶ Watch Trailer' : '⏳ Loading Trailer…'}
        </button>
        <button class="modal-watchlist-btn ${saved ? 'saved' : ''}"
          id="modalWatchlistBtn" data-movie-id="${movie.id}">
          ${saved ? '♥ In Watchlist' : '♡ Add to Watchlist'}
        </button>
      </div>

      <div id="moreLikeThisContainer"></div>
    </div>
  `;

  // Stars
  content.querySelector('#modalStarContainer').appendChild(buildModalStars(movie));

  // Watchlist
  content.querySelector('#modalWatchlistBtn').addEventListener('click', () => {
    toggleWatchlist(movie.id);
    const nowSaved = Storage.isInWatchlist(movie.id);
    const btn = document.getElementById('modalWatchlistBtn');
    if (btn) {
      btn.textContent = nowSaved ? '♥ In Watchlist' : '♡ Add to Watchlist';
      btn.classList.toggle('saved', nowSaved);
    }
  });

  // Trailer button (wire it; key may arrive after enrichment)
  const trailerBtn = content.querySelector('#modalTrailerBtn');
  trailerBtn.addEventListener('click', () => {
    if (movie.trailerKey) {
      closeModal();
      openTrailer(movie.trailerKey, movie.title);
    } else {
      showToast('Trailer is still loading, try again shortly…', 'info');
    }
  });

  // More Like This
  const mltContainer = content.querySelector('#moreLikeThisContainer');
  const mltBlock = buildMoreLikeThis(movie);
  if (mltBlock) mltContainer.appendChild(mltBlock);

  // Track in recently viewed
  pushRecent(movie.id);
  renderRecentlyViewed();

  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // Enrich with TMDB (trailer + cast) if needed — async, non-blocking
  if (movie.tmdbId && (movie.trailerKey === null || movie.cast === 'Loading…')) {
    await enrichMovie(movie);
    // Patch trailer button
    if (trailerBtn) {
      trailerBtn.textContent = '▶ Watch Trailer';
    }
  }
}

function closeModal() {
  document.getElementById('modalOverlay').classList.add('hidden');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
