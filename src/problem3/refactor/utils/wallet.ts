import { WalletBalance } from '../types/wallet';

const PRIORITY_MAP: Record<string, number> = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20
};

export const getPriority = (blockchain: string): number => {
    return PRIORITY_MAP[blockchain] ?? -99;
};

export const filterAndSortBalances = (balances: WalletBalance[]): WalletBalance[] => {
    return balances
        .filter(b => getPriority(b.blockchain) > -99 && b.amount > 0)
        .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain)); 
};