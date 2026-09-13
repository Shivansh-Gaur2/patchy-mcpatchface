import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
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

if (!destination.startsWith(`${resolve(root, "plugins")}\\`) && !destination.startsWith(`${resolve(root, "plugins")}/`)) {
  throw new Error("refusing to write outside this repository's plugins directory");
}

await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });

for (const item of sourceItems) {
  const source = resolve(root, item);
  const target = resolve(destination, item);
  const sourceStat = await stat(source);
  await mkdir(dirname(target), { recursive: true });
  await cp(source, target, { recursive: sourceStat.isDirectory() });
}

const names = (await readdir(destination)).sort().join(", ");
console.log(`built marketplace plugin with: ${names}`);
