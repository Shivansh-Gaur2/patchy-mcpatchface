<p align="center">
  <img src="assets/patchy-mascot.png" width="220" alt="Patchy McPatchface, a raccoon holding a clipboard beside a terminal">
</p>

<h1 align="center">Patchy McPatchface</h1>

<p align="center">
  <em>Your codebase raccoon with a clipboard.</em><br>
  Rummages first. Patches second. Asks for receipts.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/skill-SKILL.md-1f2937?style=flat-square" alt="Portable SKILL.md skill">
  <img src="https://img.shields.io/badge/approach-reuse%20before%20rewrite-D97706?style=flat-square" alt="Reuse before rewrite">
  <img src="https://img.shields.io/badge/proof-behavior%20first-0F766E?style=flat-square" alt="Behavior first proof">
  <img src="https://img.shields.io/badge/license-MIT-1f2937?style=flat-square" alt="MIT license">
</p>

---

You ask an agent for a small change. It creates a new helper, repeats a business rule hidden elsewhere, adds a happy-path test, and calls it done.

Patchy crawls through the repo first. It finds the existing service, traces the behavior that the change can affect, keeps the patch inside the story, and tells you what the checks actually established.

## Before / after

You ask for partial refunds.

Without Patchy, an agent may introduce `PartialRefundService`, duplicate authorization, change a data model it did not need to touch, and test only that a refund succeeds.

With Patchy, the agent first looks for the refund owner, existing authorization policy, audit mechanism, and payment states. It turns the request into concrete obligations:

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

See [the full refund example](examples/refund-boundary.md) and [a business-logic walkthrough](examples/map-a-checkout-flow.md).

## How Patchy works

Patchy has three working modes:

| Mode | What Patchy does |
| --- | --- |
| **Patch** | Builds or fixes a feature with a tight scope, reuse check, and proportionate verification. |
| **Rummage** | Explains an unfamiliar behavior path without dumping the entire repository. |
| **Clipboard** | Audits a diff for scope drift, duplicate logic, and unproven behavior. |

For a non-trivial change, Patchy follows one loop:

```text
Rummage → find the real behavior and existing owner
Patch    → make the smallest coherent change
Clipboard → show what passed, what did not, and what remains uncertain
```

It treats compilation and a happy-path test as useful evidence, not a complete proof of business correctness. The evidence levels are defined in [proof-tiers.md](references/proof-tiers.md).

## Use it

```text
$patchy-mcpatchface add partial refunds without changing the billing schema
```

Use Patchy for feature work, bug fixes, unfamiliar codebases, focused code explanations, and audits of a meaningful diff. For a tiny local edit, it takes a lighter pass rather than performing a ceremony around a one-line change.

## Install

Patchy is a portable `SKILL.md` bundle. Clone it into your agent's skills directory, then start a new chat.

### Codex on macOS or Linux

```bash
git clone https://github.com/Shivansh-Gaur2/patchy-mcpatchface.git ~/.codex/skills/patchy-mcpatchface
```

### Codex on Windows PowerShell

```powershell
git clone https://github.com/Shivansh-Gaur2/patchy-mcpatchface.git "$env:USERPROFILE\.codex\skills\patchy-mcpatchface"
```

Other skill-capable agents can use the same repository by placing it in their skills directory. Patchy deliberately ships as a skill, not an always-on hook: it should spend deep context only when the task merits it.

## Benchmarks

Patchy makes no performance or safety claims yet. The benchmark plan is public in [benchmarks/README.md](benchmarks/README.md): compare a fixed set of repository tasks with and without Patchy, score both behavioral correctness and engineering quality, and publish the raw outputs and limitations.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before adding a rule. Every new instruction must change an observed decision; a longer prompt is not automatically a better skill.

## Why the name?

Because Patchy is the coworker who appears from under a pile of old code holding the exact helper you were about to rewrite, a clipboard full of edge cases, and an unreasonable amount of confidence about where the business rule lives.

## License

[MIT](LICENSE).
