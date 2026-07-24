import { rmSync } from "node:fs";
import path from "node:path";

rmSync(path.join(process.cwd(), "dist"), { recursive: true, force: true });
