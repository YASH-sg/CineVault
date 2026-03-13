// =============================================
//  CINEVAULT — RATING SYSTEM
//  js/rating.js
// =============================================

// Store user ratings in memory (key: movie id, value: 1-5)
const userRatings = {};

/**
 * Get the computed average rating for a movie,
 * factoring in the user's personal rating if set.
 */
function getAverageRating(movie) {
  const userRating = userRatings[movie.id];
  if (!userRating) return movie.baseRating;

  const totalScore = movie.baseRating * movie.votes + userRating;
  const totalVotes = movie.votes + 1;
  return totalScore / totalVotes;
}

/**
 * Get total vote count (including user vote if set).
 */
function getVoteCount(movie) {
  return userRatings[movie.id] ? movie.votes + 1 : movie.votes;
}

/**
 * Save a user rating and trigger a UI refresh of that card.
 */
function submitRating(movieId, stars) {
  userRatings[movieId] = stars;

  // Update the card's displayed average
  const movie = MOVIES.find(m => m.id === movieId);
  if (!movie) return;

  const avg = getAverageRating(movie);
  const votes = getVoteCount(movie);

  // Update card avg display
  const cardAvg = document.querySelector(`[data-movie-id="${movieId}"] .avg-score`);
  const cardVotes = document.querySelector(`[data-movie-id="${movieId}"] .avg-label`);
  if (cardAvg) cardAvg.textContent = avg.toFixed(1) + "★";
  if (cardVotes) cardVotes.textContent = `${votes.toLocaleString()} votes`;

  // Update modal avg display if open
  const modalAvg = document.getElementById("modalAvgScore");
  const modalVotes = document.getElementById("modalVoteCount");
  if (modalAvg && modalAvg.dataset.movieId == movieId) {
    modalAvg.textContent = avg.toFixed(1);
    if (modalVotes) modalVotes.textContent = `${votes.toLocaleString()} votes`;
  }
}

/**
 * Build a star-rating widget (for movie cards).
 * Uses CSS rtl trick for hover highlight.
 */
function buildCardStars(movie) {
  const wrapper = document.createElement("div");
  wrapper.className = "star-rating";
  wrapper.setAttribute("data-id", movie.id);

  for (let i = 5; i >= 1; i--) {
    const id = `star-card-${movie.id}-${i}`;
    const input = document.createElement("input");
    input.type = "radio";
    input.name = `rating-card-${movie.id}`;
    input.id = id;
    input.value = i;
    if (userRatings[movie.id] === i) input.checked = true;

    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = "★";
    label.title = `${i} star${i > 1 ? "s" : ""}`;

    input.addEventListener("change", () => submitRating(movie.id, i));

    wrapper.appendChild(input);
    wrapper.appendChild(label);
  }
  return wrapper;
}

/**
 * Build a larger star-rating widget (for the modal).
 */
function buildModalStars(movie) {
  const wrapper = document.createElement("div");
  wrapper.className = "modal-star-rating";

  for (let i = 5; i >= 1; i--) {
    const id = `star-modal-${movie.id}-${i}`;
    const input = document.createElement("input");
    input.type = "radio";
    input.name = `rating-modal-${movie.id}`;
    input.id = id;
    input.value = i;
    if (userRatings[movie.id] === i) input.checked = true;

    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = "★";
    label.title = `${i} star${i > 1 ? "s" : ""}`;

    input.addEventListener("change", () => {
      submitRating(movie.id, i);
      // Sync card stars
      const cardInput = document.getElementById(`star-card-${movie.id}-${i}`);
      if (cardInput) cardInput.checked = true;
    });

    wrapper.appendChild(input);
    wrapper.appendChild(label);
  }
  return wrapper;
}
