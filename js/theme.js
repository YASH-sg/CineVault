// =============================================
//  CINEVAULT — THEME TOGGLE
//  js/theme.js
// =============================================

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  Storage.saveTheme(theme);

  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '🌙' : '☀️';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next    = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  showToast(`Switched to ${next} mode`, 'info', 2000);
}

document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme on load
  applyTheme(Storage.getTheme());

  document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
});
