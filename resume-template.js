function generateResumeHTML(data){

return `
<html>
<head>
<style>
body { font-family: Arial; padding:40px; }
h1 { border-bottom:2px solid #000; }
h2 { margin-top:20px; border-bottom:1px solid #ccc; }
</style>
</head>

<body>

<h1>${data.name}</h1>
<p>${data.email} | ${data.mobile}</p>

<h2>Education</h2>
${data.academics.map(a=>`<p>${a.join(" - ")}</p>`).join("")}

<h2>Experience</h2>
${data.experience.map(e=>`
<p><b>${e.company}</b> - ${e.role} (${e.start} - ${e.end})</p>
<ul>
${e.desc.split("\n").map(d=>`<li>${d}</li>`).join("")}
</ul>
`).join("")}

<h2>Skills</h2>
${data.skills.map(s=>`<p>${s}</p>`).join("")}

<h2>Projects</h2>
<p>${data.projects}</p>

</body>
</html>
`;
}
