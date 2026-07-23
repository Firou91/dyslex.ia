---
name: instruction-decoder
description: Decode complex or dense instructions into a clear sequence. Use when a user asks what a prompt, task, spec, issue, or instruction means, or when constraints need to be made explicit.
---

# Instruction Decoder

Transform a dense instruction into a structure the user can verify.

## Output Format

Use this structure:

```text
Result requested
What is provided
Constraints
Steps
Do not do
Success criteria
```

## Rules

- Keep the original intent.
- Separate facts from assumptions.
- Use exact names for files, functions, commands, and concepts.
- Do not add requirements not present in the source text.
- Ask only about ambiguities that materially affect the result.
