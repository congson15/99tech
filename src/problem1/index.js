function normalizeN(n) {
    n = Number(n);
    if (!Number.isFinite(n) || isNaN(n) || n < 0) return 0;
    return Math.floor(n);
}

var sumToNLoop = function (n) {
    n = normalizeN(n);
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

var sumToNMathematicalFormula = function (n) {
    n = normalizeN(n);
    return (n * (n + 1)) / 2;
};

var sumToNRecursive = function (n) {
    n = normalizeN(n);  
    if (n <= 0) return 0;
    return n + sumToNRecursive(n - 1);
};

module.exports = { sumToNLoop, sumToNMathematicalFormula, sumToNRecursive };