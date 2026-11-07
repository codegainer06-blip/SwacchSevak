import { escapeHTML,formatDate,statusClass } from './utils.js';
import { ESCALATION_HOURS } from './settings.js';

export function renderComplaintRecords(complaints) {
  if(!complaints.length)return '<div class="empty">No complaints in this section.</div>';
  return `<div class="record-list">${complaints.map(c=>`<article class="record-card"><div class="record-heading"><div><h3>${escapeHTML(c.title)}</h3><span class="muted">${escapeHTML(c.id)} · ${formatDate(c.createdAt)}</span></div><span class="badge ${statusClass(c.status)}">${escapeHTML(c.status)}</span></div><div class="record-facts"><div><span class="kpi-label">Category</span><p>${escapeHTML(c.category||'—')}</p></div><div><span class="kpi-label">Location</span><p>${escapeHTML(c.street||'—')}, ${escapeHTML(c.area||'—')}${c.landmark?`, ${escapeHTML(c.landmark)}`:''}</p></div><div><span class="kpi-label">Assignment</span><p>${c.assignedTo?'Assigned':'Unassigned'}</p></div><div><span class="kpi-label">Escalation</span><p>${c.escalated?'Escalated':'—'}</p></div></div><details class="record-details" open><summary>Full details</summary><p class="record-description">${escapeHTML(c.description||'No description provided.')}</p>${c.photo||c.completionPhoto?`<div class="record-photos">${c.photo?`<figure><img src="${c.photo}" alt="Complaint photo"><figcaption>Complaint photo</figcaption></figure>`:''}${c.completionPhoto?`<figure><img src="${c.completionPhoto}" alt="Completion photo"><figcaption>Completion photo</figcaption></figure>`:''}</div>`:''}<h4>Progress history</h4><div class="timeline">${(c.history||[]).map(h=>`<div class="timeline-item"><strong>${escapeHTML(h.text)}</strong><p>${formatDate(h.at)}</p></div>`).join('')||'<p>No status updates.</p>'}</div></details></article>`).join('')}</div>`;
}

export function renderResolvedRecords(complaints) {
  const resolved=complaints.filter(c=>c.status==='Resolved'||c.status==='Reopened');
  if(!resolved.length)return '<div class="empty">No resolved records.</div>';
  return `<div class="table-wrap resolved-record-table"><table><thead><tr><th>Record number</th><th>Assigned to</th><th>Status</th></tr></thead><tbody>${resolved.map(c=>`<tr><td>${escapeHTML(c.id)}</td><td>${escapeHTML(c.assignedTo||'—')}</td><td>${c.status==='Resolved'?'Completed':'Revoked'}</td></tr>`).join('')}</tbody></table></div>`;
}

export function renderOngoingTrackRecords(complaints,state) {
  if(!complaints.length)return '<div class="empty">No ongoing complaints.</div>';
  const now=Date.now()+(state.settings?.sampleClockHours||0)*3600000;
  return `<div class="table-wrap resolved-record-table"><table><thead><tr><th>Complaint number</th><th>Time to escalation</th><th>Priority status</th></tr></thead><tbody>${complaints.map(c=>{const ageHours=(now-new Date(c.createdAt).getTime())/3600000;const remaining=Math.max(0,Math.ceil((ESCALATION_HOURS-ageHours)*60));const countdown=c.status==='Reopened'?'Paused while reopened':`${Math.floor(remaining/60)}h ${remaining%60}m`;return `<tr><td>${escapeHTML(c.id)}</td><td>${c.escalated?'Escalated':countdown}</td><td>${c.escalated?'<span class="badge reopened">Priority complaint · sent to higher authority</span>':c.status==='Reopened'?'Reopened':'Monitoring'}</td></tr>`;}).join('')}</tbody></table></div>`;
}
