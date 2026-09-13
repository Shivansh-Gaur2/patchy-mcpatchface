import assert from "node:assert/strict";
import { get_encoding } from "@dqbd/tiktoken";
import { decode, encode } from "@toon-format/toon";
import { markdownReceipt, receiptFixture } from "./toon-receipt-fixture.mjs";

const tokenizer = get_encoding("o200k_base");
const formats = {
  "pretty JSON": JSON.stringify(receiptFixture, null, 2),
  "compact JSON": JSON.stringify(receiptFixture),
  Markdown: markdownReceipt(receiptFixture),
  TOON: encode(receiptFixture),
};

assert.deepEqual(decode(formats.TOON, { strict: true }), receiptFixture, "the benchmark TOON receipt must round-trip through the official decoder");

const measurements = Object.fromEntries(
  Object.entries(formats).map(([name, contents]) => [name, tokenizer.encode(contents).length]),
);
tokenizer.free();

assert.ok(measurements.TOON < measurements["compact JSON"], "TOON must save tokens over compact JSON for the uniform receipt fixture");
assert.ok(measurements.TOON < measurements.Markdown, "TOON must save tokens over Markdown for the uniform receipt fixture");

const savings = (baseline) => ((1 - measurements.TOON / measurements[baseline]) * 100).toFixed(1);
console.table(Object.entries(measurements).map(([format, tokens]) => ({ format, tokens })));
console.log(`TOON saves ${savings("compact JSON")}% versus compact JSON and ${savings("Markdown")}% versus Markdown with o200k_base.`);
