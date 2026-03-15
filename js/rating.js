// =============================================
//  CINEVAULT — RATING SYSTEM  (Day 3–4)
//  js/rating.js
// =============================================

function getAverageRating(movie) {
  const userRating = Storage.getRating(movie.id);
  if (!userRating) return movie.baseRating;
  return (movie.baseRating * movie.votes + userRating) / (movie.votes + 1);
}

function getVoteCount(movie) {
  return Storage.getRating(movie.id) ? movie.votes + 1 : movie.votes;
}

function submitRating(movieId, stars) {
  Storage.saveRating(movieId, stars);
  const movie = MOVIES.find(m => m.id === movieId);
  if (!movie) return;

  const avg   = getAverageRating(movie);
  const votes = getVoteCount(movie);

  // Update card
  const cardAvg   = document.querySelector(`[data-movie-id="${movieId}"] .avg-score`);
  const cardVotes = document.querySelector(`[data-movie-id="${movieId}"] .avg-label`);
  if (cardAvg)   cardAvg.textContent   = avg.toFixed(1) + '★';
  if (cardVotes) cardVotes.textContent = `${votes.toLocaleString()} votes`;

  // Update open modal
  const modalAvg   = document.getElementById('modalAvgScore');
  const modalVotes = document.getElementById('modalVoteCount');
  if (modalAvg && String(modalAvg.dataset.movieId) === String(movieId)) {
    modalAvg.textContent   = avg.toFixed(1);
    if (modalVotes) modalVotes.textContent = `${votes.toLocaleString()} votes`;
  }

  showToast(`You rated <strong>${movie.title}</strong> ${stars}★`, 'success');
}

function buildCardStars(movie) {
  const wrapper = document.createElement('div');
  wrapper.className = 'star-rating';

  const saved = Storage.getRating(movie.id);

  for (let i = 5; i >= 1; i--) {
    const id    = `star-card-${movie.id}-${i}`;
    const input = document.createElement('input');
    input.type  = 'radio';
    input.name  = `rating-card-${movie.id}`;
    input.id    = id;
    input.value = i;
    if (saved === i) input.checked = true;

    const label   = document.createElement('label');
    label.htmlFor = id;
    label.textContent = '★';
    label.title   = `${i} star${i > 1 ? 's' : ''}`;

    input.addEventListener('change', () => submitRating(movie.id, i));
    wrapper.appendChild(input);
    wrapper.appendChild(label);
  }
  return wrapper;
}

function buildModalStars(movie) {
  const wrapper = document.createElement('div');
  wrapper.className = 'modal-star-rating';

  const saved = Storage.getRating(movie.id);

  for (let i = 5; i >= 1; i--) {
    const id    = `star-modal-${movie.id}-${i}`;
    const input = document.createElement('input');
    input.type  = 'radio';
    input.name  = `rating-modal-${movie.id}`;
    input.id    = id;
    input.value = i;
    if (saved === i) input.checked = true;

    const label   = document.createElement('label');
    label.htmlFor = id;
    label.textContent = '★';

    input.addEventListener('change', () => {
      submitRating(movie.id, i);
      const cardInput = document.getElementById(`star-card-${movie.id}-${i}`);
      if (cardInput) cardInput.checked = true;
    });

    wrapper.appendChild(input);
    wrapper.appendChild(label);
  }
  return wrapper;
}
