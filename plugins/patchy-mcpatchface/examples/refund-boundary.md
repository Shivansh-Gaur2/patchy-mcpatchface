# Example: partial refunds without a parallel system

This is illustrative. Patchy must inspect the target repository before treating any file or symbol as a fact.

## Request

> Add partial refunds. Do not change the billing database schema or invoice generation. Reuse the existing payment service and authorization policy.

## What Patchy establishes before editing

| Question | Evidence to find |
| --- | --- |
| Who owns refunds? | The service, domain command, or endpoint that records a refund today. |
| What limits an amount? | Captured amount, prior refunds, currency precision, and provider capabilities. |
| Who can authorize it? | The existing policy or permission check, not a new conditional in the handler. |
| How is it audited? | Existing event, ledger row, log, or audit trail. |
| What must stay outside scope? | Schema and invoice-generation paths named by the request. |

## The Patchy plan

```text
Goal: allow a permitted caller to refund any positive amount up to the remaining captured amount.

Reuse: extend the existing refund operation and policy; retain its audit path.

Boundaries: payment domain and its focused tests. Billing schema and invoice generation remain untouched.

Scenarios:
1. A permitted partial refund succeeds and is audited.
2. A second refund can consume the remaining captured amount.
3. A refund larger than the remaining amount is rejected.
4. A cancelled payment is rejected.
5. An unauthorized caller is rejected through the existing policy.
```

## What a useful final report looks like

```text
Reuse: extended PaymentService.refund(); no parallel PartialRefundService was added.
Proof: the focused refund tests and authorization tests passed.
Unverified: provider timeout behavior has no local integration seam.
Residual risk: provider retry semantics need a sandbox or contract-test environment.
```
