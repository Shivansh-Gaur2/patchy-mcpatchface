# Maintainer checklist

These controls are configured in GitHub, so they cannot be verified or enabled by the repository files alone.

## Last verified repository state

On 2026-10-11, GitHub reported `master` as the default branch and marked it protected, with the `package` status check required. The repository rulesets endpoint returned no rulesets. The GitHub integration could not read the full classic branch-protection configuration, so verify the remaining settings below directly in GitHub before changing them.

## Before the next release

- Keep `master` as the protected default and release branch, or deliberately migrate the marketplace and installation instructions together before changing it.
- Protect the release branch: require pull requests, require the `Validate` check, require up-to-date branches, and prevent force pushes and branch deletion.
- Enable private vulnerability reporting so the path described in [SECURITY.md](../SECURITY.md) is available.
- Enable Dependabot alerts and review the weekly GitHub Actions update pull requests created from `.github/dependabot.yml`.
- Confirm the repository's Actions policy permits only the reviewed actions used by the validation workflow.

## Community launch

- Enable GitHub Discussions with **Announcements**, **General**, and **Ideas** categories.
- Pin an announcement that links to the [community trial guide](community-trial.md) and requests reproducible control-versus-Patchy results.
- Add a social preview image and a repository homepage when a stable landing page exists.
- Share one evidence-backed case study at a time; answer questions and publish negative results as well as wins.
- Review GitHub Traffic weekly for visitors, clones, referring sites, and popular content; track trial reports separately.

## For each release

1. Run `npm test` locally.
2. Run `npm run build:marketplace` and confirm `npm test` still passes.
3. Review the generated package diff; do not hand-edit `plugins/patchy-mcpatchface`.
4. Update `CHANGELOG.md` and the version in the root manifest when the release changes shipped behavior.
5. Create a GitHub release or tag only from the protected release branch.

## To evaluate Patchy

Follow the paired-run protocol in [benchmarks/RESULTS.md](../benchmarks/RESULTS.md). Do not claim a token, speed, safety, or correctness benefit until the required artifacts and baseline comparison are published.
