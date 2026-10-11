# Composed engineering practices

Patchy owns the workflow below. The linked skills informed specific decisions; users do not need to install them for Patchy to work. These references record design influences, not measured evidence that the adapted practices improve Patchy's results.

| Source | Adapted practice | Patchy boundary |
| --- | --- | --- |
| [Ponytail by Dietrich Gebert](https://github.com/DietrichGebert/ponytail/blob/main/skills/ponytail/SKILL.md) | Understand the full change first, then choose the smallest complete solution, reuse before adding, and fix shared root causes. | Minimality never removes explicit requirements, safety checks, error handling, or useful proof. |
| [Matt Pocock's code-review skill](https://github.com/mattpocock/skills/blob/main/skills/engineering/code-review/SKILL.md) | Keep contract fit and implementation quality as distinct review questions so one result cannot hide the other. | Factory supplies the frozen candidate and task contract. Review follows repository standards without requiring a specific issue tracker or a generic smell checklist. |
| [Matt Pocock's TDD skill](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md) | For behavior with a useful test seam, prefer one failing behavior test and a small passing change at a time. | Use the repository's test conventions. Do not force TDD when the seam is artificial, expensive, or unavailable; state what remains unverified. |

These skills are MIT-licensed in the inspected upstream repositories. Patchy paraphrases selected practices instead of bundling their skill files or depending on their installation. Source state checked 2026-10-11. Recheck upstream licenses before copying substantial source text.
