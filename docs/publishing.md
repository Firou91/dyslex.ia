# Publishing

Do not publish until the owner explicitly approves.

## Prerequisites

- Confirm npm package name.
- Confirm GitHub repository URL.
- Confirm plugin name and marketplace namespace.
- Confirm MCP namespace only if publishing the optional compatibility server.
- Ensure the repository is public.
- Ensure npm account or trusted publishing is configured.
- Install the official `mcp-publisher` binary.
- Do not store npm or MCP tokens in the repository.

## Proposed Names

Package name:

```text
@firou91/dyslex.ia
```

Unscoped package rejected by npm as too similar to `dyslexia`; publish under the user scope instead:

```text
@firou91/dyslex.ia
```

Plugin name:

```text
dyslex-ia
```

Optional MCP name:

```text
io.github.Firou91/dyslex-ia
```

## Validation

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm skills:validate
pnpm plugin:validate
pnpm test
pnpm build
npm pack --dry-run
npm pack
npm publish --dry-run --access public
mcp-publisher validate server.json
```

## npm Publication

Manual publication, after approval:

```bash
npm publish --access public --provenance
```

Recommended CI publication:

- publish only from a version tag;
- require protected GitHub environment approval;
- use npm trusted publishing or OIDC provenance;
- verify tag matches `package.json.version`.

## Plugin Publication

npm publication does not automatically make the plugin visible in Codex or any other agent marketplace.

For Codex, publish or register the plugin through the configured plugin marketplace. The plugin artifact must include:

- `.codex-plugin/plugin.json`;
- `skills/`;
- host adapter plans;
- docs.

For other agents, use each agent's plugin marketplace or documented local plugin installation path. If no marketplace exists, ship a static adapter install plan and document the manual installation.

## Optional MCP Registry Publication

Login:

```bash
mcp-publisher login github
```

Publish:

```bash
mcp-publisher publish
```

Do not run these commands without explicit owner authorization.

## GitHub Actions Requirements

For npm provenance:

- configure npm trusted publisher for the repository;
- use `id-token: write`;
- run publication from a protected release environment.

For plugin publication:

- `.codex-plugin/plugin.json` version must match `package.json.version`;
- plugin `skills` must point to `./skills/`;
- every adapter must be `plugin-first`;
- optional MCP must be described as compatibility, not as the primary install path.

For optional MCP registry:

- GitHub namespace must match `io.github.<owner>/dyslex-ia`;
- `package.json.mcpName` must match `server.json.name`;
- `server.json.version` and `packages[0].version` must match `package.json.version`.

## Failure Procedure

If a validation fails:

1. stop publication;
2. record the command, exit code, and output;
3. fix the issue in source;
4. rebuild and repack;
5. repeat dry-runs before publishing.

Superpowers remains external and is not bundled in the npm package or MCP registry metadata.
