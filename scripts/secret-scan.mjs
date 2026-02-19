#!/usr/bin/env node
/**
 * Simple secret scan: fail if likely secrets or credentials appear in tracked source.
 * Excludes node_modules, .next, and known safe files (.env.example, this script, docs).
 * Run as part of: npm run security:check
 */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const EXCLUDE_DIRS = new Set(['node_modules', '.next', '.git', 'dist', 'build']);
const EXCLUDE_FILES = new Set(['.env.example', 'secret-scan.mjs', 'security-audit.md', 'security-checklist.md']);
const SCAN_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.env', '.yaml', '.yml']);

const PATTERNS = [
  { re: /(?:api[_-]?key|apikey)\s*=\s*['"][^'"]{8,}['"]/gi, msg: 'Possible API key literal' },
  { re: /(?:password|passwd|pwd|secret)\s*=\s*['"][^'"]{6,}['"]/gi, msg: 'Possible password/secret literal' },
  { re: /(?:bearer|token|auth)\s*=\s*['"][a-zA-Z0-9_-]{20,}['"]/gi, msg: 'Possible token literal' },
  { re: /sk_live_[a-zA-Z0-9]{20,}/g, msg: 'Possible Stripe secret key' },
  { re: /AKIA[0-9A-Z]{16}/g, msg: 'Possible AWS access key' },
  { re: /ghp_[a-zA-Z0-9]{36}/g, msg: 'Possible GitHub personal access token' },
];

function walk(dir, cb) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!EXCLUDE_DIRS.has(e.name)) walk(full, cb);
    } else if (e.isFile() && !EXCLUDE_FILES.has(e.name)) {
      const ext = path.extname(e.name);
      if (SCAN_EXT.has(ext) || e.name.startsWith('.env')) cb(full);
    }
  }
}

let failed = false;
walk(ROOT, (file) => {
  const rel = path.relative(ROOT, file);
  const content = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  for (const { re, msg } of PATTERNS) {
    const m = content.match(re);
    if (m) {
      console.error(`[secret-scan] ${rel}: ${msg}`);
      failed = true;
    }
  }
});

if (failed) {
  console.error('Secret scan found potential secrets. Remove them and use env vars.');
  process.exit(1);
}
console.log('Secret scan: no obvious secrets in source.');
