---
name: patchy
description: Recover scope, business behavior, and reusable code before non-trivial implementation. Use for features, bug fixes, refactors, or unfamiliar codebases; skip tiny obvious edits.
---

# Patchy

Patchy is the codebase raccoon with a clipboard. It finds the behavior and its owner before it adds code, then leaves receipts for what the final patch proves.

## Start with the right entry point

- Stay here for a feature, fix, or refactor.
- Use `patchy-rummage` when the user wants an explanation and has not asked for edits.
- Use `patchy-clipboard` when a diff already exists and the user wants confidence in it.

For a tiny local edit, confirm the target and nearest existing implementation, make the change, and run the closest check. Do the full pass when business rules, module boundaries, missing tests, duplicated logic, or scope uncertainty are live risks.

## Build the scope card

Read repository guidance, the relevant entry point, nearby tests, and the commands the repository exposes. State:

- Goal: the observable behavior requested.
- Constraints: files, modules, APIs, data, dependencies, migrations, and explicit exclusions that are hard limits unless the user expands scope.
- Boundaries: files, modules, APIs, or data that may and may not change.
- Reuse leads: existing services, policies, types, adapters, fixtures, and error conventions to inspect.
- Invariants: behavior that must remain true.
- Unknowns: facts that could change the design or confidence.

The card is ready when the likely behavior path, owner of each relevant rule, hard constraints, likely touched files, and proof obligations are named. Treat a stated exclusion as a design input, not a suggestion. Ask only when the missing answer changes the implementation; otherwise make the smallest reversible assumption and record it.

## Spend context in stages

Do not load the whole repository to answer a scoped request. Start with the task, repository guidance, the nearest entry point, its owner, and adjacent tests. Search by symbols and domain language. Widen only when an unresolved caller, branch, boundary, or invariant could change one of these decisions:

- the owner that should change;
- code that should be reused or extended;
- a protected boundary or explicit exclusion;
- a scenario the proof must cover.

Keep compact evidence with a locator and a label: **Observed**, **Inferred**, or **Unknown**. Do not turn search output into a speculative codebase summary. If the request is an explanation, answer the narrow question first and offer further tracing only when it would materially help.

Use [compact receipts](../../references/toon-receipts.md) for three or more same-shaped evidence records. Use prose or a short Markdown list for a one-off fact, a decision, or any irregular structure. Never replace configuration, API payloads, source code, or required JSON with TOON.

## Rummage before designing

Trace the changed path from entry point through decisions, state changes, persistence, external calls, and returned errors. Use code, tests, configuration, and call sites as evidence. Keep three labels distinct:

- **Observed**: supported directly by the repository.
- **Inferred**: a reasoned interpretation that still needs confirmation.
- **Unknown**: not established yet.

For business logic, identify the decision table: inputs, branches, side effects, rejection paths, authorization, timing, retries, idempotency, and failure behavior. Follow only the branches relevant to the request, then widen when the changed boundary makes another branch reachable.

## Exercise architecture judgment when it matters

Start with the repository's existing seam. When the request has a material design choice, compare that approach with one credible alternative: a smaller extension, a different existing owner, or a new boundary. Judge them by ownership, cohesion, behavior risk, interface complexity, migration cost, testability, and long-term duplication. Choose the smallest design that keeps one decision with one owner and record why.

Do not manufacture novelty for a local change. Raise an optional better direction only when the evidence shows that the requested approach would duplicate a decision, deepen a fragile boundary, or leave a recurring problem unsolved. Distinguish the required patch from an optional follow-up; do not silently broaden the story to implement the follow-up.

## Pass the reuse gate

Search by domain term, type shape, error, event, route, and test fixture as well as the requested name. For every credible candidate:

1. Reuse it when its owner and contract match.
2. Extend it when the new case belongs to that responsibility.
3. Create something new only when it has a distinct owner, contract, or lifecycle.

Before accepting new code, compare nearby helpers and call sites. Preserve one source of truth for one decision. Record why a strong reuse candidate was rejected when the answer is not obvious from the diff.

## Make the patch and its proof agree

Choose the smallest coherent change that keeps policy with its existing owner and follows the repository's dependency, naming, error, and test conventions. Put unrelated cleanup in a follow-up ledger unless it is required for correctness, security, build health, or the requested behavior.

Turn invariants into scenarios. Cover the happy path and the invalid input, permission, missing-state, duplicate or retry, timeout, persistence, and external-boundary cases that the change can alter. Use the repository's test seam and fixtures first.

When the requested behavior is new and no focused test exists, find the nearest seam that can observe the decision: a characterization test, contract test, integration boundary, or acceptance check. Add the narrowest meaningful proof when feasible. If no seam can establish the behavior, do not manufacture certainty from a green unrelated suite; name the unverified scenario and the missing seam.

Verify in proportion to risk:

1. Run the narrowest behavioral tests.
2. Add or update a behavior-level test for each changed contract where a meaningful seam exists.
3. When no relevant test exists, add a focused characterization or contract test. If that is impossible, run the strongest available executable check and name the behavior still unverified.
4. Run relevant type, lint, build, or static checks.
5. Exercise changed module, persistence, queue, provider, or API boundaries with the smallest available integration or contract check.
6. Review the final diff and search again for duplicate logic, accidental files, weakened errors, and scope drift.

Read [proof tiers](../../references/proof-tiers.md) when the confidence level needs to be explicit. When a new behavior has no existing test, derive scenarios from its decision contract, add the closest focused seam available, and state the remaining gap. TDD is useful only when the test expresses the behavior that now exists; a green unrelated suite is not proof.

## Leave receipts

End with:

- **Result**: what changed.
- **Scope**: touched boundaries and explicit exclusions.
- **Reuse**: code reused and any new abstraction justified.
- **Proof**: checks that ran and their outcomes.
- **Unverified**: checks that could not run and why.
- **Residual risk**: remaining business or integration uncertainty.
- **Follow-ups**: evidence-backed work that stayed out of scope.

Keep the receipt human-readable. Use a TOON block for repeated impact, reuse, or verification rows only when it makes the evidence shorter and easier to scan. State the conclusion in plain language.

Compilation and a happy-path test are evidence, not a claim that every affected rule is safe.
