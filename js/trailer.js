// =============================================
//  CINEVAULT — TRAILER MODAL
//  js/trailer.js
// =============================================

function openTrailer(trailerKey, title) {
  const overlay = document.getElementById('trailerOverlay');
  const frame   = document.getElementById('trailerFrame');
  if (!overlay || !frame) return;

  // Build YouTube embed URL with autoplay
  frame.src = `https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`;
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  showToast(`Playing trailer: <strong>${title}</strong>`, 'info', 2500);
}

function closeTrailer() {
  const overlay = document.getElementById('trailerOverlay');
  const frame   = document.getElementById('trailerFrame');
  if (!overlay || !frame) return;

  frame.src = ''; // Stop video playback
  overlay.classList.add('hidden');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('trailerClose')?.addEventListener('click', closeTrailer);

  document.getElementById('trailerOverlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeTrailer();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeTrailer();
    }
  });
});
