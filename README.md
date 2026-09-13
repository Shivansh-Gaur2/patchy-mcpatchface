# Patchy McPatchface

> Your codebase raccoon with a clipboard.

Patchy rummages through the repository before it writes a shiny duplicate. It traces the business behavior that a change can affect, keeps the patch inside its story, checks what already exists, and asks for evidence before declaring the work done.

Use Patchy for feature work, bug fixes, unfamiliar codebases, code explanations, and audits of a non-trivial diff. Skip it for tiny obvious edits and prose-only work.

## Use it

```text
$patchy-mcpatchface add partial refunds without changing the billing schema
```

Patchy works in three modes:

- **Patch mode** turns a request into a small, tested implementation.
- **Rummage mode** maps business logic without dumping the entire repository.
- **Clipboard mode** audits a change for scope drift, duplicate code, and missing proof.

## What Patchy checks

1. The real behavior path, invariants, and boundaries.
2. Existing helpers, types, services, policies, fixtures, and error conventions to reuse.
3. The smallest design that fits the repository instead of inventing a parallel system.
4. Tests and executable checks that establish the changed behavior.
5. What remains uncertain, stated plainly rather than hidden behind a confident summary.

## Install

Copy or clone this repository into your agent's skills directory as `patchy-mcpatchface`. For Codex, that directory is usually `~/.codex/skills/patchy-mcpatchface`. Start a new chat after installation so the skill is discovered.

The skill itself lives in [SKILL.md](SKILL.md). Its evidence ladder lives in [references/proof-tiers.md](references/proof-tiers.md).
