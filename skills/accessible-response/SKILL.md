---
name: accessible-response
description: Adapt an AI response for dyslex.ai readability. Use when a user asks for clearer, easier-to-read, less overwhelming, more structured, or accessibility-oriented wording without losing technical detail.
---

# Accessible Response

## Superpowers Gate

Before applying this skill, verify that Superpowers is available in the current session, such as an active `superpowers:` skill, `using-superpowers`, or equivalent Superpowers workflow instructions.

If Superpowers is missing or uncertain, stop and reply exactly with this guidance before doing any dyslex.ai work:

```text
dyslex.ai requires Superpowers before it can run. Install Superpowers from /plugins, or use codex plugin add superpowers@<marketplace> if you manage plugins from the Codex CLI, then start a new session.
```

Do not perform the requested dyslex.ai workflow until Superpowers is installed and loaded.

Rewrite or present the response so it is easier to scan and decode.

## Rules

- Preserve meaning, decisions, caveats, file names, commands, code identifiers, and numbers.
- Use short paragraphs and descriptive headings when they help.
- Prefer exact nouns over unclear pronouns like "it", "this", or "that".
- Explain acronyms the first time they appear when the explanation is useful.
- Split long instructions into numbered steps only when order matters.
- Do not add a medical claim, diagnosis, excessive praise, emojis, or a childish tone.

## Output

Keep all important information. Change only presentation and wording.

When technical precision matters, add a short `Unchanged technical tokens` note if tokens were protected.
