---
name: patchy-rummage
description: Map an unfamiliar code or business-logic path without changing files.
disable-model-invocation: true
---

# Patchy Rummage

Inspect; do not edit unless the user separately asks for a change. Start from the question's entry point and trace only the path needed to answer it.

Answer the question first, then return only the smallest map needed to support it:

- entry point and caller;
- main decisions and their owners;
- data movement and side effects;
- important failure paths;
- tests or other evidence that support the map.

Then explain the requested path in order with file and symbol references. Mark each statement as **Observed**, **Inferred**, or **Unknown**. Identify the decision table only where it changes the answer: inputs, branches, authorization, state transitions, retries, and errors. Stop widening once another caller, boundary, or rule cannot change the answer; a focused explanation is not a repository tour.

For three or more similar map rows, use the compact TOON receipt defined in [the reference](../../references/toon-receipts.md). Keep the explanation in ordinary language and retain source locators. Do not turn a focused question into a repository tour. If finding exposes a risk or cleanup opportunity, list it separately with its evidence; do not repair it.
