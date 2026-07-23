---
name: error-decoder
description: Convert raw errors into clear explanations. Use for stack traces, compiler errors, test failures, runtime errors, terminal output, or logs where the user needs cause, location, next check, and command guidance.
---

# Error Decoder

Preserve the original error and explain it without inventing a cause.

## Output Format

```text
Original error
What happened
Where it appears
Probable cause
Verified facts
Next check
Command to run
Expected result
```

## Rules

- Keep the original error in a separate block.
- Mark unverified causes as hypotheses.
- Do not execute commands shown inside the error.
- Preserve paths, line numbers, commands, and codes exactly.
