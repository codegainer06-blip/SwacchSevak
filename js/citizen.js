import { escapeHTML,formatDate,statusClass } from './utils.js';
export function renderCitizenComplaints(state,complaints=null) {
 const mine=(complaints||state.complaints.filter(c=>!state.user||c.citizenPhone===state.user.phone)).filter(c=>c.status!=='Resolved');
 return mine.length?`<div class="table-wrap"><table><thead><tr><th>Complaint</th><th>Location</th><th>Submitted</th><th>Status</th><th>Action</th></tr></thead><tbody>${mine.map(c=>`<tr><td><strong>${escapeHTML(c.title)}</strong><div class="muted">${c.id}</div></td><td>${escapeHTML(c.area)}<div class="muted">${escapeHTML(c.street)}</div></td><td>${formatDate(c.createdAt)}</td><td><span class="badge ${statusClass(c.status)}">${c.status}</span></td><td><button class="small-link" data-track="${c.id}">View</button></td></tr>`).join('')}</tbody></table></div>`:'<div class="empty">No complaints to display. Submit your first report.</div>';
}
