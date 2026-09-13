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
- Boundaries: files, modules, APIs, or data that may and may not change.
- Reuse leads: existing services, policies, types, adapters, fixtures, and error conventions to inspect.
- Invariants: behavior that must remain true.
- Unknowns: facts that could change the design or confidence.

The card is ready when the likely behavior path, owner of each relevant rule, likely touched files, and proof obligations are named. Ask only when the missing answer changes the implementation; otherwise make the smallest reversible assumption and record it.

## Rummage before designing

Trace the changed path from entry point through decisions, state changes, persistence, external calls, and returned errors. Use code, tests, configuration, and call sites as evidence. Keep three labels distinct:

- **Observed**: supported directly by the repository.
- **Inferred**: a reasoned interpretation that still needs confirmation.
- **Unknown**: not established yet.

For business logic, identify the decision table: inputs, branches, side effects, rejection paths, authorization, timing, retries, idempotency, and failure behavior. Follow only the branches relevant to the request, then widen when the changed boundary makes another branch reachable.

## Pass the reuse gate

Search by domain term, type shape, error, event, route, and test fixture as well as the requested name. For every credible candidate:

1. Reuse it when its owner and contract match.
2. Extend it when the new case belongs to that responsibility.
3. Create something new only when it has a distinct owner, contract, or lifecycle.

Before accepting new code, compare nearby helpers and call sites. Preserve one source of truth for one decision. Record why a strong reuse candidate was rejected when the answer is not obvious from the diff.

## Make the patch and its proof agree

Choose the smallest coherent change that keeps policy with its existing owner and follows the repository's dependency, naming, error, and test conventions. Put unrelated cleanup in a follow-up ledger unless it is required for correctness, security, build health, or the requested behavior.

Turn invariants into scenarios. Cover the happy path and the invalid input, permission, missing-state, duplicate or retry, timeout, persistence, and external-boundary cases that the change can alter. Use the repository's test seam and fixtures first.

Verify in proportion to risk:

1. Run the narrowest behavioral tests.
2. Add or update a behavior-level test for each changed contract where a meaningful seam exists.
3. When no relevant test exists, add a focused characterization or contract test. If that is impossible, run the strongest available executable check and name the behavior still unverified.
4. Run relevant type, lint, build, or static checks.
5. Exercise changed module, persistence, queue, provider, or API boundaries with the smallest available integration or contract check.
6. Review the final diff and search again for duplicate logic, accidental files, weakened errors, and scope drift.

Read [proof tiers](../../references/proof-tiers.md) when the confidence level needs to be explicit.

## Leave receipts

End with:

- **Result**: what changed.
- **Scope**: touched boundaries and explicit exclusions.
- **Reuse**: code reused and any new abstraction justified.
- **Proof**: checks that ran and their outcomes.
- **Unverified**: checks that could not run and why.
- **Residual risk**: remaining business or integration uncertainty.
- **Follow-ups**: evidence-backed work that stayed out of scope.

Compilation and a happy-path test are evidence, not a claim that every affected rule is safe.
