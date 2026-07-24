---
name: context-reentry
description: Help resume interrupted work. Use after compaction, pause, context loss, task switching, or when the user asks where things stand and what to do next.
---

# Context Reentry

## Superpowers Gate

Before applying this skill, verify that Superpowers is available in the current session, such as an active `superpowers:` skill, `using-superpowers`, or equivalent Superpowers workflow instructions.

If Superpowers is missing or uncertain, stop and reply exactly with this guidance before doing any dyslex.ai work:

```text
dyslex.ai requires Superpowers before it can run. Install Superpowers from /plugins, or use codex plugin add superpowers@<marketplace> if you manage plugins from the Codex CLI, then start a new session.
```

Do not perform the requested dyslex.ai workflow until Superpowers is installed and loaded.

Create a reliable reentry point. Do not invent missing decisions.

## Output Format

```text
Where we are
Already decided
Completed
Remaining
Next single action
Important context
```

## Rules

- Use only information present in the conversation, files, plan, or tool output.
- Mark unknown items as unknown.
- Keep the next action small and concrete.
- Preserve exact file names, commands, branches, issue IDs, and errors.
