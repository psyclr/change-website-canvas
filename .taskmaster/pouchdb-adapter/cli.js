#!/usr/bin/env node

/**
 * PouchDB Task-Master CLI
 * Enhanced task-master with PouchDB database integration
 */

import { createWrapper, executeWithPouchDB } from './wrapper.js';
import { globalStorageRegistry } from './storage.js';

class PouchTaskMasterCLI {
  constructor() {
    this.wrapper = null;
  }

  async init() {
    this.wrapper = await createWrapper();
    return this;
  }

  /**
   * Display help information
   */
  showHelp() {
    console.log(`
🗄️  PouchDB Task-Master CLI

USAGE:
  pouchdb-tm <command> [options]

DATABASE COMMANDS:
  enable [sync-url]       Enable PouchDB storage (optional remote sync)
  disable                 Disable PouchDB storage (revert to JSON)
  sync                    Force sync with remote database
  stats                   Show database statistics
  projects               List all projects with PouchDB storage

TASK COMMANDS (Enhanced with PouchDB):
  list                   List tasks (auto-sync before/after)
  add-task [options]     Add new task (auto-save to DB)
  set-status [options]   Update task status (auto-sync)
  show <id>              Show task details
  next                   Get next recommended task
  
SYNC & BACKUP:
  backup                 Create full backup of current project
  restore <backup-file>  Restore from backup file
  export                 Export tasks to JSON
  import <json-file>     Import tasks from JSON file

EXAMPLES:
  pouchdb-tm enable https://my-couchdb.example.com/tasks
  pouchdb-tm list
  pouchdb-tm add-task --title "New Feature" --priority high
  pouchdb-tm sync
  pouchdb-tm stats
  pouchdb-tm projects

For standard task-master commands, use: pouchdb-tm <any-task-master-command>
`);
  }

  /**
   * Enable PouchDB storage
   */
  async enablePouchDB(syncUrl) {
    console.log('🔌 Enabling PouchDB storage...');
    
    if (syncUrl) {
      console.log(`🔄 Remote sync: ${syncUrl}`);
    }
    
    const success = await this.wrapper.enablePouchDB(syncUrl);
    
    if (success) {
      console.log('✅ PouchDB storage enabled successfully!');
      console.log('📋 Your tasks are now stored in a local database');
      if (syncUrl) {
        console.log('🌐 Remote sync configured - changes will sync automatically');
      }
    } else {
      console.error('❌ Failed to enable PouchDB storage');
      process.exit(1);
    }
  }

  /**
   * Disable PouchDB storage
   */
  async disablePouchDB() {
    console.log('📄 Disabling PouchDB storage...');
    
    const success = await this.wrapper.disablePouchDB();
    
    if (success) {
      console.log('✅ Reverted to JSON storage');
      console.log('📁 Your tasks are now stored in .taskmaster/tasks/tasks.json');
    } else {
      console.error('❌ Failed to disable PouchDB storage');
      process.exit(1);
    }
  }

  /**
   * Force sync with remote
   */
  async sync() {
    console.log('🔄 Starting manual sync...');
    
    try {
      const result = await this.wrapper.sync();
      if (result) {
        console.log('✅ Sync completed successfully');
        console.log(`📊 ${JSON.stringify(result, null, 2)}`);
      } else {
        console.log('📄 No sync configured (JSON storage mode)');
      }
    } catch (error) {
      console.error('❌ Sync failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Show database statistics
   */
  async showStats() {
    console.log('📊 Database Statistics\n');
    
    const stats = await this.wrapper.getStats();
    
    if (stats.pouchdb_enabled) {
      console.log('🗄️  Storage Type: PouchDB');
      console.log(`📚 Database: ${stats.database?.name || 'N/A'}`);
      console.log(`📄 Documents: ${stats.database?.docs || 0}`);
      console.log(`💾 Size: ${this.formatBytes(stats.database?.size || 0)}`);
      console.log(`📅 Last Updated: ${stats.tasks?.last_updated || 'Never'}`);
      
      if (stats.sync?.enabled) {
        console.log(`🔄 Remote Sync: ${stats.sync.remote_url}`);
      } else {
        console.log('🔄 Remote Sync: Disabled');
      }
      
      if (stats.cache?.active) {
        console.log(`⚡ Cache: Active (${stats.cache.age_ms}ms old)`);
      }
    } else {
      console.log('📄 Storage Type: JSON');
      console.log('🗄️  PouchDB: Disabled');
    }
  }

  /**
   * List all projects with PouchDB
   */
  async listProjects() {
    console.log('📋 Projects with PouchDB Storage\n');
    
    const projects = await this.wrapper.getGlobalProjects();
    
    if (projects.length === 0) {
      console.log('📂 No projects found with PouchDB storage');
      return;
    }
    
    projects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.path}`);
      console.log(`   📚 Documents: ${project.database?.docs || 0}`);
      console.log(`   📅 Last Updated: ${project.tasks?.last_updated || 'Never'}`);
      console.log(`   🔄 Sync: ${project.sync?.enabled ? 'Enabled' : 'Disabled'}`);
      console.log('');
    });
  }

  /**
   * Execute standard task-master command with PouchDB integration
   */
  async executeTaskMasterCommand(command, args) {
    try {
      console.log(`🚀 Executing: task-master ${command} ${args.join(' ')}`);
      
      const result = await this.wrapper.execute(command, args);
      
      if (result.success) {
        console.log(result.stdout);
        if (result.stderr) {
          console.warn(result.stderr);
        }
      }
      
    } catch (error) {
      console.error('❌ Command failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Format bytes to human readable
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Main CLI handler
   */
  async run() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
      this.showHelp();
      return;
    }
    
    const command = args[0];
    const commandArgs = args.slice(1);
    
    switch (command) {
      case 'help':
      case '--help':
      case '-h':
        this.showHelp();
        break;
        
      case 'enable':
        await this.enablePouchDB(commandArgs[0]);
        break;
        
      case 'disable':
        await this.disablePouchDB();
        break;
        
      case 'sync':
        await this.sync();
        break;
        
      case 'stats':
        await this.showStats();
        break;
        
      case 'projects':
        await this.listProjects();
        break;
        
      default:
        // Pass through to task-master with PouchDB integration
        await this.executeTaskMasterCommand(command, commandArgs);
        break;
    }
  }
}

/**
 * Main execution
 */
async function main() {
  try {
    const cli = new PouchTaskMasterCLI();
    await cli.init();
    await cli.run();
  } catch (error) {
    console.error('💥 Fatal error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { PouchTaskMasterCLI };