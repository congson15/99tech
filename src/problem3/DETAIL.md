> ⚠️ Note: This review focuses on high-level architectural and logic issues.
> Minor errors such as missing type fields, typos, or unused variables (e.g., `lhsPriority`, `formattedBalances`, `.toFixed()`, destructured `children`) are excluded from this document but should still be addressed in cleanup commits.

## Refactor Summary

1.  **Issue**: Defining Pure Functions Inside Components

    -   **Original Code**:

        ```typescript
        const getPriority = (blockchain: any): number => {
        	switch (blockchain) {
        		case "Osmosis":
        			return 100;
        		case "Ethereum":
        			return 50;
        		case "Arbitrum":
        			return 30;
        		case "Zilliqa":
        			return 20;
        		case "Neo":
        			return 20;
        		default:
        			return -99;
        	}
        };
        ```

    -   **Anti-Pattern**: `getPriority()` is defined inside `WalletPage`, causing it to be recreated on every render. This is inefficient and can lead to performance issues.
    -   **Solution(s)**:

    1. Move `getPriority()` outside of the `WalletPage` component to avoid unnecessary re-instantiations and improve performance.
    2. Prefer using a `Map` or `Record<string, number>` for static value lookups to improve performance, readability, and maintainability. See the refactored `wallet.ts` utility for implementation

2.  **Issue**: Using Array Index as React Key

    -   **Original Code**:
        ```typescript
        const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
        	const usdValue = prices[balance.currency] * balance.amount;
        	return (
        		<WalletRow
        			className={classes.row}
        			key={index}
        			amount={balance.amount}
        			usdValue={usdValue}
        			formattedAmount={balance.formatted}
        		/>
        	);
        });
        ```
    -   **Anti-Pattern**: Using array index as a key can lead to issues with component state and performance.
    -   **Solution(s)**: Use a unique and stable field like balance.currency or currency + blockchain as the key.

3.  **Issue**: Violating Separation of Concerns

    -   **Description**:
        In the original code, data fetching, transformation, business logic (sorting, prioritization), formatting, and rendering are all tightly coupled within a single React component (WalletPage).
        Specifically: 1.`useWalletBalances()` and `usePrices()` fetch data (data layer) 2.`getPriority(), .filter(), .sort()` handle domain logic (business logic layer) 3.`toFixed()` formatting and JSX rendering are UI concerns (presentation layer)
    -   **Why this matters**:
        1. **Difficult to test**: It's hard to test sorting or prioritization separately from rendering.
        2. **Reduced reusability**: `getPriority()` or `sortedBalances()` cannot be reused in other components.
        3. **Poor maintainability**: Any change in pricing logic or formatting requires touching the UI layer
        4. **Performance issues**: Re-rendering the entire component when only part of the logic
    -   **Solution(s)**: Separate Responsibilities Into Layers

        1. Move pure business logic functions (like `getPriority()`) outside of the component.

            - This can be done by creating a separate utility file for these functions.
            - For example:

                ```typescript
                // utils/wallet.ts
                export const getPriority = (blockchain: string): number => { ... }

                export const getSortedBalances = (balances: WalletBalance[]): WalletBalance[] => {
                return balances
                    .filter(...)
                    .sort(...)
                }
                ```

        2. Use custom hooks for data fetching and transformation.

            - This allows you to encapsulate data fetching logic separately from the UI.
            - For example:

                ```typescript
                // hooks/useProcessedWallets.ts
                export const useProcessedWallets = () => {
                	const balances = useWalletBalances();
                	const prices = usePrices();

                	return useMemo(() => {
                		const sorted = filterAndSortBalances(balances);
                		return sorted.map((balance) => ({
                			...balance,
                			formatted: balance.amount.toFixed(2),
                			usdValue: prices[balance.currency ?? 0] * balance.amount,
                		}));
                	}, [balances, prices]);
                };
                ```

        3. Use utility functions for business logic (like sorting and prioritization).
        4. Keep the component focused on rendering only.

        -   This allows you to easily test the rendering logic separately from the data processing logic.
        -   For example, the WalletPage component can be tested with mock data without needing to worry about the underlying data fetching or processing logic.

        ```typescript
        // WalletPage.tsx
        import useProcessedWallets from "../hooks/useProcessedWallets";

        const WalletPage: React.FC<Props> = (props) => {
        	const { ...rest } = props;
        	const balances = useProcessedWallets();

        	return (
        		<div {...rest}>
        			{balances.map((balance) => (
        				<WalletRow
        					key={balance.currency}
        					amount={balance.amount}
        					usdValue={balance.usdValue}
        					formattedAmount={balance.formatted}
        				/>
        			))}
        		</div>
        	);
        };
        ```
