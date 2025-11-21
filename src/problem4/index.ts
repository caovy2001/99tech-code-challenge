import { Calculator } from "./calculator";

const n = 10_000_000;
const calculator = new Calculator();

// Loop Strategy
const startA = performance.now();
calculator.sum_to_n_a(n);
console.log(`Loop: ${(performance.now() - startA).toFixed(2)} ms`);

// Sum-head-tail Strategy
const startB = performance.now();
calculator.sum_to_n_b(n);
console.log(`Sum-head-tail: ${(performance.now() - startB).toFixed(2)} ms`);

// Formular Strategy
const startC = performance.now();
calculator.sum_to_n_c(n);
console.log(`Formular: ${(performance.now() - startC).toFixed(2)} ms`);
