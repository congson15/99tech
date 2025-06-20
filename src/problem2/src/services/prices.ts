import { PRICE_API } from '../constants';
interface TokenPrice {
    currency: string;
    price: number;
    date: string;
}

export async function fetchPrices(): Promise<Record<string, number>> {
    const res = await fetch(PRICE_API);
    const data: TokenPrice[] = await res.json();
    const latest: Record<string, TokenPrice> = {};

    data.forEach(({ currency, date, price }) => {
        if (!latest[currency] || new Date(date) > new Date(latest[currency].date)) {
            latest[currency] = { currency, date, price };
        }
    });

    const prices: Record<string, number> = {};
    Object.entries(latest).forEach(([symbol, entry]) => {
        prices[symbol] = entry.price;
    });
    return prices;
}