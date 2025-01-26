export function formatDate(date) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('ru-RU', options);
}

export function escapeHtml(unsafe) {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
