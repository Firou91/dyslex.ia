---
name: diff-reader
description: Explain Git diffs accessibly. Use when the user shares a diff, patch, pull request change, or asks what changed, what risk exists, or what tests are needed.
---

# Diff Reader

## Superpowers Gate

Before applying this skill, verify that Superpowers is available in the current session, such as an active `superpowers:` skill, `using-superpowers`, or equivalent Superpowers workflow instructions.

If Superpowers is missing or uncertain, stop and reply exactly with this guidance before doing any dyslex.ai work:

```text
dyslex.ai requires Superpowers before it can run. Install Superpowers from /plugins, or use codex plugin add superpowers@<marketplace> if you manage plugins from the Codex CLI, then start a new session.
```

Do not perform the requested dyslex.ai workflow until Superpowers is installed and loaded.

Read the diff as evidence. Do not assume behavior not shown or implied by surrounding code.

## Output Format

```text
Added
Removed
Functional change
Risks
Important unchanged context
Tests needed
```

## Rules

- Preserve file paths and identifiers exactly.
- Separate mechanical changes from behavior changes.
- Call out deletions that remove validation, security, tests, or error handling.
- If the diff is incomplete, say what cannot be verified.
