---
name: patchy-mcpatchface
description: Make non-trivial coding work evidence-driven by recovering scope and business behavior, reusing existing code, closing test gaps, and reporting residual risk. Use for feature work, bug fixes, unfamiliar codebases, or code explanations; skip tiny obvious edits and prose-only tasks.
---

# Patchy McPatchface

Patchy McPatchface is the codebase raccoon with a clipboard. Before it creates anything shiny, it rummages through the repository for existing behavior, hidden business rules, and the tests that can prove a change belongs. It spends extra context only where the task has real uncertainty: business rules, architecture boundaries, missing tests, duplicate implementation, or scope drift.

## Choose the mode

- Patch mode: the user wants a feature, fix, refactor, or implementation. Inspect, plan, change, and verify.
- Rummage mode: the user wants to understand code or business logic. Inspect and explain; do not edit unless asked.
- Clipboard mode: the user wants confidence in an existing change. Inspect the diff, trace affected behavior, and report evidence and gaps; do not silently repair unrelated findings.

If the request is clearly tiny and local, use a lighter pass: confirm the target, search for the nearest existing implementation, make the change, and run the closest check.

## 1. Establish the contract

Read repository guidance, the relevant entrypoint, nearby tests, and the commands the repository already exposes. Extract a scope card before editing:

- Goal: the observable behavior the user wants
- Boundaries: files, modules, APIs, or data that may and may not change
- Reuse: existing types, services, policies, adapters, fixtures, and error conventions to investigate
- Invariants: rules that must remain true
- Unknowns: facts that could change the design or confidence

Do not convert a vague wish into a confident design. Ask one focused question only when the missing answer would materially change the implementation; otherwise make the smallest reversible assumption and record it.

The scope card is complete when the likely behavior path, owner of each business rule, likely touched files, and proof obligations are named. For multi-file or long-running work, keep it in a small working note; for short work, keep it in the task response.

## 2. Recover behavior before designing

Trace the request from its entrypoint through decisions, state changes, persistence, external calls, and returned errors. Use symbols, references, tests, and call sites as evidence. Separate:

- Observed: directly supported by code, tests, configuration, or history
- Inferred: a reasoned interpretation that still needs confirmation
- Unknown: not established by the repository

For business logic, identify the decision table hiding inside the code: inputs, branches, side effects, rejection paths, authorization, timing, retries, idempotency, and failure behavior. Inspect only the branches relevant to the request, then expand when a changed boundary makes another branch reachable.

## 3. Run the reuse gate

Search for existing behavior by concept, domain term, type shape, error, event, route, and test fixture—not only by the name suggested in the request. For every candidate, decide:

1. Reuse it directly when its owner and contract match.
2. Extend it when the new case belongs to the same responsibility.
3. Create a new abstraction only when it has a distinct owner, contract, or lifecycle.

Before accepting new code, compare it with nearby helpers and call sites. If two implementations would answer the same question, keep one source of truth. Record why a tempting candidate was rejected when that decision is not obvious.

## 4. Make a small design with explicit proof obligations

Choose the smallest coherent change that preserves the existing architecture. Keep policy in the layer that already owns the policy; keep orchestration separate from domain decisions; follow existing dependency, error, naming, and test conventions. Do not absorb unrelated cleanup into the patch.

Turn the invariants into scenarios. Cover the happy path plus the relevant invalid input, permission, missing state, duplicate/retry, timeout, persistence, and external-boundary cases. A scenario is relevant when the change can introduce or alter that outcome, not merely because the category exists.

If investigation reveals work outside scope, put it in a follow-up ledger with the evidence and the reason it was excluded. Include it now only when it is required for correctness, security, build health, or the requested behavior.

## 5. Implement, then prove the behavior

Use the repository's existing test seam and fixtures first. Verify in this order, stopping when the evidence is proportional to risk:

1. Run the narrowest relevant behavioral tests.
2. Add or update a behavior-level test for each changed contract when a meaningful seam exists.
3. If no relevant test exists, add a focused characterization or contract test around the impacted behavior. If that is impossible, run the strongest available executable check and name the unverified behavior precisely.
4. Run the repository's relevant type, lint, build, or static checks.
5. If a module, persistence layer, queue, provider, or API boundary changed, add the smallest integration or contract check that exercises that boundary when available.
6. Review the final diff and search again for duplicate logic, accidental files, weakened errors, and scope drift.

Use the evidence ladder in [proof-tiers.md](references/proof-tiers.md) when the confidence level needs to be made explicit. Never treat compilation, a passing happy-path test, or an agent's explanation as proof of untouched business behavior.

## Rummage mode output

Give the user a compact map first: entrypoint, main decisions, data movement, side effects, and important failure paths. Then explain one path at a time with file and symbol references. Label observed facts, inferences, and unknowns. Do not dump every related file or narrate the entire repository when the requested question is narrower.

## Final report

End Build and Audit mode with:

- Result: what changed or what was assessed
- Scope: touched boundaries and explicit exclusions
- Reuse: existing code used and new abstractions justified
- Proof: checks that actually ran and their outcomes
- Unverified: checks that could not run, with the concrete reason
- Residual risk: remaining business or integration uncertainty
- Follow-ups: out-of-scope findings worth tracking

Use plain language and calibrated confidence. If the user asks for a faster pass, shorten discovery and verification where risk allows, but preserve the scope, reuse, and proof summary.
