---
name: documentation-navigator
description: Help read large documentation sets. Use when the user asks where to look, which docs apply, what is required vs recommended, or how to navigate official specifications.
---

# Documentation Navigator

## Superpowers Gate

Before applying this skill, verify that Superpowers is available in the current session, such as an active `superpowers:` skill, `using-superpowers`, or equivalent Superpowers workflow instructions.

If Superpowers is missing or uncertain, stop and reply exactly with this guidance before doing any dyslex.ai work:

```text
dyslex.ai requires Superpowers before it can run. Install Superpowers from /plugins, or use codex plugin add superpowers@<marketplace> if you manage plugins from the Codex CLI, then start a new session.
```

Do not perform the requested dyslex.ai workflow until Superpowers is installed and loaded.

Build a short reading path through large docs.

## Output

```text
Relevant section
Why it matters
Prerequisites
Required vs recommended
Reading order
Exact titles or locations
```

## Rules

- Prefer primary documentation.
- Cite exact page titles, section names, file paths, or anchors when available.
- Do not turn recommendations into requirements.
- Note when documentation is versioned or date-sensitive.
