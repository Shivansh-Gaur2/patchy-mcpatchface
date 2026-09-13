import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const required = [
  "README.md",
  "LICENSE",
  "plugin.json",
  ".agents/plugins/marketplace.json",
  ".codex-plugin/plugin.json",
  "SKILL.md",
  "skills/patchy/SKILL.md",
  "skills/patchy-rummage/SKILL.md",
  "skills/patchy-clipboard/SKILL.md",
  "skills/patchy-help/SKILL.md",
  "references/proof-tiers.md",
  "rules/patchy-fallback.md",
  "benchmarks/cases/README.md",
];

for (const path of required) {
  await access(resolve(root, path));
}

const plugin = JSON.parse(await readFile(resolve(root, ".codex-plugin/plugin.json"), "utf8"));
const packageJson = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
const marketplace = JSON.parse(await readFile(resolve(root, ".agents/plugins/marketplace.json"), "utf8"));

if (plugin.name !== "patchy-mcpatchface") throw new Error("plugin manifest name must be patchy-mcpatchface");
if (plugin.version !== packageJson.version) throw new Error("plugin and package versions must match");
if (!/^\d+\.\d+\.\d+(?:-[\w.]+)?(?:\+[\w.]+)?$/.test(plugin.version)) throw new Error("plugin version must be semver");
if (plugin.skills !== "./skills/") throw new Error("plugin manifest must expose ./skills/");
if (plugin.author?.name !== "Shivansh Gaur") throw new Error("plugin author metadata is incomplete");
if (!plugin.description || plugin.license !== "MIT" || !Array.isArray(plugin.keywords) || !plugin.keywords.length) throw new Error("plugin metadata is incomplete");
if (!plugin.interface?.displayName || !plugin.interface?.shortDescription || !plugin.interface?.longDescription) throw new Error("plugin interface copy is incomplete");
if (plugin.interface.category !== "Productivity" || !Array.isArray(plugin.interface.defaultPrompt) || !plugin.interface.defaultPrompt.length) throw new Error("plugin interface metadata is incomplete");
for (const asset of [plugin.interface.logo, plugin.interface.logoDark]) {
  if (typeof asset !== "string" || !asset.startsWith("./")) throw new Error("plugin logo paths must be relative");
  await access(resolve(root, asset));
}

for (const skill of ["patchy", "patchy-rummage", "patchy-clipboard", "patchy-help"]) {
  const contents = await readFile(resolve(root, "skills", skill, "SKILL.md"), "utf8");
  if (!contents.startsWith(`---\nname: ${skill}\n`)) throw new Error(`${skill} has invalid frontmatter`);
  if (contents.includes("[TODO:")) throw new Error(`${skill} has an unfinished placeholder`);
}

const portableSkill = await readFile(resolve(root, "SKILL.md"), "utf8");
if (!portableSkill.startsWith("---\nname: patchy-mcpatchface\n")) throw new Error("portable skill has invalid frontmatter");
if (!portableSkill.includes("skills/patchy/SKILL.md")) throw new Error("portable skill must point to the canonical workflow");

const marketEntry = marketplace.plugins?.find((entry) => entry.name === plugin.name);
if (marketplace.name !== plugin.name || !marketEntry) throw new Error("marketplace must expose this plugin by name");
if (marketEntry.source?.source !== "local" || marketEntry.source?.path !== "./plugins/patchy-mcpatchface") throw new Error("marketplace source path is invalid");
if (marketEntry.policy?.installation !== "AVAILABLE" || marketEntry.policy?.authentication !== "ON_INSTALL") throw new Error("marketplace policy is invalid");

console.log("plugin package is coherent");
