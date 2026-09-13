# Constraint and design judgment

## Task shape

Add a requested behavior while preserving an explicitly protected file, with an existing service that can be extended and a tempting but duplicated new abstraction.

## Acceptance contract

- Treat the protected file and stated exclusions as hard limits.
- Find the current owner and one credible alternative before choosing an implementation.
- Prefer the smallest cohesive extension that keeps one decision with one owner.
- Separate any beneficial out-of-scope architectural direction from the required patch.
- Explain the trade-off without using generic design-pattern language as a substitute for evidence.

## Score the run

Record the constraints found, the existing owner, the alternative considered, the selected design, untouched protected boundaries, and the proof that covers the changed decision.
