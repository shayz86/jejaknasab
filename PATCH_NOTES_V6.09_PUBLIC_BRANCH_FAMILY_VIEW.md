# V6.09 — Public Branch Family View

Public-only continuation of V6.08.

Changes limited to the public Cabang Keluarga view:

- Public branch page now supplements incomplete/legacy branch membership data from the main tree using the selected branch anchor.
- Shows the directly connected family network around the branch point: parents (up to 2 generations), spouse(s), children (up to 2 generations), siblings, sibling spouse(s), and sibling descendants (up to 2 generations).
- Does not traverse upward through a spouse, so in-laws are not exposed through that path.
- Existing branch-specific members and branch relationships remain supported and are preserved.
- Public branch heading now shows the actual branch-point member name directly, without the generic “Titik cabang: anggota keluarga” wording.
- Removes the public-only rule/instruction notice from the branch page.
- Keeps the separate public-page Cabang Keluarga list removed.
- No database migration is required.
- No dashboard, package, authentication, privacy, zoom, claim, or other non-public-branch behavior is intentionally changed.
