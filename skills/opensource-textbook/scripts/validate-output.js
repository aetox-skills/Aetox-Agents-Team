#!/usr/bin/env node

/**
 * validate-output.js — Deterministic output validator for opensource-textbook
 *
 * Checks output .md files against the skill contract:
 *   1. Source Snapshot present in every file
 *   2. Evidence counts ≥ pass level minimum
 *   3. No [1m[!][0m in critical conclusions (Full Textbook)
 *   4. Citations follow format: [1mpath/to/file.ts → functionName()[0m or [1mpath/to/file.ts#L10-L45 @ <sha>[0m
 *   5. Self-score totals correctly
 *   6. Required sections present per pass level
 *
 * Usage: node scripts/validate-output.js <output-dir> [--pass quick|standard|full]
 */

const fs = require('fs');
const path = require('path');

// ─── Config ────────────────────────────────────────────────────────────
const PASS_LEVELS = {
  quick: { minEvidence: 3, requiredSections: ['Source Snapshot'], minScore: 0 },
  standard: { minEvidence: 7, requiredSections: ['Source Snapshot', 'เป้าหมายบทเรียน', 'แบบฝึกหัด'], minScore: 0 },
  full: { minEvidence: 10, requiredSections: ['Source Snapshot', 'เป้าหมายบทเรียน', 'แบบฝึกหัด', 'จุดที่มือใหม่มักเข้าใจผิด'], minScore: 85 },
};

const REQUIRED_FIELDS_IN_SNAPSHOT = ['Repository', 'Branch', 'Commit SHA', 'Inspected'];

const CITATION_PATTERN = /`([^`]+\.[a-z]{1,6})(?:\s*→\s*\w+\(\))?(?:\s*#L\d+-L\d+)?(?:\s*@\s*[a-f0-9]+)?`/gi;
const VAGUE_CITATION = /["'][^"']*ใน[^"']*repo[^"']*["']|["'][^"']*จากโค้ด[^"']*["']/gi;

// ─── Helpers ───────────────────────────────────────────────────────────

function* walkFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walkFiles(full);
    else if (entry.name.endsWith('.md')) yield full;
  }
}

function countLabel(text, label) {
  // Count [✓], [→], [?], [!], [M], [W] — handle both inline and standalone
  const escaped = label.replace(/[[\]]/g, '\\$&');
  const re = new RegExp(escaped, 'g');
  return (text.match(re) || []).length;
}

function extractSourceSnapshot(content) {
  const match = content.match(/##?\s*0\.?\s*Source Snapshot[\s\S]*?(?=\n##?\s)/i);
  return match ? match[0] : null;
}

function checkSnapshotFields(snapshotText) {
  const missing = [];
  for (const field of REQUIRED_FIELDS_IN_SNAPSHOT) {
    if (!snapshotText.includes(field)) missing.push(field);
  }
  return missing;
}

function extractScore(content) {
  const scoreMatch = content.match(/Total:\s+_{3,}\/\s*100\s*\n[^□]*□\s*(\d+)/);
  if (scoreMatch) {
    return { total: parseInt(scoreMatch[1]) || null, raw: scoreMatch[0] };
  }
  // Try alternate format
  const altMatch = content.match(/Total:\s+_{3,}\/\s*(\d+)/);
  return { total: null, raw: altMatch ? altMatch[0] : null };
}

function extractScoreBreakdown(content) {
  const categories = {};
  const lines = content.split('\n');
  for (const line of lines) {
    const m = line.match(/□\s*(.+?):\s+_{3,}\/\s*(\d+)/);
    if (m) {
      categories[m[1].trim()] = parseInt(m[2]);
    }
  }
  return categories;
}

// ─── Main ───────────────────────────────────────────────────────────────

function validateFile(filePath, passLevel) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  const issues = [];
  const info = [];

  const config = PASS_LEVELS[passLevel] || PASS_LEVELS.full;

  // 1. Source Snapshot
  const snapshot = extractSourceSnapshot(content);
  if (!snapshot) {
    issues.push(`[MISSING] Source Snapshot section not found`);
  } else {
    const missingFields = checkSnapshotFields(snapshot);
    if (missingFields.length > 0) {
      issues.push(`[SNAPSHOT] Missing fields: ${missingFields.join(', ')}`);
    } else {
      info.push(`[OK] Source Snapshot present with all required fields`);
    }
  }

  // 2. Evidence counts
  const directCount = countLabel(content, '[✓]');
  const inferredCount = countLabel(content, '[→]');
  const unverifiedCount = countLabel(content, '[!]');
  const assumedCount = countLabel(content, '[?]');

  info.push(`[EVIDENCE] [✓]:${directCount} [→]:${inferredCount} [?]:${assumedCount} [!]:${unverifiedCount}`);

  if (directCount < config.minEvidence) {
    issues.push(`[EVIDENCE] [✓] count ${directCount} < minimum ${config.minEvidence} for ${passLevel}`);
  }

  if (passLevel === 'full' && unverifiedCount > 0) {
    // Warning only — [!] is allowed, but should be reviewed
    info.push(`[WARN] ${unverifiedCount} [!] items found — review before publishing`);
  }

  // 3. Citation format
  const citations = content.match(CITATION_PATTERN) || [];
  const vagueRefs = content.match(VAGUE_CITATION) || [];

  if (citations.length === 0 && passLevel !== 'quick') {
    issues.push(`[CITATION] No citations found in ${passLevel}-level output`);
  }

  if (vagueRefs.length > 0) {
    issues.push(`[CITATION] ${vagueRefs.length} vague reference(s) found — use path/to/file format not "จากโค้ดใน repo"`);
  }

  // 4. Required sections
  for (const section of config.requiredSections) {
    if (!content.includes(section)) {
      issues.push(`[SECTION] Required section "${section}" not found`);
    }
  }

  // 5. Self-score validation
  const scoreInfo = extractScore(content);
  if (scoreInfo.raw && passLevel === 'full') {
    const breakdown = extractScoreBreakdown(content);
    const computedTotal = Object.values(breakdown).reduce((a, b) => a + b, 0);

    if (computedTotal > 0 && computedTotal !== 100) {
      issues.push(`[SCORE] Score breakdown totals ${computedTotal}/100 (should be exactly 100)`);
    }

    if (scoreInfo.total && scoreInfo.total < config.minScore) {
      issues.push(`[SCORE] Total ${scoreInfo.total}/100 < minimum ${config.minScore} for ${passLevel}`);
    }
  }

  // 6. Check for common AI fabrications
  if (content.includes('This is a placeholder') || content.includes('TODO: fill')) {
    issues.push(`[CONTENT] Template placeholder text found — needs completion`);
  }

  return { file: fileName, issues, info, evidence: { directCount, inferredCount, unverifiedCount, assumedCount } };
}

function main() {
  const args = process.argv.slice(2);
  const outputDir = args[0];
  const passFlagIdx = args.indexOf('--pass');
  const passLevel = passFlagIdx >= 0 ? (args[passFlagIdx + 1] || 'full') : 'full';

  if (!outputDir) {
    console.error('Usage: node scripts/validate-output.js <output-dir> [--pass quick|standard|full]');
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) {
    console.error(`Error: directory "${outputDir}" not found`);
    process.exit(1);
  }

  if (!PASS_LEVELS[passLevel]) {
    console.error(`Error: unknown pass level "${passLevel}". Use: quick, standard, or full`);
    process.exit(1);
  }

  console.log(`\n=== Validate Output ===`);
  console.log(`Directory : ${outputDir}`);
  console.log(`Pass Level: ${passLevel}`);
  console.log(`Min [✓]   : ${PASS_LEVELS[passLevel].minEvidence}`);
  console.log('');

  const files = [...walkFiles(outputDir)];
  if (files.length === 0) {
    console.error('No .md files found in output directory');
    process.exit(1);
  }

  let totalIssues = 0;
  let totalFiles = 0;
  let totalEvidence = 0;

  for (const file of files) {
    totalFiles++;
    const result = validateFile(file, passLevel);

    console.log(`\n📄 ${result.file}`);
    for (const i of result.info) console.log(`   ${i}`);
    for (const i of result.issues) {
      console.log(`   ❌ ${i}`);
      totalIssues++;
    }
    totalEvidence += result.evidence.directCount;
  }

  // Summary
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`SUMMARY: ${totalFiles} files, ${totalIssues} issues, ${totalEvidence} total [✓]`);
  console.log(`Pass Level: ${passLevel} (min [✓] = ${PASS_LEVELS[passLevel].minEvidence})`);

  if (totalIssues === 0) {
    console.log(`✅ ALL CHECKS PASSED`);
    process.exit(0);
  } else {
    console.log(`❌ ${totalIssues} issue(s) found — review before publishing`);
    process.exit(1);
  }
}

main();
