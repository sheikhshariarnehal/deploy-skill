# Deploy & Push Agent Skills (`deploy-skill`)

Cross-platform AI agent skills for automated deployment to Vercel (`/deploy`) and safe conventional commits & pushes to GitHub (`/push`). Works seamlessly with **Antigravity IDE**, **Claude Code**, **Cursor**, **Codex CLI**, and **Grok Build**.

---

## Installation

### Option 1: CLI Installer (Recommended)

From the root of your project, run:

```bash
npx github:sheikhshariarnehal/deploy-skill install
```

This interactive CLI automatically detects your installed AI agent harnesses (for example `Antigravity IDE / Gemini CLI`, `Claude Code`, `Cursor`, `Codex`, or `Grok`), lets you keep the detected set or customize providers, and asks whether to install into the current project or globally.

#### Non-Interactive Scripting Mode

Use CLI flags to skip interactive prompts in automated scripts:

```bash
# Install into Antigravity IDE & Claude Code for current project
npx github:sheikhshariarnehal/deploy-skill install --providers=antigravity,claude --scope=project

# Install globally across all detected providers
npx github:sheikhshariarnehal/deploy-skill install --providers=all --scope=global
```

---

## Refresh & Update

To update an existing installation to the latest skill definitions, run:

```bash
npx github:sheikhshariarnehal/deploy-skill update
```

Or specify flags:

```bash
npx github:sheikhshariarnehal/deploy-skill update --providers=all --scope=both
```

---

## Included Agent Skills

### 1. `/deploy` — GitHub → Vercel Deployment Agent
- Performs project discovery & lockfile analysis.
- Runs pre-deployment code validation (`lint`, `typecheck`, `build`).
- Commits and pushes changes to GitHub via MCP.
- Triggers and monitors Vercel deployments.
- Automatically diagnoses and recovers from build errors.

### 2. `/push` — Conventional Commit & Push Agent
- Audits local workspace changes against GitHub HEAD.
- Performs pre-commit secret scanning (detects API keys, tokens, credentials).
- Generates semantic conventional commit messages (`feat:`, `fix:`, `chore:`, `refactor:`).
- Pushes files safely via GitHub MCP with local `git` CLI fallback.

---

## Supported Providers & Target Directories

| Provider | Project Scope Path | Global Scope Path |
|----------|-------------------|-------------------|
| **Antigravity IDE / Gemini CLI** | `.agents/skills/` | `~/.gemini/config/skills/` |
| **Claude Code** | `.claude/skills/` | `~/.claude/skills/` |
| **Cursor** | `.cursor/skills/` | `~/.cursor/skills/` |
| **Codex CLI** | `.codex/skills/` | `~/.codex/skills/` |
| **Grok Build** | `.grok/skills/` | `~/.grok/skills/` |

---

## License

MIT © [Sheikh Shariar Nehal](https://github.com/sheikhshariarnehal)
