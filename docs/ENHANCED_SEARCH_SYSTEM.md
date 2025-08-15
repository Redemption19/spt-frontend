# Enhanced Global Search System

## Overview

The enhanced global search system provides comprehensive search functionality across all website content, including:

- **Pension Schemes** (Master Trust, Personal Pension, Provident Fund, Employer Sponsored)
- **Services** (Enrollment, Self-Service Centre, Member Portal, Pension Calculator)
- **Forms** (All enrollment and benefit claim forms)
- **FAQs** (Frequently asked questions)
- **Leadership** (Board members and management team)
- **Blog Posts** (All published articles)
- **Contact Information** (Office locations and contact details)
- **Downloads & Resources** (Brochures, forms, financial statements)
- **Career Opportunities** (Job listings)
- **Company Information** (About us, timeline, mission)

## Features

### 🔍 **Comprehensive Search**
- Searches across **all website content** and pages
- **Semantic search** with fuzzy matching for typos
- **Category-based filtering** and prioritization
- **Real-time search suggestions**

### 🎯 **Smart Ranking**
- Priority-based results (high-priority content appears first)
- **Content relevance scoring** based on title, description, and keywords
- **Category weighting** (schemes and services prioritized)

### 📊 **Search Analytics**
- Tracks user search behavior
- **Recent searches** per session
- **Trending searches** across all users
- **Popular search terms** with frequency counts
- **Click-through rate tracking**

### ⌨️ **Keyboard Navigation**
- **Cmd/Ctrl + K** to open search
- **Arrow keys** for navigation
- **Enter** to select
- **Esc** to close

### 📱 **Responsive Design**
- **Desktop**: Full search bar with keyboard shortcuts
- **Mobile**: Compact search button
- **Optimized** for all screen sizes

## Components

### 1. `GlobalSearch` - Main Search Component
```tsx
<GlobalSearch trigger={<SearchTrigger />} />
```

### 2. `SearchCommand` - Enhanced Search Bar
```tsx
<SearchCommand 
  className="w-64"
  placeholder="Search everything..."
  showKeyboardHint={true}
/>
```

### 3. `SearchButton` - Compact Mobile Search
```tsx
<SearchButton className="h-9 w-9" />
```

## Search Index Structure

The search system uses a comprehensive index (`comprehensiveSearchIndex`) containing:

```typescript
interface EnhancedSearchResult {
  id: string
  title: string
  description: string
  content: string
  category: 'page' | 'service' | 'scheme' | 'form' | 'faq' | 'leadership' | 'blog' | 'calculator' | 'contact' | 'about' | 'legal' | 'career' | 'event' | 'download'
  subcategory?: string
  url: string
  keywords: string[]
  priority: number // 1-5, higher is more important
  section?: string
  lastUpdated?: Date
}
```

## Search Categories

| Category | Description | Examples |
|----------|-------------|----------|
| **scheme** | Pension schemes | Master Trust, Personal Pension, Provident Fund |
| **service** | Services offered | Enrollment, Member Portal, Self-Service Centre |
| **form** | Application forms | Tier 2 Claims, Employee Enrollment |
| **faq** | Common questions | How to claim benefits, Tax benefits |
| **leadership** | Team members | Board of directors, Management team |
| **blog** | Articles & posts | Retirement planning tips, Regulatory updates |
| **calculator** | Planning tools | Pension calculator, Benefit estimator |
| **contact** | Contact info | Office locations, Phone numbers |
| **download** | Resources | Brochures, Forms, Financial statements |
| **career** | Job opportunities | Open positions, Job applications |

## Usage Examples

### Basic Search
```typescript
import { searchComprehensive } from '@/lib/utils/comprehensive-search'

const results = searchComprehensive('pension calculator', {
  limit: 10,
  includeContent: true,
  fuzzyMatch: true
})
```

### Category-Specific Search
```typescript
const schemeResults = searchComprehensive('tier 2', {
  categories: ['scheme'],
  limit: 5
})
```

### Search Analytics
```typescript
import { trackSearch, getPopularSearchTerms } from '@/lib/utils/search-analytics'

// Track a search
trackSearch('pension calculator', 5, 'calculator')

// Get popular searches
const popularTerms = getPopularSearchTerms(10)
```

## Search Features

### 1. **Fuzzy Matching**
- Handles typos and misspellings
- Levenshtein distance algorithm
- Similarity threshold of 70%

### 2. **Content Prioritization**
```
Priority 5: Critical content (schemes, enrollment, calculator)
Priority 4: Important content (forms, contact info)
Priority 3: Useful content (FAQs, blog posts)
Priority 2: Secondary content
Priority 1: Basic content
```

### 3. **Search Suggestions**
- Auto-complete based on indexed content
- Popular search terms
- Recent user searches
- Trending searches

### 4. **Result Highlighting**
- Query terms highlighted in results
- Context-aware highlighting
- Preserves HTML structure

## Integration

### In Headers
```tsx
import { SearchCommand } from '@/components/search-command'

<SearchCommand 
  className="w-64"
  placeholder="Search everything..."
  showKeyboardHint={true}
/>
```

### Standalone Usage
```tsx
import { GlobalSearch } from '@/components/global-search'

<GlobalSearch 
  trigger={
    <Button variant="outline">
      <Search className="h-4 w-4 mr-2" />
      Search
    </Button>
  }
/>
```

## Performance

- **Indexed search** for fast results
- **Memoized results** to prevent re-computation
- **Debounced input** to reduce API calls
- **Virtual scrolling** for large result sets
- **Local storage** for analytics (max 100 entries)

## Privacy

- Search analytics stored **locally only**
- **No server-side tracking**
- Users can clear analytics data
- **Session-based** tracking only

## Customization

### Adding New Content
1. Add entries to `comprehensiveSearchIndex`
2. Define appropriate category and priority
3. Include relevant keywords
4. Set proper URL routing

### Modifying Search Behavior
- Adjust `priority` weights in search algorithm
- Modify `fuzzyMatch` threshold
- Update `categoryColors` and `categoryLabels`
- Customize search result display

## Browser Support

- **Modern browsers** with ES6+ support
- **Local storage** required for analytics
- **Session storage** for session tracking
- **Keyboard event** support for shortcuts

## Accessibility

- **ARIA labels** for screen readers
- **Keyboard navigation** support
- **Focus management** in dialogs
- **High contrast** compatible
- **Screen reader** announcements

## Future Enhancements

1. **Server-side search** integration
2. **Advanced filters** (date range, content type)
3. **Search result previews**
4. **Voice search** capability
5. **Search export** functionality
6. **Multi-language** support
7. **Search API** for external integrations

## Maintenance

- **Regular content updates** to search index
- **Analytics cleanup** (automatic after 100 entries)
- **Performance monitoring** of search times
- **User feedback** integration for search quality

---

This enhanced search system provides a comprehensive, fast, and user-friendly way to find any information on the Standard Pensions Trust website.
