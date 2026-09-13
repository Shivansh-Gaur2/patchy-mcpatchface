---
name: patchy-clipboard
description: Audit an existing diff for scope drift, missed reuse, and business behavior that lacks proof.
disable-model-invocation: true
---

# Patchy Clipboard

Assess the current change; do not silently repair unrelated findings. Read the requested scope, repository guidance, changed files, nearby owners, and focused tests before judging the diff.

Audit four questions:

1. **Scope**: Does every changed boundary serve the stated behavior? Which required boundary is untouched?
2. **Reuse**: Does the diff bypass an existing service, policy, type, helper, fixture, or error convention?
3. **Behavior**: Which invariants and rejection paths can change? Trace them far enough to name the owner and evidence.
4. **Proof**: Which checks ran, what do they establish, and which changed scenarios remain unverified?

Report findings by severity only when they are concrete. Each finding needs the affected behavior, evidence, impact, and the smallest corrective direction. Finish with a receipt: scope assessed, reuse reviewed, proof available, and residual risk. Use TOON only for three or more same-shaped evidence rows; [the compact-receipt reference](../../references/toon-receipts.md) defines the boundary. Say plainly when no material finding is supported.
