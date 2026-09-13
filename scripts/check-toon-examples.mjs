import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { resolve } from "node:path";
import { decode, encode } from "@toon-format/toon";

const reference = resolve(import.meta.dirname, "..", "references", "toon-receipts.md");
const contents = await readFile(reference, "utf8");
const blocks = [...contents.matchAll(/```toon\r?\n([\s\S]*?)```/g)].map((match) => match[1].trim());

if (blocks.length < 2) throw new Error("expected the TOON reference to contain its two example receipts");

for (const block of blocks) {
  const decoded = decode(block, { strict: true });
  assert.equal(encode(decoded).trim(), block, "TOON example must round-trip through the official encoder");
}

assert.throws(
  () => decode("proof[2]{scenario,result}:\n  partial-refund,passed", { strict: true }),
  "strict decoding must reject a declared row count that does not match its rows",
);

console.log("TOON receipt examples pass official strict decoding and round-trip validation");
