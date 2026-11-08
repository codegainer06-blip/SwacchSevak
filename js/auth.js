import { SAMPLE_ACCOUNTS, SAMPLE_OTP } from './settings.js';
import { uid } from './storage.js';
import { toast } from './utils.js';

export function loginPage() {
  return `<section class="login-layout"><div class="login-intro"><div class="eyebrow">Swachh Sevak</div><h1>A cleaner community starts with you.</h1><p>Sign in to report local issues, follow progress, or manage your ward’s requests.</p><div class="login-art" aria-hidden="true">♻️</div></div><section class="card login-card" aria-labelledby="login-title"><div class="feature-icon">🔐</div><h2 id="login-title">Welcome back</h2><p class="muted login-copy">Choose a sample account to open its matching dashboard.</p><form id="login-form"><div class="field login-field"><label for="login-account">Login as</label><select id="login-account" required>${SAMPLE_ACCOUNTS.map((account,index)=>`<option value="${index}">${account.label}</option>`).join('')}</select></div><div class="field login-field"><label for="login-phone">Mobile number</label><input id="login-phone" inputmode="numeric" readonly></div><div class="field login-field"><label for="login-otp">One-time code</label><input id="login-otp" inputmode="numeric" maxlength="6" pattern="[0-9]{6}" placeholder="Enter 123456" required></div><p class="help login-help">Use code <strong>${SAMPLE_OTP}</strong> for these sample accounts.</p><button id="login-submit" class="button login-submit" type="submit">Sign in</button></form></section></section>`;
}

export function wireLogin(onSuccess) {
  const form=document.querySelector('#login-form');
  if(!form)return;
  const accountSelect=form.querySelector('#login-account');
  const updatePhone=()=>{form.querySelector('#login-phone').value=SAMPLE_ACCOUNTS[Number(accountSelect.value)].phone;};
  accountSelect.onchange=updatePhone;
  updatePhone();
  form.onsubmit=e=>{
    e.preventDefault();
    if(form.querySelector('#login-otp').value.trim()!==SAMPLE_OTP){toast('That code is incorrect. Use 123456.');return;}
    const account=SAMPLE_ACCOUNTS[Number(accountSelect.value)];
    onSuccess({id:uid(),phone:account.phone,name:account.name,role:account.role});
  };
}
