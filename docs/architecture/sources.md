# Inspected Sources

Inspected on 2026-07-23:

- `https://github.com/obra/superpowers`
- `https://agentskills.io/specification`
- `https://agentskills.io/skill-creation/best-practices`
- `https://www.w3.org/WAI/cognitive/`
- `https://www.w3.org/TR/WCAG22/`

Findings applied:

- Superpowers currently ships multi-harness plugin structures, including `.claude-plugin`, `.codex-plugin`, `.cursor-plugin`, `.kimi-plugin`, `.opencode`, `.pi`, `hooks`, and `skills`.
- Superpowers latest observed release is `v6.1.1`, so `dyslex.ai` accepts `>=4.0.0 <7.0.0` for the initial compatibility range.
- Agent Skills require a folder with `SKILL.md`, YAML frontmatter, `name`, and `description`; optional `references`, `scripts`, and `assets` should be used only when valuable.
- W3C cognitive accessibility guidance emphasizes different ways people process information and the need for adaptable presentation.
- WCAG 2.2 includes relevant areas for readable content, headings and labels, labels or instructions, error identification, and consistent help.
