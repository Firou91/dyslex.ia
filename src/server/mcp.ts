import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import { formatStartupBlocked, resolveSuperpowersDependency } from "../dependency/superpowers.js";
import { PROMPTS, renderPrompt } from "../prompts/data.js";
import { getResource, RESOURCES } from "../resources/data.js";
import { TOOL_DEFINITIONS } from "../tools/definitions.js";
import { callDyslexiaTool } from "../tools/handlers.js";
import { VERSION } from "../shared/version.js";

export function createMcpServer(): Server {
  const server = new Server(
    { name: "dyslex.ia", version: VERSION },
    {
      capabilities: {
        tools: { listChanged: false },
        resources: { listChanged: false },
        prompts: { listChanged: false }
      }
    }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOL_DEFINITIONS }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    return callDyslexiaTool(request.params.name, request.params.arguments ?? {}) as never;
  });

  server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: RESOURCES.map(({ text: _text, ...resource }) => resource)
  }));

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const resource = getResource(request.params.uri);
    if (!resource) {
      throw new Error(`Unknown resource URI: ${request.params.uri}`);
    }
    return {
      contents: [
        {
          uri: resource.uri,
          mimeType: resource.mimeType,
          text: resource.text
        }
      ]
    };
  });

  server.setRequestHandler(ListPromptsRequestSchema, async () => ({
    prompts: PROMPTS.map(({ template: _template, ...prompt }) => prompt)
  }));

  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const text = renderPrompt(request.params.name, request.params.arguments ?? {});
    if (!text) throw new Error(`Unknown prompt: ${request.params.name}`);
    return {
      description: PROMPTS.find((prompt) => prompt.name === request.params.name)?.description,
      messages: [
        {
          role: "user",
          content: { type: "text", text }
        }
      ]
    };
  });

  return server;
}

export async function startStdioServer(): Promise<void> {
  const dependency = await resolveSuperpowersDependency();
  if (!dependency.ok) {
    process.stderr.write(`${formatStartupBlocked(dependency)}\n`);
    process.exitCode = 1;
    return;
  }
  const server = createMcpServer();
  await server.connect(new StdioServerTransport());
}
