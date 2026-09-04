# V6.09 — Public Branch Connected Family Fix

Public-only continuation of V6.08.

- Public Cabang Keluarga now derives the displayed family graph from the selected anchor member and the main-tree relationships.
- Includes the anchor's connected parents, spouse(s), children, siblings, and permitted connected descendants/ancestors within the existing 2-generation branch scope.
- Preserves explicitly stored branch-only members when they belong to the selected branch.
- Keeps owner privacy settings for public person details.
- Public branch header now displays the anchor member name directly (for example, `Nur Rahmalia`) without the internal branch-rule explanation.
- Does not add the public branch list back to the main public page.
- Does not modify dashboard behavior, package logic, database schema, or stored data.
