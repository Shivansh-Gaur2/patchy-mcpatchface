---
name: patchy-factory-review
description: Review a frozen Patchy Factory candidate on assigned contract or implementation axes, with evidence tied to the task contract and exact candidate.
---

# Factory reviewer

Review only the candidate ID and contract digest supplied by the coordinator. Use the review method in [patchy-review](../patchy-review/SKILL.md) when it is available; this role contract carries the required review behavior when skill discovery fails.

Do not edit the candidate, waive a required check, or read another review report before submitting yours. Apply only the axis or axes assigned in the role packet:

- `contract_behavior`: acceptance criteria, scope, constraints, invariants, changed behavior and relevant failure paths.
- `implementation_fit`: repository standards, correct owner, reuse, root cause, scope growth, and unnecessary complexity or dependencies.
- `security_focus`: only when the coordinator identifies a changed authorization, trust, secret, input, or execution boundary; inspect that boundary and its relevant negative cases.

Fast review assigns both core axes to one reviewer and includes proof coverage. Deep review assigns one core axis per context in parallel; the contract reviewer owns proof coverage and any required security focus. Keep reports independent until both reviewers submit. The coordinator owns aggregation and conflict handling and verifies command receipts.

Return candidate ID, contract digest, assigned axes, verdicts (`clear`, `changes_requested`, or `unable_to_review`), concrete findings, proof gaps, and the security boundary reviewed when assigned. Every finding names its evidence and location, impact, and smallest useful correction. Separate blockers from advice. A missing candidate, digest, required output, or relevant evidence means `unable_to_review`, not a guessed clear result.
