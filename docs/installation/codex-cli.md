# Codex CLI Installation

## Prerequisites

- Windows, macOS, or Linux with Node.js 22.12 or newer.
- Codex CLI installed.
- A valid external Superpowers installation.

`dyslex.ia` does not install or redistribute Superpowers.

## 1. Install Superpowers

Install Superpowers with the current official Codex plugin flow:

```text
/plugins
```

Search for Superpowers and install it.

If you use a local checkout for testing, keep it outside the `dyslex.ia` source tree.

## 2. Verify Superpowers

```bash
npx -y @firou91/dyslex.ia doctor --verbose
```

With an explicit path:

```bash
DYSLEXIA_SUPERPOWERS_PATH="C:\path\to\superpowers" npx -y @firou91/dyslex.ia doctor --verbose
```

Expected result:

- `superpowers.ok` is `true`;
- `source` is `DYSLEXIA_SUPERPOWERS_PATH` when the variable is used;
- `compatibility` is `compatible`.

## 3. Install dyslex.ia As A Plugin

Primary path:

```bash
codex plugin add dyslex-ia@<configured-marketplace>
```

During local development, install from a local marketplace or plugin source that points to this repository as the plugin root.

Expected plugin payload:

- `.codex-plugin/plugin.json`
- `skills/`
- optional `dyslexia mcp` compatibility bridge command

## 4. Compatibility Bridge

Use this only if the current Codex setup cannot consume the plugin directly.

```bash
codex mcp add dyslex-ia --env DYSLEXIA_SUPERPOWERS_PATH="C:\path\to\superpowers" --env DYSLEXIA_HOST=codex-cli -- npx -y @firou91/dyslex.ia mcp
```

## 5. Verify In Codex

```bash
codex plugin list
```

Then in Codex:

```text
/plugins
```

Expected result:

- `dyslex.ia` appears as an installed plugin;
- the accessibility skills are available in a new chat;
- ambiguous prompts can trigger clarification and readability skills.

For optional bridge usage, also verify:

```bash
codex mcp list
```

Then in Codex:

```text
/mcp
```

## 6. Troubleshooting

Check the dependency:

```bash
npx -y @firou91/dyslex.ia dependency status
```

Check diagnostics:

```bash
npx -y @firou91/dyslex.ia doctor --verbose
```

Common failures:

- `Startup blocked: Superpowers was not found`: install Superpowers or set `DYSLEXIA_SUPERPOWERS_PATH`.
- `Version ... outside supported range`: use a compatible Superpowers version.
- Codex authentication errors: sign out and sign in to Codex again. This is separate from bridge startup.
