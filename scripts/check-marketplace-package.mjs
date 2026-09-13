import { readdir, readFile, stat } from "node:fs/promises";
import { relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = root;
const destination = resolve(root, "plugins", "patchy-mcpatchface");
const sourceItems = [
  ".codex-plugin",
  "agents",
  "assets",
  "benchmarks",
  "examples",
  "references",
  "rules",
  "skills",
  "AGENTS.md",
  "CHANGELOG.md",
  "CONTRIBUTING.md",
  "LICENSE",
  "package.json",
  "plugin.json",
  "SKILL.md",
];

async function compare(sourcePath, destinationPath) {
  const sourceStat = await stat(sourcePath);
  const destinationStat = await stat(destinationPath);
  if (sourceStat.isDirectory() !== destinationStat.isDirectory()) throw new Error(`${relative(root, destinationPath)} has the wrong type`);

  if (!sourceStat.isDirectory()) {
    const [left, right] = await Promise.all([readFile(sourcePath), readFile(destinationPath)]);
    if (!left.equals(right)) throw new Error(`${relative(root, destinationPath)} drifted from ${relative(root, sourcePath)}`);
    return;
  }

  const [sourceEntries, destinationEntries] = await Promise.all([readdir(sourcePath), readdir(destinationPath)]);
  if (sourceEntries.sort().join("\0") !== destinationEntries.sort().join("\0")) throw new Error(`${relative(root, destinationPath)} has a different file list`);
  for (const entry of sourceEntries) await compare(resolve(sourcePath, entry), resolve(destinationPath, entry));
}

for (const item of sourceItems) await compare(resolve(source, item), resolve(destination, item));
console.log("marketplace plugin package is aligned");
