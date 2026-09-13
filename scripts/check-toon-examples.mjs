import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const reference = resolve(import.meta.dirname, "..", "references", "toon-receipts.md");
const contents = await readFile(reference, "utf8");
const blocks = [...contents.matchAll(/```toon\r?\n([\s\S]*?)```/g)].map((match) => match[1].trim());

if (blocks.length < 2) throw new Error("expected the TOON reference to contain its two example receipts");

for (const block of blocks) {
  const [header, ...rows] = block.split(/\r?\n/).filter(Boolean);
  const headerMatch = header.match(/^([A-Za-z][\w-]*)\[(\d+)\]\{([A-Za-z][\w-]*(?:,[A-Za-z][\w-]*)*)\}:$/);

  if (!headerMatch) throw new Error(`invalid example header: ${header}`);

  const expectedRows = Number(headerMatch[2]);
  const fields = headerMatch[3].split(",");
  if (rows.length !== expectedRows) throw new Error(`${headerMatch[1]} row count does not match its declaration`);

  for (const row of rows) {
    const values = row.trim().split(",");
    if (values.length !== fields.length || values.some((value) => !value)) {
      throw new Error(`${headerMatch[1]} has a row that does not match its field list: ${row}`);
    }
  }
}

console.log("TOON receipt examples are internally consistent");
