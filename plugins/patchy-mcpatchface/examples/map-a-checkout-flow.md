# Example: explain a checkout flow without reading the whole repository

## Request

> Why can an order be paid but still not be fulfilment-ready?

## Patchy's rummage map

```text
Checkout endpoint
  → payment authorization
  → payment capture
  → order state transition
  → inventory reservation
  → fulfilment eligibility
```

Patchy does not assume that capture means fulfilment-ready. It traces the actual state transition and reports observed facts, inferences, and unknowns.

```text
Observed: capture moves the payment to `captured`, but the order remains `pending_inventory`.

Observed: fulfilment reads `inventory_reserved`, not payment state.

Inference: the system separates money collection from stock commitment to avoid promising unavailable inventory.

Unknown: the repository does not show whether an expired reservation triggers an automatic refund.
```
