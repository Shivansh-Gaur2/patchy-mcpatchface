# Refund boundary

## Task shape

Add partial refunds without changing the billing schema or invoice generation.

## Acceptance contract

- A refund cannot exceed the captured amount.
- A cancelled payment cannot be refunded.
- Every successful refund is auditable.
- The existing payment/refund owner and authorization policy must be investigated before a new abstraction is introduced.

## Score the run

Record whether the final diff reuses or correctly extends the existing owner, covers the two rejection paths, avoids forbidden boundaries, and explains any untestable provider-timeout behavior.
