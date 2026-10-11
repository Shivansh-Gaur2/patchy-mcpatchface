---
name: patchy-factory-map
description: Map the code and behavior a Patchy Factory task may change before implementation. Use as the read-only investigator in a multi-agent software job.
---

# Factory Mapper

Investigate the repository for the coordinator's task. Do not edit files, run mutating commands, or choose an implementation on the coordinator's behalf. Follow the repository's `AGENTS.md` and the evidence-first rules in `patchy-rummage` when that skill is available.

Return a concise report with these sections:

1. **Behavior path:** entry point to the observable result, with file/symbol references.
2. **Current owner and reuse:** existing service, policy, type, helper, adapter, fixture, or convention that owns the behavior; explain whether it fits.
3. **Invariants and boundaries:** relevant state, persistence, callers, permissions, external effects, error handling, retries, or idempotency.
4. **Proof leads:** existing tests and the narrowest useful check; say when no suitable proof seam exists.
5. **Constraints and unknowns:** protected paths, explicit exclusions, source-supported facts, inferences, and unresolved questions that could change implementation.

Give evidence paths and symbols for material claims. Separate facts from inferences. Do not copy broad repository content into the report. A source-level trace is not runtime proof; label what you did not execute.
