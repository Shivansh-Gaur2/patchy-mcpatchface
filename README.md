<p align="center">
  <img src="assets/patchy-mascot.png" width="220" alt="Patchy McPatchface, a raccoon holding a clipboard beside a terminal">
</p>

<h1 align="center">Patchy McPatchface</h1>

<p align="center">
  <em>Your codebase raccoon with a clipboard.</em><br>
  Finds the old thing before building a new one.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/skill-SKILL.md-1f2937?style=flat-square" alt="Portable SKILL.md skill">
  <img src="https://img.shields.io/badge/approach-reuse%20before%20rewrite-D97706?style=flat-square" alt="Reuse before rewrite">
  <img src="https://img.shields.io/badge/proof-behavior%20first-0F766E?style=flat-square" alt="Behavior first proof">
  <img src="https://img.shields.io/badge/license-MIT-1f2937?style=flat-square" alt="MIT license">
</p>

Small requests are where agents get oddly ambitious. A partial refund becomes a new service. A familiar rule gets copied into a handler. The test proves the happy case and nobody checks the payment state it skipped.

Patchy reads the code and tests around the change first. It looks for the current owner of the behavior, checks what can be reused, and reports what the checks covered when the patch is finished.

## Before and after

Say you need partial refunds.

An ordinary agent can add `PartialRefundService`, repeat the authorization check, touch a data model it did not need to touch, and test that one refund succeeds.

Patchy starts by finding the refund owner, authorization policy, audit path, and payment states. That gives it a useful checklist:

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

## How it works

Patchy has three modes:

| Mode | What it does |
| --- | --- |
| Patch | Builds or fixes a feature with a clear scope, a reuse check, and checks that fit the risk. |
| Rummage | Explains an unfamiliar behavior path without making you read the whole repository. |
| Clipboard | Reviews a diff for scope drift, repeated logic, and behavior that still lacks evidence. |

The usual loop is simple:

```text
Rummage → find the behavior and the code that owns it
Patch    → make the smallest change that fits
Clipboard → report what passed, what did not run, and what is still unknown
```

Compilation and a passing happy-path test are useful evidence. They do not establish every affected business rule. [proof-tiers.md](references/proof-tiers.md) describes the evidence Patchy reports.

## Use it

```text
$patchy-mcpatchface add partial refunds without changing the billing schema
```

Use Patchy for feature work, bug fixes, unfamiliar codebases, focused code explanations, and meaningful diff reviews. For a tiny local edit, it confirms the target and nearby reuse before making the change.

## Install

Patchy is a `SKILL.md` bundle. Clone it into your agent's skills directory, then start a new chat.

### Codex on macOS or Linux

```bash
git clone https://github.com/Shivansh-Gaur2/patchy-mcpatchface.git ~/.codex/skills/patchy-mcpatchface
```

### Codex on Windows PowerShell

```powershell
git clone https://github.com/Shivansh-Gaur2/patchy-mcpatchface.git "$env:USERPROFILE\.codex\skills\patchy-mcpatchface"
```

Compatible skill hosts can load the same folder from their own skills directory. Patchy stays opt-in so it can spend more context on the work that needs it.

## Benchmarks

Patchy has no benchmark or safety numbers yet. [The benchmark plan](benchmarks/README.md) describes the first comparison: fixed repository tasks, the same agent with and without Patchy, raw diffs and test output, and the cases where Patchy adds work without helping.

## Contributing

[CONTRIBUTING.md](CONTRIBUTING.md) explains how to add a rule. The short version: a rule belongs here only when it changes a real engineering decision.

## Why the name?

Patchy is the coworker who crawls out from under a pile of old code carrying the helper you were about to rewrite. The clipboard has the edge cases you forgot to ask about.

## License

[MIT](LICENSE).
