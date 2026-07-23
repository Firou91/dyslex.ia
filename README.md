# dyslex.ia

`dyslex.ia` is an accessibility layer for AI agents. It improves readability, instruction decoding, typo tolerance, writing support, error explanations, diff reading, and context reentry.

It does not diagnose disability or claim medical benefit.

## Relationship To Superpowers

Superpowers determines the work process.

`dyslex.ia` adapts how that process is presented and understood.

The MCP server refuses to start unless a compatible `obra/superpowers` installation is found.

## What Is Included

- TypeScript MCP server using `stdio`.
- CLI: `dyslexia`.
- 11 MCP tools.
- 8 MCP resources.
- 8 MCP prompt templates.
- 16 native Agent Skills.
- Host adapter manifests for Claude Code, Antigravity, Codex App, Codex CLI, Cursor, Factory Droid, GitHub Copilot CLI, Kimi Code, OpenCode, and Pi.
- Unit tests for the core behavior.

## Commands

```bash
pnpm install
pnpm build
pnpm test

dyslexia doctor
dyslexia doctor --verbose
dyslexia dependency status
dyslexia dependency path
dyslexia compatibility
dyslexia profile set balanced
dyslexia config show
```

## MCP

Run the server with:

```bash
dyslexia mcp
```

Startup is blocked before `server.connect(transport)` if Superpowers is missing or incompatible.

## Documentation

- [Architecture](docs/architecture/README.md)
- [Installation](docs/installation/README.md)
- [Compatibility](docs/compatibility/README.md)
- [Security](docs/security/README.md)
- [Accessibility](docs/accessibility/README.md)
