import test from "node:test";
import assert from "node:assert/strict";
import { closeMcp, connectMcp, makeFakeSuperpowers } from "./helpers.js";

const uris = [
  "dyslexia://profile/current",
  "dyslexia://profile/schema",
  "dyslexia://skills/catalog",
  "dyslexia://guidelines/readability",
  "dyslexia://guidelines/technical-tokens",
  "dyslexia://integration/superpowers",
  "dyslexia://compatibility/hosts",
  "dyslexia://compatibility/superpowers"
];

test("MCP resources can be listed and read", async () => {
  const superpowers = await makeFakeSuperpowers();
  const { client, transport } = await connectMcp(superpowers);
  try {
    const listed = await client.listResources();
    assert.deepEqual(listed.resources.map((resource) => resource.uri).sort(), [...uris].sort());
    for (const uri of uris) {
      const resource = await client.readResource({ uri });
      assert.equal(resource.contents.length, 1);
      assert.equal(resource.contents[0]?.uri, uri);
      const content = resource.contents[0];
      assert.ok(content && "text" in content);
      assert.equal(typeof content.text, "string");
    }
  } finally {
    await closeMcp(client, transport);
  }
});
