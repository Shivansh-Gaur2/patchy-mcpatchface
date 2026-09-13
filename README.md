<p align="center">
  <img src="assets/patchy-mascot.png" width="220" alt="Patchy McPatchface, a raccoon holding a clipboard beside a terminal">
</p>

<h1 align="center">Patchy McPatchface</h1>

<p align="center">
  <em>Your codebase raccoon with a clipboard.</em><br>
  Finds the old thing before building a new one.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Codex-plugin%20ready-D97706?style=flat-square" alt="Codex plugin ready">
  <img src="https://img.shields.io/badge/skills-4-1f2937?style=flat-square" alt="Four focused skills">
  <img src="https://img.shields.io/badge/proof-behavior%20first-0F766E?style=flat-square" alt="Behavior first proof">
  <img src="https://img.shields.io/badge/license-MIT-1f2937?style=flat-square" alt="MIT license">
</p>

Patchy is a senior-engineer raccoon for the moments when “just make the change” is not enough. It protects the constraints you name, finds behavior that already owns the decision, compares a better direction when the design is material, and tells you what the proof actually covers.

It is built for the uncomfortable parts of agentic coding: the file that must not change, the policy hidden behind a second caller, the existing helper an agent might duplicate, the new behavior with no test seam, and the business-logic walkthrough that should answer one question without narrating the entire repository.

## The problems Patchy is built to handle

| You should not have to repeat | Patchy's working behavior |
| --- | --- |
| “Do not touch these files, APIs, or migrations.” | Capture them as hard constraints before choosing a design. |
| “Use the existing implementation if one exists.” | Search for the current owner, policies, helpers, fixtures, and callers before adding an abstraction. |
| “Make this architecturally clean.” | For a material choice, compare one credible alternative and prefer the smallest cohesive design with one owner per decision. |
| “Could there be business logic outside this ticket?” | Widen only for sibling callers, shared state, permissions, persistence, retries, or external boundaries that can change the patch or proof. |
| “There is no relevant test yet.” | Find the nearest characterization, contract, integration, or acceptance seam; otherwise name the missing proof rather than treating a green unrelated suite as safety. |
| “Explain this without a repository dump.” | Answer first, distinguish observed facts from inference and unknowns, and stop tracing when more context cannot change the answer. |

Patchy does not promise omniscience. It cannot prove every unknown business rule or replace a maintainer’s domain knowledge. Its job is to make the investigation proportional, make a gap visible, and keep a useful better direction separate from unauthorized scope expansion.

## Before and after

Say you need partial refunds.

An ordinary agent can add `PartialRefundService`, repeat the authorization check, touch a data model it did not need to touch, and test one happy path.

Patchy finds the refund owner, authorization policy, audit path, and payment states. That gives it a useful contract:

```text
Reuse: PaymentService.refund() and the existing authorization policy

Must remain true:
- A refund cannot exceed the captured amount.
- A cancelled payment cannot be refunded.
- Every refund is auditable.

Proof:
- Partial-refund behavior passes.
- Over-refund and cancelled-payment paths are covered.
- The final diff contains no parallel refund service.
```

[The full refund example](examples/refund-boundary.md) shows the investigation. [The checkout example](examples/map-a-checkout-flow.md) shows how Patchy explains a behavior path.

## How a senior raccoon works

The repository includes a Codex marketplace, a plugin bundle, a portable `SKILL.md`, and instruction fallbacks. The root content is the source of truth. The marketplace payload is generated from it, and the checks catch drift.

| Entry point | Use it for |
| --- | --- |
| `patchy` | A feature, bug fix, or refactor where scope, behavior, reuse, or proof could go wrong. |
| `patchy-rummage` | A business-logic or code-path explanation without editing files. |
| `patchy-clipboard` | An existing diff that needs a scope, reuse, and proof audit. |
| `patchy-help` | A quick reminder of the entry points. |

The working loop is simple:

```text
Constraints → capture protected surfaces and exclusions
Rummage    → find the behavior and the code that owns it
Patch       → make the smallest cohesive change that fits
Clipboard   → report what passed, what did not run, and what is still unknown
```

Patchy introduces an alternative only when evidence shows the requested route would duplicate a decision, deepen a fragile boundary, or leave a recurring problem unsolved. The required patch stays separate from that optional direction unless you expand the scope.

Compilation and a passing happy-path test are evidence. They do not establish every business rule that a change can reach. [Proof tiers](references/proof-tiers.md) make that boundary explicit.

## Compact context, not a repository dump

Patchy spends context in stages. It begins with repository guidance, the request, the likely owner, and the closest tests. It widens the search only when a missing caller, decision, boundary, or invariant could change the patch or its proof.

For repeated records such as callers, reuse candidates, and verification results, Patchy can use [TOON](references/toon-receipts.md): a compact, row-oriented format that keeps like-shaped evidence together. Explanations remain plain language. Tool payloads, configuration, APIs, and irregular nested data keep their native format. This is a context-saving technique, not a universal promise that every task or model uses fewer tokens.

## Install

### Codex plugin

```text
codex plugin marketplace add Shivansh-Gaur2/patchy-mcpatchface --ref master
codex plugin add patchy-mcpatchface@patchy-mcpatchface
```

Start a new Codex task after installation. Invoke the plugin skills with `@patchy`, `@patchy-rummage`, or `@patchy-clipboard`.

The marketplace is published from `master`. In this checkout, the validated release line is on `master`, while the cached `origin/main` ref points to the older portable-skill history. If GitHub shows an older version, confirm the public branch state, then either make `master` the repository's default branch or merge the release line into `main` and publish from `main` consistently. After changing the source, remove the cached marketplace entry and reinstall:

```text
codex plugin marketplace remove patchy-mcpatchface
codex plugin marketplace add Shivansh-Gaur2/patchy-mcpatchface --ref master
codex plugin add patchy-mcpatchface@patchy-mcpatchface
```

### Portable skill bundle

Clone the repository into a skill directory, then start a new chat.

```powershell
git clone https://github.com/Shivansh-Gaur2/patchy-mcpatchface.git "$env:USERPROFILE\.codex\skills\patchy-mcpatchface"
```

The root [SKILL.md](SKILL.md) is the portable entry point. [AGENTS.md](AGENTS.md) and [Copilot instructions](.github/copilot-instructions.md) are instruction-only fallbacks for hosts that read those files; they do not pretend to provide plugin commands or lifecycle hooks.

## Evidence

The current release has executable repository evidence, but not yet comparative agent benchmarks. The `0.3.2` release validates the package, local documentation links, strict TOON receipts, token fixture, fallback instructions, and generated marketplace copy:

```text
plugin package is coherent
local Markdown links are valid
TOON receipt examples pass official strict decoding and round-trip validation
TOON token comparison passes its fixture assertions
fallback copies are aligned
marketplace plugin package is aligned
```

These checks prove the shipped package and its references agree; they do not prove that Patchy improves every coding task. The benchmark cases below—including [constraint and design judgment](benchmarks/cases/constraint-and-design.md)—still require paired runs with and without Patchy.

## Benchmarks

Patchy has no performance or safety numbers yet. Its [benchmark suite](benchmarks/README.md) has named cases, a scorecard, and a method for comparing the same agent with and without Patchy. The [results ledger](benchmarks/RESULTS.md) defines the required artifacts and the decision rule for whether the skill earns its context cost. It will publish raw diffs, test output, failure cases, and counterexamples before making claims about speed, tokens, or correctness.

For repeated, uniform evidence records, the [TOON comparison](benchmarks/toon-token-comparison.md) measures a 27.6% reduction against compact JSON and 4.1% against a concise Markdown table with a pinned `o200k_base` tokenizer. This is a format-level result for that fixture, not a claim that every task or Codex model uses fewer tokens.

Run the repository checks with:

```text
npm test
```

That verifies the marketplace catalog, generated plugin package, every shipped skill, and the fallback copies. GitHub Actions runs the same check on pushes and pull requests.

## Contributing

[CONTRIBUTING.md](CONTRIBUTING.md) explains what belongs in Patchy. [CHANGELOG.md](CHANGELOG.md) records releases, and the [maintainer checklist](docs/maintainer-checklist.md) covers the GitHub settings and release controls that cannot be enforced by repository files. A rule earns its place only when it changes a real engineering decision.

## Why the name?

Patchy is the coworker who crawls out from under a pile of old code carrying the helper you were about to rewrite. The clipboard has the edge cases you forgot to ask about.

## License

[MIT](LICENSE).
