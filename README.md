# 10-Day JavaScript/TypeScript/React Learning Plan
### *For C++ Developers - A Hands-On Journey*

> **Your Background:** C++ developer with 8+ years experience
> **Goal:** Master modern JavaScript, TypeScript, and React ecosystem
> **Approach:** Hands-on projects with incremental learning
> **Duration:** 10 days of focused learning (5-8 hours/day)

---

## Table of Contents
- [Day 1: JavaScript Fundamentals & TypeScript Basics](#day-1-javascript-fundamentals--typescript-basics)
- [Day 2: Modern JavaScript Patterns & Closures](#day-2-modern-javascript-patterns--closures)
- [Day 3: React Fundamentals - Components & JSX](#day-3-react-fundamentals---components--jsx)
- [Day 4: React State & Hooks](#day-4-react-state--hooks)
- [Day 5: Advanced Hooks & Custom Hooks](#day-5-advanced-hooks--custom-hooks)
- [Day 6: Context API & Global State](#day-6-context-api--global-state)
- [Day 7: Material-UI (MUI) & Styling](#day-7-material-ui-mui--styling)
- [Day 8: React Router & Navigation](#day-8-react-router--navigation)
- [Day 9: Redux Toolkit & State Management](#day-9-redux-toolkit--state-management)
- [Day 10: Forms, Testing & Integration](#day-10-forms-testing--integration)
- [Key Resources](#key-resources)
- [C++ to JavaScript Mental Models](#c-to-javascript-mental-models)

---

## Day 1: JavaScript Fundamentals & TypeScript Basics
**Goal:** Understand JavaScript's core paradigm shifts from C++

### Morning: JavaScript ES6+ Essentials
**Project:** Create `day1-js-fundamentals/` folder with exercises

**Topics to implement:**

```javascript
// 1. Arrow functions & this binding
const exercises = {
  name: 'JS Basics',
  regularFunction: function() { console.log(this.name) },
  arrowFunction: () => { console.log(this.name) } // Won't work!
}

// 2. Destructuring
const user = { name: 'Alice', age: 30, city: 'NYC' }
const { name, ...rest } = user

// 3. Spread operator
const newUser = { ...user, age: 31 }

// 4. Template literals
const greeting = `Hello ${name}, you are ${age} years old`

// 5. Array methods (map, filter, reduce)
const numbers = [1, 2, 3, 4, 5]
const doubled = numbers.map(n => n * 2)
const evens = numbers.filter(n => n % 2 === 0)
const sum = numbers.reduce((acc, n) => acc + n, 0)
```

**Exercises:**
1. Implement a function that transforms an array of users using `.map()`, `.filter()`, `.reduce()`
2. Practice destructuring with nested objects
3. Compare `function` vs arrow function behavior with `this`

### Afternoon: TypeScript Setup & Type System
**Project:** `day1-typescript-intro/`

```bash
npm init -y
npm install -D typescript ts-node @types/node
npx tsc --init
```

**Topics:**

```typescript
// 1. Basic types
let age: number = 30
let name: string = 'Alice'
let isActive: boolean = true

// 2. Interfaces (like C++ structs)
interface User {
  id: number
  name: string
  email?: string  // Optional property
}

// 3. Union types (new concept!)
type ID = string | number

// 4. Type guards
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

// 5. Generics (familiar from C++)
function identity<T>(arg: T): T {
  return arg
}

// 6. Utility types
type PartialUser = Partial<User>
type UserWithoutEmail = Omit<User, 'email'>
```

**Exercise:** Build a type-safe mini database
- Create interfaces for `User`, `Product`, `Order`
- Implement CRUD functions with proper typing
- Use generics for a `Repository<T>` class

### Evening: Async/Await & Promises
**Key Difference:** JavaScript is single-threaded but non-blocking!

```typescript
// Promises (like C++ std::future but different)
function fetchUser(id: number): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id, name: 'Alice' })
    }, 1000)
  })
}

// Async/await syntax
async function getUser() {
  try {
    const user = await fetchUser(1)
    console.log(user)
  } catch (error) {
    console.error(error)
  }
}
```

**Exercise:** Build a fake API client
- Simulate async database operations
- Practice error handling with try/catch
- Chain multiple async operations

---

## Day 2: Modern JavaScript Patterns & Closures
**Goal:** Master functional programming concepts

### Morning: Higher-Order Functions & Closures
**Project:** `day2-functional-patterns/`

```typescript
// Higher-order functions (functions as parameters/return values)
function withLogging<T extends any[], R>(
  fn: (...args: T) => R
): (...args: T) => R {
  return (...args: T) => {
    console.log(`Calling with:`, args)
    const result = fn(...args)
    console.log(`Result:`, result)
    return result
  }
}

// Closures (functions capturing outer scope)
function createCounter() {
  let count = 0  // Private variable!
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  }
}

const counter = createCounter()
counter.increment() // 1
counter.increment() // 2
```

**Exercises:**
1. Implement `debounce()` and `throttle()` utilities
2. Create a `memoize()` function for caching
3. Build a simple event emitter with closures

### Afternoon: Module System & Project Structure

```typescript
// ES6 modules (default vs named exports)
// math.ts
export function add(a: number, b: number) { return a + b }
export function subtract(a: number, b: number) { return a - b }
export default function multiply(a: number, b: number) { return a * b }

// main.ts
import multiply, { add, subtract } from './math'
```

**Project:** Build a modular calculator library
- Organize code into modules
- Use barrel exports (`index.ts`)
- Practice import/export patterns

### Evening: Optional Chaining & Nullish Coalescing

```typescript
// Optional chaining (?.)
const user = { profile: { address: { city: 'NYC' } } }
const city = user?.profile?.address?.city  // Safe navigation
const missing = user?.profile?.phone?.number  // undefined (no error!)

// Nullish coalescing (??)
const port = process.env.PORT ?? 3000  // Only replaces null/undefined
const count = 0 ?? 10  // Returns 0 (different from || which would return 10)
```

**Exercise:** Build a config loader with safe property access

---

## Day 3: React Fundamentals - Components & JSX
**Goal:** Understand React's declarative UI paradigm

### Morning: React Setup & First Components

```bash
npm create vite@latest day3-react-basics -- --template react-ts
cd day3-react-basics
npm install
npm run dev
```

**Project:** Build a component library

```typescript
// Functional component (no classes!)
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  )
}

// JSX is transformed to JavaScript
// <Button label="Click" onClick={handleClick} />
// becomes: React.createElement(Button, { label: "Click", onClick: handleClick })
```

**Exercises:**
1. Create `Card`, `Button`, `Input` components
2. Practice props typing with TypeScript
3. Understand JSX vs HTML differences

### Afternoon: Props & Component Composition
**Key Concept:** Data flows down (parent → child)

```typescript
// Props drilling example
interface UserCardProps {
  user: User
  onEdit: (id: number) => void
}

function UserCard({ user, onEdit }: UserCardProps) {
  return (
    <div>
      <h2>{user.name}</h2>
      <Button label="Edit" onClick={() => onEdit(user.id)} />
    </div>
  )
}

// Children prop (composition pattern)
interface CardProps {
  title: string
  children: React.ReactNode
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-body">{children}</div>
    </div>
  )
}

// Usage:
<Card title="User Info">
  <UserCard user={user} onEdit={handleEdit} />
</Card>
```

**Project:** Build a user profile page with nested components

### Evening: Lists & Keys

```typescript
interface TodoListProps {
  todos: Array<{ id: number; text: string; done: boolean }>
}

function TodoList({ todos }: TodoListProps) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}> {/* Key is REQUIRED for lists! */}
          {todo.text}
        </li>
      ))}
    </ul>
  )
}
```

**Exercise:** Build a todo list with add/remove functionality (no state yet)

---

## Day 4: React State & Hooks
**Goal:** Master useState and component lifecycle

### Morning: useState Hook
**Paradigm Shift:** Immutable updates, not mutation!

```typescript
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)  // Tuple destructuring!

  // WRONG: count++  (mutation doesn't trigger re-render)
  // RIGHT: setCount(count + 1)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(prev => prev + 1)}>Better</button>
    </div>
  )
}

// Complex state
interface User {
  name: string
  age: number
}

function UserProfile() {
  const [user, setUser] = useState<User>({ name: 'Alice', age: 30 })

  // Immutable update pattern
  const incrementAge = () => {
    setUser(prev => ({ ...prev, age: prev.age + 1 }))  // Create new object!
  }
}
```

**Project:** Todo App with State
- Add todos
- Toggle completion
- Delete todos
- Filter by status

### Afternoon: useEffect Hook
**Concept:** Side effects in functional components

```typescript
import { useState, useEffect } from 'react'

function UserFetcher({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This runs AFTER render
    async function fetchUser() {
      setLoading(true)
      const response = await fetch(`/api/users/${userId}`)
      const data = await response.json()
      setUser(data)
      setLoading(false)
    }

    fetchUser()

    // Cleanup function (like C++ destructor)
    return () => {
      // Cancel requests, clear timers, etc.
    }
  }, [userId])  // Dependency array - re-run when userId changes

  if (loading) return <p>Loading...</p>
  return <div>{user?.name}</div>
}
```

**Common useEffect patterns:**

```typescript
// Run once on mount (componentDidMount)
useEffect(() => {
  console.log('Component mounted')
}, [])

// Run on every render (usually a mistake!)
useEffect(() => {
  console.log('Every render')
})

// Run when specific values change
useEffect(() => {
  console.log('userId changed:', userId)
}, [userId])

// Cleanup (componentWillUnmount)
useEffect(() => {
  const timer = setInterval(() => console.log('tick'), 1000)
  return () => clearInterval(timer)
}, [])
```

**Project:** Build a GitHub user search
- Fetch data from GitHub API
- Show loading state
- Handle errors
- Debounce search input

### Evening: Controlled Components & Forms

```typescript
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}  // React controls the value
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  )
}
```

**Exercise:** Build a multi-field form with validation

---

## Day 5: Advanced Hooks & Custom Hooks
**Goal:** useCallback, useMemo, useRef, and creating reusable logic

### Morning: useCallback & useMemo (Performance)

```typescript
import { useState, useCallback, useMemo } from 'react'

function ExpensiveComponent() {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState([1, 2, 3, 4, 5])

  // useMemo: memoize expensive calculations
  const total = useMemo(() => {
    console.log('Calculating total...')
    return items.reduce((sum, item) => sum + item, 0)
  }, [items])  // Only recalculate when items change

  // useCallback: memoize functions (prevent child re-renders)
  const handleClick = useCallback(() => {
    setCount(c => c + 1)
  }, [])  // Function never changes

  return (
    <div>
      <p>Total: {total}</p>
      <ChildComponent onClick={handleClick} />
    </div>
  )
}

// If onClick changes, ChildComponent re-renders unnecessarily
const ChildComponent = React.memo(({ onClick }: { onClick: () => void }) => {
  console.log('ChildComponent rendered')
  return <button onClick={onClick}>Click</button>
})
```

**When to use:**
- `useMemo`: Expensive calculations (like C++ caching)
- `useCallback`: Passing callbacks to child components

### Afternoon: useRef Hook

```typescript
import { useRef, useEffect } from 'react'

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()  // Direct DOM access
  }, [])

  return <input ref={inputRef} />
}

// useRef for mutable values (doesn't trigger re-render)
function Timer() {
  const intervalRef = useRef<number | null>(null)
  const [count, setCount] = useState(0)

  const start = () => {
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1)
    }, 1000)
  }

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  )
}
```

### Evening: Custom Hooks (Reusable Logic)

```typescript
// Custom hook for fetching data
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch(url)
        const json = await response.json()
        setData(json)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

// Usage:
function UserProfile({ userId }: { userId: number }) {
  const { data: user, loading, error } = useFetch<User>(`/api/users/${userId}`)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return <div>{user?.name}</div>
}
```

**Project:** Create custom hooks library
1. `useLocalStorage()` - Sync state with localStorage
2. `useDebounce()` - Debounce a value
3. `useToggle()` - Boolean toggle with helpers
4. `useWindowSize()` - Track window dimensions

---

## Day 6: Context API & Global State
**Goal:** Share state without prop drilling

### Morning: Context API Basics

```typescript
import { createContext, useContext, useState } from 'react'

// 1. Create context
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// 2. Create provider component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 3. Create custom hook for consuming context
function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

// 4. Usage in components
function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className={theme}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  )
}

// 5. Wrap app with provider
function App() {
  return (
    <ThemeProvider>
      <Header />
      {/* Any nested component can use useTheme() */}
    </ThemeProvider>
  )
}
```

### Afternoon: useReducer for Complex State

```typescript
import { useReducer } from 'react'

// State shape
interface TodoState {
  todos: Array<{ id: number; text: string; done: boolean }>
  filter: 'all' | 'active' | 'completed'
}

// Actions
type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'SET_FILTER'; payload: TodoState['filter'] }

// Reducer (like C++ state machine)
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, done: false }
        ]
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, done: !todo.done }
            : todo
        )
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
    case 'SET_FILTER':
      return { ...state, filter: action.payload }
    default:
      return state
  }
}

// Component
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all'
  })

  const addTodo = (text: string) => {
    dispatch({ type: 'ADD_TODO', payload: text })
  }

  return <div>{/* UI */}</div>
}
```

**Project:** Build Auth Context
- User login/logout state
- Protected routes
- Auth provider component

---

## Day 7: Material-UI (MUI) & Styling
**Goal:** Learn component libraries and CSS-in-JS

### Morning: MUI Setup

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

```typescript
import { Button, TextField, Box, Typography } from '@mui/material'
import { Send as SendIcon } from '@mui/icons-material'

function MyForm() {
  return (
    <Box sx={{ p: 2, maxWidth: 400 }}>  {/* sx prop for inline styles */}
      <Typography variant="h4" gutterBottom>
        Contact Form
      </Typography>
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<SendIcon />}
      >
        Send
      </Button>
    </Box>
  )
}
```

**MUI Key Concepts:**
- **sx prop** - Inline styles with theme access
- **Component variants** - Different styles for same component
- **Grid/Stack layouts** - Responsive layouts

### Afternoon: Theme Customization

```typescript
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your app */}
    </ThemeProvider>
  )
}
```

### Evening: styled() API

```typescript
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  // Responsive
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
  },
}))
```

**Project:** Build a dashboard UI
- AppBar with navigation
- Sidebar drawer
- Card grid with data
- Responsive layout (Grid/Stack)

---

## Day 8: React Router & Navigation
**Goal:** Multi-page applications with client-side routing

### Morning: React Router Setup

```bash
npm install react-router-dom
```

```typescript
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### Afternoon: Route Parameters & Navigation

```typescript
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'

// URL: /users/123
function UserDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  return (
    <div>
      <h1>User {id}</h1>
      <button onClick={() => navigate('/users')}>Back</button>
    </div>
  )
}

// Query params: /search?q=react&page=2
function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q')
  const page = searchParams.get('page')

  return <div>Searching for: {query}</div>
}
```

### Evening: Lazy Loading & Code Splitting

```typescript
import { lazy, Suspense } from 'react'

// Lazy load components (loaded on demand)
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Profile = lazy(() => import('./pages/Profile'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
```

**Project:** Multi-page app with:
- Home, About, Contact pages
- User list + user detail pages
- Protected routes (with auth context from Day 6)
- 404 page

---

## Day 9: Redux Toolkit & State Management
**Goal:** Learn industry-standard state management

### Morning: Redux Toolkit Setup

```bash
npm install @reduxjs/toolkit react-redux
```

```typescript
// store.ts
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// App.tsx
import { Provider } from 'react-redux'
import { store } from './store'

function App() {
  return (
    <Provider store={store}>
      {/* Your app */}
    </Provider>
  )
}
```

### Afternoon: Slices & Actions

```typescript
// features/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
  status: 'idle' | 'loading'
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1  // Immer makes this safe!
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer

// Component usage
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store'
import { increment } from './features/counterSlice'

function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  )
}
```

### Evening: Async Thunks

```typescript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface User {
  id: number
  name: string
}

// Async action
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('/api/users')
    return response.json() as Promise<User[]>
  }
)

interface UsersState {
  users: User[]
  loading: boolean
  error: string | null
}

const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [], loading: false, error: null } as UsersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch'
      })
  },
})
```

**Project:** Todo app with Redux
- Add/remove/toggle todos
- Filter todos (all/active/completed)
- Persist to localStorage with middleware

---

## Day 10: Forms, Testing & Integration
**Goal:** Production-ready skills

### Morning: React Hook Form + Zod

```bash
npm install react-hook-form zod @hookform/resolvers
```

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Zod schema (type-safe validation)
const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  age: z.number().min(18, 'Must be 18+'),
})

type FormData = z.infer<typeof schema>

function RegistrationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)  // Type-safe!
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}

      <input type="number" {...register('age', { valueAsNumber: true })} />
      {errors.age && <span>{errors.age.message}</span>}

      <button type="submit">Submit</button>
    </form>
  )
}
```

### Afternoon: Vitest + React Testing Library

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Button from './Button'

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" onClick={() => {}} />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button label="Click" onClick={handleClick} />)

    fireEvent.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Evening: Final Project Integration
**Build a complete app combining everything:**

```
Mini Project Management App
├── Auth (Context API)
├── Projects List (Redux + RTK Query)
├── Project Detail (React Router)
├── Create Project Form (React Hook Form + Zod)
├── UI Components (Material-UI)
└── Tests (Vitest)
```

**Features:**
- Login/logout with auth context
- Fetch projects from API
- Create/edit/delete projects
- Filter and search
- Responsive UI with MUI
- Form validation
- Unit tests for critical components

---

## Daily Schedule Recommendation

**Each day:**
- **Morning (2-3 hours):** Learn new concepts + small exercises
- **Afternoon (2-3 hours):** Build mini-project applying concepts
- **Evening (1-2 hours):** Review, experiment, ask questions

**Total: 5-8 hours/day** (adjust based on your pace)

---

## Key Resources

### Documentation
1. **MDN Web Docs** - https://developer.mozilla.org/en-US/docs/Web/JavaScript
2. **TypeScript Handbook** - https://www.typescriptlang.org/docs/handbook/
3. **React Docs** - https://react.dev/
4. **Material-UI** - https://mui.com/material-ui/
5. **Redux Toolkit** - https://redux-toolkit.js.org/

### Tools to Install
- **Node.js** (v18 or higher) - https://nodejs.org/
- **VS Code** with extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features
  - ES7+ React/Redux/React-Native snippets
- **Browser DevTools**:
  - React Developer Tools
  - Redux DevTools

---

## C++ to JavaScript Mental Models

| C++ Concept | JavaScript Equivalent | Notes |
|-------------|----------------------|-------|
| `std::vector` | `Array` + `.map()`, `.filter()` | Arrays are dynamic, high-level operations |
| `std::function` | Arrow functions, callbacks | First-class functions |
| `std::promise` | `Promise` | Similar async concept |
| `async/await` | `async/await` | Same keywords, different implementation |
| Templates `<T>` | Generics `<T>` (TypeScript) | Type parameters work similarly |
| RAII | `useEffect` cleanup | Resource management pattern |
| Pointers | References | Everything is a reference in JS |
| `nullptr` | `null` and `undefined` | Two "no value" types |
| Preprocessor | Build tools (Vite, babel) | Code transformation at build time |
| `const` | `const` | Similar but JS const allows object mutation |
| Smart pointers | Garbage collection | Automatic memory management |
| Inheritance | Prototypes / Composition | Prefer composition in React |
| Mutexes | N/A | Single-threaded, event loop |
| Move semantics | Shallow copying | No manual memory optimization |

---

## Key Paradigm Shifts from C++

### 1. Memory Management
- **C++:** Manual allocation/deallocation, smart pointers, RAII
- **JavaScript:** Automatic garbage collection, no manual memory management

### 2. Type System
- **C++:** Compile-time static typing, strict
- **JavaScript:** Dynamic runtime typing
- **TypeScript:** Compile-time static typing (erased at runtime)

### 3. Concurrency
- **C++:** Multi-threading, mutexes, condition variables
- **JavaScript:** Single-threaded with async event loop, Promises

### 4. Compilation
- **C++:** Ahead-of-time compilation to machine code
- **JavaScript:** JIT compilation or transpilation (TypeScript → JavaScript)

### 5. Components/Objects
- **C++:** Classes with inheritance
- **React:** Functional components with hooks (prefer composition)

### 6. Immutability
- **C++:** Mutable by default, `const` for immutability
- **React/Redux:** Prefer immutable patterns, create new objects instead of mutating

### 7. Error Handling
- **C++:** Exceptions, return codes, `std::optional`
- **JavaScript:** Exceptions + Promise rejections, optional chaining

---

## Success Metrics

By Day 10, you should be able to:

✅ Build React apps with TypeScript from scratch
✅ Manage complex state with Redux Toolkit
✅ Create forms with validation
✅ Write tests for components
✅ Use MUI for professional UIs
✅ Understand async JavaScript deeply
✅ Debug JavaScript/React issues confidently
✅ Read and understand modern React codebases

---

## What to Do Each Day

**Start each day:**
1. Create a new folder/project for that day's topic
2. Review the day's goals and concepts

**During the day:**
1. Write code following the examples
2. Experiment and break things
3. Fix errors and understand why they happened
4. Ask questions when concepts are unclear

**End each day:**
1. Commit your work to git
2. Write notes about what you learned
3. List questions for next session
4. Preview tomorrow's topics

---

## Tips for C++ Developers

### Leverage Your Strengths
- TypeScript's type system will feel familiar
- You already understand algorithms and data structures
- Generic programming concepts transfer directly
- Your debugging skills are universal

### Watch Out For
- **No pointers:** Everything is a reference, can't do pointer arithmetic
- **Dynamic typing:** Runtime errors that C++ would catch at compile time
- **Async by default:** I/O operations are non-blocking, not threaded
- **Mutability:** Need to consciously use immutable patterns in React
- **Equality:** `==` vs `===` (always use `===`)
- **`this` binding:** Arrow functions vs regular functions behave differently

### Best Practices
1. Always use TypeScript (especially coming from C++)
2. Enable strict mode in `tsconfig.json`
3. Use `const` by default, `let` when needed, never `var`
4. Prefer functional patterns over imperative
5. Use ESLint and Prettier for code quality
6. Write tests as you go
7. Read error messages carefully (they're helpful!)

---

## Project Structure Recommendation

```
JsTrainingProj/
├── day1-js-fundamentals/
│   ├── exercises.js
│   ├── array-methods.js
│   └── destructuring.js
├── day1-typescript-intro/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── types.ts
│       └── main.ts
├── day2-functional-patterns/
├── day3-react-basics/
├── day4-react-state/
├── day5-advanced-hooks/
├── day6-context-state/
├── day7-mui-styling/
├── day8-react-router/
├── day9-redux-toolkit/
├── day10-forms-testing/
└── final-project/
    └── project-management-app/
```

---

## Getting Started

### Prerequisites
```bash
# Install Node.js (v18 or higher)
node --version
npm --version

# Verify installations
npx --version
```

### Day 1 Setup
```bash
# Navigate to your training directory
cd C:\Users\chenb\Repositories\JsTrainingProj

# Create Day 1 folders
mkdir day1-js-fundamentals
mkdir day1-typescript-intro

# Initialize Day 1 TypeScript project
cd day1-typescript-intro
npm init -y
npm install -D typescript ts-node @types/node
npx tsc --init
```

---

## Questions or Stuck?

As you work through each day:
1. Try to solve problems yourself first
2. Use browser DevTools and debugger
3. Read error messages carefully
4. Search documentation
5. Ask specific questions about concepts or errors

**Remember:** Your C++ experience is a huge advantage. The hardest part is unlearning some patterns and embracing JavaScript's functional, async-first paradigm. Focus on understanding *why* things work differently rather than fighting against it.

---

## Ready to Begin?

**Start with Day 1** and work through each section systematically. Write every code example, do every exercise, and build every project. The hands-on experience is crucial.

Good luck on your JavaScript/TypeScript/React journey!

---

# Project: SnipStash - Code Snippet Manager

> **Your learning project throughout the 10 days**

## Overview

SnipStash is a personal code snippet manager that lets you save, organize, search, and quickly copy code snippets. Think of it as your personal code library.

## Features

### Core Features
- **Create/Edit/Delete snippets** - Title, code, language, description, tags
- **Syntax highlighting** - Display code with proper highlighting (Prism.js)
- **Organize** - Tags, folders/categories, favorites
- **Search** - By title, content, tags, language
- **Copy to clipboard** - One-click copy
- **Persistent storage** - Backend API with database

### Nice-to-Have (stretch goals)
- Import/export as JSON
- Dark/light theme toggle
- Keyboard shortcuts (Ctrl+K to search, etc.)
- Markdown support in descriptions
- Public/private snippets with shareable links

---

## Data Models

```typescript
// Snippet - the core entity
interface Snippet {
  id: string
  title: string
  code: string
  language: string        // 'javascript', 'python', 'sql', etc.
  description?: string
  tags: string[]
  folderId?: string
  isFavorite: boolean
  createdAt: Date
  updatedAt: Date
}

// Folder - for organizing snippets
interface Folder {
  id: string
  name: string
  color?: string
  createdAt: Date
}

// Tag - for flexible categorization
interface Tag {
  id: string
  name: string
  snippetCount: number    // computed
}
```

---

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Build tool
- **Material-UI (MUI)** - Component library
- **React Router** - Navigation
- **Redux Toolkit** - State management
- **React Hook Form + Zod** - Forms & validation
- **Prism.js** - Syntax highlighting
- **Vitest + React Testing Library** - Testing

### Backend
- **Node.js + Express** - API server
- **TypeScript** - Type safety
- **Prisma** - ORM (type-safe database access)
- **SQLite** - Database (simple, no setup required)

---

## Project Structure

```
JsTrainingProj/
├── README.md
├── day1-js-fundamentals/       # Day 1 exercises
├── day1-typescript-intro/      # Day 1 TypeScript exercises
├── day2-functional-patterns/   # Day 2 exercises
│
├── snipstash/                  # Main project (starts Day 3)
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/     # React components
│   │   │   ├── hooks/          # Custom hooks
│   │   │   ├── context/        # React Context
│   │   │   ├── store/          # Redux store & slices
│   │   │   ├── pages/          # Page components
│   │   │   ├── services/       # API client
│   │   │   ├── types/          # TypeScript types
│   │   │   └── utils/          # Utility functions
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── backend/
│       ├── src/
│       │   ├── routes/         # API routes
│       │   ├── controllers/    # Request handlers
│       │   ├── services/       # Business logic
│       │   └── prisma/         # Database schema
│       └── package.json
```

---

## Day-by-Day Implementation Plan

### Days 1-2: Foundation (No SnipStash code yet)
- JavaScript fundamentals exercises
- TypeScript practice
- Build utility functions that you'll use later:
  - `filterSnippets(snippets, query)`
  - `sortSnippets(snippets, sortBy)`
  - `groupByLanguage(snippets)`
  - `debounce()`, `formatDate()`, etc.

### Day 3: React Components
- Set up Vite + React + TypeScript project
- Create basic components:
  - `SnippetCard` - displays a single snippet
  - `SnippetList` - list of snippet cards
  - `CodeBlock` - syntax-highlighted code display
  - `SearchBar` - search input
  - `TagChip` - tag display

### Day 4: State & CRUD
- Implement useState for snippet management
- Add/Edit/Delete snippets (localStorage for now)
- Build `SnippetForm` component
- Implement search filtering
- Loading and empty states

### Day 5: Custom Hooks
- `useLocalStorage` - persist state
- `useClipboard` - copy to clipboard with feedback
- `useDebounce` - debounce search input
- `useFetch` - data fetching (prep for backend)
- `useSnippets` - snippet CRUD operations

### Day 6: Context & Global State
- `SnippetContext` - global snippet state
- `ThemeContext` - dark/light mode
- `ToastContext` - notifications ("Copied!", "Saved!")
- Refactor components to use context

### Day 7: MUI & Styling
- Install and configure MUI
- Build the full UI layout:
  - AppBar with search
  - Sidebar drawer (folders, tags, filters)
  - Main content area (snippet grid/list)
  - Snippet detail/edit dialog
- Responsive design
- Theme customization

### Day 8: React Router
- Set up routes:
  - `/` - Home (all snippets)
  - `/snippets/:id` - Snippet detail
  - `/favorites` - Favorite snippets
  - `/folder/:folderId` - Folder view
  - `/tag/:tagName` - Tag view
  - `/new` - Create snippet
- Navigation and deep linking
- 404 page

### Day 9: Backend API
- Set up Node.js + Express + TypeScript
- Configure Prisma with SQLite
- Implement REST API:
  - `GET /api/snippets` - list all
  - `GET /api/snippets/:id` - get one
  - `POST /api/snippets` - create
  - `PUT /api/snippets/:id` - update
  - `DELETE /api/snippets/:id` - delete
  - `GET /api/tags` - list tags
  - `GET /api/folders` - list folders
- Connect frontend to backend

### Day 10: Redux, Forms & Testing
- Migrate to Redux Toolkit (good practice even with working Context)
- React Hook Form + Zod for snippet form validation
- Write tests:
  - Unit tests for utility functions
  - Component tests for SnippetCard, SearchBar
  - Integration test for create snippet flow

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/snippets` | List snippets (supports `?search=`, `?tag=`, `?language=`) |
| GET | `/api/snippets/:id` | Get single snippet |
| POST | `/api/snippets` | Create snippet |
| PUT | `/api/snippets/:id` | Update snippet |
| DELETE | `/api/snippets/:id` | Delete snippet |
| GET | `/api/folders` | List folders |
| POST | `/api/folders` | Create folder |
| PUT | `/api/folders/:id` | Update folder |
| DELETE | `/api/folders/:id` | Delete folder |
| GET | `/api/tags` | List all tags (with counts) |

---

## UI Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│  🗂️ SnipStash                [🔍 Search snippets...]    [+ New] │
├────────────────┬────────────────────────────────────────────────┤
│                │                                                │
│  📁 All (24)   │  ┌──────────────────────┐ ┌──────────────────┐│
│  ⭐ Favorites  │  │ Array flatten    ⭐📋│ │ useDebounce    📋││
│                │  │ javascript           │ │ typescript       ││
│  FOLDERS       │  │ ────────────────────││ │ ──────────────── ││
│  📂 React      │  │ const flatten = arr │ │ function useDeb… ││
│  📂 Utils      │  │   => arr.flat(...)  │ │                  ││
│  📂 SQL        │  │ ────────────────────││ │ ──────────────── ││
│                │  │ #arrays #utils      │ │ #hooks #react    ││
│  LANGUAGES     │  └──────────────────────┘ └──────────────────┘│
│  ├ JavaScript  │                                                │
│  ├ TypeScript  │  ┌──────────────────────┐ ┌──────────────────┐│
│  ├ Python      │  │ SQL Inner Join   📋│ │ Fetch wrapper  📋││
│  └ SQL         │  │ sql                  │ │ javascript       ││
│                │  │ ────────────────────││ │ ──────────────── ││
│  TAGS          │  │ SELECT * FROM u…    │ │ async function…  ││
│  #react (5)    │  └──────────────────────┘ └──────────────────┘│
│  #hooks (3)    │                                                │
│  #utils (8)    │                                                │
│                │                                                │
└────────────────┴────────────────────────────────────────────────┘
```

---

## Getting Started with SnipStash

The project work begins on **Day 3** after you've learned the JavaScript/TypeScript fundamentals. Days 1-2 focus on exercises that build the foundation.

When you reach Day 3:
```bash
# Create the project structure
mkdir snipstash
cd snipstash

# Initialize frontend
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install

# Start development
npm run dev
```

---

## Success Criteria

By the end of Day 10, SnipStash should:

✅ Display a list of code snippets with syntax highlighting
✅ Create, edit, and delete snippets
✅ Search snippets by title, content, or tags
✅ Filter by language, folder, or tag
✅ Mark snippets as favorites
✅ Copy code to clipboard with one click
✅ Persist data to a backend database
✅ Have a polished, responsive UI with MUI
✅ Include basic test coverage
