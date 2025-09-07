#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

// Critical CSS selectors that should be inlined
const criticalSelectors = [
  // Base HTML & body styles
  'html', 'body', '*', '*::before', '*::after',
  
  // Critical layout classes (above the fold)
  '.min-h-screen', '.flex', '.flex-col', '.items-center', '.justify-center',
  '.container', '.mx-auto', '.px-4', '.py-8', '.py-16', '.py-24',
  
  // Header and navigation (always visible)
  'header', 'nav', '.header', '.nav', '.navigation',
  '.sticky', '.fixed', '.top-0', '.z-50',
  
  // Typography for hero section
  '.text-4xl', '.text-5xl', '.text-6xl',
  '.text-xl', '.text-2xl', '.text-3xl',
  '.font-bold', '.font-semibold', '.font-medium',
  '.text-center', '.text-left',
  '.leading-tight', '.leading-relaxed',
  
  // Colors for critical elements
  '.text-white', '.text-black', '.text-gray-900', '.text-gray-800',
  '.bg-white', '.bg-black', '.bg-gray-900', '.bg-gray-100',
  '.text-primary', '.bg-primary',
  
  // Critical spacing
  '.mb-4', '.mb-6', '.mb-8', '.mt-4', '.mt-6', '.mt-8',
  '.space-y-4', '.space-y-6', '.space-y-8',
  '.gap-4', '.gap-6', '.gap-8',
  
  // Button styles (for CTA)
  '.btn', 'button', '.button',
  '.bg-blue-600', '.bg-blue-700', '.hover\\:bg-blue-700',
  '.px-6', '.py-3', '.rounded', '.rounded-md', '.rounded-lg',
  
  // Hide/show utilities
  '.hidden', '.block', '.inline', '.inline-block',
  '.sr-only',
  
  // Grid and flex utilities
  '.grid', '.grid-cols-1', '.grid-cols-2', '.grid-cols-3',
  '.flex-wrap', '.flex-nowrap',
  
  // Responsive breakpoints (mobile-first critical)
  '@media (min-width: 640px)',
  '@media (min-width: 768px)',
  
  // Tailwind base styles
  '.prose', '.prose-lg', '.prose-xl',
  
  // Component-specific critical styles
  '.hero', '.hero-section', '.landing',
  '.card', '.card-header', '.card-content',
  
  // Form elements that might be above fold
  'input', 'textarea', 'select', 'form',
  '.form-control', '.form-group',
  
  // Animation classes for performance (prevent layout shift)
  '.transition', '.transition-all', '.transition-colors',
  '.duration-200', '.duration-300',
  
  // Loading states
  '.loading', '.skeleton', '.spinner'
];

function extractCriticalCSS(cssContent) {
  console.log('🔍 Extracting critical CSS from main stylesheet...');
  
  const lines = cssContent.split('\n');
  const criticalCSS = [];
  let insideRule = false;
  let currentRule = '';
  let braceCount = 0;
  
  for (let line of lines) {
    const trimmedLine = line.trim();
    
    // Count braces to track rule boundaries
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;
    braceCount += openBraces - closeBraces;
    
    // Check if this line starts a rule
    if (!insideRule && trimmedLine && !trimmedLine.startsWith('/*')) {
      insideRule = true;
      currentRule = line;
    } else if (insideRule) {
      currentRule += '\n' + line;
    }
    
    // Rule is complete when braces are balanced
    if (insideRule && braceCount === 0) {
      // Check if this rule contains critical selectors
      const isCritical = criticalSelectors.some(selector => {
        if (selector.startsWith('@media')) {
          return currentRule.includes(selector);
        } else if (selector.includes('\\:')) {
          // Handle escaped selectors like hover\:bg-blue-700
          const unescaped = selector.replace('\\:', ':');
          return currentRule.includes(unescaped) || currentRule.includes(selector);
        } else {
          return currentRule.includes(selector);
        }
      });
      
      if (isCritical) {
        criticalCSS.push(currentRule);
      }
      
      // Reset for next rule
      insideRule = false;
      currentRule = '';
    }
  }
  
  return criticalCSS.join('\n\n');
}

function minifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    // Remove whitespace around braces and semicolons
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*;\s*/g, ';')
    .replace(/\s*,\s*/g, ',')
    .replace(/\s*:\s*/g, ':')
    // Remove trailing semicolons before }
    .replace(/;}/g, '}')
    .trim();
}

async function extractCriticalCSSMain() {
  console.log('🚀 Starting Critical CSS extraction...');
  
  try {
    // Read the built CSS file
    const htmlPath = resolve(projectRoot, 'dist/index.html');
    const html = readFileSync(htmlPath, 'utf8');
    
    // Extract CSS file path from HTML
    const cssMatch = html.match(/href="([^"]*\.css)"/);
    if (!cssMatch) {
      throw new Error('Could not find CSS file in HTML');
    }
    
    const cssPath = resolve(projectRoot, 'dist', cssMatch[1].replace(/^\//, ''));
    console.log(`📄 Found CSS file: ${cssPath}`);
    
    const cssContent = readFileSync(cssPath, 'utf8');
    console.log(`📊 Original CSS size: ${(cssContent.length / 1024).toFixed(2)} KB`);
    
    // Extract critical CSS
    const criticalCSS = extractCriticalCSS(cssContent);
    console.log(`✂️  Critical CSS extracted: ${(criticalCSS.length / 1024).toFixed(2)} KB`);
    
    // Minify critical CSS
    const minifiedCritical = minifyCSS(criticalCSS);
    console.log(`🗜️  Minified critical CSS: ${(minifiedCritical.length / 1024).toFixed(2)} KB`);
    
    // Write critical CSS files
    const criticalPath = resolve(projectRoot, 'dist/critical.css');
    const criticalMinPath = resolve(projectRoot, 'dist/critical.min.css');
    
    writeFileSync(criticalPath, criticalCSS);
    writeFileSync(criticalMinPath, minifiedCritical);
    
    // Create inline CSS for HTML injection
    const inlineCSS = `<style>${minifiedCritical}</style>`;
    
    // Generate report
    const report = {
      timestamp: new Date().toISOString(),
      originalSize: cssContent.length,
      originalSizeKB: (cssContent.length / 1024).toFixed(2),
      criticalSize: criticalCSS.length,
      criticalSizeKB: (criticalCSS.length / 1024).toFixed(2),
      minifiedSize: minifiedCritical.length,
      minifiedSizeKB: (minifiedCritical.length / 1024).toFixed(2),
      compressionRatio: ((1 - minifiedCritical.length / cssContent.length) * 100).toFixed(1),
      inlineHTML: inlineCSS
    };
    
    writeFileSync(
      resolve(projectRoot, 'critical-css-report.json'), 
      JSON.stringify(report, null, 2)
    );
    
    console.log('\n📊 Critical CSS Extraction Report:');
    console.log('=====================================');
    console.log(`Original CSS    : ${report.originalSizeKB} KB`);
    console.log(`Critical CSS    : ${report.criticalSizeKB} KB`);
    console.log(`Minified Critical: ${report.minifiedSizeKB} KB`);
    console.log(`Compression     : ${report.compressionRatio}%`);
    console.log('=====================================');
    
    console.log('\n📝 Files generated:');
    console.log('• dist/critical.css - Full critical CSS');
    console.log('• dist/critical.min.css - Minified critical CSS');
    console.log('• critical-css-report.json - Detailed report');
    
    console.log('\n🔧 Next steps:');
    console.log('1. Inject critical.min.css inline in <head>');
    console.log('2. Load main CSS with rel="preload" then rel="stylesheet"');
    console.log('3. Test FCP improvements');
    
    console.log('\n💡 Usage:');
    console.log(`Add to <head>: ${inlineCSS.substring(0, 50)}...`);
    
  } catch (error) {
    console.error('❌ Critical CSS extraction failed:', error);
    process.exit(1);
  }
}

// Run the extraction
extractCriticalCSSMain().catch(console.error);