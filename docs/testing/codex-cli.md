# Codex CLI Test Notes

Test environment used:

- OS: Windows 11 Pro 10.0.26200, 64-bit.
- Codex CLI: `0.145.0`.
- Working model for this account during validation: `gpt-5.6-sol`.
- Config path: `C:\Users\firou\.codex\config.toml`.

## Configuration Safety

Tests must not leave MCP servers in the user's Codex config.

Use one of these approaches:

- automated tests with temporary `CODEX_HOME`;
- manual tests with a backup of `config.toml`, followed by restore.

The test server name is:

```text
dyslex-ia-local-test
```

## Negative Test

Command:

```bash
node dist/src/cli/index.js mcp
```

Expected result:

- exit code `1`;
- empty `stdout`;
- actionable error on `stderr`;
- no MCP `initialize` success;
- no tools, resources, or prompts announced.

Codex required-server test:

```bash
codex mcp add dyslex-ia-local-test -- node A:\Workspace\.agents\skills\dyslex.ia\dist\src\cli\index.js mcp
```

Then set `required = true` for the server in a backed-up config.

Expected result:

- Codex reports `required MCP servers failed to initialize`.

## Positive Test

Use an external Superpowers installation or a minimal test fixture only for automated protocol tests:

```bash
codex mcp add dyslex-ia-local-test --env DYSLEXIA_SUPERPOWERS_PATH="C:\path\to\superpowers" --env DYSLEXIA_HOST=codex-cli -- node A:\Workspace\.agents\skills\dyslex.ia\dist\src\cli\index.js mcp
```

Expected result:

- `codex mcp list` shows the server as enabled;
- `dyslexia doctor --verbose` reports `superpowers.ok: true`;
- MCP SDK integration tests can list tools, resources, and prompts.

If Codex authentication is expired, `codex exec` can still prove whether MCP initialization failed or succeeded:

- MCP failure appears as `required MCP servers failed to initialize`;
- auth failure appears as `token_expired` after thread/session startup.

## Real Tool Call

The validated end-to-end command used the corrected MCP registration above and a real external Superpowers clone.

Command:

```bash
codex exec --skip-git-repo-check -m gpt-5.6-sol --dangerously-bypass-approvals-and-sandbox "Appelle ces tools MCP dyslex-ia-local-test dans cet ordre: dyslexia_profile_get avec {}, dyslexia_check_ambiguity avec {text:'07/08/2026 1.500 10m'}, puis dyslexia_rewrite avec {text:'fo modif le src/tools/handlers.ts avec --preserveTechnicalTokens et @modelcontextprotocol/sdk', mode:'readable', preserveTechnicalTokens:true}. Réponds en 3 lignes: profile=<nom>, ambiguity=<nombre>, tokens-preserved=<yes/no>."
```

Expected result:

```text
profile=balanced
ambiguity=3
tokens-preserved=yes
```
