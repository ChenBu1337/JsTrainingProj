import { describe, it, expect } from 'vitest'
import {
  snippets,
  getSnippetTitle,
  extractSnippetInfo,
  updateSnippet,
  getTitles,
  getFavorites,
  getFavoritesByLanguage,
  countByLanguage,
  getTotalFavoriteTitleLength,
  formatSnippet,
  findSnippetById,
  findIndexByLanguage,
  hasLanguage,
  allHaveTags,
  filterSnippets,
  addTags,
} from './solutions.js'


describe('Exercise 1: Arrow Functions', () => {
  it('getSnippetTitle returns the title of a snippet', () => {
    const snippet = { id: '1', title: 'Test Title', language: 'javascript', tags: [], isFavorite: false }
    expect(getSnippetTitle(snippet)).toBe('Test Title')
  })

  it('getSnippetTitle works with sample data', () => {
    expect(getSnippetTitle(snippets[0])).toBe('Array flatten')
  })
})


describe('Exercise 2: Destructuring', () => {
  it('extractSnippetInfo returns title, language, and tags', () => {
    const snippet = {
      id: '1',
      title: 'Test',
      language: 'python',
      tags: ['a', 'b'],
      isFavorite: true
    }
    const result = extractSnippetInfo(snippet)

    expect(result).toEqual({
      title: 'Test',
      language: 'python',
      tags: ['a', 'b']
    })
  })
})


describe('Exercise 3: Spread Operator', () => {
  it('updateSnippet creates a new object with updated values', () => {
    const original = { id: '1', title: 'Old', language: 'js', isFavorite: false, tags: [] }
    const updated = updateSnippet(original, 'New', true)

    expect(updated.title).toBe('New')
    expect(updated.isFavorite).toBe(true)
    expect(updated.id).toBe('1')
    expect(updated.language).toBe('js')
  })

  it('updateSnippet does not mutate the original', () => {
    const original = { id: '1', title: 'Old', language: 'js', isFavorite: false, tags: [] }
    updateSnippet(original, 'New', true)

    expect(original.title).toBe('Old')
    expect(original.isFavorite).toBe(false)
  })
})


describe('Exercise 4: Array.map()', () => {
  it('getTitles returns array of titles', () => {
    const result = getTitles(snippets)

    expect(result).toEqual([
      'Array flatten',
      'SQL Inner Join',
      'useDebounce hook',
      'Python list comprehension',
      'Fetch wrapper',
      'React useEffect cleanup'
    ])
  })

  it('getTitles works with empty array', () => {
    expect(getTitles([])).toEqual([])
  })
})


describe('Exercise 5: Array.filter()', () => {
  it('getFavorites returns only favorite snippets', () => {
    const result = getFavorites(snippets)

    expect(result.length).toBe(3)
    expect(result.every(s => s.isFavorite)).toBe(true)
    expect(result.map(s => s.title)).toEqual([
      'Array flatten',
      'useDebounce hook',
      'Fetch wrapper'
    ])
  })
})


describe('Exercise 6: Array.filter() with multiple conditions', () => {
  it('getFavoritesByLanguage filters by language AND favorite', () => {
    const result = getFavoritesByLanguage(snippets, 'javascript')

    expect(result.length).toBe(2)
    expect(result.map(s => s.title)).toEqual(['Array flatten', 'Fetch wrapper'])
  })

  it('getFavoritesByLanguage returns empty for non-favorite language', () => {
    const result = getFavoritesByLanguage(snippets, 'python')
    expect(result.length).toBe(0)
  })
})


describe('Exercise 7: Array.reduce()', () => {
  it('countByLanguage counts snippets per language', () => {
    const result = countByLanguage(snippets)

    expect(result).toEqual({
      javascript: 2,
      sql: 1,
      typescript: 2,
      python: 1
    })
  })
})


describe('Exercise 8: Chaining', () => {
  it('getTotalFavoriteTitleLength returns sum of favorite title lengths', () => {
    // 'Array flatten' (13) + 'useDebounce hook' (16) + 'Fetch wrapper' (13) = 42
    const result = getTotalFavoriteTitleLength(snippets)
    expect(result).toBe(42)
  })
})


describe('Exercise 9: Template Literals', () => {
  it('formatSnippet formats correctly', () => {
    const result = formatSnippet(snippets[0])
    expect(result).toBe('Snippet: Array flatten (javascript) - 2 tags')
  })

  it('formatSnippet handles different tag counts', () => {
    const snippet = { title: 'Test', language: 'py', tags: ['a', 'b', 'c'] , isFavorite: false, id: 'x' }
    expect(formatSnippet(snippet)).toBe('Snippet: Test (py) - 3 tags')
  })
})


describe('Exercise 10: Find and FindIndex', () => {
  it('findSnippetById finds correct snippet', () => {
    const result = findSnippetById(snippets, '3')
    expect(result?.title).toBe('useDebounce hook')
  })

  it('findSnippetById returns undefined for missing id', () => {
    const result = findSnippetById(snippets, '999')
    expect(result).toBeUndefined()
  })

  it('findIndexByLanguage finds first matching index', () => {
    expect(findIndexByLanguage(snippets, 'sql')).toBe(1)
    expect(findIndexByLanguage(snippets, 'javascript')).toBe(0)
  })

  it('findIndexByLanguage returns -1 for missing language', () => {
    expect(findIndexByLanguage(snippets, 'rust')).toBe(-1)
  })
})


describe('Exercise 11: Some and Every', () => {
  it('hasLanguage returns true when language exists', () => {
    expect(hasLanguage(snippets, 'python')).toBe(true)
    expect(hasLanguage(snippets, 'javascript')).toBe(true)
  })

  it('hasLanguage returns false when language missing', () => {
    expect(hasLanguage(snippets, 'rust')).toBe(false)
  })

  it('allHaveTags returns true when all have tags', () => {
    expect(allHaveTags(snippets)).toBe(true)
  })

  it('allHaveTags returns false when some have no tags', () => {
    const testSnippets = [
      { id: '1', title: 'Array flatten', language: 'javascript', tags: ['a'], isFavorite: false },
      { id: '2', title: 'SQL Inner Join', language: 'sql', tags: [], isFavorite: false },
    ]
    expect(allHaveTags(testSnippets)).toBe(false)
  })
})


describe('Exercise 12: filterSnippets', () => {
  it('filters by title (case-insensitive)', () => {
    const result = filterSnippets(snippets, 'SQL')
    expect(result.map(s => s.title)).toContain('SQL Inner Join')
  })

  it('filters by language', () => {
    const result = filterSnippets(snippets, 'java')
    expect(result.map(s => s.title)).toEqual(['Array flatten', 'Fetch wrapper'])
  })

  it('filters by tag', () => {
    const result = filterSnippets(snippets, 'hooks')
    expect(result.map(s => s.title)).toEqual(['useDebounce hook', 'React useEffect cleanup'])
  })

  it('returns empty array for no matches', () => {
    const result = filterSnippets(snippets, 'xyz123')
    expect(result).toEqual([])
  })

  it('is case-insensitive', () => {
    const lower = filterSnippets(snippets, 'python')
    const upper = filterSnippets(snippets, 'PYTHON')
    expect(lower).toEqual(upper)
  })
})


describe('BONUS: Rest Parameters', () => {
  it('addTags adds new tags to snippet', () => {
    const result = addTags(snippets[0], 'es6', 'functional')
    expect(result.tags).toEqual(['arrays', 'utils', 'es6', 'functional'])
  })

  it('addTags does not mutate original', () => {
    const original = { id: '1', title: 'SQL Inner Join', language: 'sql', tags: ['a'], isFavorite: false }
    addTags(original, 'b', 'c')
    expect(original.tags).toEqual(['a'])
  })
})
