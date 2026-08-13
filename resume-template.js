function generateResumeHTML(data, tier){
  tier = tier || "basic";
  const accent = tier === "experienced" ? "#8a5a2b" : (tier === "moderate" ? "#145C4B" : "#333333");
  const esc = (s) => String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

  const eduRows = (data.academics||[]).filter(a=>a.institution).map(a => `
    <tr><td>${esc(a.level)}</td><td>${esc(a.institution)}</td><td>${esc(a.board)}</td><td>${esc(a.year)}</td><td>${esc(a.score)}</td></tr>
  `).join("");

  const expRows = (data.experience||[]).filter(e=>e.title).map(e => `
    <tr><td colspan="4"><b>${esc(e.title)}</b> — ${esc(e.company)} <span style="color:#777;">(${esc(e.duration)})</span><br><span style="font-size:13px;">${esc(e.description)}</span></td></tr>
  `).join("");

  const certRows = (data.certifications||[]).filter(c=>c.name).map(c => `
    <tr><td>${esc(c.name)}</td><td>${esc(c.issuer)}</td><td>${esc(c.year)}</td></tr>
  `).join("");

  const skillsList = (data.skills||"").split(",").map(s=>s.trim()).filter(Boolean);

  return `
<html><head><style>
body { font-family: Arial, sans-serif; padding: 36px; line-height: 1.55; color: #111; }
.header-row { display:flex; align-items:flex-start; gap:18px; border-bottom:3px solid ${accent}; padding-bottom:10px; margin-bottom:16px; }
.header-row img { width:80px; height:80px; object-fit:cover; border-radius:4px; }
h1 { font-size:26px; margin:0; }
.contact { font-size:12.5px; color:#555; margin-top:4px; }
h2 { font-size:15px; text-transform:uppercase; letter-spacing:.5px; color:${accent}; border-bottom:1px solid #ddd; padding-bottom:4px; margin-top:22px; margin-bottom:8px; }
table { width:100%; border-collapse:collapse; font-size:13px; }
th { text-align:left; background:#f3f3f3; padding:6px 8px; font-size:11px; text-transform:uppercase; color:#555; border:1px solid #e0e0e0; }
td { padding:6px 8px; border:1px solid #e0e0e0; vertical-align:top; }
.skills span { display:inline-block; background:#f0f0f0; padding:3px 10px; margin:2px; border-radius:2px; font-size:12px; }
.section { margin-top:14px; }
</style></head>
<body>
  <div class="header-row">
    ${data.photo ? `<img src="${data.photo}">` : ""}
    <div>
      <h1>${esc(data.name)}</h1>
      <div class="contact">${[data.mobile, data.email, data.location].filter(Boolean).map(esc).join(" | ")}</div>
    </div>
  </div>

  ${data.objective ? `<div class="section"><h2>Summary</h2><p>${esc(data.objective)}</p></div>` : ""}

  ${expRows ? `<div class="section"><h2>Work Experience</h2><table>${expRows}</table></div>` : ""}

  ${eduRows ? `<div class="section"><h2>Education</h2><table><tr><th>Level</th><th>Institution</th><th>Board</th><th>Year</th><th>Score</th></tr>${eduRows}</table></div>` : ""}

  ${certRows ? `<div class="section"><h2>Certifications</h2><table><tr><th>Name</th><th>Issuer</th><th>Year</th></tr>${certRows}</table></div>` : ""}

  ${skillsList.length ? `<div class="section"><h2>Skills</h2><div class="skills">${skillsList.map(s=>`<span>${esc(s)}</span>`).join("")}</div></div>` : ""}

  ${data.projects ? `<div class="section"><h2>Projects</h2><p>${esc(data.projects)}</p></div>` : ""}

  <div class="section" style="margin-top:24px;">
    <h2>Declaration</h2>
    <p style="font-size:12.5px;color:#333;">I hereby declare that the information provided above is true to the best of my knowledge and belief.</p>
    <p style="font-size:12.5px;margin-top:8px;">Place: ${esc(data.location || "")}<br>Date: ${new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</p>
    <p style="margin-top:16px;font-size:13px;font-weight:600;">${esc(data.name)}</p>
  </div>
</body></html>`;
}
