# Setup Instructions

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
