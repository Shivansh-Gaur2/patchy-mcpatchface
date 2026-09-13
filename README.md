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

Small requests are where agents get oddly ambitious. A partial refund becomes a new service. A familiar rule gets copied into a handler. The test proves one refund succeeds and nobody checks the payment state it skipped.

Patchy reads the path around the change first. It finds the current owner of a behavior, looks for code worth reusing, turns the relevant rules into proof obligations, and says what the final checks did and did not establish.

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

## What you get

Patchy ships a real Codex marketplace, a plugin bundle, a portable `SKILL.md`, and lightweight instruction fallbacks. The repository root is the source of truth; the marketplace payload is generated from it and validation catches drift.

| Entry point | Use it for |
| --- | --- |
| `patchy` | A feature, bug fix, or refactor where scope, behavior, reuse, or proof could go wrong. |
| `patchy-rummage` | A business-logic or code-path explanation without editing files. |
| `patchy-clipboard` | An existing diff that needs a scope, reuse, and proof audit. |
| `patchy-help` | A quick reminder of the entry points. |

The loop is deliberately simple:

```text
Rummage → find the behavior and the code that owns it
Patch    → make the smallest change that fits
Clipboard → report what passed, what did not run, and what is still unknown
```

Compilation and a passing happy-path test are evidence. They do not establish every business rule that a change can reach. [Proof tiers](references/proof-tiers.md) make that boundary explicit.

## Install

### Codex plugin

```text
codex plugin marketplace add Shivansh-Gaur2/patchy-mcpatchface --ref master
codex plugin add patchy-mcpatchface@patchy-mcpatchface
```

Start a new Codex task after installation. Invoke the plugin skills with `@patchy`, `@patchy-rummage`, or `@patchy-clipboard`.

### Portable skill bundle

Clone the repository into a skill directory, then start a new chat.

```powershell
git clone https://github.com/Shivansh-Gaur2/patchy-mcpatchface.git "$env:USERPROFILE\.codex\skills\patchy-mcpatchface"
```

The root [SKILL.md](SKILL.md) is the portable entry point. [AGENTS.md](AGENTS.md) and [Copilot instructions](.github/copilot-instructions.md) are instruction-only fallbacks for hosts that read those files; they do not pretend to provide plugin commands or lifecycle hooks.

## Trust, not theatre

Patchy has no performance or safety numbers yet. Its [benchmark suite](benchmarks/README.md) has named cases, a scorecard, and a method for comparing the same agent with and without Patchy. It will publish raw diffs, test output, failure cases, and counterexamples before it makes claims about speed, tokens, or correctness.

Run the repository checks with:

```text
npm test
```

That verifies the marketplace catalog, generated plugin package, every shipped skill, and the fallback copies. GitHub Actions runs the same check on pushes and pull requests.

## Contributing

[CONTRIBUTING.md](CONTRIBUTING.md) explains what belongs in Patchy. [CHANGELOG.md](CHANGELOG.md) records releases. The short version: a rule earns its place only when it changes a real engineering decision.

## Why the name?

Patchy is the coworker who crawls out from under a pile of old code carrying the helper you were about to rewrite. The clipboard has the edge cases you forgot to ask about.

## License

[MIT](LICENSE).
