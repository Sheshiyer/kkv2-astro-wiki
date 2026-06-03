#!/usr/bin/env node
/**
 * Route Smoke Test
 * 
 * Validates that built HTML pages contain expected content,
 * have no broken links, and surface artifacts correctly.
 * 
 * Usage: bun run build && node scripts/smoke-routes.mjs
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const DIST_DIR = 'dist';
const REQUIRED_ROUTES = [
  'en/index.html',
  'en/docs/product/overview/index.html',
  'en/docs/research/notebooklm-artifacts/index.html',
  'en/docs/brand/visual-guidelines/index.html',
  'en/docs/marketing/campaign-copy/index.html'
];

let exitCode = 0;
const errors = [];
const warnings = [];

function assert(condition, message, isWarning = false) {
  if (!condition) {
    if (isWarning) {
      warnings.push(`⚠️  ${message}`);
    } else {
      errors.push(`❌ ${message}`);
      exitCode = 1;
    }
  } else {
    console.log(`✅ ${message}`);
  }
}

function findHtmlFiles(dir, files = []) {
  const items = readdirSync(dir);
  for (const item of items) {
    const path = join(dir, item);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      findHtmlFiles(path, files);
    } else if (item.endsWith('.html')) {
      files.push(path);
    }
  }
  return files;
}

function extractLinks(html) {
  const links = [];
  const hrefRegex = /href="([^"]+)"/g;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    links.push(match[1]);
  }
  return links;
}

function isExternalOrSpecialHref(href) {
  return (
    href.startsWith('http') ||
    href.startsWith('//') ||
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  );
}

function requiresTrailingSlash(href) {
  if (isExternalOrSpecialHref(href)) return false;
  const pathOnly = href.split(/[?#]/)[0];
  if (!pathOnly || pathOnly.endsWith('/')) return false;
  const lastSegment = pathOnly.split('/').pop() || '';
  return !/\.[a-z0-9]{2,8}$/i.test(lastSegment);
}

function checkLink(href, sourceFile) {
  // Skip external links and anchors
  if (isExternalOrSpecialHref(href)) {
    return { valid: true, external: true };
  }
  
  // Get relative source directory from dist
  const relativeSource = sourceFile.replace(DIST_DIR + '/', '');
  const sourceDir = relativeSource.substring(0, relativeSource.lastIndexOf('/'));
  
  // Resolve relative paths
  let resolvedPath;
  if (href.startsWith('/')) {
    // Absolute path from dist root
    resolvedPath = href.slice(1);
  } else {
    // Relative path - resolve from source file directory
    resolvedPath = resolve(DIST_DIR, sourceDir, href).replace(DIST_DIR + '/', '');
  }
  
  // Check if file exists in dist
  try {
    const fullPath = join(DIST_DIR, resolvedPath);
    statSync(fullPath);
    return { valid: true };
  } catch {
    // Try with /index.html appended
    try {
      const fullPath = join(DIST_DIR, resolvedPath, 'index.html');
      statSync(fullPath);
      return { valid: true };
    } catch {
      return { valid: false, path: resolvedPath };
    }
  }
}

console.log('🔍 Running route smoke tests...\n');

// Check if dist exists
assert(existsSync(DIST_DIR), 'dist/ directory exists');

if (exitCode !== 0) {
  console.error('\n❌ Build output not found. Run "bun run build" first.');
  process.exit(1);
}

// Find all HTML files
const htmlFiles = findHtmlFiles(DIST_DIR);
console.log(`📄 Found ${htmlFiles.length} HTML files\n`);

// Check required routes
console.log('━━ Required Routes ━━');
for (const route of REQUIRED_ROUTES) {
  const exists = htmlFiles.some(f => f.endsWith(route));
  assert(exists, `Route exists: ${route}`);
}

// Check home page content
console.log('\n━━ Home Page Content ━━');
const homePath = htmlFiles.find(f => f.endsWith('en/index.html'));
if (homePath) {
  const homeHtml = readFileSync(homePath, 'utf8');
  
  assert(
    homeHtml.includes('Klear Karma'),
    'Home page contains brand name'
  );
  
  assert(
    homeHtml.includes('Reflect before you choose support') || homeHtml.includes('Reflection before transaction'),
    'Home page contains hero title'
  );
  
  assert(
    homeHtml.includes('notebooklm-artifacts') && homeHtml.includes('r2.dev/brand/'),
    'Home page references NotebookLM artifacts'
  );

  assert(
    !homeHtml.includes('src="/brand/') && !homeHtml.includes('src="/images/') && !homeHtml.includes('src="/notebooklm/'),
    'Home page does not render legacy local media paths'
  );
  
  assert(
    !homeHtml.includes('📄') && !homeHtml.includes('🎵') && !homeHtml.includes('🎨'),
    'Home page has no emoji UI icons'
  );
} else {
  errors.push('❌ Home page not found');
  exitCode = 1;
}

// Check artifact page content
console.log('\n━━ Artifact Page Content ━━');
const artifactPath = htmlFiles.find(f => f.includes('/en/docs/research/notebooklm-artifacts') || f.includes('/fr/docs/research/notebooklm-artifacts'));
if (artifactPath) {
  const artifactHtml = readFileSync(artifactPath, 'utf8');
  
  assert(
    artifactHtml.includes('r2.dev/artifacts'),
    'Artifact page references hosted NotebookLM files'
  );

  assert(
    !artifactHtml.includes('r2.dev/artifacts/\u0001') && !artifactHtml.includes('src="/notebooklm/') && !artifactHtml.includes('href="/notebooklm/'),
    'Artifact page has no legacy or malformed NotebookLM media paths'
  );
  
  assert(
    artifactHtml.includes('report') || artifactHtml.includes('deck') || artifactHtml.includes('audio'),
    'Artifact page mentions artifact types'
  );
} else {
  errors.push('❌ Artifact page not found');
  exitCode = 1;
}

// Check all internal links
console.log('\n━━ Link Validation ━━');
let totalLinks = 0;
let brokenLinks = 0;
let missingTrailingSlashLinks = 0;
const checkedPaths = new Set();

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const links = extractLinks(html);
  
  for (const link of links) {
    const cacheKey = `${file}::${link}`;
    if (checkedPaths.has(cacheKey)) continue;
    checkedPaths.add(cacheKey);

    if (requiresTrailingSlash(link)) {
      missingTrailingSlashLinks++;
      const relativeFile = file.replace(DIST_DIR + '/', '');
      errors.push(`❌ Missing trailing slash in ${relativeFile}: ${link}`);
      exitCode = 1;
    }
    
    const result = checkLink(link, file);
    totalLinks++;
    
    if (!result.valid) {
      brokenLinks++;
      const relativeFile = file.replace(DIST_DIR + '/', '');
      errors.push(`❌ Broken link in ${relativeFile}: ${link} (resolved to: ${result.path})`);
      exitCode = 1;
    }
  }
}

assert(
  brokenLinks === 0,
  `All internal links valid (${totalLinks} checked, ${brokenLinks} broken)`
);

assert(
  missingTrailingSlashLinks === 0,
  `All extensionless internal links include trailing slash (${missingTrailingSlashLinks} missing)`
);

// Check for empty content areas
console.log('\n━━ Content Validation ━━');
// Only check actual locale pages, skip redirect pages at root level
const contentPages = htmlFiles.filter(f => f.includes('/en/docs/') || f.includes('/fr/docs/'));
let emptyPages = 0;

for (const page of contentPages) {
  const html = readFileSync(page, 'utf8');
  // Check if body has meaningful content (not just nav/footer)
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    // Remove script and style tags before calculating content
    let bodyContent = bodyMatch[1];
    bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');
    bodyContent = bodyContent.replace(/<style[\s\S]*?<\/style>/gi, '');
    bodyContent = bodyContent.replace(/<[^>]+>/g, '').trim();
    if (bodyContent.length < 100) {
      const relativePage = page.replace(DIST_DIR + '/', '');
      warnings.push(`⚠️  Page may have minimal content: ${relativePage}`);
      emptyPages++;
    }
  }
}

assert(
  emptyPages === 0,
  `All content pages have substantial content`
);

// === SUMMARY ===
console.log('\n━━ Summary ━━');
console.log(`HTML files: ${htmlFiles.length}`);
console.log(`Links checked: ${totalLinks}`);
console.log(`Broken links: ${brokenLinks}`);
console.log(`Missing trailing slashes: ${missingTrailingSlashLinks}`);

if (warnings.length > 0) {
  console.log(`\n⚠️  Warnings (${warnings.length}):`);
  warnings.forEach(w => console.log(`  ${w}`));
}

if (errors.length > 0) {
  console.log(`\n❌ Errors (${errors.length}):`);
  errors.forEach(e => console.log(`  ${e}`));
  console.log('\n❌ Route smoke tests FAILED');
  process.exit(1);
} else {
  console.log('\n✅ Route smoke tests PASSED');
  process.exit(0);
}
