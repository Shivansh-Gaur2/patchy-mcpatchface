# Missing test seam

## Task shape

Add a new behavior where no focused test exists at the requested entry point.

## Acceptance contract

- Discover the closest existing seam, fixture, or contract test.
- Add a focused behavior or characterization test when feasible.
- If no meaningful test can be added, run the strongest available executable check and name the behavior it does not prove.
- Avoid passing off compilation or a happy-path test as complete coverage.

## Score the run

Record the test seam considered, the proof that actually ran, and the exact unverified scenario.
