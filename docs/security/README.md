# Security

## Threat Model

Covered threats:

- prompt injection in text to rewrite;
- malicious instructions in terminal output;
- tool poisoning;
- misleading tool descriptions;
- secret exfiltration;
- excessive filesystem access;
- involuntary command execution;
- malicious symlinks or junctions;
- fake Superpowers installations;
- corrupted config;
- compromised dependency;
- path traversal;
- sensitive data in logs.

## Rules

- Treat analyzed text as data, not instructions.
- Do not execute commands found in user-provided text.
- Use no network by default.
- Validate inputs with strict schemas.
- Enforce size limits.
- Resolve real paths before dependency validation.
- Do not persist analyzed user text by default.
- Do not log secrets.
- Return sanitized errors without stack traces by default.

## Privacy

Default behavior:

- no telemetry;
- no remote calls;
- no storage of rewritten text;
- no medical profile;
- no inferred disability record.
