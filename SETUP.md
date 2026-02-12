# Setup Instructions

## Prerequisites

Before running the setup, ensure you have the following installed on your system:

### Required

- **Node.js** (v18.0.0 or higher)
  - Includes `npm` (Node Package Manager)
  - Download: https://nodejs.org/
  - Verify: `node --version` and `npm --version`

- **Git** (v2.0.0 or higher)
  - For version control and cloning the repository
  - Download: https://git-scm.com/
  - Verify: `git --version`

### Platform-Specific Requirements

#### Windows
- **Git Bash** (included with Git for Windows)
  - Required to run the `setup.sh` bash script
  - Alternative: Use WSL (Windows Subsystem for Linux)
  - Alternative: Manually follow the "Manual Setup" instructions below

#### macOS / Linux
- Bash shell (usually pre-installed)
- `chmod` command (usually pre-installed)

### Recommended (Optional)

- **VS Code** (or any modern code editor)
  - Recommended extensions:
    - ESLint
    - Prettier
    - TypeScript and JavaScript Language Features (built-in)
  - Download: https://code.visualstudio.com/

- **Modern Terminal**
  - Windows: Windows Terminal, Git Bash, or WSL
  - macOS: iTerm2 or built-in Terminal
  - Linux: Your distro's terminal

## npm Dependencies (Installed Automatically)

The following packages will be installed when you run `setup.sh` or `npm install`:

### Day 1 & Day 2 Projects

Both projects include:

- **TypeScript** (^5.9.3)
  - TypeScript compiler for type-checking
  - Provides static type analysis

- **Vitest** (^4.0.18)
  - Fast unit test framework (Vite-native)
  - Includes:
    - `@vitest/expect` - Assertion library
    - `@vitest/runner` - Test runner
    - `@vitest/spy` - Mocking utilities
  - Depends on:
    - Vite (bundler)
    - esbuild (fast TypeScript transpiler)
    - Rollup (bundler used by Vite)

### Transitive Dependencies

These are installed automatically as dependencies of the above:

- **Vite** - Fast build tool and dev server
- **esbuild** - Fast JavaScript/TypeScript bundler and transpiler
- **Rollup** - Module bundler (used by Vite)
- **chai** - Assertion library (used by Vitest)
- Various TypeScript type definitions (@types/*)

## First Time Setup (New Computer)

After cloning this repository on a new machine:

```bash
# Make the setup script executable
chmod +x setup.sh

# Run the setup script
./setup.sh
```

This will:
- Install all npm dependencies for Day 1 and Day 2
- Set up the pre-commit hook for TypeScript type-checking

## Manual Setup (if needed)

If you prefer to set up manually:

### 1. Install Dependencies

```bash
cd day1-js-fundamentals
npm install
cd ..

cd day2-functional-patterns
npm install
cd ..
```

### 2. Set Up Pre-Commit Hook (Optional)

The pre-commit hook runs `tsc --noEmit` before every commit to catch type errors.

```bash
# Copy the hook
cp .git/hooks/pre-commit.sample .git/hooks/pre-commit

# Or create it manually - see setup.sh for the content
```

## Running Tests

```bash
# Day 1
cd day1-js-fundamentals
npm test

# Day 2
cd day2-functional-patterns
npm test
```

## Type Checking

```bash
# Check Day 1
cd day1-js-fundamentals
npx tsc --noEmit

# Check Day 2
cd day2-functional-patterns
npx tsc --noEmit
```
