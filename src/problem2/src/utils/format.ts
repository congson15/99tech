export function formatNumber(value: number) {
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 6,
        notation: 'standard',
    }).format(value);
  }