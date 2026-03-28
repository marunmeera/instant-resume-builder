let selectedStyle = "classic";

// STYLE SELECT
function selectStyle(style, el) {
selectedStyle = style;

document.querySelectorAll(".style-card").forEach(card => {
card.classList.remove("selected");
});

el.classList.add("selected");
}

// ADD ACADEMIC
function addAcademic() {
const div = document.createElement("div");
div.className = "block";

div.innerHTML = `
<input placeholder="Qualification">
<input placeholder="Institution">
<input placeholder="Grade">
`;

document.getElementById("academics").prepend(div);
}

// ADD EXPERIENCE
function addExperience() {
const div = document.createElement("div");
div.className = "block";

div.innerHTML = `
<input placeholder="Company">
<input placeholder="Role">
<textarea placeholder="Description"></textarea>
`;

document.getElementById("experience").prepend(div);
}

// START PAYMENT
function startPayment(amount) {

const academics = [];
document.querySelectorAll("#academics .block").forEach(b => {
academics.push([...b.querySelectorAll("input")].map(i => i.value));
});

const experience = [];
document.querySelectorAll("#experience .block").forEach(b => {
experience.push({
company: b.querySelectorAll("input")[0].value,
role: b.querySelectorAll("input")[1].value,
desc: b.querySelector("textarea").value
});
});

const data = {
name: document.getElementById("name").value,
mobile: document.getElementById("mobile").value,
email: document.getElementById("email").value,
skills: document.getElementById("skills").value,
projects: document.getElementById("projects").value,
academics,
experience,
style: selectedStyle,
amount
};

localStorage.setItem("resumeData", JSON.stringify(data));

// Razorpay redirect
if (amount == 19) {
window.location.href = "https://rzp.io/rzp/BD83t1T9";
} else {
window.location.href = "https://rzp.io/rzp/h2uXLa7";
}
}
