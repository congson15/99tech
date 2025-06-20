export const state = {
    selected: { from: '', to: '' } as Record<'from' | 'to', string>,
    tokens: [] as string[],
    prices: {} as Record<string, number>,
};
  