# Compatibility

## Supported Hosts

The host catalog lives in `src/hosts/catalog.ts` and is exposed as `dyslexia://compatibility/hosts`.

Supported targets:

- Claude Code
- Antigravity
- Codex App
- Codex CLI
- Cursor
- Factory Droid
- GitHub Copilot CLI
- Kimi Code
- OpenCode
- Pi

## Adapter Strategy

Each adapter is thin. Shared logic stays in `src`.

Adapters describe:

- plugin-first integration path;
- skills path;
- instruction or plugin integration point;
- optional compatibility bridge command and transport;
- install and uninstall expectations;
- detection checks.

## Verification

Run:

```bash
dyslexia compatibility
dyslexia doctor --verbose
```

Current adapter manifests are testable as static installation plans. Host-specific mutation of user config is intentionally deferred behind backup and consent requirements.
