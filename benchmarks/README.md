# Patchy productivity benchmark

Patchy should earn productivity claims before it makes them. This folder defines the experiment; it contains no measured Factory productivity result yet.

## Question

Does the modular Factory produce more accepted, correctly scoped changes per developer-active hour than ordinary Patchy, without lowering correctness or increasing review burden, cost, or escaped defects?

The claim to test is: **Patchy Factory increases accepted changes per developer-active hour while maintaining or improving correctness, scope discipline, and proof quality against the single-agent Patchy baseline.** Do not print a percentage or “100×” claim before the protocol below has completed. A useful result may be neutral or negative.

## Comparison

For Factory-eligible non-trivial cases, compare the same model version, repository revision, task contract, tool access, time/cost budget, and verification environment across these arms:

1. **A — Patchy:** existing single-agent Patchy workflow.
2. **B — Factory Fast:** mapper → one builder → one reviewer.
3. **C — Factory Deep:** parallel mapper/designer, one builder, then independent contract-behavior and implementation-fit reviews. Assign focused security review only when the change reaches a security boundary. Run C only when the case's predeclared risk calls for the deep lane.

For each eligible task/arm, collect at least five matched runs. Alternate or randomize run order so one arm does not always benefit from warm caches, model load, or researcher learning. Keep the task contract fixed and reset to the same repository base between runs. Preserve full transcripts, diffs, commands, test output, role outputs, and any retry or timeout. Include failed runs. Have a grader who does not know the arm score the final change against the prewritten rubric. Do not count incomplete, rejected, or incorrect changes as productive completions.

Record machine/host, OS, CPU and memory class when available, repository setup, concurrency, model/version, reasoning settings, token or API cost when observable, and environmental failures. For this AI task benchmark, CPU load is not a substitute for model/token/cost measurements; note host contention only if it could affect wall time. Count developer-active minutes for reading, steering, resolving conflicts, reviewing, and repairing. Also capture end-to-end elapsed time and tool/agent failures. Report median and range by task and arm, not just a grand average.

## Task set

Use reproducible work in real repositories at pinned commits. Include:

- A feature that should reuse an existing service or policy.
- A bug fix with a hidden cross-module invariant.
- A change with no existing focused test.
- A request with an explicit out-of-scope boundary.
- A repository walkthrough question whose answer must separate facts from inference; score it in an answer-quality track, not as a completed code change.
- A security-sensitive authorization change with an executable regression check.
- A tiny-edit negative control, expected to stay on ordinary `patchy` because orchestration may cost more than it saves.
- A cross-module or ambiguous task where deep planning might help.
- A review task with separate contract and implementation findings, including at least one case where the two lenses reach different conclusions.

## Scorecard

| Measure | Evidence |
| --- | --- |
| Behavioral correctness | Acceptance and regression checks pass. |
| Reuse quality | The diff extends the right existing owner or justifies a new one. |
| Scope discipline | No unrelated files, dependencies, APIs, or refactors without a stated reason. |
| Proof quality | Tests cover changed obligations; untested behavior is named. |
| Review quality | Blind grading measures actionable findings missed, false-positive blockers, axis separation, and reviewer disagreement. |
| Efficiency | Changed LOC, tokens, elapsed time, and tool calls. |
| Active developer time | Total human-active minutes across all attempts; include setup, steering, review, and repair time. |
| Factory overhead | Agent count, role failures/timeouts, retries, setup friction, and token/cost delta. |
| Escaped defects | Seeded invariant or regression missed by the final checks/review, found by blind grading. |

## Checklist before reporting a number

- Confirm each arm really ran with its assigned instructions, model/reasoning settings, and tool access; include a task only when this is verifiable.
- Inspect each diff and check result. A fast answer that skipped the task or checks is not higher throughput.
- Define an accepted code change before running: it passes every prewritten behavior, scope, reuse, and proof criterion in blind grading. Count a failed, rejected, incomplete, or incorrect run in the active-time denominator, but not in the accepted-task numerator. Compute accepted throughput as total accepted code changes divided by total developer-active hours for all attempts. Report per-task outcomes so an easy task mix cannot hide regressions. Score walkthrough answers in a separate quality track.
- Before looking at results, predeclare the minimum useful active-time improvement, maximum token/cost overhead, and any quality tolerance. If none is set, treat the trial as descriptive only. Any critical seeded defect or protected-scope violation accepted by Factory disqualifies a productivity claim for that pilot; do not average it away.
- Compare acceptance, correctness, scope, reuse, proof, repair, review, cost, and human time together. Keep full failures and retry costs in the denominator.
- Keep failed, partial, timed-out, and environment-blocked runs visible. Distinguish product failures from environment failures.
- Report sample count, task mix, median and range. With fewer than five matched runs per arm/task, label findings exploratory and do not make a productivity claim.
- Repeat an unexpected result. Do not claim causation from a single unusually slow or fast run.

Publish failures, counterexamples, and cases where Patchy adds unnecessary process. Do not collapse quality and cost into one flattering number. If the protocol cannot establish the intended comparison, report it as inconclusive.
