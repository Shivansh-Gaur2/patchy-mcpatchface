# Patchy benchmark cases

These are task contracts, not synthetic prompts. Run each one against a pinned public repository revision with the same model, tool access, time budget, and verification environment in both arms.

Each result needs the transcript, final diff, commands and output, task acceptance result, and the completed [scorecard](../README.md#scorecard). Keep failed runs and cases where the baseline is better.

| Case | The trap it tests |
| --- | --- |
| [refund-boundary](refund-boundary.md) | A familiar rule is reimplemented instead of extended. |
| [hidden-invariant](hidden-invariant.md) | A ticket names one caller but the actual rule has siblings. |
| [missing-test-seam](missing-test-seam.md) | A novel behavior has no focused test already waiting. |
| [behavior-map](behavior-map.md) | An explanation confuses evidence, inference, and unknowns. |
