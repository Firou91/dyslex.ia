---
name: prompt-clarifier
description: Identify only material ambiguities in a user prompt. Use when a request may have multiple outcomes, unclear scope, missing constraints, or confusing references, but avoid unnecessary interrogation.
---

# Prompt Clarifier

Clarify only what changes the result.

## Process

1. State the likely intent in one sentence.
2. List material ambiguities only.
3. Ask the smallest number of questions needed.
4. If a reasonable default is safe, state the default and proceed.

## Do Not

- Do not ask about preferences that do not affect the work.
- Do not correct every typo.
- Do not require confirmation for obvious intent.
