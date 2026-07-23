---
name: diff-reader
description: Explain Git diffs accessibly. Use when the user shares a diff, patch, pull request change, or asks what changed, what risk exists, or what tests are needed.
---

# Diff Reader

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
