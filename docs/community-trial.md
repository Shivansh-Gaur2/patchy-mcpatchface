# Try Patchy on a real repository

The useful question is not whether Patchy sounds senior. It is whether it changes an engineering outcome: a protected boundary stays untouched, an existing owner is reused, a hidden rule is found, or an unproven behavior is named before it causes trouble.

This guide produces a comparison that others can inspect.

## Pick a safe task

Choose a small, non-production-changing task in a public repository or a redacted reproducible fixture. Good tasks have at least one real trap:

- an explicit file, API, or migration boundary that must not change;
- an existing service, policy, helper, or fixture that ought to be reused;
- a cross-module state or permission rule that is easy to miss;
- a new behavior without an obvious focused test;
- a code-path question where facts and inference need separating.

Avoid tasks containing credentials, customer data, unreleased code, or a production deployment. Do not publish a transcript until it has been redacted.

## Run a paired trial

Use two fresh sessions with the same repository commit, task prompt, model, reasoning setting, tool access, and time budget.

1. **Baseline:** run the task without Patchy.
2. **Patchy:** run the exact same task with the relevant Patchy entry point enabled.
3. Run each arm three times when practical; agent runs vary.
4. Preserve the final diff, commands, tests, elapsed time, token count when available, and the agent's final receipt.

Example task:

```text
Add validation so cancelled orders cannot be refunded.
Do not modify the payment-provider integration.
```

For the Patchy arm, add the entry point appropriate to your host, such as:

```text
@patchy

Add validation so cancelled orders cannot be refunded.
Do not modify the payment-provider integration.
```

## Score the evidence, not the tone

| Dimension | What to inspect |
| --- | --- |
| Acceptance | Did the requested behavior and relevant checks pass? |
| Constraints | Did protected files, APIs, and migrations remain untouched? |
| Reuse | Did the diff extend the existing owner when its contract fit? |
| Scope | Did it avoid unrelated dependencies, files, and refactors? |
| Proof | Did tests cover the changed decision, or did the report name the missing seam? |
| Cost | Compare changed lines, tokens, tool calls, and elapsed time. |

A green unrelated suite does not establish a new rule. A smaller diff is not automatically better if it misses a required business path. Record both outcomes.

## Publish the result

Open a [community benchmark report](../.github/ISSUE_TEMPLATE/benchmark_report.md) with the same evidence requested by [the results ledger](../benchmarks/RESULTS.md). Link raw artifacts when public, or provide a minimal redacted reproduction when they are not.

Publish neutral and negative results. Patchy earns its place only where the comparison shows a benefit worth its context cost.

## Share your trial

Use this short description when sharing a result:

```text
I ran the same coding task with and without Patchy on <repository>@<commit>.
The task involved <constraint/reuse/hidden-rule/test-seam risk>.
Result: <supported benefit, mixed result, or no demonstrated benefit>.
Artifacts: <link>.
```
