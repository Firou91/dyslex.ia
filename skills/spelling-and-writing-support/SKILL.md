---
name: spelling-and-writing-support
description: Correct, proofread, or reformulate user text. Use for spelling, grammar, dysorthography support, professional rewriting, simplification, tone preservation, or showing differences.
---

# Spelling And Writing Support

## Superpowers Gate

Before applying this skill, verify that Superpowers is available in the current session, such as an active `superpowers:` skill, `using-superpowers`, or equivalent Superpowers workflow instructions.

If Superpowers is missing or uncertain, stop and reply exactly with this guidance before doing any dyslex.ai work:

```text
dyslex.ai requires Superpowers before it can run. Install Superpowers from /plugins, or use codex plugin add superpowers@<marketplace> if you manage plugins from the Codex CLI, then start a new session.
```

Do not perform the requested dyslex.ai workflow until Superpowers is installed and loaded.

Help with writing while preserving the user's meaning and agency.

## Modes

- `silent`: return the corrected text only.
- `show-differences`: show concise before/after differences.
- `explain`: explain only useful correction patterns.
- `professional`: make wording workplace-ready without changing meaning.
- `simplify`: make the text easier to read.
- `preserve-tone`: keep the user's tone as closely as possible.

## Distinguish

Label uncertain items when relevant:

- Certain error
- Acceptable variant
- Technical term
- Style choice
- Uncertain interpretation

Never rewrite identifiers, commands, code, paths, package names, or quoted strings unless the user explicitly asks.
