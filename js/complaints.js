import { uid } from './storage.js';
import { addNotification } from './notifications.js';
export function createComplaint(state,data) {
  const id=uid('SS');
  const complaint={id,title:data.title,category:data.category,description:data.description,street:data.street,area:data.area,landmark:data.landmark,status:'Pending',createdAt:new Date().toISOString(),citizen:state.user?.name||'Anonymous citizen',citizenPhone:state.user?.phone||'',assignedTo:'',history:[{at:new Date().toISOString(),text:'Complaint submitted'}],photo:data.photo||null,completionPhoto:null,verified:false};
  state.complaints.unshift(complaint);addNotification(state,`Complaint ${id} was submitted successfully.`);return complaint;
}
export function updateStatus(state,complaint,status,note) {
  complaint.status=status;if(status==='Resolved')complaint.completionSeenBy=[];complaint.history.push({at:new Date().toISOString(),text:note||`Status changed to ${status}`});
  addNotification(state,`Complaint ${complaint.id}: ${note||status}.`);
}
export function processEscalations(state) {
  const now=Date.now()+(state.settings.sampleClockHours||0)*3600000;
  state.complaints.forEach(c=>{
    const age=(now-new Date(c.createdAt).getTime())/3600000;
    if(age>=48&&!['Resolved','Reopened'].includes(c.status)&&!c.escalated){c.escalated=true;c.history.push({at:new Date().toISOString(),text:'Automatically escalated after 48 hours in sample clock.'});addNotification(state,`Complaint ${c.id} has been escalated to municipal administration.`);}
  });
}
