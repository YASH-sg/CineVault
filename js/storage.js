// =============================================
//  CINEVAULT — LOCAL STORAGE
//  js/storage.js
// =============================================

const Storage = {
  // ---- Ratings ----
  getRatings() {
    try { return JSON.parse(localStorage.getItem('cv_ratings') || '{}'); }
    catch { return {}; }
  },
  saveRating(movieId, stars) {
    const r = this.getRatings();
    r[movieId] = stars;
    localStorage.setItem('cv_ratings', JSON.stringify(r));
  },
  getRating(movieId) {
    return this.getRatings()[movieId] || null;
  },

  // ---- Watchlist ----
  getWatchlist() {
    try { return JSON.parse(localStorage.getItem('cv_watchlist') || '[]'); }
    catch { return []; }
  },
  addToWatchlist(movieId) {
    const list = this.getWatchlist();
    if (!list.includes(movieId)) {
      list.push(movieId);
      localStorage.setItem('cv_watchlist', JSON.stringify(list));
    }
  },
  removeFromWatchlist(movieId) {
    const list = this.getWatchlist().filter(id => id !== movieId);
    localStorage.setItem('cv_watchlist', JSON.stringify(list));
  },
  isInWatchlist(movieId) {
    return this.getWatchlist().includes(movieId);
  },

  // ---- Theme ----
  getTheme() {
    return localStorage.getItem('cv_theme') || 'dark';
  },
  saveTheme(theme) {
    localStorage.setItem('cv_theme', theme);
  }
};