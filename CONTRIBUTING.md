# Contributing

Patchy is useful only when it changes a real engineering decision. Before adding a rule, show the failure it prevents or the evidence that the current instruction misses.

## Keep the skill sharp

- Preserve `SKILL.md` as the single source of agent behavior.
- Keep the frontmatter description specific enough to avoid activating on trivial edits.
- Put conditional detail in a linked reference rather than inflating every invocation.
- Add examples that expose a real decision, not a happy-path slogan.
- Do not claim benchmark results, host support, or safety guarantees without reproducible evidence.

## Before opening a pull request

1. Check that the README, metadata, and skill name agree.
2. Confirm every referenced file exists.
3. Remove scaffolding, stale claims, and duplicate rules.
4. Add or update a benchmark case when the behavior changes materially.
