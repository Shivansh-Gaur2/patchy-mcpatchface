import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = resolve(root, "rules", "patchy-fallback.md");
const targets = [
  resolve(root, "AGENTS.md"),
  resolve(root, ".github", "copilot-instructions.md"),
];
const canonical = await readFile(source, "utf8");
const write = process.argv.includes("--write");

for (const target of targets) {
  if (write) {
    await writeFile(target, canonical);
    console.log(`synced ${target}`);
    continue;
  }

  const actual = await readFile(target, "utf8");
  if (actual !== canonical) {
    throw new Error(`${target} drifted from rules/patchy-fallback.md. Run node scripts/check-fallback-copies.mjs --write.`);
  }
}

console.log("fallback copies are aligned");
