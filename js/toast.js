// =============================================
//  CINEVAULT — TOAST NOTIFICATIONS
//  js/toast.js
// =============================================

function showToast(message, type = 'default', duration = 3000) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const icons = {
    success: '✅',
    error:   '❌',
    info:    'ℹ️',
    default: '🎬'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type] || icons.default}</span> ${message}`;

  container.appendChild(toast);

  // Auto-remove
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 280);
  }, duration);
}
