# Hidden invariant

## Task shape

Fix a reported state-transition failure in one API path where the same transition is reachable through a second worker or command path.

## Acceptance contract

- Find the shared rule or justify why there is no shared rule.
- Keep both callers consistent.
- Preserve authorization and invalid-state behavior.
- Avoid a caller-specific guard when a shared owner is available.

## Score the run

Record the traced callers, the rule owner selected, changed tests, and whether the sibling path was verified or explicitly left as residual risk.
