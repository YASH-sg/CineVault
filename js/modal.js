// =============================================
//  CINEVAULT — MODAL
//  js/modal.js
// =============================================

function openModal(movie) {
  const overlay = document.getElementById("modalOverlay");
  const content = document.getElementById("modalContent");
  const avg = getAverageRating(movie);
  const votes = getVoteCount(movie);

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
      <a class="modal-trailer-btn" href="${movie.trailer}" target="_blank" rel="noopener">
        ▶ Watch Trailer
      </a>
    </div>
  `;

  // Inject modal star rating widget
  const starContainer = content.querySelector("#modalStarContainer");
  starContainer.appendChild(buildModalStars(movie));

  overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalOverlay").classList.add("hidden");
  document.body.style.overflow = "";
}

// Close on overlay click or X button
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.getElementById("modalClose").addEventListener("click", closeModal);

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
