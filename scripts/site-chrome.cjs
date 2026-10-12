const fs = require('node:fs');
const path = require('node:path');

const footer = `<footer class="site-footer">
  <div class="site-footer-inner">
    <div class="site-footer-heading">
      <a class="site-footer-brand" href="./index.html#top">Hridita Huq<span>Fashion, form &amp; individuality.</span></a>
      <nav class="site-footer-nav" aria-label="Footer navigation"><a href="./collection.html">Collections <span aria-hidden="true">↗</span></a><a href="./index.html#process">Inside the atelier <span aria-hidden="true">↗</span></a></nav>
    </div>
    <p class="site-footer-copyright">Copyright act @ 2026. This portfolio is Designed &amp; Build By <a href="https://kazi-jawad.netlify.app/">Kazi Jawad</a> . All rights reserved.</p>
  </div>
</footer>`;

// Keep the hand-authored homepage and both page generators on the same footer.
function withSiteChrome(html) {
  if (!html.includes('href="./site-chrome.css"')) {
    html = html.replace('</head>', '  <link rel="stylesheet" href="./site-chrome.css">\n</head>');
  }
  if (!html.includes('src="./site-chrome.js"')) {
    html = html.replace('</head>', '  <script src="./site-chrome.js" defer></script>\n</head>');
  }
  const existingFooter = /<footer class="(?:book-footer|study-footer|site-footer)"[\s\S]*?<\/footer>/;
  return existingFooter.test(html)
    ? html.replace(existingFooter, footer)
    : html.replace('</body>', `${footer}\n</body>`);
}

module.exports = { withSiteChrome };

if (require.main === module) {
  const dist = path.resolve(__dirname, '../dist');
  const pages = fs.readdirSync(dist).filter(file => file.endsWith('.html'));
  for (const file of pages) {
    const filename = path.join(dist, file);
    fs.writeFileSync(filename, withSiteChrome(fs.readFileSync(filename, 'utf8')));
  }
  console.log(`Updated shared footer and navigation assets on ${pages.length} pages.`);
}
