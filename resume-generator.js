const API_BASE = "https://resume-ai-api-tg2p.onrender.com"; // your Render backend URL

function removeBlock(btn){
  btn.parentElement.remove();
}

function addAcademic(){
  const div = document.createElement("div");
  div.className = "block";
  div.innerHTML = `
    <button class="remove-btn" onclick="removeBlock(this)">-</button>
    <input placeholder="Qualification">
    <input placeholder="Institution">
    <input placeholder="Grade">
  `;
  document.getElementById("academics").prepend(div);
}

function addExperience(){
  const div = document.createElement("div");
  div.className = "block";
  div.innerHTML = `
    <button class="remove-btn" onclick="removeBlock(this)">-</button>
    <input placeholder="Company Name">
    <input placeholder="Role">
    <input placeholder="Start Date">
    <input placeholder="End Date">
    <textarea placeholder="Responsibilities"></textarea>
  `;
  document.getElementById("experience").prepend(div);
}

function addSkill(){
  const div = document.createElement("div");
  div.className = "block";
  div.innerHTML = `
    <button class="remove-btn" onclick="removeBlock(this)">-</button>
    <input placeholder="Skill">
  `;
  document.getElementById("skillsSection").prepend(div);
}

function collectFormData(){
  const academics = [];
  document.querySelectorAll("#academics .block").forEach(b=>{
    academics.push([...b.querySelectorAll("input")].map(i=>i.value));
  });

  const experience = [];
  document.querySelectorAll("#experience .block").forEach(b=>{
    experience.push({
      company: b.querySelectorAll("input")[0].value,
      role: b.querySelectorAll("input")[1].value,
      start: b.querySelectorAll("input")[2].value,
      end: b.querySelectorAll("input")[3].value,
      desc: b.querySelector("textarea").value
    });
  });

  const skills = [];
  document.querySelectorAll("#skillsSection .block").forEach(b=>{
    skills.push(b.querySelector("input").value);
  });

  return {
    name: document.getElementById("name").value.trim(),
    mobile: document.getElementById("mobile").value.trim(),
    email: document.getElementById("email").value.trim(),
    projects: document.getElementById("projects").value.trim(),
    academics,
    experience,
    skills
  };
}

function showFormError(msg){
  document.getElementById("formError").innerHTML = `<div class="error-msg">${msg}</div>`;
}

async function startPayment(amount, type, btn){
  const data = collectFormData();

  if(!data.name || !data.mobile || !data.email){
    showFormError("Please fill Full Name, Mobile and Email before continuing.");
    return;
  }
  document.getElementById("formError").innerHTML = "";

  btn.disabled = true;
  const originalText = btn.textContent;
  btn.textContent = "Preparing payment…";

  try {
    // 1. Ask backend to create a Razorpay order (amount decided server-side, not trusted from client)
    const orderRes = await fetch(`${API_BASE}/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type })
    });
    const order = await orderRes.json();
    if(!order.success) throw new Error("order_failed");

    // 2. Open Razorpay Checkout modal
    const options = {
      key: order.key_id, // public key id, safe to expose
      amount: order.amount,
      currency: "INR",
      name: "Instant Resume Builder",
      description: type === "pdf" ? "PDF Resume" : "Editable Resume (Word)",
      order_id: order.order_id,
      prefill: {
        name: data.name,
        email: data.email,
        contact: data.mobile
      },
      theme: { color: "#0b3d91" },
      handler: function(response){
        // Payment succeeded — store everything needed to verify + generate
        localStorage.setItem("resumeData", JSON.stringify(data));
        localStorage.setItem("paymentInfo", JSON.stringify({
          type,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        }));
        window.location.href = "success.html";
      },
      modal: {
        ondismiss: function(){
          btn.disabled = false;
          btn.textContent = originalText;
        }
      }
    };

    const rzp = new Razorpay(options);
    rzp.on('payment.failed', function(){
      showFormError("Payment failed or was cancelled. Please try again.");
      btn.disabled = false;
      btn.textContent = originalText;
    });
    rzp.open();

  } catch(err){
    console.error(err);
    showFormError("Couldn't start payment right now. Please try again in a moment.");
    btn.disabled = false;
    btn.textContent = originalText;
  }
}
