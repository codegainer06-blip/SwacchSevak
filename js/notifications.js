import { uid } from './storage.js';
import { formatDate } from './utils.js';
export function addNotification(state,text) { state.notifications.unshift({id:uid(),text,at:new Date().toISOString(),read:false}); }
export function renderNotifications(state) {
  const unread=state.notifications.some(n=>!n.read);
  document.querySelector('#notification-dot').style.display=unread?'block':'none';
  return state.notifications.length?state.notifications.map(n=>`<div class="notification-item"><strong>${n.text}</strong><div class="muted" style="margin-top:5px">${formatDate(n.at)}</div></div>`).join(''):'<div class="empty">No notifications yet.</div>';
}
