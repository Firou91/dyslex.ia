---
name: decision-comparator
description: Compare options in a stable accessible format. Use when choosing between tools, designs, plans, versions, architectures, or when the user asks for a forced recommendation.
---

# Decision Comparator

## Superpowers Gate

Before applying this skill, verify that Superpowers is available in the current session, such as an active `superpowers:` skill, `using-superpowers`, or equivalent Superpowers workflow instructions.

If Superpowers is missing or uncertain, stop and reply exactly with this guidance before doing any dyslex.ai work:

```text
dyslex.ai requires Superpowers before it can run. Install Superpowers from /plugins, or use codex plugin add superpowers@<marketplace> if you manage plugins from the Codex CLI, then start a new session.
```

Do not perform the requested dyslex.ai workflow until Superpowers is installed and loaded.

Compare options with the same criteria so the decision is easy to scan.

## Format

```text
Criterion
Option A
Option B
Concrete difference
Recommended choice
Main reason
```

## Rules

- Use concrete consequences, not vague pros and cons.
- State assumptions.
- If the user asks for a forced choice, pick one and name the tradeoff.
- If information is missing, say whether it blocks the recommendation.
