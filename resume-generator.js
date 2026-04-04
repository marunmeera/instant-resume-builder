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
<input placeholder="Designation">
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

function preparePayment(){

const academics = [];
document.querySelectorAll("#academics .block").forEach(b => {
academics.push([...b.querySelectorAll("input")].map(i => i.value));
});

const experience = [];
document.querySelectorAll("#experience .block").forEach(b => {
experience.push({
company: b.querySelectorAll("input")[0].value,
role: b.querySelectorAll("input")[1].value,
start: b.querySelectorAll("input")[2].value,
end: b.querySelectorAll("input")[3].value,
desc: b.querySelector("textarea").value
});
});

const skills = [];
document.querySelectorAll("#skillsSection .block").forEach(b => {
skills.push(b.querySelector("input").value);
});

const data = {
name: document.getElementById("name").value,
mobile: document.getElementById("mobile").value,
email: document.getElementById("email").value,
projects: document.getElementById("projects").value,
academics,
experience,
skills
};

localStorage.setItem("resumeData", JSON.stringify(data));
}

window.onload = () => {
addAcademic();
addExperience();
};
