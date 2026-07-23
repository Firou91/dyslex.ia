# Installation

## Prerequisite

Install Superpowers for each host before installing `dyslex.ia`.

`dyslex.ia` extends Superpowers and cannot run independently.

## Build From Source

```bash
pnpm install
pnpm build
pnpm test
```

## Install For A Host

```bash
dyslexia install --host codex-cli
dyslexia install --host claude-code
dyslexia install --host cursor
```

The installer currently writes a host adapter manifest to `adapters/<host>/install-plan.json`.

Before modifying user files, a full installer must:

- verify Superpowers;
- show the target files;
- back up existing files;
- be idempotent;
- support uninstall;
- preserve paths with spaces.

## Superpowers Install Commands

- Claude Code: `/plugin install superpowers@claude-plugins-official`
- Antigravity: `agy plugin install https://github.com/obra/superpowers`
- Codex App: install Superpowers from the Codex plugin marketplace.
- Codex CLI: open `/plugins`, search for `superpowers`, install it.
- Cursor: `/add-plugin superpowers`
- Factory Droid: `droid plugin marketplace add https://github.com/obra/superpowers`, then `droid plugin install superpowers@superpowers`
- GitHub Copilot CLI: `copilot plugin marketplace add obra/superpowers-marketplace`, then `copilot plugin install superpowers@superpowers-marketplace`
- Kimi Code: `/plugins install https://github.com/obra/superpowers`
- OpenCode: follow `https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md`
- Pi: `pi install git:github.com/obra/superpowers`
