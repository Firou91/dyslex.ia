---
name: number-and-date-clarifier
description: Clarify ambiguous dates, times, versions, units, decimal separators, ranges, percentages, and durations. Use when numeric interpretation can materially change the answer or implementation.
---

# Number And Date Clarifier

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
