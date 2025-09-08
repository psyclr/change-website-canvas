/**
 * PouchDB Storage Adapter for task-master
 * Provides database storage with offline-first capabilities and optional sync
 */

import PouchDB from 'pouchdb';
import PouchDBAdapterHTTP from 'pouchdb-adapter-http';
import PouchDBAdapterLevelDB from 'pouchdb-adapter-leveldb';
import fs from 'fs/promises';
import path from 'path';

// Register adapters
PouchDB.plugin(PouchDBAdapterHTTP);
PouchDB.plugin(PouchDBAdapterLevelDB);

export class PouchTaskStorage {
  constructor(projectPath, config = {}) {
    this.projectPath = projectPath;
    this.dbPath = path.join(projectPath, '.taskmaster', 'pouchdb');
    this.jsonPath = path.join(projectPath, '.taskmaster', 'tasks', 'tasks.json');
    
    // PouchDB instance
    this.db = new PouchDB(this.dbPath, {
      adapter: 'leveldb',
      auto_compaction: true
    });
    
    // Optional remote sync
    this.remoteUrl = config.syncUrl || process.env.TASKMASTER_SYNC_URL;
    this.syncEnabled = Boolean(this.remoteUrl);
    
    // Cache for performance
    this.cache = null;
    this.lastCacheTime = 0;
    this.cacheTimeout = 5000; // 5 seconds
    
    console.log(`📚 PouchDB initialized at: ${this.dbPath}`);
    if (this.syncEnabled) {
      console.log(`🔄 Sync enabled to: ${this.remoteUrl}`);
    }
  }

  /**
   * Load tasks from PouchDB with fallback to JSON file
   */
  async loadTasks() {
    try {
      // Check cache first
      const now = Date.now();
      if (this.cache && (now - this.lastCacheTime) < this.cacheTimeout) {
        console.log('📋 Using cached tasks');
        return this.cache;
      }

      // Try to load from PouchDB
      const doc = await this.db.get('tasks').catch(() => null);
      
      if (doc) {
        console.log('📚 Loaded tasks from PouchDB');
        this.cache = doc.data;
        this.lastCacheTime = now;
        return doc.data;
      }

      // Fallback: migrate from JSON file
      console.log('📄 Migrating from JSON file...');
      const jsonData = await this.loadFromJSON();
      
      if (jsonData && Object.keys(jsonData).length > 0) {
        await this.saveTasks(jsonData);
        console.log('✅ Migration completed');
        return jsonData;
      }

      // Return empty structure if nothing exists
      console.log('🆕 Creating new task structure');
      return {};
      
    } catch (error) {
      console.error('❌ Error loading tasks:', error.message);
      // Fallback to JSON on any error
      return await this.loadFromJSON();
    }
  }

  /**
   * Save tasks to PouchDB with JSON backup
   */
  async saveTasks(tasks) {
    try {
      // Get existing doc or create new
      const doc = await this.db.get('tasks').catch(() => ({ _id: 'tasks' }));
      
      // Update document
      doc.data = tasks;
      doc.updated_at = new Date().toISOString();
      doc.project_path = this.projectPath;
      
      // Save to PouchDB
      await this.db.put(doc);
      console.log('💾 Tasks saved to PouchDB');
      
      // Update cache
      this.cache = tasks;
      this.lastCacheTime = Date.now();
      
      // Backup to JSON (for compatibility)
      await this.saveToJSON(tasks);
      
      // Sync if enabled
      if (this.syncEnabled) {
        this.sync().catch(err => 
          console.warn('⚠️ Sync failed:', err.message)
        );
      }
      
      return true;
      
    } catch (error) {
      console.error('❌ Error saving tasks:', error.message);
      // Fallback: save to JSON only
      return await this.saveToJSON(tasks);
    }
  }

  /**
   * Load tasks from JSON file (fallback/migration)
   */
  async loadFromJSON() {
    try {
      const data = await fs.readFile(this.jsonPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.warn('⚠️ Error reading JSON file:', error.message);
      }
      return {};
    }
  }

  /**
   * Save tasks to JSON file (backup/compatibility)
   */
  async saveToJSON(tasks) {
    try {
      await fs.mkdir(path.dirname(this.jsonPath), { recursive: true });
      await fs.writeFile(this.jsonPath, JSON.stringify(tasks, null, 2));
      console.log('📄 Backup saved to JSON');
      return true;
    } catch (error) {
      console.error('❌ Error writing JSON backup:', error.message);
      return false;
    }
  }

  /**
   * Sync with remote CouchDB (if configured)
   */
  async sync() {
    if (!this.syncEnabled) {
      console.log('🔄 Sync not enabled');
      return;
    }

    try {
      console.log('🔄 Starting sync...');
      const result = await this.db.sync(this.remoteUrl, {
        live: false,
        retry: false
      });
      
      console.log('✅ Sync completed:', {
        push: result.push?.docs_written || 0,
        pull: result.pull?.docs_written || 0
      });
      
      return result;
      
    } catch (error) {
      console.error('❌ Sync error:', error.message);
      throw error;
    }
  }

  /**
   * Get sync status and statistics
   */
  async getStats() {
    try {
      const info = await this.db.info();
      const tasksDoc = await this.db.get('tasks').catch(() => null);
      
      return {
        database: {
          name: info.db_name,
          docs: info.doc_count,
          size: info.data_size,
          update_seq: info.update_seq
        },
        tasks: {
          exists: Boolean(tasksDoc),
          last_updated: tasksDoc?.updated_at || null,
          project_path: tasksDoc?.project_path || null
        },
        sync: {
          enabled: this.syncEnabled,
          remote_url: this.remoteUrl || null
        },
        cache: {
          active: Boolean(this.cache),
          age_ms: this.cache ? Date.now() - this.lastCacheTime : null
        }
      };
    } catch (error) {
      console.error('❌ Error getting stats:', error.message);
      return { error: error.message };
    }
  }

  /**
   * Close database connection
   */
  async close() {
    try {
      await this.db.close();
      console.log('📚 PouchDB connection closed');
    } catch (error) {
      console.error('❌ Error closing database:', error.message);
    }
  }

  /**
   * Force full sync and clear cache
   */
  async refresh() {
    this.cache = null;
    this.lastCacheTime = 0;
    
    if (this.syncEnabled) {
      await this.sync();
    }
    
    return await this.loadTasks();
  }
}

/**
 * Factory function to create storage instance
 */
export function createTaskStorage(projectPath, config = {}) {
  return new PouchTaskStorage(projectPath, config);
}

/**
 * Global storage registry for cross-project access
 */
class GlobalStorageRegistry {
  constructor() {
    this.instances = new Map();
  }

  getStorage(projectPath, config = {}) {
    if (!this.instances.has(projectPath)) {
      this.instances.set(projectPath, new PouchTaskStorage(projectPath, config));
    }
    return this.instances.get(projectPath);
  }

  async getAllProjects() {
    const projects = [];
    for (const [path, storage] of this.instances) {
      const stats = await storage.getStats();
      projects.push({
        path,
        ...stats
      });
    }
    return projects;
  }

  async closeAll() {
    for (const storage of this.instances.values()) {
      await storage.close();
    }
    this.instances.clear();
  }
}

export const globalStorageRegistry = new GlobalStorageRegistry();