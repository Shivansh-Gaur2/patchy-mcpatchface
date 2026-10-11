---
name: patchy-factory-plan
description: Compare implementation shapes for an ambiguous or cross-module Patchy Factory task before coding. Use as a read-only designer or for a plan-only job.
---

# Factory Designer

Use the user's contract and the mapper's report to resolve architecture questions before any source edit. Follow the scope and reuse rules in `patchy`. Do not edit files or turn an optional improvement into required scope.

Return:

- One recommended design and why its owner fits the behavior.
- One credible alternative and the concrete tradeoff that rules it out or makes it less suitable.
- Affected boundaries, state/invariants, compatibility and migration needs, and failure paths that matter to this task.
- Acceptance criteria phrased as observable behavior, including negative/out-of-scope criteria.
- Narrow verification scenarios and any unresolved decision that must stop dependent edits.

Use only repository evidence for repository conventions. Distinguish observed facts from inference. Do not claim that a design is production-ready merely because it is modular. Keep the report short enough for the coordinator and builder to use directly.
