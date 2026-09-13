# TOON token comparison

This benchmark measures one realistic Patchy receipt: six impact records and six proof records. All rows are uniform objects, which is TOON's intended use case.

Run it with:

```text
npm run benchmark:toon
```

## Method

The fixture is serialized four ways: pretty JSON, compact JSON, a Markdown table, and TOON. The script uses the pinned `@dqbd/tiktoken` implementation of the `o200k_base` tokenizer, then fails if TOON is not smaller than compact JSON and Markdown for this uniform fixture.

This is a reproducible tokenizer proxy, not a claim about a private Codex tokenizer or every task shape. JSON remains the right choice for APIs, configuration, irregular records, and deeply nested data.

## Current result

| Format | Tokens | Change from TOON |
| --- | ---: | ---: |
| Pretty JSON | 355 | +155.4% |
| Compact JSON | 192 | +38.1% |
| Markdown | 145 | +4.3% |
| TOON | 139 | baseline |

For this fixture, TOON uses 27.6% fewer tokens than compact JSON and 4.1% fewer than Markdown. That small Markdown difference means TOON is not an automatic win: use it only when its uniform-row shape is also easier to scan. The official decoder also strictly validates each shipped reference receipt and the check requires it to round-trip through the official encoder.
