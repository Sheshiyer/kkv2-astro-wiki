#!/usr/bin/env node
/**
 * Data Contract Verification Script
 * 
 * Validates that site-data.json and artifacts.json meet the minimum
 * requirements for the wiki to function correctly.
 * 
 * Usage: node scripts/verify-site-data.mjs
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const DATA_DIR = 'src/data';
const PUBLIC_DIR = 'public';
const R2_BASE = 'https://pub-dba2c40f6183450a9bfc05eeb62b7837.r2.dev';
const LEGACY_LOCAL_ASSET_PREFIXES = ['/brand/', '/images/', '/notebooklm/'];

let exitCode = 0;
const errors = [];
const warnings = [];
let passedChecks = 0;

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
    passedChecks++;
  }
}

function isR2Url(value) {
  return typeof value === 'string' && value.startsWith(`${R2_BASE}/`);
}

function isLegacyLocalAsset(value) {
  return typeof value === 'string' && LEGACY_LOCAL_ASSET_PREFIXES.some((prefix) => value.startsWith(prefix));
}

function assertHostedAsset(value, label, isWarning = false) {
  assert(
    !isLegacyLocalAsset(value),
    `${label} does not use legacy local asset paths`,
    isWarning
  );

  assert(
    isR2Url(value),
    `${label} is hosted on configured R2 bucket`,
    isWarning
  );
}

console.log('🔍 Verifying site data contract...\n');

// Load site-data.json
let siteData;
try {
  siteData = JSON.parse(readFileSync(join(DATA_DIR, 'site-data.json'), 'utf8'));
  console.log('📄 Loaded site-data.json');
} catch (e) {
  console.error('❌ Failed to load site-data.json:', e.message);
  process.exit(1);
}

// Load artifacts.json
let artifacts;
try {
  artifacts = JSON.parse(readFileSync(join(DATA_DIR, 'artifacts.json'), 'utf8'));
  console.log('📄 Loaded artifacts.json\n');
} catch (e) {
  console.error('❌ Failed to load artifacts.json:', e.message);
  process.exit(1);
}

// === SITE DATA CHECKS ===
console.log('━━ Site Data Checks ━━');

assert(
  siteData.brandName && siteData.brandName.length > 0,
  'brandName is present'
);

assert(
  siteData.heroTitle && siteData.heroTitle.length > 0,
  'heroTitle is present'
);

assert(
  siteData.heroSubtitle && siteData.heroSubtitle.length > 0,
  'heroSubtitle is present'
);

assert(
  siteData.storyPillars && siteData.storyPillars.length >= 3,
  `storyPillars has at least 3 items (found ${siteData.storyPillars?.length || 0})`
);

assert(
  siteData.notebooklmHighlights && siteData.notebooklmHighlights.length >= 4,
  `notebooklmHighlights has at least 4 items (found ${siteData.notebooklmHighlights?.length || 0})`
);

assert(
  siteData.visualHighlights && siteData.visualHighlights.length >= 3,
  `visualHighlights has at least 3 items (found ${siteData.visualHighlights?.length || 0})`,
  true // warning only
);

assert(
  siteData.metrics && siteData.metrics.some(m => m.label === 'Free Mirror tokens'),
  'metrics includes "Free Mirror tokens"'
);

const artifactMetric = siteData.metrics?.find(m => m.label === 'Artifact records');
if (artifactMetric) {
  assert(
    artifactMetric.value === String(artifacts.totalCount),
    `Artifact records metric matches artifacts.totalCount (${artifactMetric.value}/${artifacts.totalCount})`,
    true // warning only
  );
}

console.log('\n━━ Hosted Asset Checks ━━');

assertHostedAsset(siteData.brandMarkImage, 'brandMarkImage');
assertHostedAsset(siteData.heroImage, 'heroImage');

for (const [index, item] of (siteData.visualHighlights || []).entries()) {
  if (item.image) {
    assertHostedAsset(item.image, `visualHighlights[${index}].image`);
  }
}

for (const [index, item] of (siteData.notebooklmHighlights || []).entries()) {
  if (item.image) {
    assertHostedAsset(item.image, `notebooklmHighlights[${index}].image`);
  }

  if (item.downloadHref) {
    assertHostedAsset(item.downloadHref, `notebooklmHighlights[${index}].downloadHref`);
  }
}

// === ARTIFACT CHECKS ===
console.log('\n━━ Artifact Checks ━━');

assert(
  artifacts.totalCount === artifacts.artifacts?.length,
  `totalCount matches artifacts array length (${artifacts.totalCount}/${artifacts.artifacts?.length || 0})`
);

assert(
  artifacts.artifacts && artifacts.artifacts.length >= 23,
  `artifacts array has at least 23 items (found ${artifacts.artifacts?.length || 0})`
);

// Verify each artifact
let existingFiles = 0;
let missingFiles = 0;

for (const artifact of artifacts.artifacts) {
  const isRemote = /^https?:\/\//.test(artifact.href);
  const filePath = isRemote ? artifact.href : join(PUBLIC_DIR, artifact.href.replace(/^\//, ''));
  const exists = isRemote || existsSync(filePath);

  assertHostedAsset(artifact.href, `artifact ${artifact.id} href`);
  
  if (exists) {
    existingFiles++;
  } else {
    missingFiles++;
    errors.push(`❌ Missing file: ${artifact.href} (${artifact.title})`);
    exitCode = 1;
  }
  
  // Check thumbnail if present
  if (artifact.thumbnail) {
    const thumbIsRemote = /^https?:\/\//.test(artifact.thumbnail);
    const thumbPath = thumbIsRemote ? artifact.thumbnail : join(PUBLIC_DIR, artifact.thumbnail.replace(/^\//, ''));
    assertHostedAsset(artifact.thumbnail, `artifact ${artifact.id} thumbnail`, true);
    if (!thumbIsRemote && !existsSync(thumbPath)) {
      warnings.push(`⚠️  Missing thumbnail: ${artifact.thumbnail} for ${artifact.id}`);
    }
  }
}

assert(
  missingFiles === 0,
  `All artifact file references are resolvable (${existingFiles}/${artifacts.artifacts.length})`
);

// === TYPE COUNTS ===
console.log('\n━━ Type Distribution ━━');
const expectedTypes = {
  report: 3,
  infographic: 6,
  slideDeck: 4,
  audio: 4,
  video: 2,
  dataTable: 3,
  flashcard: 2,
  quiz: 2,
  mindMap: 1
};

for (const [type, expected] of Object.entries(expectedTypes)) {
  const actual = artifacts.byType?.[type] || 0;
  assert(
    actual === expected,
    `${type}: ${actual} (expected ${expected})`
  );
}

// === SUMMARY ===
console.log('\n━━ Summary ━━');
console.log(`Total checks passed: ${passedChecks}`);

if (warnings.length > 0) {
  console.log(`\n⚠️  Warnings (${warnings.length}):`);
  warnings.forEach(w => console.log(`  ${w}`));
}

if (errors.length > 0) {
  console.log(`\n❌ Errors (${errors.length}):`);
  errors.forEach(e => console.log(`  ${e}`));
  console.log('\n❌ Data contract verification FAILED');
  process.exit(1);
} else {
  console.log('\n✅ Data contract verification PASSED');
  process.exit(0);
}
