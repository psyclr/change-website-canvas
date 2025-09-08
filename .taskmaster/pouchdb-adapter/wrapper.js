/**
 * Task-master PouchDB Integration Wrapper
 * Intercepts task-master commands and routes them through PouchDB storage
 */

import { createTaskStorage, globalStorageRegistry } from './storage.js';
import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

export class TaskMasterWrapper {
  constructor(projectPath = process.cwd()) {
    this.projectPath = projectPath;
    this.storage = null;
    this.config = null;
  }

  /**
   * Initialize wrapper with configuration
   */
  async init() {
    try {
      // Load configuration
      const configPath = path.join(this.projectPath, '.taskmaster', 'config.json');
      const configData = await fs.readFile(configPath, 'utf8');
      this.config = JSON.parse(configData);
      
      // Check if PouchDB storage is enabled
      const storageConfig = this.config.storage || {};
      const usePouchDB = storageConfig.type === 'pouchdb' || storageConfig.enabled === true;
      
      if (usePouchDB) {
        console.log('🔌 PouchDB storage enabled');
        this.storage = createTaskStorage(this.projectPath, storageConfig);
        
        // Ensure data is migrated
        await this.storage.loadTasks();
      } else {
        console.log('📄 Using default JSON storage');
      }
      
      return this;
      
    } catch (error) {
      console.warn('⚠️ Could not initialize PouchDB wrapper:', error.message);
      console.log('📄 Falling back to default JSON storage');
      return this;
    }
  }

  /**
   * Execute task-master command with PouchDB integration
   */
  async execute(command, args = []) {
    const fullCommand = ['task-master', command, ...args];
    
    try {
      // Pre-command hook: sync data if using PouchDB
      if (this.storage) {
        console.log('🔄 Pre-command sync...');
        await this.storage.loadTasks();
      }
      
      // Execute original task-master command
      console.log(`🚀 Executing: ${fullCommand.join(' ')}`);
      const result = await this.runCommand(fullCommand);
      
      // Post-command hook: sync changes if using PouchDB
      if (this.storage && this.isWriteCommand(command)) {
        console.log('💾 Post-command sync...');
        const tasks = await this.storage.loadFromJSON();
        await this.storage.saveTasks(tasks);
      }
      
      return result;
      
    } catch (error) {
      console.error('❌ Command execution failed:', error.message);
      throw error;
    }
  }

  /**
   * Run shell command and return result
   */
  async runCommand(commandArray) {
    return new Promise((resolve, reject) => {
      const [cmd, ...args] = commandArray;
      const process = spawn(cmd, args, {
        cwd: this.projectPath,
        stdio: 'pipe'
      });

      let stdout = '';
      let stderr = '';

      process.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      process.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      process.on('close', (code) => {
        if (code === 0) {
          resolve({
            success: true,
            stdout,
            stderr,
            code
          });
        } else {
          reject(new Error(`Command failed with code ${code}: ${stderr}`));
        }
      });

      process.on('error', (error) => {
        reject(error);
      });
    });
  }

  /**
   * Check if command modifies data
   */
  isWriteCommand(command) {
    const writeCommands = [
      'add-task',
      'add-subtask', 
      'remove-task',
      'remove-subtask',
      'set-status',
      'update',
      'update-task',
      'add-dependency',
      'remove-dependency',
      'expand',
      'expand-all',
      'clear-subtasks',
      'parse-prd',
      'scope-up',
      'scope-down'
    ];
    
    return writeCommands.includes(command);
  }

  /**
   * Get storage statistics
   */
  async getStats() {
    if (!this.storage) {
      return {
        storage_type: 'json',
        pouchdb_enabled: false
      };
    }
    
    const stats = await this.storage.getStats();
    return {
      storage_type: 'pouchdb',
      pouchdb_enabled: true,
      ...stats
    };
  }

  /**
   * Force sync with remote (if configured)
   */
  async sync() {
    if (!this.storage) {
      console.log('📄 JSON storage - no sync available');
      return false;
    }
    
    try {
      const result = await this.storage.sync();
      console.log('✅ Manual sync completed');
      return result;
    } catch (error) {
      console.error('❌ Manual sync failed:', error.message);
      throw error;
    }
  }

  /**
   * Enable PouchDB storage for current project
   */
  async enablePouchDB(syncUrl = null) {
    try {
      const configPath = path.join(this.projectPath, '.taskmaster', 'config.json');
      
      // Update config
      this.config.storage = {
        type: 'pouchdb',
        enabled: true,
        syncUrl: syncUrl
      };
      
      await fs.writeFile(configPath, JSON.stringify(this.config, null, 2));
      
      // Initialize storage
      this.storage = createTaskStorage(this.projectPath, this.config.storage);
      
      // Migrate existing data
      console.log('📦 Migrating existing tasks to PouchDB...');
      const tasks = await this.storage.loadFromJSON();
      await this.storage.saveTasks(tasks);
      
      console.log('✅ PouchDB storage enabled successfully');
      return true;
      
    } catch (error) {
      console.error('❌ Failed to enable PouchDB:', error.message);
      return false;
    }
  }

  /**
   * Disable PouchDB storage (revert to JSON)
   */
  async disablePouchDB() {
    try {
      if (this.storage) {
        // Ensure final backup to JSON
        const tasks = await this.storage.loadTasks();
        await this.storage.saveToJSON(tasks);
        await this.storage.close();
        this.storage = null;
      }
      
      // Update config
      if (this.config.storage) {
        this.config.storage.enabled = false;
      }
      
      const configPath = path.join(this.projectPath, '.taskmaster', 'config.json');
      await fs.writeFile(configPath, JSON.stringify(this.config, null, 2));
      
      console.log('📄 Reverted to JSON storage');
      return true;
      
    } catch (error) {
      console.error('❌ Failed to disable PouchDB:', error.message);
      return false;
    }
  }

  /**
   * Get global project registry
   */
  async getGlobalProjects() {
    return await globalStorageRegistry.getAllProjects();
  }
}

/**
 * CLI Helper functions
 */

/**
 * Create wrapper for current project
 */
export async function createWrapper(projectPath = process.cwd()) {
  const wrapper = new TaskMasterWrapper(projectPath);
  await wrapper.init();
  return wrapper;
}

/**
 * Execute task-master command with PouchDB integration
 */
export async function executeWithPouchDB(command, args = [], projectPath = process.cwd()) {
  const wrapper = await createWrapper(projectPath);
  return await wrapper.execute(command, args);
}

/**
 * Batch execute multiple commands
 */
export async function executeBatch(commands, projectPath = process.cwd()) {
  const wrapper = await createWrapper(projectPath);
  const results = [];
  
  for (const { command, args = [] } of commands) {
    try {
      const result = await wrapper.execute(command, args);
      results.push({ command, args, success: true, result });
    } catch (error) {
      results.push({ command, args, success: false, error: error.message });
    }
  }
  
  return results;
}