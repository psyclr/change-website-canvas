#!/bin/bash

# Installation script for PouchDB Task-Master Integration
# Creates convenient aliases and symlinks

echo "🔧 Installing PouchDB Task-Master Integration..."

# Get current project path
PROJECT_PATH="$(pwd)"
ADAPTER_PATH="$PROJECT_PATH/.taskmaster/pouchdb-adapter"

# Check if we're in the right directory
if [ ! -f ".taskmaster/config.json" ]; then
    echo "❌ Error: Not in a task-master project directory"
    echo "   Make sure you're in the root of your project"
    exit 1
fi

# Make CLI executable
chmod +x "$ADAPTER_PATH/cli.js"
chmod +x "$ADAPTER_PATH/demo.js"

echo "✅ Scripts made executable"

# Create convenient alias in project
cat > .taskmaster/tm-pouchdb << 'EOF'
#!/bin/bash
# Convenient wrapper for PouchDB task-master
cd "$(dirname "$0")/.."
node .taskmaster/pouchdb-adapter/cli.js "$@"
EOF

chmod +x .taskmaster/tm-pouchdb

echo "✅ Created local alias: .taskmaster/tm-pouchdb"

# Add to PATH suggestion
echo ""
echo "🎯 Installation complete!"
echo ""
echo "Usage options:"
echo "  1. Local alias:     ./.taskmaster/tm-pouchdb <command>"
echo "  2. Direct:          node .taskmaster/pouchdb-adapter/cli.js <command>"
echo ""
echo "Quick start:"
echo "  ./.taskmaster/tm-pouchdb enable"
echo "  ./.taskmaster/tm-pouchdb stats"
echo "  ./.taskmaster/tm-pouchdb list"
echo ""
echo "Optional: Add to your PATH for global access:"
echo "  echo 'export PATH=\"\$PATH:$ADAPTER_PATH\"' >> ~/.bashrc"
echo "  # Then use: cli.js <command> from anywhere"
echo ""

# Test installation
echo "🧪 Testing installation..."
if ./.taskmaster/tm-pouchdb --help > /dev/null 2>&1; then
    echo "✅ Installation test passed!"
else
    echo "⚠️  Installation test failed - check permissions"
fi

echo ""
echo "📚 Documentation: .taskmaster/pouchdb-adapter/README.md"
echo "🚀 Ready to use PouchDB with task-master!"