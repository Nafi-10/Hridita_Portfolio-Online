const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const studies = JSON.parse(fs.readFileSync(path.join(__dirname, 'study-content.json'), 'utf8'));
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const num = i => String(i + 1).padStart(2, '0');
const url = s => `./study-${s.slug}.html`;
const spriteStyle = s => `--sheet:url('./assets/process/studies-0${s.sheet}.png');--cell-x:${s.x};--cell-y:${s.y}`;
const art = (s, cls = '', attrs = '') => `<div class="sheet-crop ${cls}" style="${spriteStyle(s)}" ${attrs}><span class="sheet-art" aria-hidden="true"></span></div>`;
const photo = slug => `./assets/collections/${slug}-original.png`;
const pattern = `<div class="pattern-paper" aria-hidden="true"><svg viewBox="0 0 260 390" fill="none"><path class="pattern-outline" d="M70 35 102 20Q130 63 158 20L200 43Q173 112 220 132L212 346 42 346 36 132Q82 106 70 35Z"/><path class="pattern-seam" d="M78 48 99 34Q131 76 164 35L183 47Q162 115 205 141L198 332 55 332 50 140Q91 111 78 48Z"/><path class="pattern-direction" d="M130 104V300M123 116 130 103 137 116M123 288 130 301 137 288"/><path class="pattern-shaping" d="m95 209 13 83 15-83M166 209l-13 83-15-83"/><path class="pattern-guide" d="M24 210H234M30 150H226"/><text x="30" y="373">FORM STUDY / NOT TO SCALE</text></svg></div>`;

function board(s) {
  const visual = s.slug === 'photoshoot'
    ? `<figure class="artifact artifact-main contact-main"><img data-main-photo src="${photo('motion')}" alt="${esc(s.alt)}" fetchpriority="high"><figcaption><span data-frame-label>FRAME 01 / MOVEMENT</span><span aria-hidden="true">↗</span></figcaption></figure>`
    : `<figure class="artifact artifact-main">${art(s, '', `data-main-art role="img" aria-label="${esc(s.alt)}"`)}<figcaption>${s.name} <span>Study ${num(studies.indexOf(s))}</span></figcaption></figure>`;
  let extras;
  if (s.slug === 'photoshoot') extras = `<div class="contact-strip">${s.details.map((d,i) => `<button type="button" class="contact-frame" data-study-select="${i}" aria-label="Explore ${esc(d.label)}" aria-pressed="${i===0}"><img src="${photo(d.photo)}" alt="${esc(d.label)} photograph"><span>${num(i)} / ${esc(d.label)}</span></button>`).join('')}</div>`;
  else if (s.slug === 'pattern-making') extras = pattern;
  else if (s.slug === 'fabric-swatches') extras = `<div class="swatch-fan" aria-label="Select a fabric texture">${s.details.map((d,i) => `<button class="fabric-sample" style="--sample-index:${i};--sample-focus:${d.focus}" data-study-select="${i}" aria-label="Explore ${esc(d.label)}" aria-pressed="${i===0}">${art(s)}<span>${num(i)} ${esc(d.label)}</span></button>`).join('')}</div>`;
  else extras = `<div class="artifact artifact-detail">${art(s.slug === 'crafts' ? {...s, x:'100%', y:'100%'} : s, 'detail-crop', 'aria-hidden="true"')}<span>${s.slug==='crafts'?'Finishing study':'A closer look'} <span aria-hidden="true">✳</span></span></div>`;
  const pins = ['sketches','fittings','crafts'].includes(s.slug) ? `<div class="study-pins">${s.details.map((d,i) => `<button type="button" class="study-pin pin-${i}" data-study-select="${i}" aria-label="Explore ${esc(d.label)}" aria-pressed="${i===0}">${num(i)}</button>`).join('')}</div>` : '';
  const palette = s.slug === 'mood-boards' ? `<div class="palette-card artifact"><span>A quiet palette</span><div>${['#e9dfcd','#c1ad8e','#816953','#b7897e'].map((c,i)=>`<span style="background:${c}" title="${['Cream','Oat','Warm brown','Muted rose'][i]}"></span>`).join('')}</div><p>Cream / Oat / Earth / Rose</p></div>` : '';
  return `<div class="study-board board-${s.slug}" data-focus="0"><div class="board-topline"><span>${esc(s.boardLabel)}</span><span aria-hidden="true">HH / ${num(studies.indexOf(s))}</span></div>${visual}${extras}${pins}${palette}<div class="paper-note"><span class="note-pin" aria-hidden="true"></span><p>${esc(s.note)}</p></div><p class="board-handwriting">${esc(s.handwritten)}</p><span class="board-corner" aria-hidden="true">✳</span></div>`;
}

for (const [i,s] of studies.entries()) {
  const prev = studies[(i + studies.length - 1) % studies.length];
  const next = studies[(i + 1) % studies.length];
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#f3eee5"><title>${esc(s.name)} — Inside the atelier · Hridita Haq</title><meta name="description" content="${esc(s.intro)}"><link rel="icon" href="./assets/monogram.svg" type="image/svg+xml"><link rel="stylesheet" href="./study.css"><script src="./study.js" defer></script></head>
<body class="study-page study-${s.slug}" style="--accent:${s.accent}"><a class="skip-link" href="#main">Skip to study</a>
<header class="study-header"><a class="study-wordmark" href="./index.html#top">HRIDITA HAQ<span>Fashion designer</span></a><a class="atelier-mark" href="./index.html#process">Inside the <em>atelier.</em></a><a class="back-link" href="./index.html#process">Back to portfolio <span aria-hidden="true">↗</span></a></header>
<nav class="chapter-nav" aria-label="Explore the seven studies">${studies.map((item,j)=>`<a href="${url(item)}" ${j===i?'aria-current="page"':''}><span>${num(j)}</span>${esc(item.name)}</a>`).join('')}</nav>
<main id="main" class="study-main"><div class="study-topline"><span>Studio journal / ${esc(s.name)}</span><span>Chapter ${num(i)} — 07</span></div>
<article class="study-spread"><div class="study-copy"><p class="eyebrow">${esc(s.eyebrow)}</p><h1>${esc(s.title[0])}<br><em>${esc(s.title[1])}</em></h1><p class="study-intro">${esc(s.intro)}</p><div class="explore-label"><span aria-hidden="true">↘</span> ${s.slug==='photoshoot'?'Choose a frame to explore':'Choose a detail to explore'}</div><div class="study-controls" role="group" aria-label="Explore ${esc(s.name)} details">${s.details.map((d,j)=>`<button type="button" data-study-select="${j}" aria-pressed="${j===0}" aria-controls="study-notes"><span>${num(j)}</span>${esc(d.label)}</button>`).join('')}</div><div class="study-notes" id="study-notes" aria-live="polite" aria-atomic="true">${s.details.map((d,j)=>`<section class="study-note" data-study-note="${j}"><p class="note-number">Observation ${num(j)}</p><h2>${esc(d.title)}</h2><p>${esc(d.text)}</p><p class="study-prompt"><span aria-hidden="true">↳</span>${esc(d.prompt)}</p>${d.look?`<a class="study-look-link" href="./look-${d.look}.html">View this outfit <span aria-hidden="true">↗</span></a>`:''}</section>`).join('')}</div></div>
<div class="study-visual-column">${board(s)}<p class="study-provenance">${s.slug==='photoshoot'?'<span data-photo-credit>Photograph: Memory Mirage · Original supplied image.</span>':'Illustrative study · AI imagery. Hridita’s original process material will take its place here.'}</p></div></article>
<section class="study-method" aria-labelledby="method-title"><div class="method-intro"><p class="eyebrow">The thinking behind the study</p><h2 id="method-title">A closer <em>understanding.</em></h2></div><ol>${s.steps.map(([title,desc],j)=>`<li><span class="method-number">${num(j)}</span><div><h3>${esc(title)}</h3><p>${esc(desc)}</p></div></li>`).join('')}</ol></section>
<p class="study-closing"><span aria-hidden="true">✳</span>${esc(s.closing)}</p>
<nav class="study-page-nav" aria-label="Browse atelier studies"><a href="${url(prev)}"><span aria-hidden="true">←</span><span><small>Previous study</small>${esc(prev.name)}</span></a><a class="back-to-atelier" href="./index.html#process">Back to the atelier <span aria-hidden="true">↗</span></a><a href="${url(next)}"><span><small>Next study</small>${esc(next.name)}</span><span aria-hidden="true">→</span></a></nav></main>
<footer class="study-footer"><a href="./index.html#top">Hridita Haq</a><span>A creative journal in seven chapters.</span><a href="./collection.html">Explore the collection ↗</a></footer><script type="application/json" id="study-data">${JSON.stringify(s).replace(/</g,'\\u003c')}</script></body></html>`;
  fs.writeFileSync(path.join(root, `dist/study-${s.slug}.html`), html);
}
console.log(`Built ${studies.length} atelier study pages.`);
