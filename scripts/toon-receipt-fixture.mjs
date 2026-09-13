export const receiptFixture = {
  impact: [
    { item: "PaymentService.refund", role: "owner", status: "observed" },
    { item: "CaptureRepository", role: "dependency", status: "observed" },
    { item: "InvoiceProjection", role: "sibling-reader", status: "observed" },
    { item: "RefundProvider", role: "external-boundary", status: "unknown" },
    { item: "AuthorizationPolicy", role: "reuse-candidate", status: "observed" },
    { item: "BillingSchema", role: "protected-boundary", status: "observed" },
  ],
  proof: [
    { scenario: "partial-refund", result: "passed", status: "observed" },
    { scenario: "refund-over-capture", result: "passed", status: "observed" },
    { scenario: "cancelled-payment", result: "passed", status: "observed" },
    { scenario: "provider-timeout", result: "not-run", status: "unknown" },
    { scenario: "audit-record", result: "passed", status: "observed" },
    { scenario: "authorization-denied", result: "passed", status: "observed" },
  ],
};

export function markdownReceipt({ impact, proof }) {
  const table = (title, rows, fields) => [
    `## ${title}`,
    "",
    `| ${fields.join(" | ")} |`,
    `| ${fields.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${fields.map((field) => row[field]).join(" | ")} |`),
  ].join("\n");

  return [
    table("Impact", impact, ["item", "role", "status"]),
    "",
    table("Proof", proof, ["scenario", "result", "status"]),
  ].join("\n");
}
