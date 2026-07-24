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
npx -y dyslex.ia doctor --verbose
```

With an explicit path:

```bash
DYSLEXIA_SUPERPOWERS_PATH="C:\path\to\superpowers" npx -y dyslex.ia doctor --verbose
```

Expected result:

- `superpowers.ok` is `true`;
- `source` is `DYSLEXIA_SUPERPOWERS_PATH` when the variable is used;
- `compatibility` is `compatible`.

## 3. Add dyslex.ia

Package name:

```bash
codex mcp add dyslex-ia --env DYSLEXIA_SUPERPOWERS_PATH="C:\path\to\superpowers" -- npx -y dyslex.ia mcp
```

## 4. Verify In Codex

```bash
codex mcp list
```

Then in Codex:

```text
/mcp
```

Expected result:

- server appears as `enabled`;
- tools are available after Superpowers is found;
- startup fails clearly when Superpowers is absent.

## 5. Troubleshooting

Check the dependency:

```bash
npx -y dyslex.ia dependency status
```

Check diagnostics:

```bash
npx -y dyslex.ia doctor --verbose
```

Common failures:

- `Startup blocked: Superpowers was not found`: install Superpowers or set `DYSLEXIA_SUPERPOWERS_PATH`.
- `Version ... outside supported range`: use a compatible Superpowers version.
- Codex authentication errors: sign out and sign in to Codex again. This is separate from MCP startup.
