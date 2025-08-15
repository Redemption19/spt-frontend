// lib/utils/content.ts

/**
 * Process and clean HTML content from the backend
 */
export function processHtmlContent(htmlContent: string): string {
  if (!htmlContent) return ''
  
  // Decode HTML entities
  const decoded = htmlContent
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
  
  return decoded
}

/**
 * Extract plain text from HTML for previews
 */
export function extractPlainText(htmlContent: string): string {
  if (!htmlContent) return ''
  
  // Remove HTML tags and decode entities
  const withoutTags = htmlContent.replace(/<[^>]*>/g, ' ')
  const decoded = processHtmlContent(withoutTags)
  
  // Clean up extra whitespace
  return decoded.replace(/\s+/g, ' ').trim()
}
