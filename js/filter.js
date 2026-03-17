// =============================================
//  CINEVAULT — SEARCH, FILTER & SORT  (Day 6)
//  js/filter.js
// =============================================

function getFilteredMovies() {
  const query   = document.getElementById('searchInput').value.trim().toLowerCase();
  const genre   = document.getElementById('genreFilter').value;
  const year    = document.getElementById('yearFilter').value;
  const minRate = parseFloat(document.getElementById('ratingFilter').value) || 0;
  const sort    = document.getElementById('sortFilter').value;

  let results = MOVIES.filter(movie => {
    const matchTitle = !query || movie.title.toLowerCase().includes(query);
    const matchGenre = !genre || movie.genre === genre;
    const matchYear  = !year  || movie.year === parseInt(year);
    const matchRate  = getAverageRating(movie) >= minRate;
    return matchTitle && matchGenre && matchYear && matchRate;
  });

  // --- Sort ---
  switch (sort) {
    case 'rating-desc': results.sort((a,b) => getAverageRating(b) - getAverageRating(a)); break;
    case 'rating-asc':  results.sort((a,b) => getAverageRating(a) - getAverageRating(b)); break;
    case 'year-desc':   results.sort((a,b) => b.year - a.year);                           break;
    case 'year-asc':    results.sort((a,b) => a.year - b.year);                           break;
    case 'title-asc':   results.sort((a,b) => a.title.localeCompare(b.title));            break;
    case 'title-desc':  results.sort((a,b) => b.title.localeCompare(a.title));            break;
    default: break; // keep original order
  }

  return results;
}

function updateResultsLabel(count) {
  const label = document.getElementById('resultsCount');
  if (!label) return;
  const sort = document.getElementById('sortFilter').value;
  const sortLabel = sort !== 'default' ? ` · sorted` : '';
  label.textContent = count === MOVIES.length
    ? `Showing all ${count} movies${sortLabel}`
    : `${count} movie${count !== 1 ? 's' : ''} found${sortLabel}`;
}

function resetFilters() {
  document.getElementById('searchInput').value  = '';
  document.getElementById('genreFilter').value  = '';
  document.getElementById('yearFilter').value   = '';
  document.getElementById('ratingFilter').value = '';
  document.getElementById('sortFilter').value   = 'default';
  currentPage = 1;
  renderMovies();
}

document.addEventListener('DOMContentLoaded', () => {
  ['searchInput','genreFilter','yearFilter','ratingFilter','sortFilter'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener(id === 'searchInput' ? 'input' : 'change', () => {
      currentPage = 1;
      renderMovies();
      if (id === 'sortFilter' && document.getElementById('sortFilter').value !== 'default') {
        const labels = {
          'rating-desc':'Rating: High → Low','rating-asc':'Rating: Low → High',
          'year-desc':'Year: Newest First','year-asc':'Year: Oldest First',
          'title-asc':'Title: A → Z','title-desc':'Title: Z → A'
        };
        showToast(`Sorted by: ${labels[document.getElementById('sortFilter').value]}`, 'info', 2000);
      }
    });
  });
});
