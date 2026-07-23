---
name: context-reentry
description: Help resume interrupted work. Use after compaction, pause, context loss, task switching, or when the user asks where things stand and what to do next.
---

# Context Reentry

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
