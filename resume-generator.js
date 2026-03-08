function addAcademic(){

let div=document.createElement("div")

div.innerHTML=`

<input placeholder="Qualification (SSLC / HSC / Degree)">
<input placeholder="Institution Name">
<input placeholder="Grade / Percentage">

`

document.getElementById("academics").appendChild(div)

}

function addExperience(){

let div=document.createElement("div")

div.innerHTML=`

<input placeholder="Company Name">
<input placeholder="Role">
<textarea placeholder="Description"></textarea>

`

document.getElementById("experience").appendChild(div)

}

function saveFormData(){

let formData={

name:document.getElementById("name").value,
mobile:document.getElementById("mobile").value,
email:document.getElementById("email").value,
certifications:document.getElementById("certifications").value,
skills:document.getElementById("skills").value,
projects:document.getElementById("projects").value

}

localStorage.setItem("resumeForm",JSON.stringify(formData))

}

function payPDF(){

saveFormData()

window.location.href="https://rzp.io/rzp/BD83t1T9"

}

function payEditable(){

saveFormData()

window.location.href="https://rzp.io/rzp/h2uXLa7"

}
