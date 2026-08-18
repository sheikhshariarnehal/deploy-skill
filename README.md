# 🚀 Deploy Skill — Antigravity Agent Skill

An Antigravity IDE agent skill that automates the complete **GitHub → Vercel deployment lifecycle** from a single `/deploy` command.

## What It Does

When you type `/deploy`, this skill:

1. **Discovers** your project (GitHub repo, branch, framework, Vercel project)
2. **Detects** code changes by comparing local files against GitHub HEAD
3. **Validates** dependencies and runs the build locally
4. **Auto-fixes** obvious issues (wrong imports, missing types, etc.)
5. **Commits** with meaningful conventional commit messages
6. **Pushes** to GitHub via the MCP `push_files` tool
7. **Deploys** via Vercel MCP (`create_git_project` or `deploy_to_vercel`)
8. **Monitors** deployment status until READY or ERROR
9. **Recovers** from errors by reading Vercel build logs and auto-fixing
10. **Reports** the final deployment URL and status

## Requirements

- [Antigravity IDE](https://antigravity.dev) with MCP support
- **GitHub MCP** server configured and authenticated
- **Vercel MCP** server configured and authenticated
- A project with a GitHub repository
- A Vercel project (will be created automatically if not existing)

## Installation

### Per-Project (Recommended)

Copy the `.agents/skills/deploy/` directory into your project:

```
your-project/
├── .agents/
│   └── skills/
│       └── deploy/         ← Copy the entire deploy folder here
├── app/
├── package.json
└── ...
```

### Global (All Projects)

Copy to your global config:

```
~/.gemini/config/skills/deploy/
```

## Usage

Type `/deploy` in the Antigravity IDE chat, or ask:
- "deploy this project"
- "push and deploy"
- "ship it"

## Skill Architecture

```
.agents/skills/deploy/
├── SKILL.md                    — Main orchestrator & state machine
├── workflows/
│   ├── deploy.md               — Full 9-phase deployment workflow
│   ├── validate.md             — Dependency analysis + build validation
│   ├── repair.md               — Error recovery + retry management
│   └── rollback.md             — Guided rollback procedure
├── rules/
│   ├── github.md               — GitHub MCP tool reference & commit rules
│   ├── vercel.md               — Vercel MCP tool reference & deployment rules
│   ├── dependencies.md         — Dependency analysis & compatibility
│   ├── errors.md               — 6-category error classification taxonomy
│   └── safety.md               — NEVER/ALWAYS rules & secret detection
└── prompts/
    └── error-classifier.md     — Structured error classification prompt
```

## Safety

- **Never** leaks secrets, force-pushes, or retries infinitely
- **Never** modifies unrelated files or disables security checks
- **Always** validates before committing, explains auto-fixes
- **Always** asks before risky changes (major upgrades, dependency removal)
- **Max 3** automatic retry attempts before escalating to user

## Supported Frameworks

Next.js, React (Vite/CRA), Vue.js / Nuxt, Svelte / SvelteKit, Astro, Angular, Static sites

## License

MIT
