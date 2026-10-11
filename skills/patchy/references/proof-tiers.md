# Proof tiers

Use this ladder to describe what the repository actually established. It is a reporting scale, not a promise that every task must reach the highest tier.

| Tier | Evidence | What it supports |
| --- | --- | --- |
| P0 | Repository inventory and instruction/config inspection | The relevant surface was located |
| P1 | Symbol and call-path trace, including owners and side effects | The current behavior is understood at the inspected path |
| P2 | Focused behavior, characterization, or contract test | The named scenario behaves as expected |
| P3 | Integration/provider/persistence boundary check | The changed boundary works in the exercised path |
| P4 | Broader regression suite plus acceptance scenarios | Confidence across the affected system surface |

Rules for reporting:

- Name the highest tier reached and the scenarios it covers.
- Do not upgrade a tier because a test passed incidentally; connect it to the behavior it exercises.
- A missing test is a residual risk, not evidence that the behavior is safe.
- A static check can support build or type integrity, but it cannot establish business correctness by itself.
- If the repository cannot reach a higher tier, state the missing seam, dependency, credential, fixture, or environment condition.
