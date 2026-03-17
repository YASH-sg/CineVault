// =============================================
//  CINEVAULT — MORE LIKE THIS  (Day 6)
//  js/moreLikeThis.js
// =============================================

/**
 * Returns up to `limit` movies similar to the given movie.
 * Similarity score = genre match (2pts) + within 3 years (1pt) + close rating (1pt)
 */
function getSimilarMovies(movie, limit = 4) {
  return MOVIES
    .filter(m => m.id !== movie.id)
    .map(m => {
      let score = 0;
      if (m.genre === movie.genre)                                      score += 2;
      if (Math.abs(m.year - movie.year) <= 3)                          score += 1;
      if (Math.abs(getAverageRating(m) - getAverageRating(movie)) < 0.5) score += 1;
      return { movie: m, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.movie);
}

/**
 * Build the "More Like This" HTML block injected into the modal.
 */
function buildMoreLikeThis(movie) {
  const similar = getSimilarMovies(movie, 4);
  if (similar.length === 0) return null;

  const section = document.createElement('div');
  section.className = 'more-like-this';

  section.innerHTML = `
    <div class="mlt-label">More Like This</div>
    <div class="mlt-row" id="mltRow"></div>
  `;

  const row = section.querySelector('#mltRow');

  similar.forEach(m => {
    const card = document.createElement('div');
    card.className = 'mlt-card';
    card.innerHTML = `
      <img src="${m.poster}" alt="${m.title}" loading="lazy" />
      <div class="mlt-info">
        <div class="mlt-title">${m.title}</div>
        <div class="mlt-meta">${m.genre} · ${m.year}</div>
        <div class="mlt-rating">${getAverageRating(m).toFixed(1)}★</div>
      </div>
    `;
    card.addEventListener('click', () => {
      // Close current modal and open the clicked one
      document.getElementById('modalOverlay').classList.add('hidden');
      document.body.style.overflow = '';
      setTimeout(() => openModal(m), 80);
    });
    row.appendChild(card);
  });

  return section;
}
