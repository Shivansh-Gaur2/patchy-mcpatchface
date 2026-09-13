# Maintainer checklist

These controls are configured in GitHub, so they cannot be verified or enabled by the repository files alone.

## Before the next release

- Choose one release branch. The local evidence currently places the validated `0.3.0` line on `master`; either make it the default branch or merge it into `main` and update installation instructions to use that one branch.
- Protect the release branch: require pull requests, require the `Validate` check, require up-to-date branches, and prevent force pushes and branch deletion.
- Enable private vulnerability reporting so the path described in [SECURITY.md](../SECURITY.md) is available.
- Enable Dependabot alerts and review the weekly GitHub Actions update pull requests created from `.github/dependabot.yml`.
- Confirm the repository's Actions policy permits only the reviewed actions used by the validation workflow.

## For each release

1. Run `npm test` locally.
2. Run `npm run build:marketplace` and confirm `npm test` still passes.
3. Review the generated package diff; do not hand-edit `plugins/patchy-mcpatchface`.
4. Update `CHANGELOG.md` and the version in the root manifest when the release changes shipped behavior.
5. Create a GitHub release or tag only from the protected release branch.

## To evaluate Patchy

Follow the paired-run protocol in [benchmarks/RESULTS.md](../benchmarks/RESULTS.md). Do not claim a token, speed, safety, or correctness benefit until the required artifacts and baseline comparison are published.
