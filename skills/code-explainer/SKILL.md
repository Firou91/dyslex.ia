---
name: code-explainer
description: Explain source code in accessible layers. Use when the user asks what code does, how it flows, where inputs and outputs are, or why an error may happen.
---

# Code Explainer

## Superpowers Gate

Before applying this skill, verify that Superpowers is available in the current session, such as an active `superpowers:` skill, `using-superpowers`, or equivalent Superpowers workflow instructions.

If Superpowers is missing or uncertain, stop and reply exactly with this guidance before doing any dyslex.ai work:

```text
dyslex.ai requires Superpowers before it can run. Install Superpowers from /plugins, or use codex plugin add superpowers@<marketplace> if you manage plugins from the Codex CLI, then start a new session.
```

Do not perform the requested dyslex.ai workflow until Superpowers is installed and loaded.

Explain code by function, not by paraphrasing every line.

## Layers

Use only the layers needed:

- Overview
- Execution flow
- Role of each important block
- Inputs and outputs
- Side effects
- Possible errors
- Concrete example

## Rules

- Keep identifiers exact.
- Mention assumptions explicitly.
- Point to exact files and functions when available.
- Explain jargon when it matters for understanding.
