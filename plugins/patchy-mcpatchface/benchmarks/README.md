# Benchmark plan

Patchy should earn claims before it makes them. This folder defines the experiment; it does not contain performance results yet.

## Question

Does Patchy improve the quality of non-trivial code changes without creating disproportionate token, time, or code overhead?

## Comparison

Run the same coding agent, repository revision, task prompt, tool access, and verification environment in two arms:

1. Baseline: the agent without Patchy.
2. Patchy: the same agent with Patchy enabled.

Use at least three independent runs per task. Preserve complete transcripts, diffs, commands, and test results.

## Task set

The first set should include realistic tasks with known traps:

- A feature that should reuse an existing service or policy.
- A bug fix with a hidden cross-module invariant.
- A change with no existing focused test.
- A request with an explicit out-of-scope boundary.
- A repository walkthrough question whose answer must separate facts from inference.

## Scorecard

| Measure | Evidence |
| --- | --- |
| Behavioral correctness | Acceptance and regression checks pass. |
| Reuse quality | The diff extends the right existing owner or justifies a new one. |
| Scope discipline | No unrelated files, dependencies, APIs, or refactors without a stated reason. |
| Proof quality | Tests cover changed obligations; untested behavior is named. |
| Efficiency | Changed LOC, tokens, elapsed time, and tool calls. |

Publish failures, counterexamples, and cases where Patchy adds unnecessary process. Do not collapse the score into one flattering number.
