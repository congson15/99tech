const { sumToNLoop, sumToNMathematicalFormula, sumToNRecursive } = require('./index');
const testCases = [
    { input: 0, expected: 0 },
    { input: 1, expected: 1 },
    { input: 2, expected: 3 },
    { input: 3, expected: 6 },
    { input: 4, expected: 10 },
    { input: 5, expected: 15 },
    { input: -1, expected: 0 },
    { input: 10, expected: 55 },
    { input: 100, expected: 5050 },
    { input: 1000, expected: 500500 },
    { input: 9999, expected: 49995000 },
];
describe('\nsumToNLoop', () => {

    testCases.forEach(({ input, expected }) => {
        it(`sumToNLoop(${input}) should return ${expected}`, () => {
            expect(sumToNLoop(input)).toBe(expected);
        });
    });

    test('Handles non-integer input gracefully', () => {
        expect(sumToNLoop(3.7)).toBe(sumToNLoop(Math.floor(3.7)));
    });

    test('Handles NaN and undefined input', () => {
        expect(sumToNLoop(NaN)).toBe(0);
        expect(sumToNLoop(undefined)).toBe(0);
    });

    test('Handles string input that can be converted to number', () => {
        expect(sumToNLoop("5")).toBe(15);
    });

    test('Handles string input that cannot be converted to number', () => {
        expect(sumToNLoop("abc")).toBe(0);
    });
});

describe('\nsumToNMathematicalFormula', () => {

    testCases.forEach(({ input, expected }) => {
        it(`sumToNMathematicalFormula(${input}) should return ${expected}`, () => {
            expect(sumToNMathematicalFormula(input)).toBe(expected);
        });
    });

    test('Handles non-integer input gracefully', () => {
        expect(sumToNMathematicalFormula(3.7)).toBe(sumToNMathematicalFormula(Math.floor(3.7)));
    });

    test('Handles NaN and undefined input', () => {
        expect(sumToNMathematicalFormula(NaN)).toBe(0);
        expect(sumToNMathematicalFormula(undefined)).toBe(0);
    });

    test('Handles string input that can be converted to number', () => {
        expect(sumToNMathematicalFormula("5")).toBe(15);
    });

    test('Handles string input that cannot be converted to number', () => {
        expect(sumToNMathematicalFormula("abc")).toBe(0);
    });
});

describe('\nsumToNRecursive', () => {

    testCases.forEach(({ input, expected }) => {
        it(`sumToNRecursive(${input}) should return ${expected}`, () => {
            expect(sumToNRecursive(input)).toBe(expected);
        });
    });

    test('Handles non-integer input gracefully', () => {
        expect(sumToNRecursive(3.7)).toBe(sumToNRecursive(Math.floor(3.7)));
    });

    test('Handles NaN and undefined input', () => {
        expect(sumToNRecursive(NaN)).toBe(0);
        expect(sumToNRecursive(undefined)).toBe(0);
    });

    test('Handles string input that can be converted to number', () => {
        expect(sumToNRecursive("5")).toBe(15);
    });

    test('Handles string input that cannot be converted to number', () => {
        expect(sumToNRecursive("abc")).toBe(0);
    });
});