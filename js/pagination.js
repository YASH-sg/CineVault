// =============================================
//  CINEVAULT — PAGINATION
//  js/pagination.js
// =============================================

const MOVIES_PER_PAGE = 8;
let currentPage = 1;

function getTotalPages(filteredMovies) {
  return Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);
}

function getPageMovies(filteredMovies) {
  const start = (currentPage - 1) * MOVIES_PER_PAGE;
  return filteredMovies.slice(start, start + MOVIES_PER_PAGE);
}

function renderPagination(filteredMovies) {
  const container  = document.getElementById('pagination');
  const totalPages = getTotalPages(filteredMovies);

  container.innerHTML = '';
  if (totalPages <= 1) return;

  // Prev button
  const prev = document.createElement('button');
  prev.className = 'page-btn';
  prev.textContent = '‹';
  prev.disabled = currentPage === 1;
  prev.addEventListener('click', () => {
    if (currentPage > 1) { currentPage--; renderMovies(); scrollToGrid(); }
  });
  container.appendChild(prev);

  // Page number buttons
  for (let i = 1; i <= totalPages; i++) {
    // Show first, last, current, and neighbours; collapse others to "…"
    const isEdge     = i === 1 || i === totalPages;
    const isNear     = Math.abs(i - currentPage) <= 1;
    if (!isEdge && !isNear) {
      // Add ellipsis only once per gap
      if (i === 2 || i === totalPages - 1) {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '…';
        ellipsis.style.cssText = 'color:var(--muted);padding:0 4px;line-height:38px;';
        container.appendChild(ellipsis);
      }
      continue;
    }

    const btn = document.createElement('button');
    btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
    btn.textContent = i;
    btn.addEventListener('click', () => {
      currentPage = i;
      renderMovies();
      scrollToGrid();
    });
    container.appendChild(btn);
  }

  // Next button
  const next = document.createElement('button');
  next.className = 'page-btn';
  next.textContent = '›';
  next.disabled = currentPage === totalPages;
  next.addEventListener('click', () => {
    if (currentPage < totalPages) { currentPage++; renderMovies(); scrollToGrid(); }
  });
  container.appendChild(next);
}

function scrollToGrid() {
  document.getElementById('allMoviesAnchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
