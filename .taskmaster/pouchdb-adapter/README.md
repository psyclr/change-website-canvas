# 🗄️ PouchDB Task-Master Integration

**Offline-first database storage for task-master CLI with cross-project sync capabilities**

## ✨ Features

- 🗄️ **Database Storage**: Replace JSON files with PouchDB database
- 🔄 **Offline-First**: Works without internet, syncs when available  
- 🌐 **Remote Sync**: Optional sync with CouchDB/Cloudant
- 📱 **Cross-Project**: Share tasks across multiple projects
- ⚡ **Performance**: Caching and optimized queries
- 🔙 **Backwards Compatible**: Falls back to JSON if needed
- 📊 **Statistics**: Database usage and sync monitoring

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Dependencies are already installed in your project
npm install pouchdb pouchdb-adapter-http pouchdb-adapter-leveldb
```

### 2. Enable PouchDB Storage

```bash
# Enable for current project
node .taskmaster/pouchdb-adapter/cli.js enable

# Enable with remote sync (optional)
node .taskmaster/pouchdb-adapter/cli.js enable https://your-couchdb.example.com/tasks
```

### 3. Use Enhanced task-master

```bash
# All standard commands work with database storage
node .taskmaster/pouchdb-adapter/cli.js list
node .taskmaster/pouchdb-adapter/cli.js add-task --title "Database test" --priority high
node .taskmaster/pouchdb-adapter/cli.js set-status --id 1 --status in-progress

# New database commands
node .taskmaster/pouchdb-adapter/cli.js stats
node .taskmaster/pouchdb-adapter/cli.js sync
node .taskmaster/pouchdb-adapter/cli.js projects
```

## 📋 Commands

### Database Management
- `enable [sync-url]` - Enable PouchDB storage with optional remote sync
- `disable` - Revert to JSON file storage
- `stats` - Show database statistics and sync status
- `sync` - Force manual sync with remote database
- `projects` - List all projects using PouchDB storage

### Task Management (Enhanced)
All standard task-master commands work with automatic database sync:
- `list` - List tasks (with pre/post sync)
- `add-task` - Add new task (auto-saved to database) 
- `set-status` - Update task status (auto-synced)
- `show <id>` - Show task details
- `next` - Get next recommended task

## 🔧 Configuration

Edit `.taskmaster/config.json`:

```json
{
  "storage": {
    "type": "pouchdb",
    "enabled": true,
    "syncUrl": "https://your-couchdb.example.com/tasks"
  }
}
```

### Remote Sync Setup

1. **CouchDB/Cloudant**: 
   ```bash
   node .taskmaster/pouchdb-adapter/cli.js enable https://username:password@your-couchdb.com/tasks
   ```

2. **Environment Variable**:
   ```bash
   export TASKMASTER_SYNC_URL="https://your-couchdb.com/tasks"
   ```

## 📊 Database Structure

### Local Storage
- 📁 `.taskmaster/pouchdb/` - Local PouchDB database files
- 📄 `.taskmaster/tasks/tasks.json` - JSON backup (maintained for compatibility)

### Document Structure
```javascript
{
  "_id": "tasks",
  "_rev": "1-abc123", 
  "data": {
    // Original task-master JSON structure
    "technical-implementation": {
      "tasks": [...],
      "metadata": {...}
    }
  },
  "updated_at": "2025-09-08T19:24:54.248Z",
  "project_path": "/path/to/project"
}
```

## 🌐 Cross-Project Usage

### Global Project Registry
```bash
# List all projects with PouchDB storage
node .taskmaster/pouchdb-adapter/cli.js projects

# Example output:
# 1. /Users/alex/project-1
#    📚 Documents: 1
#    📅 Last Updated: 2025-09-08T19:24:54Z
#    🔄 Sync: Enabled
```

### Multi-Project Sync
Each project maintains its own database, but can sync to shared remote:

```bash
# Project A
cd /path/to/project-a
node .taskmaster/pouchdb-adapter/cli.js enable https://shared-db.com/project-a

# Project B  
cd /path/to/project-b
node .taskmaster/pouchdb-adapter/cli.js enable https://shared-db.com/project-b
```

## 🎯 Use Cases

### 1. **Reliable Local Storage**
- Replace fragile JSON files with database
- Atomic operations prevent corruption
- Better performance for large task lists

### 2. **Team Collaboration** 
- Sync tasks across team members
- Conflict resolution for concurrent edits
- Real-time updates when connected

### 3. **Offline Development**
- Work offline, sync when back online
- Local-first architecture
- Automatic retry on connection restore

### 4. **Cross-Device Sync**
- Same tasks on laptop, desktop, server
- Consistent state across environments
- Backup and restore capabilities

## 🔍 Troubleshooting

### Check Storage Status
```bash
node .taskmaster/pouchdb-adapter/cli.js stats
```

### Common Issues

**"No such file or directory" error:**
```bash
# Ensure you're in project root
cd /path/to/your/project
node .taskmaster/pouchdb-adapter/cli.js enable
```

**Sync failures:**
```bash
# Check remote URL and credentials
curl -X GET https://your-couchdb.com/tasks
# Retry sync
node .taskmaster/pouchdb-adapter/cli.js sync
```

**Performance issues:**
```bash
# Clear cache and refresh
node .taskmaster/pouchdb-adapter/demo.js --performance
```

### Revert to JSON Storage
```bash
node .taskmaster/pouchdb-adapter/cli.js disable
# Your data is preserved in .taskmaster/tasks/tasks.json
```

## 🧪 Testing & Development

### Run Demo
```bash
# Basic demo
node .taskmaster/pouchdb-adapter/demo.js

# Full demo with performance tests
node .taskmaster/pouchdb-adapter/demo.js --full

# Performance test only
node .taskmaster/pouchdb-adapter/demo.js --performance
```

### Performance Benchmarks
Typical performance on modern hardware:
- **Load**: ~2-5ms average
- **Save**: ~3-8ms average  
- **Sync**: Depends on network and data size

## 🔮 Future Enhancements

### For Pull Request to task-master
1. **Native Integration**: Embed PouchDB directly in task-master core
2. **Migration Tools**: Seamless upgrade from JSON to PouchDB
3. **UI Improvements**: Better sync status in CLI output
4. **Configuration**: More sync options and conflict resolution

### Advanced Features
1. **Real-time Sync**: Live updates using WebSocket
2. **Encryption**: End-to-end encrypted task storage
3. **Search**: Full-text search across all tasks
4. **Analytics**: Task completion metrics and insights

## 📝 Implementation Notes

### Architecture
- **Storage Layer**: Abstracts PouchDB operations
- **Wrapper Layer**: Intercepts task-master commands  
- **CLI Layer**: Enhanced command interface
- **Compatibility**: Maintains JSON backup for fallback

### Key Design Decisions
- **Non-invasive**: No modifications to original task-master
- **Backwards Compatible**: Always maintains JSON backup
- **Performance First**: Caching and lazy loading
- **Error Resilient**: Graceful fallback to JSON on failures

## 🤝 Contributing

This proof-of-concept is ready for:
1. **Fork** `eyaltoledano/claude-task-master`
2. **Integrate** this adapter into the main codebase
3. **Submit PR** with database storage feature
4. **Community Testing** and feedback

---

**Created by Claude + Alexander**  
*Enhancing task-master with modern database capabilities* 🚀