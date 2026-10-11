---
name: patchy-review
description: Independently review a code change against its requested behavior, repository conventions, reuse, scope, and available proof. Use for existing diffs, branches, or pull requests.
---

# Patchy review

Review the requested change without editing it. Read the task or contract, repository guidance, and the actual diff before judging. If the originating specification is missing, report that gap and review only what the available request establishes.

Keep two questions separate. A change may fit the request but conflict with repository design, or follow repository conventions while missing the requested behavior.

## Contract and behavior

- Compare each observable acceptance criterion with the changed behavior.
- Check stated constraints, exclusions, invariants, and relevant failure paths.
- Check that the evidence exercises the required behavior on the reviewed change. Test source states intent; an executed result shows what ran.
- When the change touches authorization, trust, secrets, input, or code execution, inspect that boundary and its relevant negative cases. Skip generic security advice.

## Implementation and repository fit

- Check that the change uses the current owner or explains why a new owner is needed.
- Look for missed reuse, duplicated decisions, symptom-only fixes, unnecessary scope, and unsupported abstractions or dependencies.
- Apply documented repository standards first. Use broader maintainability heuristics only as suggestions, never as automatic violations.
- Judge minimality by whether each part is needed for a correct, safe, proven result, not by line count.

## Report

Return the reviewed diff or candidate ID when supplied. Report separate verdicts for `contract_behavior` and `implementation_fit`: `clear`, `changes_requested`, or `unable_to_review`. List proof gaps separately and identify any focused security boundary reviewed. A blocker in one area cannot be hidden by a clear result in the other.

Each finding names the affected behavior, evidence and location, why it matters, and the smallest useful correction. Separate blockers from advice. Omit unsupported style preferences. State what you could not establish and why. If nothing material is supported, say so plainly.
