const fs = require('fs');
const path = require('path');

// Script to extract content from website pages and update knowledge base
// Run this whenever you make significant content changes to keep chatbot updated

const extractPageContent = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Extract meaningful content (remove JSX syntax, imports, etc.)
    const cleanContent = content
      .replace(/import.*?from.*?;/g, '') // Remove imports
      .replace(/export.*?{/g, '') // Remove exports
      .replace(/<[^>]*>/g, ' ') // Remove JSX tags
      .replace(/className.*?".*?"/g, '') // Remove className props
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    return cleanContent;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return '';
  }
};

const updateKnowledgeBase = () => {
  const pagesDir = path.join(__dirname, '../app');
  const knowledgeBasePath = path.join(__dirname, '../public/knowledge-base.json');
  
  const knowledgeItems = [];
  let id = 1;

  // Define important pages to extract content from
  const importantPages = [
    { path: 'app/about/page.tsx', route: '/about', category: 'company' },
    { path: 'app/schemes/page.tsx', route: '/schemes', category: 'schemes' },
    { path: 'app/schemes/master-trust/page.tsx', route: '/schemes/master-trust', category: 'schemes' },
    { path: 'app/schemes/personal-pension/page.tsx', route: '/schemes/personal-pension', category: 'schemes' },
    { path: 'app/schemes/provident-fund/page.tsx', route: '/schemes/provident-fund', category: 'schemes' },
    { path: 'app/schemes/employer-sponsored/page.tsx', route: '/schemes/employer-sponsored', category: 'schemes' },
    { path: 'app/services/enrollment/page.tsx', route: '/services/enrollment', category: 'enrollment' },
    { path: 'app/services/faq/page.tsx', route: '/services/faq', category: 'faq' },
    { path: 'app/about/leadership/page.tsx', route: '/about/leadership', category: 'leadership' },
    { path: 'app/pension-calculator/page.tsx', route: '/pension-calculator', category: 'calculator' },
    { path: 'app/contact/page.tsx', route: '/contact', category: 'contact' }
  ];

  importantPages.forEach(page => {
    const fullPath = path.join(__dirname, '..', page.path);
    const content = extractPageContent(fullPath);
    
    if (content && content.length > 50) { // Only include pages with substantial content
      knowledgeItems.push({
        id: id++,
        path: page.path,
        route: page.route,
        category: page.category,
        content: content.substring(0, 2000), // Limit content length
        lastUpdated: new Date().toISOString()
      });
    }
  });

  // Write updated knowledge base
  try {
    fs.writeFileSync(knowledgeBasePath, JSON.stringify(knowledgeItems, null, 2));
    console.log(`✅ Knowledge base updated with ${knowledgeItems.length} items`);
    console.log('📍 Location:', knowledgeBasePath);
  } catch (error) {
    console.error('❌ Error writing knowledge base:', error.message);
  }
};

// Run the update
updateKnowledgeBase();

module.exports = { updateKnowledgeBase }; 