# Architecture

## Fundamental Rule

Superpowers determines the process of work.

`dyslex.ia` adapts the presentation of that process.

`dyslex.ia` must not bypass Superpowers brainstorming, planning, test-driven development, debugging, code review, or verification gates.

## Components

- `src/server`: MCP server and `stdio` transport wiring.
- `src/tools`: strict tool schemas and deterministic handlers.
- `src/resources`: versioned MCP resources.
- `src/prompts`: reusable MCP prompt templates.
- `src/profiles`: local accessibility profiles and config precedence.
- `src/readability`: local transformations, ambiguity checks, terminal summaries, diff summaries, and technical-token protection.
- `src/dependency`: blocking Superpowers resolver.
- `src/hosts`: host detection and compatibility catalog.
- `skills`: native Agent Skills collection.
- `adapters`: thin host-specific installation manifests.

## Startup Gate

`resolveSuperpowersDependency()` runs before `server.connect(transport)`.

If dependency validation fails:

- no MCP transport is connected;
- no tools, prompts, or resources are published to a client;
- the process returns a non-zero exit code;
- the error is short and actionable;
- no automatic Superpowers download occurs.

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

User text, terminal output, diffs, and code are treated as untrusted data. The tools analyze and transform text locally. They do not execute supplied content.

## Streamable HTTP

The architecture keeps transport creation isolated in `src/server/mcp.ts`. A future Streamable HTTP transport can be added beside `stdio`, but it is not enabled by default.
