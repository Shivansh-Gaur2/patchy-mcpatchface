# Representation audit: Patchy and Ponytail

Audited: 2026-10-11.

## What Ponytail demonstrates

[Ponytail](https://github.com/DietrichGebert/ponytail) is more than a clever prompt: it has a memorable character, plugin distribution, multiple commands, portable fallbacks, lifecycle integrations, validation, benchmarks with disclosed limitations, and a release surface. Its repository makes it easy to see what exists, how to install it, and what evidence supports its claims.

## What Patchy now ships

| Product surface | Patchy implementation |
| --- | --- |
| Identity and concrete use case | Mascot, one-line promise, and feature plus explanation examples. |
| Codex distribution | Root marketplace identifier and `.codex-plugin/plugin.json`. |
| Focused entry points | `patchy`, `patchy-rummage`, `patchy-review`, `patchy-factory`, and `patchy-help`; `patchy-clipboard` remains a compatibility entry point. |
| Portable fallback | `SKILL.md`, `AGENTS.md`, and Copilot instructions. |
| Drift protection | Node checks enforce plugin metadata, skill presence, and fallback-copy alignment. |
| CI and release hygiene | GitHub Actions, `package.json`, and a changelog. |
| Benchmark foundation | Named task contracts and a scorecard method. |

## Deliberate gaps

Patchy does not ship lifecycle hooks, autonomous activation, a broad host matrix, a package registry release, translated documentation, a durable Factory runtime, or comparative productivity results. Those are product promises, not folders. Add one only after it has an implementation, a tested installation path, and a reason it improves the Rummage → Patch → Review workflow.

## Next evidence gates

1. Install the Codex plugin from the public repository and verify the focused skills in a new task.
2. Run the benchmark cases against a pinned open-source repository; publish raw artifacts and failure cases.
3. Add a host adapter only when its instruction model preserves Patchy's boundaries and proof reporting.
