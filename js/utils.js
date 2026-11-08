export function uid(prefix='SS') {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;
}
export function escapeHTML(value='') {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
export function formatDate(value) {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString();
}
export function hoursSince(value) { return (Date.now() - new Date(value).getTime()) / 36e5; }
export function toast(message) {
  const region = document.querySelector('#toast-region');
  if (!region) return;
  const el = document.createElement('div'); el.className='toast'; el.textContent=message;
  region.append(el); setTimeout(()=>el.remove(), 3500);
}
export function statusClass(status) {
  return ({'Pending':'pending','Assigned':'progress','In Progress':'progress','Resolved':'resolved','Reopened':'reopened'}[status] || '');
}
