# Patchy Factory run record

Keep one `job.json` under the job's private state directory. The coordinator writes it atomically after a stage completes. Agent outputs, command logs, and the human-readable receipt are separate files in the same job directory. They are evidence artifacts, not alternate state stores.

```json
{
  "schemaVersion": 1,
  "id": "20261011T120000Z-a1b2c3",
  "status": "building",
  "version": 3,
  "createdAt": "2026-10-11T12:00:00Z",
  "updatedAt": "2026-10-11T12:15:00Z",
  "repository": {
    "root": "<canonical repository path>",
    "branch": "main",
    "baseCommit": "<git commit id>",
    "initialState": "clean"
  },
  "task": {
    "source": "task.md",
    "digest": "<sha256>",
    "contract": "contract.md",
    "contractDigest": "<sha256>"
  },
  "lane": "fast",
  "roles": [
    {
      "role": "mapper",
      "status": "complete",
      "profile": "factory_mapper",
      "skill": "patchy-factory-map",
      "operationId": "<host operation id or null>",
      "model": "<observed model or inherited/unknown>",
      "reasoningEffort": "<observed effort or inherited/unknown>",
      "permissionRequested": "read-only",
      "permissionEnforced": "<true, false, or unknown>",
      "output": "roles/mapper.md",
      "candidateCommit": null
    }
  ],
  "worktree": {
    "path": "<job-owned worktree path>",
    "branch": "patchy-factory/<job-id>"
  },
  "attempt": {
    "builds": 1,
    "repairsUsed": 0,
    "maxRepairs": 2
  },
  "candidate": {
    "commit": null,
    "tree": null
  },
  "checks": [],
  "reviews": [],
  "evidence": [],
  "decision": null,
  "attention": null
}
```

Replace example values with observed values. Artifact paths such as `task.md`, `contract.md`, role outputs, check logs, reports, and receipts are relative to this job directory. The repository root and worktree paths are absolute host paths. Do not infer an exit code, Git ID, agent completion, model/reasoning setting, permission enforcement, or human decision. Use ISO 8601 UTC timestamps and a SHA-256 digest of each frozen task contract. The coordinator creates one local commit for each candidate after inspecting and staging all intended tracked and untracked changes. Every check and review receipt records that candidate commit ID. A changed candidate cannot inherit earlier evidence. `builds` starts at 1; each repair increments both `builds` and `repairsUsed`. A new repair may start only when `repairsUsed < maxRepairs`.

For review receipts, use one object per reviewer:

```json
{
  "role": "reviewer",
  "assignedAxes": ["contract_behavior"],
  "candidateCommit": "<exact candidate commit>",
  "contractDigest": "<exact contract digest>",
  "verdicts": {"contract_behavior": "clear"},
  "proofGaps": [],
  "securityFocus": null,
  "status": "complete",
  "output": "reviews/contract.md"
}
```

For Deep review, store one receipt per independent reviewer with its assigned axis, candidate commit, contract digest, verdict, proof gaps, and output path. The contract reviewer owns behavior and proof coverage; the implementation reviewer owns repository fit and minimality. Record any security focus on the reviewer actually assigned that boundary. A historical general review remains a general review; never reinterpret it as two independent axis results. These fields extend schema version 1 additively, and old records remain readable.

Allowed states:

```text
created -> planning -> plan_ready
created -> building -> checking -> reviewing -> ready_for_review -> accepted
                                                    |                  -> rejected
                                                    +-> needs_attention
Any live stage -> cancelled
Failed check or blocking review -> building, within the two-repair limit
Uncertain process or missing evidence -> needs_attention
```

Increment `version` on every state transition. Save host agent/process operation IDs in the record when available; query those IDs when resuming. If the host cannot establish whether an earlier process is still running, mark the job `needs_attention` rather than launching another builder. Before replacing `job.json`, write a complete new file beside it and rename it over the old file. The previous complete record remains readable if the write fails. Add check and review receipts as separate files with unique names; never let concurrent workers append to one shared file. If a process stops between an operation and its receipt, mark its outcome `interrupted` or `unknown` until you can establish what happened.

The receipt should name the request, contract, base, candidate, state, check command and result paths, review report paths, remaining risks, and human decision. It should not copy secrets or full transcripts into an artifact intended for sharing.
