# Plugin E2E Publication

This checklist covers the plugin-only publication path for `dyslex.ai`.

Do not run publication commands until the owner explicitly approves.

## Scope

Primary artifact:

- `.codex-plugin/plugin.json`
- `skills/`
- host adapter plans under `adapters/`

## 1. Local Source Validation

```bash
pnpm install
pnpm typecheck
pnpm lint
pnpm skills:validate
pnpm plugin:validate
pnpm test
pnpm build
```

Expected result:

- TypeScript passes.
- 16 skills validate.
- `.codex-plugin/plugin.json` validates.
- all adapters are `plugin-first`.

## 2. Package Validation

```bash
npm pack --dry-run
npm pack
```

Expected package contents:

- `.codex-plugin/plugin.json`
- `skills/**`
- `adapters/**`
- `docs/**`
- `dist/src/**`

## 3. Codex Local Plugin E2E

Use a disposable project and a disposable plugin marketplace.

```bash
codex plugin marketplace add <path-to-local-marketplace-root>
codex plugin add dyslex-ai@<marketplace-name>
codex plugin list
```

Then start a new Codex chat:

```text
/plugins
```

Expected result:

- `Dyslex.ai` appears as an installed plugin.
- the 16 skills are available in the new chat.
- a deliberately ambiguous prompt triggers the relevant skills before implementation.

## 4. Host Adapter E2E Matrix

Run the install plan generator for every supported host:

```bash
dyslexai install --host claude-code
dyslexai install --host antigravity
dyslexai install --host codex-app
dyslexai install --host codex-cli
dyslexai install --host cursor
dyslexai install --host factory-droid
dyslexai install --host copilot-cli
dyslexai install --host kimi-code
dyslexai install --host opencode
dyslexai install --host pi
```

For each host, verify:

- Superpowers is installed and detected;
- the generated `install-plan.json` says `integrationPriority: plugin-first`;
- the skills catalog path is valid;
- user config mutations are backed up or manually approved.

## 5. npm Publication

Recommended route:

```bash
git tag v<version>
git push origin v<version>
```

GitHub Actions publishes with trusted publishing and provenance.

After release:

```bash
npm view @firou91/dyslex.ai version
npm audit signatures
```

## 6. Plugin Marketplace Publication

npm publication does not automatically make the plugin visible in Codex or any other agent marketplace.

For Codex, publish or register the plugin in the target marketplace. The plugin artifact must include:

- `.codex-plugin/plugin.json`
- `skills/`

For other agents, use the host-specific marketplace or plugin channel documented by that agent. If an agent has no public marketplace, publish installation instructions and keep the adapter as a static install plan until the channel exists.

## 7. Post-Publication Verification

From a clean project:

```bash
npm install @firou91/dyslex.ai
npx dyslexai doctor --verbose
npx dyslexai compatibility
```

Then verify each target agent:

- plugin visible in its plugin UI or list command;
- skills visible in a new session;
- ambiguous prompt scenario works.
