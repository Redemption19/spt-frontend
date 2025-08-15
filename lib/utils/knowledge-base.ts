import { calculateEmbedding, cosineSimilarity } from './text-embedding';
import { loadAllKnowledge, type KnowledgeItem as LoaderKnowledgeItem } from './knowledge-loader';

export interface KnowledgeItem {
  id: string | number;
  path?: string;
  route?: string;
  content: string;
  embedding?: number[];
  keywords?: string[];
  title?: string;
  category?: string;
}

let knowledgeBase: KnowledgeItem[] = [];
let isInitialized = false;

// Add a query cache to avoid re-computing searches for the same query
const queryCache: Record<string, KnowledgeItem[]> = {};

export async function initKnowledgeBase(): Promise<void> {
  if (isInitialized) return;
  
  try {
    // Load BOTH your existing knowledge base AND the new comprehensive knowledge
    const [existingData, newData] = await Promise.all([
      fetch('/knowledge-base.merged.json').then(res => res.ok ? res.json() : []),
      loadAllKnowledge()
    ]);
    
    // Transform existing data to match our interface
    const existingItems = existingData.map((item: any) => ({
      id: `existing_${item.id}`,
      path: item.path || '',
      route: item.route || '',
      content: item.content || '',
      keywords: item.keywords || [],
      title: item.title || '',
      category: item.category || 'general',
      embedding: calculateEmbedding(item.content || '')
    }));
    
    // Transform new data to match our interface
    const newItems = newData.map((item: LoaderKnowledgeItem) => ({
      id: `new_${item.id}`,
      path: `/knowledge/${item.category}.json`,
      route: `/knowledge/${item.category}`,
      content: item.content,
      keywords: item.keywords,
      title: item.title,
      category: item.category,
      embedding: calculateEmbedding(item.content)
    }));
    
    // Combine both knowledge bases
    knowledgeBase = [...existingItems, ...newItems];
    
    isInitialized = true;
    console.log(`🎯 Knowledge base initialized with ${knowledgeBase.length} total items:`);
    console.log(`   - ${existingItems.length} items from your existing knowledge base`);
    console.log(`   - ${newItems.length} items from the new comprehensive knowledge`);
  } catch (error) {
    console.error('Error initializing knowledge base:', error);
    throw error;
  }
}

export async function queryKnowledgeBase(query: string, limit: number = 3): Promise<KnowledgeItem[]> {
  if (!isInitialized) {
    await initKnowledgeBase();
  }
  
  // Normalize the query for caching
  const normalizedQuery = query.trim().toLowerCase();
  
  // Check cache first
  const cacheKey = `${normalizedQuery}_${limit}`;
  if (queryCache[cacheKey]) {
    console.log('Using cached query results');
    return queryCache[cacheKey];
  }

  // Prepare for hybrid search
  const queryWords = normalizedQuery.split(/\s+/).filter(w => w.length > 2);
  const queryEmbedding = calculateEmbedding(query);

  // Compute hybrid score for each item
  const results = knowledgeBase.map(item => {
    // Semantic similarity
    const semanticScore = cosineSimilarity(queryEmbedding, item.embedding!);
    // Keyword/field match boost
    let keywordBoost = 0;
    // Check keywords
    if (item.keywords && Array.isArray(item.keywords)) {
      for (const kw of item.keywords) {
        if (queryWords.includes(kw.toLowerCase())) keywordBoost += 0.15;
      }
    }
    // Check title
    if ((item.title || '') && queryWords.some(w => (item.title || '').toLowerCase().includes(w))) {
      keywordBoost += 0.15;
    }
    // Check category
    if ((item.category || '') && queryWords.some(w => (item.category || '').toLowerCase().includes(w))) {
      keywordBoost += 0.1;
    }
    // Check route
    if (item.route) {
      if (queryWords.some(w => item.route!.toLowerCase().includes(w))) {
        keywordBoost += 0.05;
      }
    }
    // Final score
    const score = semanticScore + keywordBoost;
    return { item, score };
  })
  .sort((a, b) => b.score - a.score)
  .slice(0, limit)
  .map(result => result.item);

  // Cache the results
  queryCache[cacheKey] = results;
  return results;
} 