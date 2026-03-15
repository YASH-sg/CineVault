// =============================================
//  CINEVAULT — SEARCH & FILTER  (Day 3–4)
//  js/filter.js
// =============================================

function getFilteredMovies() {
  const query   = document.getElementById('searchInput').value.trim().toLowerCase();
  const genre   = document.getElementById('genreFilter').value;
  const year    = document.getElementById('yearFilter').value;
  const minRate = parseFloat(document.getElementById('ratingFilter').value) || 0;

  return MOVIES.filter(movie => {
    const matchTitle = !query || movie.title.toLowerCase().includes(query);
    const matchGenre = !genre || movie.genre === genre;
    const matchYear  = !year  || movie.year === parseInt(year);
    const matchRate  = getAverageRating(movie) >= minRate;
    return matchTitle && matchGenre && matchYear && matchRate;
  });
}

function updateResultsLabel(count) {
  const label = document.getElementById('resultsCount');
  if (!label) return;
  label.textContent = count === MOVIES.length
    ? `Showing all ${count} movies`
    : `${count} movie${count !== 1 ? 's' : ''} found`;
}

function resetFilters() {
  document.getElementById('searchInput').value  = '';
  document.getElementById('genreFilter').value  = '';
  document.getElementById('yearFilter').value   = '';
  document.getElementById('ratingFilter').value = '';
  currentPage = 1;
  renderMovies();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('searchInput').addEventListener('input',  () => { currentPage = 1; renderMovies(); });
  document.getElementById('genreFilter').addEventListener('change', () => { currentPage = 1; renderMovies(); });
  document.getElementById('yearFilter').addEventListener('change',  () => { currentPage = 1; renderMovies(); });
  document.getElementById('ratingFilter').addEventListener('change',() => { currentPage = 1; renderMovies(); });
});
