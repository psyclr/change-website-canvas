#!/bin/bash

# Task-master configuration restore script
# Run this if task-master config gets lost after git operations

echo "🔄 Restoring task-master configuration..."

# Copy template files back to active config
cp .taskmaster/backup/config.template.json .taskmaster/config.json
cp .taskmaster/backup/state.template.json .taskmaster/state.json

# Update timestamp in state.json
sed -i '' "s/2025-09-08T08:00:00.000Z/$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")/g" .taskmaster/state.json

echo "✅ Task-master configuration restored!"
echo "📋 Run 'task-master list' to verify"