# Codex CLI Installation

## Prerequisites

- Windows, macOS, or Linux with Node.js 22.12 or newer.
- Codex CLI installed.
- A valid external Superpowers installation.

`dyslex.ai` does not install or redistribute Superpowers.

## 1. Install Superpowers

Install Superpowers with the current official Codex plugin flow:

```text
/plugins
```

Search for Superpowers and install it.

If you use a local checkout for testing, keep it outside the `dyslex.ai` source tree.

## 2. Verify Superpowers

```bash
npx -y @firou91/dyslex.ai doctor --verbose
```

With an explicit path:

```bash
DYSLEXAI_SUPERPOWERS_PATH="C:\path\to\superpowers" npx -y @firou91/dyslex.ai doctor --verbose
```

Expected result:

- `superpowers.ok` is `true`;
- `source` is `DYSLEXAI_SUPERPOWERS_PATH` when the variable is used;
- `compatibility` is `compatible`.

## 3. Install dyslex.ai As A Plugin

Primary path:

```bash
codex plugin add dyslex-ai@<configured-marketplace>
```

During local development, install from a local marketplace or plugin source that points to this repository as the plugin root.

Expected plugin payload:

- `.codex-plugin/plugin.json`
- `skills/`

## 4. Verify In Codex

```bash
codex plugin list
```

Then in Codex:

```text
/plugins
```

Expected result:

- `Dyslex.ai` appears as an installed plugin;
- the accessibility skills are available in a new chat;
- ambiguous prompts can trigger clarification and readability skills.

## 5. Troubleshooting

Check the dependency:

```bash
npx -y @firou91/dyslex.ai dependency status
```

Check diagnostics:

```bash
npx -y @firou91/dyslex.ai doctor --verbose
```

Common failures:

- `Startup blocked: Superpowers was not found`: install Superpowers or set `DYSLEXAI_SUPERPOWERS_PATH`.
- `Version ... outside supported range`: use a compatible Superpowers version.
- Codex authentication errors: sign out and sign in to Codex again.
