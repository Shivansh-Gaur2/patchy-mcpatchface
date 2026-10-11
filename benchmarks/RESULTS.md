# Benchmark results

No comparative coding-productivity results are published yet. Package tests and Factory workflow table-tops do not establish coding speed or quality.

This file is intentionally a results ledger, not a marketing page. Add one section per completed case and preserve both successful and unsuccessful runs.

## Required protocol

For every Factory-eligible case, freeze model/version, reasoning settings, repository commit, task contract, tool access, time/cost limits, and verification environment across these arms:

1. **Patchy:** existing single-agent workflow.
2. **Factory Fast:** mapper → one builder → one reviewer.
3. **Factory Deep:** mapper + designer, one builder, then independent contract-behavior and implementation-fit reviews; assign focused security review when the changed boundary calls for it.

Collect at least five matched runs per task/arm. Alternate or randomize run order; reset each run to the same base. Keep complete transcripts, role outputs, diffs, commands and output, acceptance decision, changed lines, tokens/cost when available, wall time, developer-active time, and tool/agent calls. Blind-grade correctness, reuse, scope, and proof using the [scorecard](README.md#scorecard). Keep failed, partial, timed-out, environment-blocked runs and cases where the baseline performs better. Record the environment and verify that each assigned arm really ran.

Primary outcome: total accepted, correctly scoped code changes divided by total developer-active hours across every attempt in that arm. Count a failed, rejected, incorrect, or incomplete run in the time denominator, but not the accepted-change numerator. A task only counts as accepted when its prewritten behavior, scope, reuse, and proof criteria pass blind grading. Score repository walkthrough answers separately from code-change throughput.

Before collecting results, write down the minimum useful active-time improvement, maximum acceptable token/cost overhead, and quality tolerance. If those thresholds are not set, report the run as descriptive only. Any critical seeded defect or protected-scope violation accepted by Factory disqualifies a productivity claim for that pilot. Report per-task outcomes and medians/ranges alongside the aggregate so task mix cannot hide regressions.

## Decision rule

Factory earns adoption only if accepted throughput improves without a meaningful regression in correctness, scope, or proof, and without disproportionate human review or token/cost overhead. If the evidence is mixed, publish the split by task type and narrow lane routing. If it is neutral or worse, simplify or retire the extra orchestration. Do not claim “100x” from a small or unmatched sample. Fewer than five matched runs per arm/task is exploratory and supports no productivity claim.

## Result template

```markdown
## <case> — <repository>@<commit> — <date>

| Arm | Runs | Accepted / attempted | Correctness/scope/proof | Total active hours | Accepted changes / active hour | Median wall min | Median tokens/cost | Artifacts |
| --- | ---: | --- | --- | ---: | ---: | ---: | --- | --- |
| Patchy | 5+ |  |  |  |  |  |  |  |
| Factory Fast | 5+ |  |  |  |  |  |  |  |
| Factory Deep (if eligible) | 5+ |  |  |  |  |  |  |  |

Conclusion: <supported benefit, mixed result, no demonstrated benefit, or inconclusive>.
Failures and residual uncertainty: <links and concise notes>.
```
