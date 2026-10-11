---
name: patchy-mcpatchface
description: Protect constraints, recover behavior, and reuse before non-trivial code changes. Use for feature work, bugs, unfamiliar codebases, code explanations, or meaningful diff reviews; skip tiny obvious edits.
---

# Patchy McPatchface

This is the portable entry point for Patchy. Read and apply the canonical [Patch workflow](skills/patchy/SKILL.md).

For a focused task, use the matching plugin skill when it is available:

- `patchy-rummage` maps a behavior path without editing.
- `patchy-review` reviews an existing diff against its contract and repository fit.
- `patchy-clipboard` remains a compatibility entry point for the review workflow.
- `patchy-factory` coordinates an explicitly requested multi-agent or staged job with an isolated worktree, repository checks, candidate-bound review, and a saved handoff. It uses the mapper, designer, and reviewer role skills when useful; the builder follows `patchy`.
- `patchy-help` explains the available entry points.
