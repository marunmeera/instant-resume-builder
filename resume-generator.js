function removeBlock(btn){
btn.closest(".block").remove();
}

// ACADEMIC
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

// EXPERIENCE
function addExperience(){
const div = document.createElement("div");
div.className = "block";

div.innerHTML = `
<button class="remove-btn" onclick="removeBlock(this)">-</button>
<input placeholder="Company Name">
<input placeholder="Designation">
<input placeholder="Start Date">
<input placeholder="End Date">
<textarea placeholder="Roles & Responsibilities"></textarea>
<textarea placeholder="Key Accomplishments (1 per line)"></textarea>
`;

document.getElementById("experience").prepend(div);
}

// SKILLS
function addSkill(){
const div = document.createElement("div");
div.className = "block";

div.innerHTML = `
<button class="remove-btn" onclick="removeBlock(this)">-</button>
<input placeholder="Skill Title (1 per line)">
<input placeholder="Institute Name">
<input placeholder="Year of Completion">
`;

document.getElementById("skillsSection").prepend(div);
}

// CUSTOM SECTION
function addCustom(){
const div = document.createElement("div");
div.className = "block";

div.innerHTML = `
<button class="remove-btn" onclick="removeBlock(this)">-</button>
<input placeholder="Section Title">
<textarea placeholder="Description"></textarea>
<input placeholder="Year">
`;

document.getElementById("customSection").prepend(div);
}

// SAVE DATA BEFORE PAYMENT
function preparePayment(){

const data = {
name: document.getElementById("name").value,
mobile: document.getElementById("mobile").value,
email: document.getElementById("email").value,
projects: document.getElementById("projects").value
};

localStorage.setItem("resumeData", JSON.stringify(data));
}

// DEFAULT LOAD
window.onload = () => {
addAcademic();
addExperience();
};
