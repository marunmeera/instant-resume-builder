function payPDF(){

saveFormData()

window.location.href="https://rzp.io/rzp/BD83t1T9"

}

function payEditable(){

saveFormData()

window.location.href="https://rzp.io/rzp/h2uXLa7"

}

function saveFormData(){

let formData = {

name:document.getElementById("name").value,
mobile:document.getElementById("mobile").value,
email:document.getElementById("email").value,
certifications:document.getElementById("certifications").value

}

localStorage.setItem("resumeForm",JSON.stringify(formData))

}
