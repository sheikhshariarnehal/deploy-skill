#!/usr/bin/env node

const readline = require('readline');
const path = require('path');
const { PROVIDERS, detectHarnesses, installSkills } = require('../lib/installer');
const pkg = require('../package.json');

const args = process.argv.slice(2);
const command = args[0] || 'install';

if (args.includes('--help') || args.includes('-h') || command === 'help') {
  printHelp();
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v') || command === 'version') {
  console.log(`deploy-skill v${pkg.version}`);
  process.exit(0);
}

function parseFlags() {
  const flags = {
    providers: null,
    scope: null
  };

  for (const arg of args) {
    if (arg.startsWith('--providers=')) {
      const value = arg.split('=')[1];
      flags.providers = value === 'all'
        ? Object.keys(PROVIDERS)
        : value.split(',').map(p => p.trim());
    } else if (arg.startsWith('--scope=')) {
      flags.scope = arg.split('=')[1].trim();
    }
  }

  return flags;
}

function printHelp() {
  console.log(`
🚀 deploy-skill CLI Installer v${pkg.version}

Usage:
  npx deploy-skill install [options]
  npx deploy-skill update  [options]

Options:
  --providers=<p1,p2>  Providers to install into (antigravity, claude, cursor, codex, grok, all)
  --scope=<scope>     Installation scope (project, global, both)
  -h, --help          Show help
  -v, --version       Show version

Examples:
  npx deploy-skill install
  npx deploy-skill install --providers=antigravity,claude --scope=project
  npx deploy-skill update  --providers=all --scope=global
`);
}

async function runInteractive(commandName) {
  const isUpdate = commandName === 'update';
  console.log(`\n📦 deploy-skill AI Agent Skill ${isUpdate ? 'Updater' : 'Installer'} v${pkg.version}\n`);

  const detected = detectHarnesses();
  console.log('🔍 Detected AI Agent Harnesses:');
  for (const item of detected) {
    const status = [];
    if (item.hasProject) status.push('project');
    if (item.hasGlobal) status.push('global');
    const badge = status.length > 0 ? `[✓ ${status.join('/')}]` : '[available]';
    console.log(`  • ${item.name} (${item.id}) ${badge}`);
  }
  console.log('');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const ask = (query) => new Promise(resolve => rl.question(query, resolve));

  const flags = parseFlags();

  let selectedProviders = flags.providers;
  if (!selectedProviders) {
    const defaultProviders = detected.map(d => d.id).join(',');
    const ans = await ask(`Select providers to install into [default: ${defaultProviders}]: `);
    selectedProviders = ans.trim()
      ? (ans.trim() === 'all' ? Object.keys(PROVIDERS) : ans.split(',').map(s => s.trim()))
      : detected.map(d => d.id);
  }

  let scope = flags.scope;
  if (!scope) {
    console.log('\nSelect installation scope:');
    console.log('  1. Current Project (.agents/skills, .claude/skills, etc.)');
    console.log('  2. Global (~/.gemini/config/skills, ~/.claude/skills, etc.)');
    console.log('  3. Both');
    const ans = await ask('Choose scope (1-3) [default: 1]: ');
    const choice = ans.trim();
    scope = choice === '2' ? 'global' : (choice === '3' ? 'both' : 'project');
  }

  rl.close();

  console.log(`\n⏳ ${isUpdate ? 'Updating' : 'Installing'} skills for: ${selectedProviders.join(', ')} (Scope: ${scope})...\n`);

  const outcome = installSkills({
    selectedProviders,
    scope,
    isUpdate
  });

  console.log(`✅ ${isUpdate ? 'Update' : 'Installation'} Complete!\n`);
  console.log('Installed Skills:');
  for (const item of outcome.results) {
    console.log(`  ✓ [${item.provider}] (${item.scope}): ${item.skill} → ${item.targetPath}`);
  }
  console.log('\n🎉 You can now trigger `/deploy` or `/push` in your AI coding assistant!\n');
}

runInteractive(command).catch(err => {
  console.error('\n❌ Installation failed:', err.message);
  process.exit(1);
});
