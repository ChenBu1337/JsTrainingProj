export interface Snippet {
  id: string
  title: string
  language: string
  tags: string[]
  isFavorite: boolean
  createdAt: Date
}

// Sample data for testing
export const snippets: Snippet[] = [
  { id: '1', title: 'Array flatten', language: 'javascript', tags: ['arrays', 'utils'], isFavorite: true, createdAt: new Date('2025-01-15') },
  { id: '2', title: 'SQL Inner Join', language: 'sql', tags: ['database', 'joins'], isFavorite: false, createdAt: new Date('2025-03-20') },
  { id: '3', title: 'useDebounce hook', language: 'typescript', tags: ['react', 'hooks'], isFavorite: true, createdAt: new Date('2025-02-10') },
  { id: '4', title: 'Python list comprehension', language: 'python', tags: ['lists', 'utils'], isFavorite: false, createdAt: new Date('2025-04-05') },
  { id: '5', title: 'Fetch wrapper', language: 'javascript', tags: ['api', 'utils'], isFavorite: true, createdAt: new Date('2025-01-30') },
  { id: '6', title: 'React useEffect cleanup', language: 'typescript', tags: ['react', 'hooks'], isFavorite: false, createdAt: new Date('2025-05-12') },
]


// ============================================
// EXERCISE 1: sortSnippets
// ============================================
// Sort snippets by 'title', 'language', or 'createdAt'
// Return a NEW array (don't mutate the original!)
// Sort strings alphabetically, dates oldest-first

export function sortSnippets(snippets: Snippet[], sortBy: 'title' | 'language' | 'createdAt'): Snippet[] {
  return [...snippets].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'language':
        return a.language.localeCompare(b.language)
      case 'createdAt':
        return a.createdAt.getTime() - b.createdAt.getTime()
    }
  })
}


// ============================================
// EXERCISE 2: groupByLanguage
// ============================================
// Group snippets by their language into an object
// e.g. { javascript: [snippet1, snippet5], sql: [snippet2], ... }

export function groupByLanguage(snippets: Snippet[]): Record<string, Snippet[]> {
  return  snippets.reduce((acc, snippet) => {
    if (!acc[snippet.language]) {
      acc[snippet.language] = []
    }

    acc[snippet.language].push(snippet)
    return acc
  }, {} as Record<string, Snippet[]>)
}


// ============================================
// EXERCISE 3: uniqueTags
// ============================================
// Collect all tags from all snippets, remove duplicates
// Return sorted alphabetically

export function uniqueTags(snippets: Snippet[]): string[] {
  return [...new Set(snippets.flatMap(s => s.tags))].sort()
}


// ============================================
// EXERCISE 4: paginateSnippets
// ============================================
// Return a slice of snippets for the given page (1-based)
// e.g. page=1, pageSize=2 returns first 2 snippets
//      page=2, pageSize=2 returns next 2 snippets

export function paginateSnippets(snippets: Snippet[], page: number, pageSize: number): Snippet[] {
  const start = (page - 1) * pageSize
  return snippets.slice(start, start + pageSize)
}


// ============================================
// EXERCISE 5: formatDate
// ============================================
// Format a Date into "Mon DD, YYYY" format
// e.g. new Date('2025-01-15') => "Jan 15, 2025"
// Hint: look up toLocaleDateString()

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })  
}


// ============================================
// EXERCISE 6: debounce
// ============================================
// Return a new function that delays calling fn until
// ms milliseconds have passed since the last call.
// If called again before ms, reset the timer.
//
// C++ analogy: like a timer that restarts every time
// you call the function — only fires when you stop calling.
//
// This is critical for search — you don't want to search
// on every keystroke, only after the user stops typing.

export function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timerId = null as ReturnType<typeof setTimeout> | null
  
  return (...args: Parameters<T>) => {
    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => {
      fn(...args)
      timerId = null
    }, ms)
  }
}


// ============================================
// EXERCISE 7: pipe
// ============================================
// Compose functions left-to-right
// pipe(f, g, h)(x) === h(g(f(x)))
//
// Example usage:
//   const process = pipe(
//     (snippets) => snippets.filter(s => s.isFavorite),
//     (snippets) => snippets.map(s => s.title)
//   )
//   process(snippets) // ['Array flatten', 'useDebounce hook', 'Fetch wrapper']

export function pipe<T>(...fns: ((arg: T) => T)[]): (arg: T) => T {
  return (arg: T) => arg // TODO: implement
}
