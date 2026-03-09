const TEST_MODE=true

function cleanText(text){
return text.replace(/\n/g,"<br>")
}

function addAcademic(){

let div=document.createElement("div")

div.innerHTML=`

<hr>
<input placeholder="Qualification">
<input placeholder="Institution">
<input placeholder="Grade">

`

document.getElementById("academics").prepend(div)

}


function addExperience(){

let div=document.createElement("div")

div.innerHTML=`

<hr>
<input placeholder="Company">
<input placeholder="Role">
<textarea placeholder="Description"></textarea>

`

document.getElementById("experience").prepend(div)

}


function saveFormData(){

let data={

name:document.getElementById("name").value,
mobile:document.getElementById("mobile").value,
email:document.getElementById("email").value,
certifications:cleanText(document.getElementById("certifications").value),
skills:cleanText(document.getElementById("skills").value),
projects:cleanText(document.getElementById("projects").value)

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
