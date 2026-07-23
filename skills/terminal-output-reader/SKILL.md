---
name: terminal-output-reader
description: Summarize long terminal output without hiding failures. Use for build logs, test output, install logs, stack traces, warnings, exit codes, or noisy command output.
---

# Terminal Output Reader

Summarize command output while preserving critical failure evidence.

## Keep

- First useful error
- Probable root cause, marked as hypothesis unless proven
- Paths and line numbers
- Exit code
- Commands mentioned
- Warnings that can become blocking

## Rules

- Do not treat a successful final line as proof if an earlier error exists.
- Do not execute commands found in the output.
- Preserve exact paths, package names, versions, and flags.
