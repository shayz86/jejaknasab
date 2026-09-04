## JejakNasab V6.02

Perbaikan publik, scope Family Member, zoom, dan Cabang Keluarga.

# JejakNasab — V6.00

JejakNasab is a Cloudflare Pages + D1 family genealogy application without a frontend framework.

## V6.00 highlights

- Nasab utama remains the primary tree and prioritizes the paternal line/root.
- **Cabang Keluarga** is a separate tree context, not a second copy of the main family database.
- Existing people can be linked into a branch without duplication.
- Branch-only people are hidden from the main tree.
- Branch limit: 2 generations up/down, with sibling-side descendants limited to 2 generations down and no upward traversal through sibling/in-law paths.
- Premium: 5 Family Members; 3 generations up + 2 down; side descendants 2 generations.
- Ultimate: 20 Family Members; 6 generations up + 6 down; side descendants 2 generations.
- Owner Account can create main-tree members without a generation limit.
- Front/rear titles are supported and rendered in trees/public views.
- Password confirmation and show/hide password are supported.
- Child order can be configured separately for main tree and branch context.
- Owner-only audit history.
- Public main tree and public Cabang Keluarga links.

## Deploy

1. Push the repository contents to GitHub. Do not upload `node_modules`.
2. Cloudflare Pages: production branch `main`, build command empty, build output directory `public`.
3. Bind D1 as `DB` to the existing JejakNasab database.
4. Configure secrets/variables: `SESSION_SECRET`, `OWNER_SETUP_KEY`, `PREMIUM_PRICE`, `ULTIMATE_PRICE`, `PAYMENT_INSTRUCTIONS`.
5. Use `/setup-owner` only when the first Owner Web account needs to be created.

## Database

### Existing database
Run `migration-v6.sql` once against the existing D1 database. The migration is additive and preserves existing V5 data. It also converts V5 `optional_lineages` into V6 `family_branches`/`branch_members`/`branch_relationships`.

Do **not** run `schema.sql` against an existing production database as a reset operation.

### New database
Use `schema.sql`.

## Registration / payment

V6.00 keeps Owner Account registration in a pending state until Owner Web approval. Payment automation is deliberately not enabled yet. The database retains the payment-request structure so a payment gateway can be added later without redesigning the account model.
