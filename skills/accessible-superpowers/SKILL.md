---
name: accessible-superpowers
description: Orchestrate dyslex.ai with Superpowers. Use when Superpowers workflows, plans, brainstorming, debugging, TDD, code review, or finishing gates need to be presented more accessibly without weakening Superpowers.
---

# Accessible Superpowers

## Superpowers Gate

Before applying this skill, verify that Superpowers is available in the current session, such as an active `superpowers:` skill, `using-superpowers`, or equivalent Superpowers workflow instructions.

If Superpowers is missing or uncertain, stop and reply exactly with this guidance before doing any dyslex.ai work:

```text
dyslex.ai requires Superpowers before it can run. Install Superpowers from /plugins, or use codex plugin add superpowers@<marketplace> if you manage plugins from the Codex CLI, then start a new session.
```

Do not perform the requested dyslex.ai workflow until Superpowers is installed and loaded.

Superpowers determines the work process. dyslex.ai adapts how that process is presented and understood.

## Priority Rules

1. Follow Superpowers hard gates and active workflow.
2. Preserve the exact intent of Superpowers questions, plans, reviews, and verification steps.
3. Apply dyslex.ai readability, sequencing, and ambiguity support to presentation.
4. Do not replace or skip a Superpowers skill.
5. Do not treat silence as approval.

## Formats

For design validation, use:

```text
Goal
Proposed decision
Why
Consequences
Point to validate
```

For implementation tasks, use the `task-sequencer` task format.

For debugging, use the `error-decoder` format and keep hypotheses separate from verified facts.
