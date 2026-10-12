const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const looks = JSON.parse(fs.readFileSync(path.join(root, 'dist/collection-looks.js'), 'utf8').replace('window.collectionLooks = ', '').trim().replace(/;$/, ''));
const details = JSON.parse(fs.readFileSync(path.join(root, 'scripts/lookbook-details.json'), 'utf8'));
const escape = text => String(text).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const photo = (look, variant = 'original') => `./assets/collections/${look.slug}-${variant}.png`;
const url = look => `./look-${look.slug}.html`;
const number = index => String(index + 1).padStart(2, '0');
const head = (title, description) => `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#f5eee7"><meta name="description" content="${escape(description)}"><title>${escape(title)} — Hridita Haq</title><link rel="icon" href="./assets/monogram.svg" type="image/svg+xml"><link rel="preload" href="./assets/cormorant-garamond.ttf" as="font" type="font/ttf" crossorigin><link rel="stylesheet" href="./lookbook.css"></head>`;
const header = () => `<a class="book-skip" href="#main">Skip to content</a><header class="book-header"><nav class="book-nav" aria-label="Portfolio navigation"><a href="./collection.html">Collections</a><a href="./index.html#about">About</a><a href="./index.html#process">Atelier</a></nav><a class="book-brand" href="./index.html#top" aria-label="Hridita Haq, portfolio home">HRIDITA HAQ<span>Fashion designer</span></a><a class="book-return" href="./index.html#work"><span aria-hidden="true">↗</span> Back to portfolio</a></header>`;
const footer = () => `<footer class="book-footer"><a href="./index.html#top">Hridita Haq</a><p>Fashion, form &amp; individuality.</p><a href="./index.html#work">Back to portfolio <span aria-hidden="true">↗</span></a></footer>`;
const star = '<span class="book-star" aria-hidden="true">✦</span>';
const card = (look, index) => `<article class="catalog-card"><a href="${url(look)}" aria-label="View ${escape(look.name)} — ${escape(look.lead)}"><div class="catalog-card-image"><img src="${photo(look)}" alt="${escape(look.alt)}" loading="lazy" decoding="async"><span class="card-open" aria-hidden="true">View look ↗</span></div><div class="card-title"><h3>${escape(look.name)}</h3><span aria-hidden="true">${number(index)}</span></div><p>${escape(look.lead)}</p></a></article>`;

for (const [index, look] of looks.entries()) {
  const detail = details[look.slug];
  const prev = looks[(index - 1 + looks.length) % looks.length];
  const next = looks[(index + 1) % looks.length];
  const page = `${head(look.name, look.summary)}
<body class="look-page look-page--${look.slug}" style="--look-accent:${detail.accent}">
${header()}
<main id="main" class="look-main"><nav class="book-breadcrumb" aria-label="Breadcrumb"><a href="./index.html#work">Work</a><span aria-hidden="true">/</span><a href="./collection.html">Collections</a><span aria-hidden="true">/</span><span aria-current="page">Look ${number(index)}</span></nav>
<article class="look-board" aria-labelledby="look-title">
  <header class="look-title"><p class="book-eyebrow">Selected look ${number(index)} / Hridita Haq</p><h1 id="look-title">${escape(detail.heading[0])} <em>${escape(detail.heading[1])}</em></h1><div class="look-rule" aria-hidden="true"><span></span>${star}<span></span></div><p class="look-subtitle">${escape(look.lead)}</p></header>
  <div class="look-story"><p class="look-description">${escape(look.description)}</p><section class="look-notes" aria-labelledby="look-notes-title"><h2 id="look-notes-title">The look</h2>${star}${detail.notes.map(([name, description], i) => `<div class="look-note"><span class="note-symbol" aria-hidden="true">${['✧','〰','✦'][i]}</span><div><h3>${escape(name)}</h3><p>${escape(description)}</p></div></div>`).join('')}</section><div class="look-palette"><span class="book-eyebrow">The palette</span><div class="palette-swatches" aria-hidden="true">${detail.swatches.map(color => `<span style="--swatch:${color}"></span>`).join('')}</div><p>${escape(look.palette)}</p></div></div>
  <figure class="look-model"><img src="${photo(look,'cutout')}" alt="${escape(look.alt)}" fetchpriority="high"><figcaption>${escape(look.credit)}</figcaption></figure>
  <aside class="look-details" aria-labelledby="details-title"><h2 id="details-title">the details</h2><div class="look-rule" aria-hidden="true"><span></span>${star}<span></span></div>${detail.crops.map((crop, i) => `<figure class="detail-study"><figcaption><h3>${escape(crop.title)}</h3><p>${escape(crop.description)}</p></figcaption><div class="detail-image"><img src="${photo(look)}" alt="Close-up of ${escape(crop.alt)}" style="--zoom:${crop.zoom};--focus-x:${crop.x};--focus-y:${crop.y}" decoding="async"></div><span class="detail-index" aria-hidden="true">Detail ${number(i)}</span></figure>`).join('')}</aside>
  <p class="look-closing">${escape(detail.closing)}<span class="look-rule" aria-hidden="true"><span></span>${star}<span></span></span></p>
</article>
<details class="original-study"><summary>View original photograph <span aria-hidden="true">＋</span></summary><figure><img src="${photo(look)}" alt="${escape(look.alt)}" loading="lazy"><figcaption>${escape(look.credit)}</figcaption></figure></details>
<nav class="look-page-nav" aria-label="Browse collection looks"><a href="${url(prev)}"><span aria-hidden="true">←</span><span><small>Previous look</small>${escape(prev.name)}</span></a><a class="all-looks-link" href="./collection.html"><span class="grid-icon" aria-hidden="true">▦</span>View full list</a><a href="${url(next)}"><span><small>Next look</small>${escape(next.name)}</span><span aria-hidden="true">→</span></a></nav></main>${footer()}</body></html>`;
  fs.writeFileSync(path.join(root, `dist/look-${look.slug}.html`), page);
}

const catalog = `${head('All collections', 'Explore five selected looks by Hridita Haq, from expressive saris to flowing dresses and considered tailoring.')}
<body class="catalog-page">${header()}<main id="main">
<section class="catalog-hero" aria-labelledby="catalog-title"><img class="catalog-hero-photo" src="${photo(looks[1])}" alt="${escape(looks[1].alt)}" fetchpriority="high"><div class="catalog-hero-copy"><p class="book-eyebrow">The collection / Five selected looks</p><h1 id="catalog-title">A wardrobe<br>of <em>stories.</em></h1><p>Expressive colour. Considered detail.<br>Explore the looks that bring<br>Hridita’s creative world to life.</p><a class="book-button" href="#all-looks">Explore all looks <span aria-hidden="true">↓</span></a></div><a class="hero-look-link" href="${url(looks[1])}">Featured: Defined lines <span aria-hidden="true">↗</span></a></section>
<section class="design-threads" aria-label="Design details across the collection">${[['01','Shape & movement','Pleats and flowing layers.'],['02','Expressive colour','From soft ivory to vivid prints.'],['03','A closer look','Lace, piping, and patterned borders.'],['04','Individual style','Five distinct ways to wear a story.']].map(([n,t,d]) => `<div><span aria-hidden="true">${n}</span><p><strong>${t}</strong>${d}</p></div>`).join('')}</section>
<section class="catalog-selection book-container" id="all-looks" aria-labelledby="all-looks-title"><div class="catalog-section-title"><p class="book-eyebrow">Work / Collections</p><h2 id="all-looks-title">The full edit</h2><p>Five looks. Explore each one in detail.</p></div><div class="catalog-grid">${looks.map(card).join('')}</div><a class="book-outline" href="./index.html#work">Return to the animated collection <span aria-hidden="true">↗</span></a></section>
<section class="catalog-about book-container" aria-labelledby="catalog-about-title"><div class="catalog-about-photo"><img src="${photo(looks[3])}" alt="Close-up of floral lace on the ivory dress." loading="lazy"></div><div class="catalog-about-copy"><p class="book-eyebrow">Behind the designs</p><h2 id="catalog-about-title">An eye for detail.<br><em>A feeling for form.</em></h2><p>A shape, a texture, a small detail—each can become the starting point for something personal.</p><a class="book-button" href="./index.html#about">About Hridita <span aria-hidden="true">↗</span></a></div></section></main>${footer()}</body></html>`;
fs.writeFileSync(path.join(root, 'dist/collection.html'), catalog);
console.log('Built the full collection and five editorial look pages.');
