const TEST_MODE = true


function addAcademic(){

let table = document.getElementById("academicsTable")

let row = table.insertRow(1)

row.innerHTML = `
<td><input></td>
<td><input></td>
<td><input></td>
`

}


function addExperience(){

let table = document.getElementById("experienceTable")

let row = table.insertRow(1)

row.innerHTML = `
<td><input></td>
<td><input></td>
<td><input></td>
`

}


function getTableData(tableId){

let rows = document.querySelectorAll("#"+tableId+" tr")

let result = []

rows.forEach((row,i)=>{

if(i===0) return

let inputs = row.querySelectorAll("input")

let values = []

inputs.forEach(input=>{
if(input.value.trim() !== ""){
values.push(input.value)
}
})

if(values.length>0){
result.push(values.join(" - "))
}

})

return result.join("\n")
}


function saveFormData(){

let data = {

name:document.getElementById("name").value,
mobile:document.getElementById("mobile").value,
email:document.getElementById("email").value,

education:getTableData("academicsTable"),
experience:getTableData("experienceTable"),

skills:document.getElementById("skills").value,
certifications:document.getElementById("certifications").value,
projects:document.getElementById("projects").value

}

localStorage.setItem("resumeForm", JSON.stringify(data))
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
