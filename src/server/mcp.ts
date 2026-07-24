import { formatStartupBlocked, resolveSuperpowersDependency } from "../dependency/superpowers.js";
import { PROMPTS, renderPrompt } from "../prompts/data.js";
import { getResource, RESOURCES } from "../resources/data.js";
import { VERSION } from "../shared/version.js";
import { TOOL_DEFINITIONS } from "../tools/definitions.js";
import { callDyslexAITool } from "../tools/handlers.js";

const JSONRPC_VERSION = "2.0";
const MCP_PROTOCOL_VERSION = "2024-11-05";

type JsonRpcId = string | number | null;

interface JsonRpcRequest {
  jsonrpc?: string;
  id?: JsonRpcId;
  method?: string;
  params?: unknown;
}

interface JsonRpcResponse {
  jsonrpc: typeof JSONRPC_VERSION;
  id: JsonRpcId;
  result?: unknown;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

interface McpServer {
  handleRequest(request: JsonRpcRequest): Promise<unknown>;
}

type MessageFormat = "header" | "line";

function hasRequestId(message: JsonRpcRequest): message is JsonRpcRequest & { id: JsonRpcId } {
  return Object.prototype.hasOwnProperty.call(message, "id");
}

function paramsObject(params: unknown): Record<string, unknown> {
  return params && typeof params === "object" ? (params as Record<string, unknown>) : {};
}

function writeMessage(message: JsonRpcResponse, format: MessageFormat): void {
  const body = JSON.stringify(message);
  if (format === "line") {
    process.stdout.write(`${body}\n`);
    return;
  }
  process.stdout.write(`Content-Length: ${Buffer.byteLength(body, "utf8")}\r\n\r\n${body}`);
}

function toErrorResponse(id: JsonRpcId, error: unknown): JsonRpcResponse {
  return {
    jsonrpc: JSONRPC_VERSION,
    id,
    error: {
      code: -32603,
      message: error instanceof Error ? error.message : String(error)
    }
  };
}

export function createMcpServer(): McpServer {
  return {
    async handleRequest(request: JsonRpcRequest): Promise<unknown> {
      switch (request.method) {
        case "initialize":
          return {
            protocolVersion: MCP_PROTOCOL_VERSION,
            capabilities: {
              tools: { listChanged: false },
              resources: { listChanged: false },
              prompts: { listChanged: false }
            },
            serverInfo: { name: "dyslex.ai", version: VERSION }
          };
        case "ping":
          return {};
        case "tools/list":
          return { tools: TOOL_DEFINITIONS };
        case "tools/call": {
          const params = paramsObject(request.params);
          if (typeof params.name !== "string") throw new Error("Expected tool name.");
          return callDyslexAITool(params.name, params.arguments ?? {});
        }
        case "resources/list":
          return {
            resources: RESOURCES.map(({ text: _text, ...resource }) => resource)
          };
        case "resources/templates/list":
          return { resourceTemplates: [] };
        case "resources/read": {
          const params = paramsObject(request.params);
          if (typeof params.uri !== "string") throw new Error("Expected resource URI.");
          const resource = getResource(params.uri);
          if (!resource) throw new Error(`Unknown resource URI: ${params.uri}`);
          return {
            contents: [
              {
                uri: resource.uri,
                mimeType: resource.mimeType,
                text: resource.text
              }
            ]
          };
        }
        case "prompts/list":
          return {
            prompts: PROMPTS.map(({ template: _template, ...prompt }) => prompt)
          };
        case "prompts/get": {
          const params = paramsObject(request.params);
          if (typeof params.name !== "string") throw new Error("Expected prompt name.");
          const args = params.arguments && typeof params.arguments === "object" ? (params.arguments as Record<string, unknown>) : {};
          const text = renderPrompt(params.name, args);
          if (!text) throw new Error(`Unknown prompt: ${params.name}`);
          return {
            description: PROMPTS.find((prompt) => prompt.name === params.name)?.description,
            messages: [
              {
                role: "user",
                content: { type: "text", text }
              }
            ]
          };
        }
        default:
          throw new Error(`Unknown MCP method: ${request.method ?? "<missing>"}`);
      }
    }
  };
}

async function handleMessage(server: McpServer, message: JsonRpcRequest, format: MessageFormat): Promise<void> {
  if (!hasRequestId(message)) return;
  try {
    writeMessage({
      jsonrpc: JSONRPC_VERSION,
      id: message.id,
      result: await server.handleRequest(message)
    }, format);
  } catch (error) {
    writeMessage(toErrorResponse(message.id, error), format);
  }
}

async function runStdio(server: McpServer): Promise<void> {
  let buffer = Buffer.alloc(0);

  process.stdin.on("data", (chunk: Buffer) => {
    buffer = Buffer.concat([buffer, chunk]);

    while (true) {
      if (buffer.subarray(0, 15).toString("ascii").toLowerCase().startsWith("content-length:")) {
        const headerEnd = buffer.indexOf("\r\n\r\n");
        if (headerEnd === -1) return;

        const header = buffer.subarray(0, headerEnd).toString("ascii");
        const lengthLine = header.split("\r\n").find((line) => /^content-length:/i.test(line));
        const length = lengthLine ? Number.parseInt(lengthLine.split(":")[1]?.trim() ?? "", 10) : NaN;
        if (!Number.isFinite(length)) {
          process.stderr.write("[dyslex.ai] Invalid MCP frame: missing Content-Length.\n");
          process.exitCode = 1;
          return;
        }

        const bodyStart = headerEnd + 4;
        const bodyEnd = bodyStart + length;
        if (buffer.length < bodyEnd) return;

        const body = buffer.subarray(bodyStart, bodyEnd).toString("utf8");
        buffer = buffer.subarray(bodyEnd);

        void handleMessage(server, JSON.parse(body) as JsonRpcRequest, "header");
        continue;
      }

      const lineEnd = buffer.indexOf("\n");
      if (lineEnd === -1) return;

      const line = buffer.subarray(0, lineEnd).toString("utf8").trim();
      buffer = buffer.subarray(lineEnd + 1);
      if (!line) continue;

      void handleMessage(server, JSON.parse(line) as JsonRpcRequest, "line");
    }
  });
}

export async function startStdioServer(): Promise<void> {
  const dependency = await resolveSuperpowersDependency();
  if (!dependency.ok) {
    process.stderr.write(`${formatStartupBlocked(dependency)}\n`);
    process.exitCode = 1;
    return;
  }

  await runStdio(createMcpServer());
}
