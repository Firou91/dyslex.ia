import test from "node:test";
import assert from "node:assert/strict";
import { closeMcp, connectMcp, makeFakeSuperpowers } from "./helpers.js";

const prompts = [
  "make_readable",
  "explain_error",
  "instructions_to_plan",
  "resume_context",
  "check_understanding",
  "explain_diff",
  "correct_preserve_tone",
  "accessible_superpowers_plan"
];

test("MCP prompts can be listed and rendered", async () => {
  const superpowers = await makeFakeSuperpowers();
  const { client, transport } = await connectMcp(superpowers);
  try {
    const listed = await client.listPrompts();
    assert.deepEqual(listed.prompts.map((prompt) => prompt.name).sort(), [...prompts].sort());
    for (const name of prompts) {
      const prompt = await client.getPrompt({
        name,
        arguments: {
          text: "Sample text",
          error: "Error: sample",
          instruction: "Do the work",
          context: "Done: build",
          request: "Fix it",
          diff: "+new",
          plan: "Task 1"
        }
      });
      assert.equal(prompt.messages.length, 1);
      assert.equal(prompt.messages[0]?.role, "user");
      const content = prompt.messages[0]?.content;
      assert.ok(content && content.type === "text");
      assert.match(content.text, /Sample|Error|work|build|Fix|new|Task/);
    }
  } finally {
    await closeMcp(client, transport);
  }
});
