# Architecture

## Fundamental Rule

Superpowers determines the process of work.

`dyslex.ai` adapts the presentation of that process.

`dyslex.ai` must not bypass Superpowers brainstorming, planning, test-driven development, debugging, code review, or verification gates.

## Components

- `.codex-plugin/plugin.json`: Codex plugin manifest for the skills bundle.
- `skills`: native Agent Skills collection and primary integration surface.
- `adapters`: thin host-specific plugin installation manifests.
- `src/profiles`: local accessibility profiles and config precedence.
- `src/readability`: local transformations, ambiguity checks, terminal summaries, diff summaries, and technical-token protection.
- `src/dependency`: blocking Superpowers resolver.
- `src/hosts`: host detection and compatibility catalog.
- `src/cli`: diagnostics, dependency checks, profile config, and install-plan generation.

## Usage Gate

`resolveSuperpowersDependency()` protects plugin installation planning and CLI diagnostics.

If dependency validation fails:

- install planning returns a blocked result;
- diagnostics explain what dependency is missing;
- no automatic Superpowers download occurs.

The skills also contain a Superpowers gate. When Superpowers is not installed or loaded, the agent must stop and ask the user to install Superpowers before applying `dyslex.ai`.

## Dependency Validation

A directory named `superpowers` is not enough.

Validation requires:

- resolvable real path;
- directory, not file;
- `skills/using-superpowers/SKILL.md`;
- package or plugin metadata;
- valid semver version;
- version compatible with `>=4.0.0 <7.0.0`.

## Data Flow

User text, terminal output, diffs, and code are treated as untrusted data. The readability helpers analyze and transform text locally. They do not execute supplied content.
