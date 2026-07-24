# Codex CLI Test Notes

Test environment used:

- OS: Windows 11 Pro 10.0.26200, 64-bit.
- Codex CLI: `0.145.0`.
- Working model for this account during validation: `gpt-5.6-sol`.
- Config path: `C:\Users\firou\.codex\config.toml`.

## Plugin Test

Codex plugin validation is the primary test path.

Expected result:

- `.codex-plugin/plugin.json` validates;
- `skills/` contains 16 valid skills;
- Codex lists `dyslex.ai` in `/plugins` after plugin installation;
- a new Codex chat can invoke the accessibility skills from an ambiguous prompt.

## Local E2E

Use a disposable project and marketplace root:

```bash
codex plugin marketplace add <path-to-local-marketplace-root>
codex plugin add dyslex-ai@<marketplace-name>
codex plugin list
```

Then start a new Codex chat and check:

```text
/plugins
```

Expected result:

- `dyslex.ai` appears as installed;
- the 16 skills are visible or callable;
- ambiguous prompts trigger clarification before implementation.

## Dependency Test

Command:

```bash
npx -y @firou91/dyslex.ai doctor --verbose
```

Expected result with Superpowers installed:

- `superpowers.ok` is `true`;
- `compatibility` is `compatible`.

Expected result without Superpowers:

- `superpowers.ok` is `false`;
- `compatibility` is `blocked`;
- skills should ask the user to install Superpowers before continuing.
