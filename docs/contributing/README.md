# Contributing

## Development

```bash
pnpm install
pnpm build
pnpm test
```

## Standards

- TypeScript strict mode.
- Tests for behavior that protects meaning, identifiers, dependencies, and structured outputs.
- Small focused skills with `SKILL.md` frontmatter.
- No automatic installation of Superpowers.

## Before Submitting

Run:

```bash
pnpm test
for skill in skills/*; do python3 /home/firou/.codex/skills/.system/skill-creator/scripts/quick_validate.py "$skill"; done
```
