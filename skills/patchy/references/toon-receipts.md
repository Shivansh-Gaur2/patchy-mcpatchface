# Compact TOON receipts

TOON is a compact, line-oriented representation of structured data. Patchy uses it for evidence that has three or more records with the same fields. It is an optional presentation layer for an agent conversation, not a replacement for a repository's data format.

## Use it here

Use a TOON block when the agent needs to carry or report a short, uniform list of:

- impacted callers or boundaries;
- reuse candidates and the decision made about each;
- verification scenarios and their result;
- open evidence items with the same status fields.

Keep a source locator in the surrounding prose or in a simple field when it is safe to do so. A label such as `observed`, `inferred`, or `unknown` belongs in every evidence row.

```toon
impact[3]{item,role,status}:
  PaymentService.refund,owner,observed
  CaptureRepository,dependency,observed
  ProviderTimeout,external-path,unknown
```

Read it as three `impact` records, each with `item`, `role`, and `status`. The declared count and the field list make a copied receipt easier to scan and check.

## Keep the right format for the job

Do not convert these to TOON:

- `package.json`, plugin manifests, marketplace catalogs, or any other required JSON;
- API requests, API responses, database records, or tool payloads;
- source code, stack traces, commands, or logs;
- deeply nested or irregular data;
- a single finding, an engineering decision, or an explanation for a person.

Use concise prose for conclusions. Use Markdown when the shape is mixed. Preserve JSON where a tool or repository expects JSON. A shorter character count does not guarantee fewer tokens for every model, so measure with the target model before making a token-saving claim.

## Receipt shape

Use one collection name, an exact row count, and a comma-separated field list. Keep the sample values simple. If a value requires a complex nested object, a comma, a multiline string, or extensive escaping, use Markdown or JSON instead.

```toon
proof[3]{scenario,result,status}:
  partial-refund,passed,observed
  refund-over-capture,passed,observed
  provider-timeout,not-run,unknown
```

The receipt tells the reader what was established. The text around it must still explain why those scenarios matter and what remains risky.
