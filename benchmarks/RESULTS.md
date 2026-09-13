# Benchmark results

No comparative results are published yet.

This file is intentionally a results ledger, not a marketing page. Add one section per completed case and preserve both successful and unsuccessful runs.

## Required protocol

For every case, run the same model, repository commit, task prompt, tool access, time budget, and verification environment in both arms:

1. **Baseline:** the agent without Patchy.
2. **Patchy:** the same agent with the relevant Patchy entry point enabled.

Run each arm at least three times. Store or link the complete transcripts, final diffs, commands and output, acceptance outcome, changed lines, tokens, elapsed time, and tool calls. Score correctness, reuse, scope, and proof using the [scorecard](README.md#scorecard). Keep failed runs and cases where the baseline performs better.

## Decision rule

Patchy is worth its context cost only if it improves acceptance, reuse, scope discipline, or proof quality on the predeclared task set without a disproportionate increase in tokens or elapsed time. If the evidence is mixed, publish the split by task type and narrow the skill's activation guidance. If it is consistently worse or neutral, simplify or retire the instructions instead of reframing the result.

## Result template

```markdown
## <case> — <repository>@<commit> — <date>

| Arm | Runs | Acceptance | Reuse/scope/proof notes | Median tokens | Median time | Artifacts |
| --- | ---: | --- | --- | ---: | ---: | --- |
| Baseline | 3 |  |  |  |  |  |
| Patchy | 3 |  |  |  |  |  |

Conclusion: <supported benefit, mixed result, or no demonstrated benefit>.
Failures and residual uncertainty: <links and concise notes>.
```
