import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function readPackageVersion(): string {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.resolve(currentDir, "../../../package.json"),
    path.resolve(currentDir, "../../package.json")
  ];

  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(readFileSync(candidate, "utf8")) as { version?: unknown };
      if (typeof parsed.version === "string") return parsed.version;
    } catch {
      // Try the next layout. Runtime package uses dist/src/shared; source tests may use src/shared.
    }
  }

  throw new Error("Unable to read dyslex.ia version from package.json.");
}

export const VERSION = readPackageVersion();
export const MCP_PROTOCOL_DATE = "2025-11-25";
export const SUPPORTED_SUPERPOWERS_RANGE = ">=4.0.0 <7.0.0";
