const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../public/knowledge-base.merged.json');
const outputPath = filePath; // Overwrite in place, or change to a new file if you want a backup

// Mapping of placeholder to actual route
const replacements = [
  {
    pattern: /\/path-to-best-pension-master-trust-scheme-page[^\)]*/g,
    replacement: '/schemes/master-trust'
  },
  {
    pattern: /\/path-to-best-personal-pension-scheme-page[^\)]*/g,
    replacement: '/schemes/personal-pension'
  },
  {
    pattern: /\/path-to-best-provident-fund-scheme-page[^\)]*/g,
    replacement: '/schemes/providet-fund'
  },
  {
    pattern: /\/path-to-dosh-personal-pension-scheme-page[^\)]*/g,
    replacement: '/schemes/dosh-pension'
  },
  {
    pattern: /\/path-to-spt-pension-schemes-page[^\)]*/g,
    replacement: '/schemes'
  },
  {
    pattern: /\/path-to-leadership-team-page[^\)]*/g,
    replacement: '/about/leadership'
  },
  {
    pattern: /- Please replace with actual page link\)/g,
    replacement: ')'
  }
];

function fixLinksInContent(content) {
  let fixed = content;
  for (const { pattern, replacement } of replacements) {
    fixed = fixed.replace(pattern, replacement);
  }
  return fixed;
}

function main() {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let changed = false;

  for (const entry of data) {
    if (entry.content && typeof entry.content === 'string') {
      const fixed = fixLinksInContent(entry.content);
      if (fixed !== entry.content) {
        entry.content = fixed;
        changed = true;
      }
    }
  }

  if (changed) {
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log('Knowledge base links fixed and file updated!');
  } else {
    console.log('No placeholder links found. No changes made.');
  }
}

main();