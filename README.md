# Dyslex.ai

Dyslex.ai is an accessibility skills plugin for AI agents.

It helps agents make instructions, errors, diffs, terminal output, and long responses easier to read without losing technical detail. It is built for users who benefit from clearer structure, typo tolerance, ambiguity checks, and safer handling of technical tokens.

Dyslex.ai does not diagnose disability, provide medical advice, or claim medical benefit.

## Quickstart

- [Codex](#codex)
- [Claude Code](#claude-code)
- [Antigravity](#antigravity)
- [Cursor](#cursor)
- [Factory Droid](#factory-droid)
- [GitHub Copilot CLI](#github-copilot-cli)
- [Kimi Code](#kimi-code)
- [OpenCode](#opencode)
- [Pi](#pi)

## How It Works

Dyslex.ai is a skills-only plugin.

The plugin contributes reusable Agent Skills through:

```text
.codex-plugin/plugin.json
skills/
```

When a matching task appears, the agent can use the relevant skill to reshape the interaction. The goal is not to replace the agent's reasoning or Superpowers workflow. The goal is to make that workflow easier to follow, safer to resume, and harder to misread.

Every skill starts with a Superpowers gate. If Superpowers is missing or uncertain, the agent must stop and ask the user to install Superpowers before applying Dyslex.ai.

## Installation

### Codex

Primary path, after public availability:

```text
/plugins
```

Search for:

```text
Dyslex.ai
```

CLI install, when available from the configured marketplace:

```bash
codex plugin add dyslex-ai@openai-curated
```

Fallback if Dyslex.ai is not visible in the public plugin directory yet:

```bash
codex plugin add dyslex-ai@npm:@firou91/dyslex.ai
```

Start a new Codex session after installation so the skills are loaded.

<!-- UNAVAILABLE FOR THE MOMENT -->
<!-- ### Claude Code

Install Superpowers first:

```text
/plugin install superpowers@claude-plugins-official
```

Dyslex.ai currently ships a static adapter plan for Claude Code:

```bash
dyslexai install --host claude-code
```

Public Claude Code deployment is planned after the project reaches the support target listed below.

### Antigravity

Install Superpowers first:

```bash
agy plugin install https://github.com/obra/superpowers
```

Generate the Dyslex.ai adapter plan:

```bash
dyslexai install --host antigravity
```

### Cursor

Install Superpowers first:

```text
/add-plugin superpowers
```

Generate the Dyslex.ai adapter plan:

```bash
dyslexai install --host cursor
```

Public Cursor deployment is planned after the project reaches the support target listed below.

### Factory Droid

Install Superpowers first:

```bash
droid plugin marketplace add https://github.com/obra/superpowers
droid plugin install superpowers@superpowers
```

Generate the Dyslex.ai adapter plan:

```bash
dyslexai install --host factory-droid
```

### GitHub Copilot CLI

Install Superpowers first:

```bash
copilot plugin marketplace add obra/superpowers-marketplace
copilot plugin install superpowers@superpowers-marketplace
```

Generate the Dyslex.ai adapter plan:

```bash
dyslexai install --host copilot-cli
```

### Kimi Code

Install Superpowers first:

```text
/plugins install https://github.com/obra/superpowers
```

Generate the Dyslex.ai adapter plan:

```bash
dyslexai install --host kimi-code
```

### OpenCode

Install Superpowers using the OpenCode instructions from the Superpowers project:

```text
https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md
```

Generate the Dyslex.ai adapter plan:

```bash
dyslexai install --host opencode
```

### Pi

Install Superpowers first:

```bash
pi install git:github.com/obra/superpowers
```

Generate the Dyslex.ai adapter plan:

```bash
dyslexai install --host pi
``` -->

### Local Package

The npm package is published as:

```bash
npm install @firou91/dyslex.ai
```

The CLI command is:

```bash
dyslexai doctor --verbose
```

## The Basic Workflow

1. Install Superpowers in the target agent.
2. Install Dyslex.ai as a plugin.
3. Start a new session so the skills are visible.
4. Ask normally, including messy text, unclear instructions, raw errors, or long output.
5. Dyslex.ai detects the relevant accessibility skill.
6. The skill preserves commands, paths, package names, environment variables, and other technical tokens.
7. The agent clarifies only material ambiguity before acting.
8. The response is structured for readability and verification.

## What's Inside

Dyslex.ai currently includes 16 skills.

### Readability And Writing

- `accessible-response`: reshape answers into clearer blocks without losing detail.
- `spelling-and-writing-support`: correct, proofread, or reformulate text while preserving tone.
- `typo-tolerant-intent`: infer likely intent from typos or malformed wording.
- `identifier-safety`: protect paths, commands, URLs, package names, variables, hashes, and regexes.

### Debugging

- `error-decoder`: turn raw errors, stack traces, and logs into clear explanations.
- `terminal-output-reader`: summarize noisy terminal output without hiding failures.
- `diff-reader`: explain changes, risks, and test needs from diffs or patches.
- `code-explainer`: explain source code in accessible layers.

### Collaboration

- `instruction-decoder`: unpack dense prompts, issues, specs, or task descriptions.
- `prompt-clarifier`: ask only the questions that materially change the result.
- `task-sequencer`: break work into ordered steps with dependencies and checks.
- `decision-comparator`: compare options and provide a clear recommendation when needed.
- `number-and-date-clarifier`: clarify ambiguous dates, units, versions, decimals, and ranges.

### Meta And Continuity

- `context-reentry`: resume interrupted work after pauses, compaction, or task switching.
- `documentation-navigator`: identify which docs matter and what is required versus recommended.
- `accessible-superpowers`: present Superpowers workflows more accessibly without weakening them.

## Philosophy

Dyslex.ai is built around a simple rule: accessibility should reduce cognitive load without reducing technical precision.

That means:

- preserve exact technical tokens;
- separate facts from assumptions;
- ask fewer, better questions;
- make success criteria explicit;
- keep warnings and failures visible;
- avoid medical claims;
- respect Superpowers as the workflow authority.

The project is not trying to make agents softer or less rigorous. It is trying to make rigorous work easier to read, resume, and verify.

## Identity

Here is how we connect the very minimal visual identity to Dyslex.ai's role, name, and philosophy.

Read the full visual identity notes in [Identity](docs/identity.md).

## Support

Publishing and maintaining Dyslex.ai across public agent ecosystems costs time and API tokens. Making an accessibility plugin publicly available usually requires repeated review passes, test runs, model-specific validation, and ongoing compatibility checks.

Codex is already covered as the first public deployment target.

Community support will guide the next deployment targets:

- 1,000 GitHub stars: Public deployment for Claude Code.
- 5,000 GitHub stars: Public release of the plugin for Cursor and other planned hosts.

You can support the project by:

- starring the repository;
- testing Dyslex.ai in real workflows;
- reporting unclear behavior;
- suggesting accessibility improvements;
- sharing reproducible prompts where the skills help or fail.

## Documentation

- [Architecture](docs/architecture/README.md)
- [Installation](docs/installation/README.md)
- [Codex CLI ](docs//codex-cli.md)
- [Plugin E2E Publication](docs//plugin-e2e.md)
- [Compatibility](docs/compatibility/README.md)
- [Security](docs/security/README.md)
- [Accessibility](docs/accessibility/README.md)
- [Publishing](docs/publishing.md)
