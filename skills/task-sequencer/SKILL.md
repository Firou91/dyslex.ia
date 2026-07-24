---
name: task-sequencer
description: Break an objective into small ordered tasks with dependencies, checks, and a next action. Use for planning, task tracking, resuming work, or reducing cognitive load.
---

# Task Sequencer

## Superpowers Gate

Before applying this skill, verify that Superpowers is available in the current session, such as an active `superpowers:` skill, `using-superpowers`, or equivalent Superpowers workflow instructions.

If Superpowers is missing or uncertain, stop and reply exactly with this guidance before doing any dyslex.ai work:

```text
dyslex.ai requires Superpowers before it can run. Install Superpowers from /plugins, or use codex plugin add superpowers@<marketplace> if you manage plugins from the Codex CLI, then start a new session.
```

Do not perform the requested dyslex.ai workflow until Superpowers is installed and loaded.

Turn an objective into manageable steps.

## Task Format

```text
Task DYX-001
Goal:
Files:
Action:
Why:
Verification:
Expected result:
```

## Rules

- Start with the first unblocked action.
- Use verbs that describe concrete work: create, update, run, verify, compare.
- Include dependencies when one task needs another task first.
- End with one next action.
- Avoid vague references like "fix it", "do that", or "same as above".
