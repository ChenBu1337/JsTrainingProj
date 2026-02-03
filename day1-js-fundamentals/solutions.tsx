export interface Snippet {
  id: string
  title: string
  language: string
  tags: string[]
  isFavorite: boolean
}

export const snippets: Snippet[] = [
  { id: '1', title: 'Array flatten', language: 'javascript', tags: ['arrays', 'utils'], isFavorite: true },
  { id: '2', title: 'SQL Inner Join', language: 'sql', tags: ['database', 'joins'], isFavorite: false },
  { id: '3', title: 'useDebounce hook', language: 'typescript', tags: ['react', 'hooks'], isFavorite: true },
  { id: '4', title: 'Python list comprehension', language: 'python', tags: ['lists', 'utils'], isFavorite: false },
  { id: '5', title: 'Fetch wrapper', language: 'javascript', tags: ['api', 'utils'], isFavorite: true },
  { id: '6', title: 'React useEffect cleanup', language: 'typescript', tags: ['react', 'hooks'], isFavorite: false },
]


// ============================================
// EXERCISE 1: Arrow Functions
// ============================================
// Get the title from a snippet object

export const getSnippetTitle = (snippet: Snippet) => snippet.title


// ============================================
// EXERCISE 2: Destructuring
// ============================================
// Extract and return { title, language, tags } from snippet

export function extractSnippetInfo(snippet: Snippet) {
  const { title, language, tags } = snippet
  return { title, language, tags }
}


// ============================================
// EXERCISE 3: Spread Operator
// ============================================
// Return new snippet with updated title and isFavorite (don't mutate!)

export function updateSnippet(snippet: Snippet, newTitle: string, newIsFavorite: boolean) {
  return {
    ...snippet,
    title: newTitle,
    isFavorite: newIsFavorite
  }
}


// ============================================
// EXERCISE 4: Array.map()
// ============================================
// Return array of titles from snippets array

export function getTitles(snippets: Snippet[]) {
  return snippets.map(snippet => snippet.title)
}


// ============================================
// EXERCISE 5: Array.filter()
// ============================================
// Return only favorite snippets

export function getFavorites(snippets: Snippet[]) {
  return snippets.filter(snippet => snippet.isFavorite)
}


// ============================================
// EXERCISE 6: Array.filter() with multiple conditions
// ============================================
// Return snippets that match language AND are favorites

export function getFavoritesByLanguage(snippets: Snippet[], language: string) {
  return snippets.filter(snippet => snippet.isFavorite && snippet.language === language)
}


// ============================================
// EXERCISE 7: Array.reduce()
// ============================================
// Return object counting snippets by language
// e.g. { javascript: 2, sql: 1, typescript: 2, python: 1 }

export function countByLanguage(snippets: Snippet[]) {
  return snippets.reduce((acc: Record<string, number>, snippet: Snippet) => {
    const lang = snippet.language
    acc[lang] = (acc[lang] || 0) + 1
    return acc
  }, {})
}


// ============================================
// EXERCISE 8: Chaining
// ============================================
// Return total character count of all favorite snippet titles

export function getTotalFavoriteTitleLength(snippets: Snippet[]) {
  //return snippets.filter(s => s.isFavorite).map(s => s.title.length).reduce((sum, length)=> sum += length, 0)
  return snippets.reduce((sum, snippet) => { 
    if (snippet.isFavorite) {
      return sum + snippet.title.length
    }
    return sum
  }, 0)
}


// ============================================
// EXERCISE 9: Template Literals
// ============================================
// Return "Snippet: {title} ({language}) - {n} tags"

export function formatSnippet(snippet: Snippet) {
  return `Snippet: ${snippet.title} (${snippet.language}) - ${snippet.tags.length} tags`
}


// ============================================
// EXERCISE 10: Find and FindIndex
// ============================================

export function findSnippetById(snippets: Snippet[], id: string) {
  return snippets.find(snippet => snippet.id === id)
}

export function findIndexByLanguage(snippets: Snippet[], language: string) {
  return snippets.findIndex(snippet => snippet.language === language)
}


// ============================================
// EXERCISE 11: Some and Every
// ============================================

export function hasLanguage(snippets: Snippet[], language: string) {
  return snippets.some(snippet => snippet.language === language)
}

export function allHaveTags(snippets: Snippet[]) {
  return snippets.every(snippet => snippet.tags.length > 0)
}


// ============================================
// EXERCISE 12: filterSnippets (for SnipStash!)
// ============================================
// Search snippets by query (matches title, language, or tags)
// Case-insensitive

export function filterSnippets(snippets: Snippet[], query: string) {
  const lowerQuery = query.toLowerCase()
  return snippets.filter(snippet => {
    const inTitle = snippet.title.toLowerCase().includes(lowerQuery)
    const inLanguage = snippet.language.toLowerCase().includes(lowerQuery)
    const inTags = snippet.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    return inTitle || inLanguage || inTags
  })
}


// ============================================
// BONUS: Rest parameters
// ============================================
// Add new tags to snippet without mutating

export function addTags(snippet: Snippet, ...newTags: string[]) {
  return {
    ...snippet,
    tags: [...snippet.tags, ...newTags]
  }
}
