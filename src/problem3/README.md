## TL;DR — Refactor Summary
The original `WalletPage` component contained tightly coupled logic for:
- Fetching data (`useWalletBalances`, `usePrices`)
- Business rules (`getPriority`, filtering, sorting)
- Formatting and presentation (e.g. `.toFixed`, `WalletRow` rendering)

This review **intentionally ignores small issues** like typos, missing type annotations, or minor misnaming.  
The focus is on **architectural and logic-level problems** that impact performance, testability, and maintainability.

### Refactor Objectives:
1. **Defining Pure Functions Inside Components** (`getPriority`, sorting functions).
2. **Using Array Index as React Key** — use `currency + blockchain` instead.
3. **Violating Separation of Concerns**, with clean, testable props.

By separating concerns into `hooks`, `utils`, and `components`, the codebase is now:
- Easier to test and maintain.
- More readable and reusable.
- Aligned with React best practices for performance and structure.

4. **Continue reading `DETAIL.MD` for full implementation details.**