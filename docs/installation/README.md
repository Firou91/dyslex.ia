# Installation

## Prerequisite

Install Superpowers for each host before installing the `dyslex.ai` skills plugin.

`dyslex.ai` extends Superpowers and cannot run independently.

## Build From Source

```bash
pnpm install
pnpm build
pnpm test
```

## Install For A Host

```bash
dyslexai install --host codex-cli
dyslexai install --host claude-code
dyslexai install --host cursor
```

The installer currently writes a host adapter install plan to `adapters/<host>/install-plan.json`.

The install plan is plugin-first:

- install or expose `.codex-plugin/plugin.json`;
- expose the `skills/` catalog;
- keep `dyslexai mcp` only as an optional compatibility bridge;
- do not mutate user files without backup and consent.

Before modifying user files, a full installer must:

- verify Superpowers;
- show the target files;
- back up existing files;
- be idempotent;
- support uninstall;
- preserve paths with spaces.

## Compatibility Bridge

Use the bridge only when a host cannot consume the plugin or skills directly:

```bash
dyslexai mcp
```

For Codex CLI:

```bash
codex mcp add dyslex-ai --env DYSLEXAI_SUPERPOWERS_PATH="C:\path\to\superpowers" --env DYSLEXAI_HOST=codex-cli -- npx -y @firou91/dyslex.ai mcp
```

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
