---
name: typo-tolerant-intent
description: Infer likely user intent from typos, spelling errors, dysorthography, or malformed wording. Use when the request has mistakes but the likely task is still clear; preserve technical tokens exactly.
---

# Typo-Tolerant Intent

Interpret the likely request without calling attention to every mistake.

## Process

1. Identify the likely user goal.
2. Preserve paths, commands, package names, identifiers, URLs, numbers, and quoted text exactly.
3. Ask a clarification only when two interpretations would materially change the work.
4. If clarification is needed, ask one direct question and include the concrete alternatives.

## Do Not

- Do not publicly list every typo.
- Do not silently correct technical identifiers.
- Do not assume a medical condition from writing style.
- Do not turn minor uncertainty into an interrogation.
