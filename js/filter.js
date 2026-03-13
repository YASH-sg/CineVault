// =============================================
//  CINEVAULT — SEARCH & FILTER
//  js/filter.js
// =============================================

/**
 * Returns the filtered subset of MOVIES based on
 * current search input + dropdowns.
 */
function getFilteredMovies() {
  const query   = document.getElementById("searchInput").value.trim().toLowerCase();
  const genre   = document.getElementById("genreFilter").value;
  const year    = document.getElementById("yearFilter").value;
  const minRate = parseFloat(document.getElementById("ratingFilter").value) || 0;

  return MOVIES.filter(movie => {
    const matchTitle = !query || movie.title.toLowerCase().includes(query);
    const matchGenre = !genre || movie.genre === genre;
    const matchYear  = !year  || movie.year === parseInt(year);
    const matchRate  = getAverageRating(movie) >= minRate;
    return matchTitle && matchGenre && matchYear && matchRate;
  });
}

/**
 * Update the results count label.
 */
function updateResultsLabel(count) {
  const label = document.getElementById("resultsCount");
  if (count === MOVIES.length) {
    label.textContent = `Showing all ${count} movies`;
  } else {
    label.textContent = `${count} movie${count !== 1 ? "s" : ""} found`;
  }
}

/**
 * Reset all filter controls and re-render.
 */
function resetFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("genreFilter").value = "";
  document.getElementById("yearFilter").value = "";
  document.getElementById("ratingFilter").value = "";
  renderMovies();
}

// Attach event listeners once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("searchInput").addEventListener("input", renderMovies);
  document.getElementById("genreFilter").addEventListener("change", renderMovies);
  document.getElementById("yearFilter").addEventListener("change", renderMovies);
  document.getElementById("ratingFilter").addEventListener("change", renderMovies);
});
