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

I built Patchy because I got tired of typing the same five sentences into every coding agent.

"Don't touch that file." "We already have a service for this, go find it." "Please follow the patterns the repo already uses." "Don't rewrite half the module for a two-line fix." "Are you sure nothing else depends on this?"

Every single time. So I turned those sentences into a skill and gave it a face.

Patchy is a raccoon with a clipboard. It rummages through your codebase before it writes anything, finds the thing that already owns the decision, and reuses it instead of quietly adding a parallel copy next to it. It keeps to the design patterns and boundaries your repo already committed to, picks the smallest change that actually fits, and then tells you plainly what the proof covers and what it doesn't. No heroic refactors you didn't ask for. Nothing that looks clever in the diff and breaks on Monday.

It also speaks [TOON](references/toon-receipts.md) for the repetitive evidence bits (callers, reuse candidates, test results) so you burn fewer tokens on rows that all look the same. Prose stays prose. Tool payloads stay untouched.

And yes. It is a raccoon. That part is non-negotiable.

## The problems Patchy is built to handle

| You should not have to repeat | Patchy's working behavior |
| --- | --- |
| “Do not touch these files, APIs, or migrations.” | Capture them as hard constraints before choosing a design. |
| “Use the existing implementation if one exists.” | Search for the current owner, policies, helpers, fixtures, and callers before adding an abstraction. |
| “Make this architecturally clean.” | For a material choice, compare one credible alternative and prefer the smallest cohesive design with one owner per decision. |
| “Could there be business logic outside this ticket?” | Widen only for sibling callers, shared state, permissions, persistence, retries, or external boundaries that can change the patch or proof. |
| “There is no relevant test yet.” | Find the nearest characterization, contract, integration, or acceptance seam; otherwise name the missing proof rather than treating a green unrelated suite as safety. |
| “Explain this without a repository dump.” | Answer first, distinguish observed facts from inference and unknowns, and stop tracing when more context cannot change the answer. |

Patchy is not magic. It can't prove every business rule in your head, and it won't replace someone who has lived in the codebase for three years. What it does is keep the digging proportional to the task, say out loud when there's a gap, and keep "here's a better direction" separate from "I went and did it anyway."

## Before and after

Say you ask for partial refunds.

A normal agent happily spins up a shiny new `PartialRefundService`, copy-pastes the authorization check, pokes a data model it had no business touching, and ships one happy-path test.

Patchy goes looking first. It finds the refund owner, the authorization policy, the audit path, and the payment states. Then you get an actual contract:

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

Patchy only brings up an alternative design when the evidence says the route you asked for would duplicate a decision, harden a boundary that's already shaky, or leave the same bug waiting to happen again. The patch you asked for stays separate from that suggestion unless you say go.

One thing I'm stubborn about: compiling and a green happy-path test are evidence, not proof. They don't cover every business rule a change can reach. [Proof tiers](references/proof-tiers.md) spells that out.

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

The current `0.4.0` release has executable repository evidence, but not yet comparative agent benchmarks. It validates the package, local documentation links, strict TOON receipts, token fixture, fallback instructions, and generated marketplace copy:

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

Want to help establish the evidence? Run the [community trial guide](docs/community-trial.md) on a safe real task, then submit a reproducible benchmark report. Neutral and negative results are welcome.

For repeated, uniform evidence records, the [TOON comparison](benchmarks/toon-token-comparison.md) measures a 27.6% reduction against compact JSON and 4.1% against a concise Markdown table with a pinned `o200k_base` tokenizer. This is a format-level result for that fixture, not a claim that every task or Codex model uses fewer tokens.

Run the repository checks with:

```text
npm test
```

That verifies the marketplace catalog, generated plugin package, every shipped skill, and the fallback copies. GitHub Actions runs the same check on pushes and pull requests.

## Contributing

Honestly, this is the part I care about most. Please try it on a real repo and tell me where it annoyed you.

If Patchy over-explained, missed an obvious existing helper, widened scope when it shouldn't have, or wrote a receipt that wasn't useful, open an issue with the case. A failing case is more valuable to me than a star. PRs very welcome too, especially new benchmark cases, sharper wording in a skill, or a fallback that works better on a host I haven't tried.

[CONTRIBUTING.md](CONTRIBUTING.md) explains what belongs in Patchy. [CHANGELOG.md](CHANGELOG.md) records releases, and the [maintainer checklist](docs/maintainer-checklist.md) covers the GitHub settings and release controls that repository files can't enforce. One rule of thumb: a rule earns its place only when it changes a real engineering decision.

## Why the name?

Patchy is that coworker who crawls out from under a pile of old code holding the exact helper you were about to rewrite from scratch. The clipboard has the edge cases you forgot to ask about.

Also raccoons go through other people's trash for a living. Felt appropriate.

## License

[MIT](LICENSE).
