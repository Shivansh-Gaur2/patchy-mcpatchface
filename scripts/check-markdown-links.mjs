import { access, readdir, readFile } from "node:fs/promises";
import { dirname, extname, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const ignoredDirectories = new Set([".git", "node_modules", "plugins"]);

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return ignoredDirectories.has(entry.name) ? [] : markdownFiles(path);
    return extname(entry.name).toLowerCase() === ".md" ? [path] : [];
  }));
  return nested.flat();
}

const files = await markdownFiles(root);
const markdownLink = /!?(?:\[[^\]]*\])\(([^)\s]+)(?:\s+[^)]*)?\)/g;

for (const file of files) {
  const contents = await readFile(file, "utf8");
  for (const match of contents.matchAll(markdownLink)) {
    const target = match[1];
    if (/^(?:[a-z][a-z+.-]*:|#|\/)/i.test(target)) continue;

    const [path] = target.split("#", 1);
    const resolved = resolve(dirname(file), decodeURIComponent(path));
    if (relative(root, resolved).startsWith("..")) throw new Error(`${relative(root, file)} links outside the repository: ${target}`);
    try {
      await access(resolved);
    } catch {
      throw new Error(`${relative(root, file)} has a missing local link: ${target}`);
    }
  }
}

console.log(`local Markdown links are valid across ${files.length} source files`);
