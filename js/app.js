// =============================================
//  CINEVAULT — MAIN APP
//  js/app.js
// =============================================

/**
 * Build a single movie card DOM element.
 */
function buildMovieCard(movie) {
  const avg   = getAverageRating(movie);
  const votes = getVoteCount(movie);

  const card = document.createElement("article");
  card.className = "movie-card";
  card.setAttribute("data-movie-id", movie.id);

  card.innerHTML = `
    <div class="card-poster">
      <img src="${movie.poster}" alt="${movie.title}" loading="lazy" />
      <div class="card-overlay">
        <span class="overlay-hint">View Details →</span>
      </div>
      <span class="card-genre-badge">${movie.genre}</span>
    </div>
    <div class="card-body">
      <h3 class="card-title" title="${movie.title}">${movie.title}</h3>
      <p class="card-year">${movie.year}</p>
      <div class="card-rating-display">
        <span class="avg-score">${avg.toFixed(1)}★</span>
        <span class="avg-label">${votes.toLocaleString()} votes</span>
      </div>
      <p class="rate-label">Your Rating</p>
      <div class="card-stars-placeholder"></div>
    </div>
  `;

  // Inject star widget
  const starPlaceholder = card.querySelector(".card-stars-placeholder");
  starPlaceholder.appendChild(buildCardStars(movie));

  // Open modal on card click (but not when clicking stars)
  card.addEventListener("click", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "LABEL") return;
    openModal(movie);
  });

  return card;
}

/**
 * Render movies into the grid based on current filters.
 * Called on page load and whenever a filter changes.
 */
function renderMovies() {
  const grid       = document.getElementById("movieGrid");
  const emptyState = document.getElementById("emptyState");
  const filtered   = getFilteredMovies();

  // Clear grid
  grid.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
    filtered.forEach((movie, index) => {
      const card = buildMovieCard(movie);
      // Stagger animation
      card.style.animationDelay = `${index * 40}ms`;
      grid.appendChild(card);
    });
  }

  updateResultsLabel(filtered.length);
}

// Initial render on page load
document.addEventListener("DOMContentLoaded", () => {
  renderMovies();
});
