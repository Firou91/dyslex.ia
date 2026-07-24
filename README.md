# dyslex.ai

`dyslex.ai` is an accessibility skills plugin for AI agents. It improves readability, instruction decoding, typo tolerance, writing support, error explanations, diff reading, and context reentry.

It does not diagnose disability or claim medical benefit.

## Relationship To Superpowers

Superpowers determines the work process.

`dyslex.ai` adapts how that process is presented and understood.

The plugin expects a compatible `obra/superpowers` installation. If Superpowers is missing, the skills instruct the agent to install Superpowers before continuing.

## What Is Included

- Codex plugin manifest in `.codex-plugin/plugin.json`.
- CLI: `dyslexai`.
- 16 native Agent Skills.
- Host adapter manifests for Claude Code, Antigravity, Codex App, Codex CLI, Cursor, Factory Droid, GitHub Copilot CLI, Kimi Code, OpenCode, and Pi.
- Unit tests for the core behavior.

## Commands

```bash
pnpm install
pnpm build
pnpm test
pnpm plugin:validate

dyslexai doctor
dyslexai doctor --verbose
dyslexai dependency status
dyslexai dependency path
dyslexai compatibility
dyslexai profile set balanced
dyslexai config show
```

## Plugin

The integration surface is the skills plugin:

```text
.codex-plugin/plugin.json
skills/
```

Use host-specific plugin installation when available:

```bash
dyslexai install --host codex-cli
dyslexai install --host claude-code
dyslexai install --host cursor
```

The installer currently emits a static, reviewable install plan. Host-specific writes remain gated behind backup and consent requirements.

## Codex CLI

Install Superpowers first. `dyslex.ai` will not run independently.

Verify the dependency:

```bash
npx -y @firou91/dyslex.ai doctor --verbose
```

Install `dyslex.ai` as a Codex plugin from the configured marketplace or local plugin source.

Check Codex plugin state:

```bash
codex plugin list
```

Inside Codex, use:

```text
/plugins
```

If startup fails, run:

```bash
npx -y @firou91/dyslex.ai dependency status
```

## Documentation

- [Architecture](docs/architecture/README.md)
- [Installation](docs/installation/README.md)
- [Codex CLI Installation](docs/installation/codex-cli.md)
- [Plugin E2E Publication](docs/installation/plugin-e2e.md)
- [Compatibility](docs/compatibility/README.md)
- [Security](docs/security/README.md)
- [Accessibility](docs/accessibility/README.md)
- [Publishing](docs/publishing.md)
