# dyslex.ia

`dyslex.ia` is an accessibility skills plugin for AI agents. It improves readability, instruction decoding, typo tolerance, writing support, error explanations, diff reading, and context reentry.

It does not diagnose disability or claim medical benefit.

## Relationship To Superpowers

Superpowers determines the work process.

`dyslex.ia` adapts how that process is presented and understood.

The plugin expects a compatible `obra/superpowers` installation. The optional compatibility bridge also refuses to start unless Superpowers is found.

## What Is Included

- Codex plugin manifest in `.codex-plugin/plugin.json`.
- CLI: `dyslexia`.
- 16 native Agent Skills.
- Optional stdio compatibility bridge for hosts that need protocol-level integration.
- 11 optional bridge tools.
- 8 optional bridge resources.
- 8 optional bridge prompt templates.
- Host adapter manifests for Claude Code, Antigravity, Codex App, Codex CLI, Cursor, Factory Droid, GitHub Copilot CLI, Kimi Code, OpenCode, and Pi.
- Unit tests for the core behavior.

## Commands

```bash
pnpm install
pnpm build
pnpm test
pnpm plugin:validate

dyslexia doctor
dyslexia doctor --verbose
dyslexia dependency status
dyslexia dependency path
dyslexia compatibility
dyslexia profile set balanced
dyslexia config show
```

## Plugin

The primary integration is the skills plugin:

```text
.codex-plugin/plugin.json
skills/
```

Use host-specific plugin installation when available:

```bash
dyslexia install --host codex-cli
dyslexia install --host claude-code
dyslexia install --host cursor
```

The installer currently emits a static, reviewable install plan. Host-specific writes remain gated behind backup and consent requirements.

## Compatibility Bridge

Run the bridge only for hosts or workflows that cannot consume the skills plugin directly:

```bash
dyslexia mcp
```

The bridge uses MCP internally and is blocked before `server.connect(transport)` if Superpowers is missing or incompatible.

## Codex CLI

Install Superpowers first. `dyslex.ia` will not start without it.

Verify the dependency:

```bash
npx -y @firou91/dyslex.ia doctor --verbose
```

For plugin-first usage, install `dyslex.ia` as a Codex plugin from the configured marketplace or local plugin source.

For compatibility bridge usage from npm after publication:

```bash
codex mcp add dyslex-ia --env DYSLEXIA_SUPERPOWERS_PATH="C:\path\to\superpowers" --env DYSLEXIA_HOST=codex-cli -- npx -y @firou91/dyslex.ia mcp
```

Check Codex plugin state:

```bash
codex plugin list
```

Inside Codex, use:

```text
/plugins
```

Check optional bridge state in Codex:

```bash
codex mcp list
```

Inside Codex, use:

```text
/mcp
```

If startup fails, run:

```bash
npx -y @firou91/dyslex.ia dependency status
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
