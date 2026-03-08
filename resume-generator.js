function saveFormData(){

let data={

name:document.getElementById("name").value,
mobile:document.getElementById("mobile").value,
email:document.getElementById("email").value,
linkedin:document.getElementById("linkedin").value,
location:document.getElementById("location").value,
summary:document.getElementById("summary").value,
skills:document.getElementById("skills").value,
certifications:document.getElementById("certifications").value,
projects:document.getElementById("projects").value

}

localStorage.setItem("resumeForm",JSON.stringify(data))

}

function payPDF(){

saveFormData()

window.location.href="https://rzp.io/rzp/BD83t1T9"

}

function payEditable(){

saveFormData()

window.location.href="https://rzp.io/rzp/h2uXLa7"

}
