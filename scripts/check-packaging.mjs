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
  "skills/patchy/references/composed-practices.md",
  "skills/patchy-rummage/SKILL.md",
  "skills/patchy-clipboard/SKILL.md",
  "skills/patchy-review/SKILL.md",
  "skills/patchy-help/SKILL.md",
  "skills/patchy-factory/SKILL.md",
  "skills/patchy-factory/references/job-record.md",
  "skills/patchy-factory-map/SKILL.md",
  "skills/patchy-factory-plan/SKILL.md",
  "skills/patchy-factory-review/SKILL.md",
  "agents/factory/README.md",
  "agents/factory/factory_mapper.toml",
  "agents/factory/factory_designer.toml",
  "agents/factory/factory_builder.toml",
  "agents/factory/factory_reviewer.toml",
  "references/proof-tiers.md",
  "references/toon-receipts.md",
  "rules/patchy-fallback.md",
  "benchmarks/cases/README.md",
  "benchmarks/RESULTS.md",
  "benchmarks/toon-token-comparison.md",
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
if (plugin.interface.category !== "Productivity" || !Array.isArray(plugin.interface.defaultPrompt) || !plugin.interface.defaultPrompt.length) throw new Error("plugin interface metadata is invalid");
for (const asset of [plugin.interface.logo, plugin.interface.logoDark]) {
  if (typeof asset !== "string" || !asset.startsWith("./")) throw new Error("plugin logo paths must be relative");
  await access(resolve(root, asset));
}

for (const skill of ["patchy", "patchy-rummage", "patchy-clipboard", "patchy-review", "patchy-help", "patchy-factory", "patchy-factory-map", "patchy-factory-plan", "patchy-factory-review"]) {
  const contents = await readFile(resolve(root, "skills", skill, "SKILL.md"), "utf8");
  if (!contents.startsWith(`---\nname: ${skill}\n`)) throw new Error(`${skill} has invalid frontmatter`);
  if (contents.includes("[TODO:")) throw new Error(`${skill} has an unfinished placeholder`);
}

const factorySkill = await readFile(resolve(root, "skills/patchy-factory/SKILL.md"), "utf8");
const factoryReviewer = await readFile(resolve(root, "skills/patchy-factory-review/SKILL.md"), "utf8");
const reviewerProfile = await readFile(resolve(root, "agents/factory/factory_reviewer.toml"), "utf8");
const clipboardAlias = await readFile(resolve(root, "skills/patchy-clipboard/SKILL.md"), "utf8");
if (factorySkill.includes("patchy-clipboard") || factoryReviewer.includes("patchy-clipboard") || reviewerProfile.includes("patchy-clipboard")) {
  throw new Error("Factory review must not depend on the patchy-clipboard compatibility entry point");
}
if (!factoryReviewer.includes("patchy-review") || !reviewerProfile.includes("patchy-review")) {
  throw new Error("Factory reviewer must point to the canonical patchy-review method");
}
if (!clipboardAlias.includes("../patchy-review/SKILL.md")) {
  throw new Error("patchy-clipboard must forward to the canonical patchy-review method");
}
for (const axis of ["contract_behavior", "implementation_fit"]) {
  if (!factorySkill.includes(axis) || !factoryReviewer.includes(axis)) throw new Error(`Factory review is missing the ${axis} axis`);
}

for (const [file, name, reasoning, sandbox] of [
  ["agents/factory/factory_mapper.toml", "factory_mapper", "medium", "read-only"],
  ["agents/factory/factory_designer.toml", "factory_designer", "high", "read-only"],
  ["agents/factory/factory_builder.toml", "factory_builder", "medium", "workspace-write"],
  ["agents/factory/factory_reviewer.toml", "factory_reviewer", "high", "read-only"],
]) {
  const profile = await readFile(resolve(root, file), "utf8");
  if (!profile.includes(`name = "${name}"`)) throw new Error(`${file} has the wrong agent name`);
  if (!profile.includes(`model_reasoning_effort = "${reasoning}"`)) throw new Error(`${file} has an unexpected reasoning budget`);
  if (!profile.includes(`sandbox_mode = "${sandbox}"`)) throw new Error(`${file} has an unexpected requested sandbox`);
  if (!profile.includes("developer_instructions = \"\"\"")) throw new Error(`${file} has no role instructions`);
  if (/^model\s*=\s*"/m.test(profile)) throw new Error(`${file} must inherit the user's configured model`);
}

const portableSkill = await readFile(resolve(root, "SKILL.md"), "utf8");
if (!portableSkill.startsWith("---\nname: patchy\n")) throw new Error("portable skill must remain directly invokable as patchy");
if (!portableSkill.includes("skills/patchy/SKILL.md")) throw new Error("portable skill must point to the canonical workflow");
if (portableSkill.includes("patchy-mcpatchface")) throw new Error("portable skill must use the short Patchy identity");

const marketEntry = marketplace.plugins?.find((entry) => entry.name === plugin.name);
if (marketplace.name !== plugin.name || !marketEntry) throw new Error("marketplace must expose this plugin by name");
if (marketEntry.source?.source !== "local" || marketEntry.source?.path !== "./plugins/patchy-mcpatchface") throw new Error("marketplace source path is invalid");
if (marketEntry.policy?.installation !== "AVAILABLE" || marketEntry.policy?.authentication !== "ON_INSTALL") throw new Error("marketplace policy is invalid");

console.log("plugin package is coherent");
