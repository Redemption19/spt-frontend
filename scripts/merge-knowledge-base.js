const fs = require('fs');
const path = require('path');

// Helper to generate keywords from content/title
function extractKeywords(text) {
  if (!text) return [];
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .split(' ')
        .filter(w => w.length > 3)
    )
  ).slice(0, 8);
}

// Load and normalize spt-comprehensive-knowledge.json
const sptPath = path.join(__dirname, '../public/spt-comprehensive-knowledge.json');
const sptData = JSON.parse(fs.readFileSync(sptPath, 'utf8')).map(item => ({
  id: item.id,
  category: item.category || 'general',
  title: item.title || '',
  content: item.content || '',
  keywords: item.keywords || extractKeywords(item.title + ' ' + item.content),
  route: item.route || ''
}));

// Load and normalize knowledge-base.json
const kbPath = path.join(__dirname, '../public/knowledge-base.json');
const kbData = JSON.parse(fs.readFileSync(kbPath, 'utf8')).map((item, idx) => ({
  id: 1000 + idx,
  category: item.category || (item.route && item.route.includes('faq') ? 'faq' : 'general'),
  title: item.title || (item.content ? item.content.split('.')[0] : 'Untitled'),
  content: item.content || '',
  keywords: item.keywords || extractKeywords(item.title + ' ' + item.content),
  route: (item.route || '').replace(/\\/g, '/').replace('/page.tsx', '').replace('/layout.tsx', '')
}));

// Merge and deduplicate by title+content
const all = [...sptData, ...kbData];
const seen = new Set();
const merged = [];
let id = 1;
for (const entry of all) {
  const key = (entry.title + entry.content).slice(0, 1000);
  if (!seen.has(key)) {
    merged.push({ ...entry, id: id++ });
    seen.add(key);
  }
}

// Write to new file (do not overwrite existing ones)
const outPath = path.join(__dirname, '../public/knowledge-base.merged.json');
fs.writeFileSync(outPath, JSON.stringify(merged, null, 2));
console.log(`Merged knowledge base written to ${outPath} (${merged.length} entries)`); 