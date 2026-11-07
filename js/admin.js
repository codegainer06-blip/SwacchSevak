import { renderComplaintRecords } from './records.js';
export function renderAdminComplaints(state, complaints=state.complaints) {
 return renderComplaintRecords(complaints);
}
