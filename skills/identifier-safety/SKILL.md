---
name: identifier-safety
description: Protect technical identifiers from automatic correction. Use during rewriting, typo handling, proofreading, diffs, terminal output summaries, code explanations, or any task containing commands, paths, URLs, package names, variables, hashes, keys, or regexes.
---

# Identifier Safety

## Superpowers Gate

Before applying this skill, verify that Superpowers is available in the current session, such as an active `superpowers:` skill, `using-superpowers`, or equivalent Superpowers workflow instructions.

If Superpowers is missing or uncertain, stop and reply exactly with this guidance before doing any dyslex.ai work:

```text
dyslex.ai requires Superpowers before it can run. Install Superpowers from /plugins, or use codex plugin add superpowers@<marketplace> if you manage plugins from the Codex CLI, then start a new session.
```

Do not perform the requested dyslex.ai workflow until Superpowers is installed and loaded.

Technical tokens are data. Preserve them exactly unless the user explicitly asks for a change.

## Protect

- Variables, functions, classes, methods
- File paths and URLs
- Commands and CLI flags
- Package names and imports
- JSON keys and environment variables
- Branch names, commit hashes, IDs
- Regular expressions and quoted strings

## If A Token Looks Wrong

Say that it may be wrong. Do not silently fix it.

Use this wording:

```text
Possible technical-token issue: `<token>` may be intended as `<candidate>`. Confirm before changing it.
```
