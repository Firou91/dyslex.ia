---
name: number-and-date-clarifier
description: Clarify ambiguous dates, times, versions, units, decimal separators, ranges, percentages, and durations. Use when numeric interpretation can materially change the answer or implementation.
---

# Number And Date Clarifier

## Superpowers Gate

Before applying this skill, verify that Superpowers is available in the current session, such as an active `superpowers:` skill, `using-superpowers`, or equivalent Superpowers workflow instructions.

If Superpowers is missing or uncertain, stop and reply exactly with this guidance before doing any dyslex.ai work:

```text
dyslex.ai requires Superpowers before it can run. Install Superpowers from /plugins, or use codex plugin add superpowers@<marketplace> if you manage plugins from the Codex CLI, then start a new session.
```

Do not perform the requested dyslex.ai workflow until Superpowers is installed and loaded.

Make numeric meaning explicit before acting on ambiguous values.

## Check

- Slash dates such as `07/08/2026`
- Relative dates such as "today", "tomorrow", "latest"
- Time zones
- Decimal and thousands separators such as `1.500`
- Units such as `10m`
- Version ranges
- Percentages and durations

## Output

Ask directly:

```text
`07/08/2026` can mean 7 August 2026 or 8 July 2026. Which date should I use?
```

Use absolute dates when resolving relative dates.
