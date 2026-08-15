const API_BASE = "https://resume-ai-api-tg2p.onrender.com";

let currentStep = 0;
const totalSteps = 5;
let photoDataUrl = null;

function handlePhoto(e){
  const file = e.target.files[0];
  if(!file) { photoDataUrl = null; return; }
  const reader = new FileReader();
  reader.onload = function(ev){
    const img = new Image();
    img.onload = function(){
      // Resize/compress to keep files small and PDF generation fast — raw phone
      // photos can be several MB, which slows generation and bloats downloads.
      const MAX_DIM = 300;
      let w = img.width, h = img.height;
      if(w > h && w > MAX_DIM){ h = h * (MAX_DIM/w); w = MAX_DIM; }
      else if(h > MAX_DIM){ w = w * (MAX_DIM/h); h = MAX_DIM; }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      photoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      const preview = document.getElementById('photoPreview');
      preview.src = photoDataUrl;
      preview.style.display = 'block';
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

function removeBlock(btn){ btn.closest('.entry-card').remove(); }

function addAcademic(){
  const div = document.createElement('div');
  div.className = 'entry-card';
  div.innerHTML = `
    <div class="entry-head"><span class="label">Qualification</span><button class="remove-btn" onclick="removeBlock(this)">Remove</button></div>
    <div class="row2">
      <div class="field"><label>Level</label>
        <select class="ac-level">
          <option>SSLC / 10th</option><option>HSC / 12th</option><option>Diploma</option>
          <option>College / Bachelor's</option><option>Master's</option><option>Other</option>
        </select>
      </div>
      <div class="field"><label>Institution</label><input class="ac-institution" placeholder="Full name — avoid abbreviations"></div>
    </div>
    <div class="row2">
      <div class="field"><label>Board / University</label><input class="ac-board" placeholder="Full name"></div>
      <div class="field"><label>Year</label><input class="ac-year" placeholder="e.g. 2022"></div>
    </div>
    <div class="field"><label>Score</label><input class="ac-score" placeholder="e.g. 8.4 CGPA or 78%"></div>`;
  document.getElementById('academicsList').appendChild(div);
}

function addCertification(){
  const div = document.createElement('div');
  div.className = 'entry-card';
  div.innerHTML = `
    <div class="entry-head"><span class="label">Certification</span><button class="remove-btn" onclick="removeBlock(this)">Remove</button></div>
    <div class="field"><label>Full certification name</label><input class="ct-name" placeholder="Write it in full — e.g. 'HCL Certified Network Engineer (HCNE)', not just the short form"></div>
    <div class="row2">
      <div class="field"><label>Issued by</label><input class="ct-issuer" placeholder="Full organization name"></div>
      <div class="field"><label>Year</label><input class="ct-year" placeholder="e.g. 2024"></div>
    </div>`;
  document.getElementById('certList').appendChild(div);
}

function addExperience(){
  const div = document.createElement('div');
  div.className = 'entry-card';
  div.innerHTML = `
    <div class="entry-head"><span class="label">Role</span><button class="remove-btn" onclick="removeBlock(this)">Remove</button></div>
    <div class="row2">
      <div class="field"><label>Job title</label><input class="ex-title" placeholder="Full official designation"></div>
      <div class="field"><label>Company</label><input class="ex-company" placeholder="Full registered company name"></div>
    </div>
    <div class="field"><label>Duration</label><input class="ex-duration" placeholder="e.g. Jun 2023 – Present"></div>
    <div class="field"><label>What did you do?</label><textarea class="ex-desc" placeholder="Write in full sentences — rough notes are fine, AI will polish it"></textarea></div>`;
  document.getElementById('expList').appendChild(div);
}
addAcademic();

function changeStep(dir){
  const next = currentStep + dir;
  if(next < 0 || next >= totalSteps) return;
  if(dir === 1 && !validateStep(currentStep)) return;
  document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
  document.querySelector(`.tab[data-step="${currentStep}"]`).classList.remove('active');
  currentStep = next;
  document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
  document.querySelector(`.tab[data-step="${currentStep}"]`).classList.add('active');
  document.getElementById('backBtn').style.visibility = currentStep === 0 ? 'hidden' : 'visible';
  document.getElementById('nextBtn').style.display = currentStep === totalSteps-1 ? 'none' : 'inline-block';
  window.scrollTo({top:0,behavior:'smooth'});
}
document.getElementById('backBtn').style.visibility = 'hidden';

document.querySelectorAll('.tab').forEach(t=>{
  t.addEventListener('click', ()=>{
    const target = parseInt(t.dataset.step);
    if(target > currentStep && !validateStep(currentStep)) return;
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.tab[data-step="${currentStep}"]`).classList.remove('active');
    currentStep = target;
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
    document.querySelector(`.tab[data-step="${currentStep}"]`).classList.add('active');
    document.getElementById('backBtn').style.visibility = currentStep === 0 ? 'hidden' : 'visible';
    document.getElementById('nextBtn').style.display = currentStep === totalSteps-1 ? 'none' : 'inline-block';
  });
});

function validateStep(step){
  if(step === 0){
    if(!document.getElementById('fullName').value.trim() ||
       !document.getElementById('mobile').value.trim() ||
       !document.getElementById('email').value.trim()){
      alert('Please fill Full Name, Mobile and Email before continuing.');
      return false;
    }
  }
  return true;
}

function collectFormData(){
  const academics = [...document.querySelectorAll('#academicsList .entry-card')].map(c=>({
    level: c.querySelector('.ac-level').value,
    institution: c.querySelector('.ac-institution').value,
    board: c.querySelector('.ac-board').value,
    year: c.querySelector('.ac-year').value,
    score: c.querySelector('.ac-score').value
  })).filter(a=>a.institution);

  const certifications = [...document.querySelectorAll('#certList .entry-card')].map(c=>({
    name: c.querySelector('.ct-name').value,
    issuer: c.querySelector('.ct-issuer').value,
    year: c.querySelector('.ct-year').value
  })).filter(c=>c.name);

  const experience = [...document.querySelectorAll('#expList .entry-card')].map(c=>({
    title: c.querySelector('.ex-title').value,
    company: c.querySelector('.ex-company').value,
    duration: c.querySelector('.ex-duration').value,
    description: c.querySelector('.ex-desc').value
  })).filter(e=>e.title);

  return {
    name: document.getElementById('fullName').value.trim(),
    mobile: document.getElementById('mobile').value.trim(),
    email: document.getElementById('email').value.trim(),
    location: document.getElementById('location').value.trim(),
    objective: document.getElementById('objective').value.trim(),
    skills: document.getElementById('skills').value.trim(),
    projects: document.getElementById('projects').value.trim(),
    photo: photoDataUrl,
    academics, certifications, experience
  };
}

function showFormError(msg){
  document.getElementById('genError').innerHTML = `<div class="error-msg">${msg}</div>`;
}

async function startPayment(amount, tier, btn){
  const data = collectFormData();
  if(!data.name || !data.mobile || !data.email){
    showFormError("Please complete the Personal Details step first.");
    return;
  }
  document.getElementById('genError').innerHTML = '';
  btn.disabled = true;
  const originalText = btn.textContent;
  btn.textContent = "Preparing…";

  try{
    const orderRes = await fetch(`${API_BASE}/create-order`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ type: tier })
    });
    const order = await orderRes.json();
    if(!order.success) throw new Error("order_failed");

    const options = {
      key: order.key_id,
      amount: order.amount,
      currency: "INR",
      name: "Instant Resume Builder",
      description: `${tier[0].toUpperCase()+tier.slice(1)} Resume Package`,
      order_id: order.order_id,
      prefill: { name: data.name, email: data.email, contact: data.mobile },
      theme: { color: "#145C4B" },
      handler: function(response){
        localStorage.setItem("resumeData", JSON.stringify(data));
        localStorage.setItem("paymentInfo", JSON.stringify({
          type: tier,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        }));
        window.location.href = "success.html";
      },
      modal: { ondismiss: function(){ btn.disabled=false; btn.textContent=originalText; } }
    };
    const rzp = new Razorpay(options);
    rzp.on('payment.failed', function(){
      showFormError("Payment failed or was cancelled. Please try again.");
      btn.disabled=false; btn.textContent=originalText;
    });
    rzp.open();
  }catch(err){
    console.error(err);
    showFormError("Couldn't start payment right now. Please try again in a moment.");
    btn.disabled=false; btn.textContent=originalText;
  }
}
