const TEST_MODE = true


function addEducation(){

let div = document.createElement("div")

div.className="edu-block"

div.innerHTML = `
<hr>
<input placeholder="Qualification">
<input placeholder="Institution">
<input placeholder="Grade">
`

document.getElementById("education").prepend(div)

}


function addExperience(){

let div = document.createElement("div")

div.className="exp-block"

div.innerHTML = `
<hr>
<input placeholder="Company">
<input placeholder="Role">
<textarea placeholder="Description"></textarea>
`

document.getElementById("experience").prepend(div)

}


function getEducation(){

let blocks = document.querySelectorAll(".edu-block")

let data=[]

blocks.forEach(b=>{

let inputs=b.querySelectorAll("input")

let values=[]

inputs.forEach(i=>{
if(i.value.trim()!==""){
values.push(i.value)
}
})

if(values.length>0){
data.push(values.join(" - "))
}

})

return data.join("\n")
}


function getExperience(){

let blocks=document.querySelectorAll(".exp-block")

let data=[]

blocks.forEach(b=>{

let inputs=b.querySelectorAll("input,textarea")

let values=[]

inputs.forEach(i=>{
if(i.value.trim()!==""){
values.push(i.value)
}
})

if(values.length>0){
data.push(values.join(" - "))
}

})

return data.join("\n")
}


function saveFormData(){

let data={

name:name.value,
mobile:mobile.value,
email:email.value,

education:getEducation(),
experience:getExperience(),

skills:skills.value,
certifications:certifications.value,
projects:projects.value

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
