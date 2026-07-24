---
name: typo-tolerant-intent
description: Infer likely user intent from typos, spelling errors, dysorthography, or malformed wording. Use when the request has mistakes but the likely task is still clear; preserve technical tokens exactly.
---

# Typo-Tolerant Intent

## Superpowers Gate

Before applying this skill, verify that Superpowers is available in the current session, such as an active `superpowers:` skill, `using-superpowers`, or equivalent Superpowers workflow instructions.

If Superpowers is missing or uncertain, stop and reply exactly with this guidance before doing any dyslex.ai work:

```text
dyslex.ai requires Superpowers before it can run. Install Superpowers from /plugins, or use codex plugin add superpowers@<marketplace> if you manage plugins from the Codex CLI, then start a new session.
```

Do not perform the requested dyslex.ai workflow until Superpowers is installed and loaded.

Interpret the likely request without calling attention to every mistake.

## Process

1. Identify the likely user goal.
2. Preserve paths, commands, package names, identifiers, URLs, numbers, and quoted text exactly.
3. Ask a clarification only when two interpretations would materially change the work.
4. If clarification is needed, ask one direct question and include the concrete alternatives.

## Do Not

- Do not publicly list every typo.
- Do not silently correct technical identifiers.
- Do not assume a medical condition from writing style.
- Do not turn minor uncertainty into an interrogation.
