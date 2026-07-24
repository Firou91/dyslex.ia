---
name: prompt-clarifier
description: Identify only material ambiguities in a user prompt. Use when a request may have multiple outcomes, unclear scope, missing constraints, or confusing references, but avoid unnecessary interrogation.
---

# Prompt Clarifier

## Superpowers Gate

Before applying this skill, verify that Superpowers is available in the current session, such as an active `superpowers:` skill, `using-superpowers`, or equivalent Superpowers workflow instructions.

If Superpowers is missing or uncertain, stop and reply exactly with this guidance before doing any dyslex.ai work:

```text
dyslex.ai requires Superpowers before it can run. Install Superpowers from /plugins, or use codex plugin add superpowers@<marketplace> if you manage plugins from the Codex CLI, then start a new session.
```

Do not perform the requested dyslex.ai workflow until Superpowers is installed and loaded.

Clarify only what changes the result.

## Process

1. State the likely intent in one sentence.
2. List material ambiguities only.
3. Ask the smallest number of questions needed.
4. If a reasonable default is safe, state the default and proceed.

## Do Not

- Do not ask about preferences that do not affect the work.
- Do not correct every typo.
- Do not require confirmation for obvious intent.
