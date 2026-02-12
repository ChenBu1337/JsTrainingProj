#!/bin/bash
# Setup script for JsTrainingProj
# Run this after cloning the repo on a new machine

set -e  # Exit on error

echo "🚀 Setting up JsTrainingProj..."
echo ""

# Install dependencies for day1
echo "📦 Installing dependencies for day1-js-fundamentals..."
cd day1-js-fundamentals
npm install
cd ..
echo "✅ Day 1 dependencies installed"
echo ""

# Install dependencies for day2
echo "📦 Installing dependencies for day2-functional-patterns..."
cd day2-functional-patterns
npm install
cd ..
echo "✅ Day 2 dependencies installed"
echo ""

# Create pre-commit hook
echo "🔧 Setting up pre-commit hook..."
mkdir -p .git/hooks

cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
# Pre-commit hook: TypeScript type-checking
# Runs tsc --noEmit on all TypeScript projects before allowing a commit

echo "Running TypeScript type check..."

# Check day1-js-fundamentals
if [ -f "day1-js-fundamentals/tsconfig.json" ]; then
  cd day1-js-fundamentals
  npx tsc --noEmit
  TSC_EXIT=$?
  cd ..
  if [ $TSC_EXIT -ne 0 ]; then
    echo ""
    echo "TypeScript type check FAILED. Fix the errors above before committing."
    exit 1
  fi
fi

# Check day2-functional-patterns
if [ -f "day2-functional-patterns/tsconfig.json" ]; then
  cd day2-functional-patterns
  npx tsc --noEmit
  TSC_EXIT=$?
  cd ..
  if [ $TSC_EXIT -ne 0 ]; then
    echo ""
    echo "TypeScript type check FAILED. Fix the errors above before committing."
    exit 1
  fi
fi

echo "TypeScript type check passed!"
exit 0
EOF

chmod +x .git/hooks/pre-commit
echo "✅ Pre-commit hook installed"
echo ""

echo "✨ Setup complete! You're ready to code."
echo ""
echo "Quick commands:"
echo "  cd day1-js-fundamentals && npm test  # Run Day 1 tests"
echo "  cd day2-functional-patterns && npm test  # Run Day 2 tests"
