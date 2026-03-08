const TEST_MODE = true

if(TEST_MODE){
console.warn("TEST MODE ACTIVE - Razorpay disabled")
}

function addAcademic(){

let div=document.createElement("div")

div.innerHTML=`

<hr>

<input placeholder="Qualification (SSLC / HSC / Degree)">
<input placeholder="Institution Name">
<input placeholder="Grade / Percentage">

`

document.getElementById("academics").appendChild(div)

}


function addExperience(){

let div=document.createElement("div")

div.innerHTML=`

<hr>

<input placeholder="Company Name">
<input placeholder="Role">
<textarea placeholder="Description"></textarea>

`

document.getElementById("experience").appendChild(div)

}


function saveFormData(){

let data={

name:document.getElementById("name").value,
mobile:document.getElementById("mobile").value,
email:document.getElementById("email").value,
certifications:document.getElementById("certifications").value,
skills:document.getElementById("skills").value,
projects:document.getElementById("projects").value

}

localStorage.setItem("resumeForm",JSON.stringify(data))

localStorage.setItem("paymentAllowed","true")

}


function payPDF(){

saveFormData()

if(TEST_MODE){

window.location.href="success.html"

}else{

window.location.href="https://rzp.io/rzp/BD83t1T9"

}

}


function payEditable(){

saveFormData()

if(TEST_MODE){

window.location.href="success.html"

}else{

window.location.href="https://rzp.io/rzp/h2uXLa7"

}

}
