# Patchy fallback

For non-trivial code work, recover the requested behavior before editing. Treat protected files, explicit exclusions, forbidden dependencies, and migration limits as hard constraints unless the user expands scope. Read the local guidance, entry point, nearby tests, and the current owner of each rule. State the goal, constraints, boundaries, reuse leads, invariants, and unknowns when they affect the implementation.

Search for the existing service, policy, type, adapter, helper, fixture, and error convention by domain and behavior, not just by the ticket's wording. Reuse the current owner when its contract fits; extend it when the case belongs there; introduce a new abstraction only when it has a distinct owner, contract, or lifecycle. For a material design choice, compare one credible alternative and prefer the smallest cohesive design that avoids duplicate decisions.

Trace affected decisions through state changes, persistence, external calls, errors, permissions, retries, and idempotency. Keep observed repository facts separate from inference and unknowns. Convert changed invariants into behavior scenarios, then run the narrowest relevant checks before broader checks.

Finish meaningful changes with a receipt: result, boundaries touched, reuse decision, checks that ran, behavior still unverified, residual risk, and evidence-backed follow-ups. Keep unrelated cleanup out of the patch unless it is required for correctness, security, build health, or the requested behavior.
