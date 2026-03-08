function addAcademic(){

let div=document.createElement("div")

div.innerHTML=`
<input placeholder="Qualification">
<input placeholder="Institution">
<input placeholder="Grade">
`

document.getElementById("academics").appendChild(div)

}

function addExperience(){

let div=document.createElement("div")

div.innerHTML=`
<input placeholder="Company">
<input placeholder="Role">
<textarea placeholder="Description"></textarea>
`

document.getElementById("experience").appendChild(div)

}

function payPDF(){

saveFormData()

window.location.href="https://rzp.io/rzp/BD83t1T9"

}

function payEditable(){

saveFormData()

window.location.href="https://rzp.io/rzp/h2uXLa7"

}

function saveFormData(){

let formData={

name:document.getElementById("name").value,
mobile:document.getElementById("mobile").value,
email:document.getElementById("email").value,
certifications:document.getElementById("certifications").value

}

localStorage.setItem("resumeForm",JSON.stringify(formData))

}
