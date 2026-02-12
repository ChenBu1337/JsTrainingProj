import { describe, it, expect, vi } from 'vitest'
import {
  snippets,
  sortSnippets,
  groupByLanguage,
  uniqueTags,
  paginateSnippets,
  formatDate,
  debounce,
  pipe,
} from './solutions'


describe('Exercise 1: sortSnippets', () => {
  it('sorts by title alphabetically', () => {
    const result = sortSnippets(snippets, 'title')
    const titles = result.map(s => s.title)
    expect(titles).toEqual([
      'Array flatten',
      'Fetch wrapper',
      'Python list comprehension',
      'React useEffect cleanup',
      'SQL Inner Join',
      'useDebounce hook',
    ])
  })

  it('sorts by language alphabetically', () => {
    const result = sortSnippets(snippets, 'language')
    expect(result[0].language).toBe('javascript')
    expect(result[result.length - 1].language).toBe('typescript')
  })

  it('sorts by createdAt oldest first', () => {
    const result = sortSnippets(snippets, 'createdAt')
    expect(result[0].title).toBe('Array flatten')
    expect(result[result.length - 1].title).toBe('React useEffect cleanup')
  })

  it('does not mutate the original array', () => {
    const original = [...snippets]
    sortSnippets(snippets, 'title')
    expect(snippets.map(s => s.id)).toEqual(original.map(s => s.id))
  })
})


describe('Exercise 2: groupByLanguage', () => {
  it('groups snippets by language', () => {
    const result = groupByLanguage(snippets)
    expect(Object.keys(result).sort()).toEqual(['javascript', 'python', 'sql', 'typescript'])
    expect(result['javascript'].length).toBe(2)
    expect(result['sql'].length).toBe(1)
    expect(result['typescript'].length).toBe(2)
    expect(result['python'].length).toBe(1)
  })

  it('returns empty object for empty array', () => {
    expect(groupByLanguage([])).toEqual({})
  })
})


describe('Exercise 3: uniqueTags', () => {
  it('returns all unique tags sorted', () => {
    const result = uniqueTags(snippets)
    expect(result).toEqual(['api', 'arrays', 'database', 'hooks', 'joins', 'lists', 'react', 'utils'])
  })

  it('returns empty array for empty input', () => {
    expect(uniqueTags([])).toEqual([])
  })
})


describe('Exercise 4: paginateSnippets', () => {
  it('returns first page', () => {
    const result = paginateSnippets(snippets, 1, 2)
    expect(result.length).toBe(2)
    expect(result[0].id).toBe('1')
    expect(result[1].id).toBe('2')
  })

  it('returns second page', () => {
    const result = paginateSnippets(snippets, 2, 2)
    expect(result.length).toBe(2)
    expect(result[0].id).toBe('3')
    expect(result[1].id).toBe('4')
  })

  it('returns partial last page', () => {
    const result = paginateSnippets(snippets, 2, 4)
    expect(result.length).toBe(2)
    expect(result[0].id).toBe('5')
  })

  it('returns empty for out-of-range page', () => {
    const result = paginateSnippets(snippets, 10, 2)
    expect(result).toEqual([])
  })
})


describe('Exercise 5: formatDate', () => {
  it('formats a date correctly', () => {
    const result = formatDate(new Date('2025-01-15'))
    expect(result).toBe('Jan 15, 2025')
  })

  it('formats another date', () => {
    const result = formatDate(new Date('2025-12-25'))
    expect(result).toBe('Dec 25, 2025')
  })
})


describe('Exercise 6: debounce', () => {
  it('delays function execution', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced()
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)

    vi.useRealTimers()
  })

  it('resets timer on repeated calls', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced()
    vi.advanceTimersByTime(50)
    debounced()
    vi.advanceTimersByTime(50)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(50)
    expect(fn).toHaveBeenCalledTimes(1)

    vi.useRealTimers()
  })

  it('passes arguments through', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced('hello', 42)
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledWith('hello', 42)

    vi.useRealTimers()
  })
})


// describe('Exercise 7: pipe', () => {
//   it('composes functions left to right', () => {
//     const double = (n: number) => n * 2
//     const addOne = (n: number) => n + 1

//     const doubleThenAdd = pipe(double, addOne)
//     expect(doubleThenAdd(5)).toBe(11)
//   })

//   it('works with single function', () => {
//     const double = (n: number) => n * 2
//     expect(pipe(double)(5)).toBe(10)
//   })

//   it('works with snippet operations', () => {
//     const filterFavs = (snippets: typeof import('./solutions').snippets) =>
//       snippets.filter(s => s.isFavorite)
//     const sortByTitle = (snippets: typeof import('./solutions').snippets) =>
//       [...snippets].sort((a, b) => a.title.localeCompare(b.title))

//     const process = pipe(filterFavs, sortByTitle)
//     const result = process(snippets)
//     expect(result.map(s => s.title)).toEqual(['Array flatten', 'Fetch wrapper', 'useDebounce hook'])
//   })
// })
