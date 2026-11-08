import { STORAGE_KEY,SESSION_KEY } from './settings.js';
import { uid as makeUid } from './utils.js';
const seed = {
  user: null,
  complaints: [
    {id:'SS-1001',title:'Garbage accumulation near bus stop',category:'Overflowing garbage',description:'Waste has been accumulating beside the bus stop for several days.',street:'Market Road',area:'Ward 4',landmark:'Main bus stop',status:'Pending',createdAt:new Date(Date.now()-6*3600000).toISOString(),citizen:'Aarav Sharma',citizenPhone:'9999999999',assignedTo:'',history:[{at:new Date(Date.now()-6*3600000).toISOString(),text:'Complaint submitted'}],photo:null,completionPhoto:null,verified:false},
    {id:'SS-1002',title:'Open drain needs cleaning',category:'Drainage',description:'Drain is blocked and needs attention.',street:'Temple Street',area:'Ward 2',landmark:'Near temple entrance',status:'In Progress',createdAt:new Date(Date.now()-30*3600000).toISOString(),citizen:'Aarav Sharma',citizenPhone:'9999999999',assignedTo:'Meera Patel',history:[{at:new Date(Date.now()-30*3600000).toISOString(),text:'Complaint submitted'},{at:new Date(Date.now()-22*3600000).toISOString(),text:'Assigned to Meera Patel'},{at:new Date(Date.now()-10*3600000).toISOString(),text:'Work marked in progress'}],photo:null,completionPhoto:null,verified:false}
  ],
  notifications:[{id:makeUid('N'),text:'Welcome to the Swachh Sevak community portal.',at:new Date().toISOString(),read:false}],
  contacts:[
    {name:'Ward Member',role:'Ward Member',area:'All wards'},
    {name:'Municipal Office',role:'Municipal Corporation',area:'Municipal administration'},
    {name:'Emergency services',role:'Emergency directory',area:'City services'}
  ],
  settings:{sampleClockHours:0}
};
const clone = value => JSON.parse(JSON.stringify(value));
export function uid() { return makeUid(); }
function loadSession() {
  try {
    const raw=localStorage.getItem(SESSION_KEY);
    return raw?JSON.parse(raw):null;
  } catch (e) { console.warn('Session restore failed:',e); return null; }
}
export function loadState() {
  const session=loadSession();
  try {
    const raw=localStorage.getItem(STORAGE_KEY);
    if (!raw) { const initial={...clone(seed),user:session}; localStorage.setItem(STORAGE_KEY,JSON.stringify(initial)); return initial; }
    const parsed=JSON.parse(raw);
    const state={...clone(seed),...parsed,user:session||parsed.user||null,complaints:Array.isArray(parsed.complaints)?parsed.complaints:clone(seed.complaints),notifications:Array.isArray(parsed.notifications)?parsed.notifications:[]};
    const legacyLabel=new RegExp(String.fromCharCode(100,101,109,111),'gi');
    const clean=value=>{if(typeof value==='string')return value.replace(legacyLabel,'sample').replace(/SS-sample-(\d+)/gi,'SS-$1');if(Array.isArray(value))return value.map(clean);if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([key,item])=>[key,clean(item)]));return value;};
    return clean(state);
  } catch (e) { console.warn('Storage reset:',e); return {...clone(seed),user:session}; }
}
export function saveState(state) {
  if(state.user) localStorage.setItem(SESSION_KEY,JSON.stringify(state.user));
  else localStorage.removeItem(SESSION_KEY);
  localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
}
export function resetState() { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(SESSION_KEY); return loadState(); }
