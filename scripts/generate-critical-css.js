#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

// Configuration for different viewport sizes
const configurations = [
  {
    name: 'mobile',
    width: 375,
    height: 667,
    output: 'critical-mobile.css'
  },
  {
    name: 'tablet',
    width: 768,
    height: 1024,
    output: 'critical-tablet.css'
  },
  {
    name: 'desktop',
    width: 1200,
    height: 800,
    output: 'critical-desktop.css'
  }
];

async function generateCriticalCSS() {
  console.log('🚀 Starting Critical CSS generation...');
  
  try {
    // Dynamic import of critical package
    const critical = await import('critical');
    // Read the built HTML file
    const htmlPath = resolve(projectRoot, 'dist/index.html');
    const html = readFileSync(htmlPath, 'utf8');
    
    // Extract CSS file path from HTML
    const cssMatch = html.match(/href="([^"]*\.css)"/);
    if (!cssMatch) {
      throw new Error('Could not find CSS file in HTML');
    }
    
    const cssPath = resolve(projectRoot, 'dist', cssMatch[1]);
    console.log(`📄 Found CSS file: ${cssPath}`);
    
    const results = [];
    
    // Generate critical CSS for each viewport
    for (const config of configurations) {
      console.log(`⚡ Generating critical CSS for ${config.name} (${config.width}x${config.height})`);
      
      try {
        const result = await critical.generate({
          inline: false,
          base: resolve(projectRoot, 'dist'),
          src: 'index.html',
          css: [cssPath],
          target: {
            css: config.output,
            html: `index-${config.name}.html`
          },
          width: config.width,
          height: config.height,
          extract: false, // Don't remove critical CSS from main file
          ignore: {
            atrule: ['@font-face', '@import'],
            rule: [/\.sr-only/], // Skip screen reader only classes
            decl: (node, value) => {
              // Skip certain declarations that might cause issues
              return /url\(/.test(value) && !/data:/.test(value);
            }
          },
          penthouse: {
            timeout: 30000,
            // Additional penthouse options for better reliability
            forceInclude: [
              // Force include important utility classes
              '.container',
              '.mx-auto',
              '.text-center',
              '.flex',
              '.items-center',
              '.justify-center',
              // Include critical Tailwind base styles
              'html',
              'body',
              '*',
              '*::before',
              '*::after'
            ]
          }
        });
        
        const criticalCSS = result.css;
        const outputPath = resolve(projectRoot, 'dist', config.output);
        
        // Write critical CSS to file
        writeFileSync(outputPath, criticalCSS);
        
        results.push({
          viewport: config.name,
          size: criticalCSS.length,
          file: config.output,
          dimensions: `${config.width}x${config.height}`
        });
        
        console.log(`✅ ${config.name}: ${(criticalCSS.length / 1024).toFixed(2)} KB`);
        
      } catch (error) {
        console.error(`❌ Error generating critical CSS for ${config.name}:`, error.message);
      }
    }
    
    // Generate a combined critical CSS file with media queries
    console.log('🎯 Creating combined critical CSS with media queries...');
    
    let combinedCSS = '';
    
    for (const result of results) {
      if (result.viewport === 'mobile') {
        // Mobile styles without media query (mobile-first)
        const mobileCSS = readFileSync(resolve(projectRoot, 'dist', result.file), 'utf8');
        combinedCSS += mobileCSS + '\n';
      } else if (result.viewport === 'tablet') {
        // Tablet styles with media query
        const tabletCSS = readFileSync(resolve(projectRoot, 'dist', result.file), 'utf8');
        combinedCSS += `@media (min-width: 768px) {\n${tabletCSS}\n}\n`;
      } else if (result.viewport === 'desktop') {
        // Desktop styles with media query
        const desktopCSS = readFileSync(resolve(projectRoot, 'dist', result.file), 'utf8');
        combinedCSS += `@media (min-width: 1200px) {\n${desktopCSS}\n}\n`;
      }
    }
    
    // Write combined critical CSS
    const combinedPath = resolve(projectRoot, 'dist/critical-combined.css');
    writeFileSync(combinedPath, combinedCSS);
    
    console.log(`🎉 Combined critical CSS: ${(combinedCSS.length / 1024).toFixed(2)} KB`);
    
    // Generate report
    const report = {
      timestamp: new Date().toISOString(),
      viewports: results,
      combinedSize: combinedCSS.length,
      combinedSizeKB: (combinedCSS.length / 1024).toFixed(2)
    };
    
    writeFileSync(
      resolve(projectRoot, 'critical-css-report.json'), 
      JSON.stringify(report, null, 2)
    );
    
    console.log('\n📊 Critical CSS Generation Report:');
    console.log('====================================');
    results.forEach(result => {
      console.log(`${result.viewport.padEnd(8)}: ${(result.size / 1024).toFixed(2).padStart(6)} KB (${result.dimensions})`);
    });
    console.log(`Combined : ${report.combinedSizeKB.padStart(6)} KB`);
    console.log('====================================');
    
    console.log('\n🔧 Next steps:');
    console.log('1. Use critical-combined.css for inline injection');
    console.log('2. Update HTML to preload main CSS file');
    console.log('3. Test FCP improvements');
    
  } catch (error) {
    console.error('❌ Critical CSS generation failed:', error);
    process.exit(1);
  }
}

// Run the generation
generateCriticalCSS().catch(console.error);