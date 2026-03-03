#!/usr/bin/env node
/**
 * Check if ISA forms have been updated
 * Run periodically via cron to detect changes
 */

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const FORMS_TO_CHECK = [
  {
    id: 'visa-change-extension',
    name: '在留資格変更/在留期間更新許可申請書 (別記第三十号)',
    url: 'https://www.moj.go.jp/isa/content/930004065.xlsx',
    hashFile: path.join(__dirname, '../.isa-hash/form-30.hash'),
    notes: 'Dùng chung cho cả change và extension',
  },
  // COE, permanent residence forms are category-specific - add later when needed
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function computeHash(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

async function checkForm(form) {
  console.log(`Checking: ${form.name} (${form.id})`);
  
  try {
    const buffer = await fetchUrl(form.url);
    
    // Verify it's an Excel file (PK zip header)
    if (buffer[0] !== 0x50 || buffer[1] !== 0x4B) {
      console.log(`  ⚠️  Not a valid Excel file (might be HTML error page)`);
      return { changed: false, error: 'invalid_file' };
    }

    const newHash = computeHash(buffer);
    
    // Read previous hash
    let oldHash = null;
    if (fs.existsSync(form.hashFile)) {
      oldHash = fs.readFileSync(form.hashFile, 'utf8').trim();
    }

    if (!oldHash) {
      // First time checking
      const dir = path.dirname(form.hashFile);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(form.hashFile, newHash);
      console.log(`  ✅ Baseline hash saved: ${newHash.slice(0, 8)}...`);
      return { changed: false, firstTime: true };
    }

    if (oldHash !== newHash) {
      console.log(`  🔴 CHANGED! Old: ${oldHash.slice(0, 8)}... → New: ${newHash.slice(0, 8)}...`);
      // Save new hash
      fs.writeFileSync(form.hashFile, newHash);
      return { changed: true, oldHash, newHash };
    }

    console.log(`  ✅ No change (${newHash.slice(0, 8)}...)`);
    return { changed: false };

  } catch (err) {
    console.log(`  ❌ Error: ${err.message}`);
    return { changed: false, error: err.message };
  }
}

async function main() {
  console.log('=== ISA Forms Check ===');
  console.log(`Date: ${new Date().toISOString()}\n`);

  const results = [];
  for (const form of FORMS_TO_CHECK) {
    const result = await checkForm(form);
    results.push({ form, ...result });
  }

  console.log('\n=== Summary ===');
  const changed = results.filter(r => r.changed);
  const errors = results.filter(r => r.error);

  if (changed.length > 0) {
    console.log(`\n🚨 ${changed.length} form(s) have CHANGED:`);
    changed.forEach(r => {
      console.log(`  - ${r.form.name} (${r.form.id})`);
      console.log(`    Old: ${r.oldHash.slice(0, 12)}...`);
      console.log(`    New: ${r.newHash.slice(0, 12)}...`);
    });
    console.log(`\n⚠️  ACTION NEEDED: Update ThủTụcJP field mappings!`);
    process.exit(1); // Exit with error code to trigger alert
  }

  if (errors.length > 0) {
    console.log(`\n⚠️  ${errors.length} form(s) had errors:`);
    errors.forEach(r => {
      console.log(`  - ${r.form.name}: ${r.error}`);
    });
  }

  if (changed.length === 0 && errors.length === 0) {
    console.log('✅ All forms are up to date!');
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
