#!/usr/bin/env node

/**
 * Demo script for PouchDB Task-Master integration
 * Shows how to use the adapter and demonstrates features
 */

import { createTaskStorage, globalStorageRegistry } from './storage.js';
import { createWrapper } from './wrapper.js';

async function runDemo() {
  console.log('🚀 PouchDB Task-Master Integration Demo\n');
  
  const projectPath = process.cwd();
  
  try {
    // 1. Test storage initialization
    console.log('1️⃣ Testing storage initialization...');
    const storage = createTaskStorage(projectPath);
    
    // 2. Load existing tasks
    console.log('2️⃣ Loading existing tasks...');
    const tasks = await storage.loadTasks();
    console.log(`   📋 Loaded ${Object.keys(tasks).length} tags`);
    
    // 3. Show statistics
    console.log('3️⃣ Database statistics...');
    const stats = await storage.getStats();
    console.log('   📊 Stats:', JSON.stringify(stats, null, 2));
    
    // 4. Test backup to JSON
    console.log('4️⃣ Testing JSON backup...');
    await storage.saveToJSON(tasks);
    console.log('   ✅ JSON backup completed');
    
    // 5. Test wrapper functionality
    console.log('5️⃣ Testing command wrapper...');
    const wrapper = await createWrapper(projectPath);
    const wrapperStats = await wrapper.getStats();
    console.log('   🔧 Wrapper stats:', JSON.stringify(wrapperStats, null, 2));
    
    // 6. Demonstrate global registry
    console.log('6️⃣ Testing global registry...');
    const projects = await globalStorageRegistry.getAllProjects();
    console.log(`   🌍 Found ${projects.length} projects in registry`);
    
    // 7. Test task manipulation (if tasks exist)
    const firstTag = Object.keys(tasks)[0];
    if (firstTag && tasks[firstTag]?.tasks?.length > 0) {
      console.log(`7️⃣ Testing with tag: ${firstTag}`);
      console.log(`   📝 Tasks in tag: ${tasks[firstTag].tasks.length}`);
      
      const firstTask = tasks[firstTag].tasks[0];
      console.log(`   🎯 First task: "${firstTask.title}" (Status: ${firstTask.status})`);
    } else {
      console.log('7️⃣ No tasks found to demonstrate with');
    }
    
    console.log('\n✅ Demo completed successfully!');
    console.log('\n🎯 Next steps:');
    console.log('   1. Run: node .taskmaster/pouchdb-adapter/cli.js enable');
    console.log('   2. Run: node .taskmaster/pouchdb-adapter/cli.js stats');
    console.log('   3. Use: node .taskmaster/pouchdb-adapter/cli.js list');
    
  } catch (error) {
    console.error('❌ Demo failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Performance test
async function performanceTest() {
  console.log('\n⚡ Performance Test\n');
  
  const storage = createTaskStorage(process.cwd());
  const iterations = 10;
  
  // Test load performance
  console.log(`📚 Testing load performance (${iterations} iterations)...`);
  const loadStart = Date.now();
  
  for (let i = 0; i < iterations; i++) {
    await storage.loadTasks();
  }
  
  const loadTime = Date.now() - loadStart;
  console.log(`   ⏱️  Average load time: ${(loadTime / iterations).toFixed(2)}ms`);
  
  // Test save performance 
  console.log(`💾 Testing save performance (${iterations} iterations)...`);
  const tasks = await storage.loadTasks();
  const saveStart = Date.now();
  
  for (let i = 0; i < iterations; i++) {
    await storage.saveTasks(tasks);
  }
  
  const saveTime = Date.now() - saveStart;
  console.log(`   ⏱️  Average save time: ${(saveTime / iterations).toFixed(2)}ms`);
  
  console.log('\n📊 Performance Summary:');
  console.log(`   📖 Load: ${(loadTime / iterations).toFixed(2)}ms avg`);
  console.log(`   💾 Save: ${(saveTime / iterations).toFixed(2)}ms avg`);
}

// Run demo based on command line args
const args = process.argv.slice(2);

if (args.includes('--performance') || args.includes('-p')) {
  await performanceTest();
} else {
  await runDemo();
  
  if (args.includes('--full') || args.includes('-f')) {
    await performanceTest();
  }
}