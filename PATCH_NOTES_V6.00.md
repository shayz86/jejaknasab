# Patch Notes V6.00

## Architecture

V6.00 separates the **person record** from the **tree context**. The same person can be linked into a Cabang Keluarga without creating a duplicate person, while a person created only for a branch is hidden from the main tree.

## Access rules

### Owner Account
- Can create and edit main-tree members without a generation limit.
- Can create and manage Cabang Keluarga.

### Premium Family Member
- Maximum 5 Family Members per Owner Account.
- 3 generations upward.
- 2 generations downward.
- Sibling/side path is available, including spouse and up to 2 generations of descendants.
- Side path cannot be used to create parents or in-laws above the sibling path.

### Ultimate Family Member
- Maximum 20 Family Members per Owner Account.
- 6 generations upward.
- 6 generations downward.
- Same side-path rule as Premium, with 2 generations of side descendants.

### Cabang Keluarga
- 2 generations upward and 2 downward.
- Siblings and their spouses can be included.
- Side descendants are limited to 2 generations downward.
- A sibling path cannot be used to create the sibling's parents or spouse's parents.

## UI

- "Silsilah Opsional" becomes "Cabang Keluarga".
- Dashboard branch cards only list main-tree anchor members who actually have a branch.
- Branch details open in a dedicated modal/context.
- Branch creation has its own member form.
- Existing-person selection is searchable where main-tree relationships are created.
- Password confirmation and visibility toggle added.
- Title depan and title belakang added to member forms.
