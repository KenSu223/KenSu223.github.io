// Build the checked-in HTML so research remains readable without JavaScript.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
const context = { window: {} };
vm.runInNewContext(readFileSync(new URL('assets/js/site-data.js', root), 'utf8'), context);
const { NEWS, NEWS_VISIBLE, PUBS } = context.window;
const escape = value => String(value).replace(/[&<>"']/g, ch => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[ch]));
const link = (url, label) => `<a href="${escape(url)}" target="_blank" rel="noopener">${escape(label)}</a>`;
const authors = value => escape(value).replace(/\*\*(.+?)\*\*/g, '<span class="me">$1</span>');

const news = `<ul class="news-list" id="news-list" data-visible="${NEWS_VISIBLE || 5}">\n${NEWS.map(n =>
  `      <li><span class="news-date">${escape(n.date)}</span><span class="news-text">${n.html}</span></li>`
).join('\n')}\n    </ul>`;

const publications = `<div class="pubs" id="pubs-list">\n${PUBS.map(p => {
  const title = p.links?.length ? link(p.links[0].url, p.title) : escape(p.title);
  const badges = (p.badges || []).map(b => `<span class="badge">${escape(b)}</span>`).join('');
  const teaser = p.thumb ? `\n        <div class="pub-thumb"><img src="${escape(p.thumb)}" alt="${escape(p.title)}" loading="lazy"></div>` : '';
  return `      <article class="pub">${teaser}
        <div class="pub-body">
          <h3 class="pub-title">${title}</h3>
          <p class="pub-authors">${authors(p.authors)}</p>${p.authorNote ? `\n          <p class="pub-author-note">${escape(p.authorNote)}</p>` : ''}
          <p class="pub-venue"><span class="venue-name">${escape(p.venue)}</span>${badges}</p>
          <p class="pub-insight">${escape(p.insight)}</p>${p.links?.length ? `\n          <div class="pub-links">${p.links.map(l => link(l.url, l.label)).join('')}</div>` : ''}
        </div>
      </article>`;
}).join('\n')}\n    </div>`;

const path = new URL('index.html', root);
const original = readFileSync(path, 'utf8');
let html = original;
for (const [name, content] of Object.entries({ news, publications })) {
  const pattern = new RegExp(`<!-- generated:${name}:start -->[\\s\\S]*?<!-- generated:${name}:end -->`);
  if (!pattern.test(html)) throw new Error(`Missing ${name} content markers in ${fileURLToPath(path)}`);
  html = html.replace(pattern, `<!-- generated:${name}:start -->\n    ${content}\n    <!-- generated:${name}:end -->`);
}
// Changed assets get a new URL so visitors do not reuse an older cached file.
for (const asset of ['assets/css/style.css', 'assets/js/theme.js', 'assets/js/render.js']) {
  const version = createHash('sha256').update(readFileSync(new URL(asset, root))).digest('hex').slice(0, 12);
  const pattern = new RegExp(`"${asset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\?v=[a-zA-Z0-9_-]+)?"`, 'g');
  html = html.replace(pattern, `"${asset}?v=${version}"`);
}
if (process.argv.includes('--check')) {
  if (html !== original) throw new Error('Static content or asset versions are stale. Run node scripts/build-content.mjs.');
  console.log('Static content and asset versions are up to date.');
} else {
  writeFileSync(path, html);
  console.log(`Built ${NEWS.length} news items and ${PUBS.length} publications.`);
}
