import { useMemo } from 'react';
import { useWalletBalances } from './useWalletBalances';
import { usePrices } from './usePrices';
import { filterAndSortBalances } from '../utils/wallet';
import { FormattedWalletBalance } from '../types/wallet';

export const useProcessedWallets = (): FormattedWalletBalance[] => {
    const balances = useWalletBalances();
    const prices = usePrices();

    return useMemo(() => {
        const sorted = filterAndSortBalances(balances);
        return sorted.map((balance): FormattedWalletBalance => ({
            ...balance,
            formatted: balance.amount.toFixed(2),
            usdValue: prices[balance.currency ?? 0] * balance.amount
        }));
    }, [balances, prices]);
};
