import { Calculator } from "../calculator";

describe("sum_to_n", () => {
  const calculator = new Calculator();
  const fns = [calculator.sum_to_n_a, calculator.sum_to_n_b, calculator.sum_to_n_c];

  test.each(fns)("correct output for valid input", (fn) => {
    expect(fn(1)).toBe(1);
    expect(fn(5)).toBe(15);
    expect(fn(10)).toBe(55);
  });

  test.each(fns)("throws for zero number", (fn) => {
    expect(() => fn(0)).toThrow(Error);
  });

  test.each(fns)("throws for negative number", (fn) => {
    expect(() => fn(-1)).toThrow(Error);
  });

  test.each(fns)("throws for decimal number", (fn) => {
    expect(() => fn(1.2)).toThrow(Error);
  });

  test.each(fns)("throws for non-finite values", (fn) => {
    expect(() => fn(Infinity)).toThrow(Error);
  });
});
