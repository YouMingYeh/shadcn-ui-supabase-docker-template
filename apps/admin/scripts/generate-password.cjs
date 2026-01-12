#!/usr/bin/env node

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('Usage: pnpm generate:password <password>');
  console.error('Example: pnpm generate:password mySecurePassword123');
  process.exit(1);
}

if (password.length < 8) {
  console.error('❌ Password must be at least 8 characters long');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);

console.log('\n✅ Password hash generated!\n');
console.log('Add this to your .env.local:');
console.log('─'.repeat(60));
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
console.log('─'.repeat(60));
console.log('\n⚠️  Keep this secure - never commit to git!\n');
