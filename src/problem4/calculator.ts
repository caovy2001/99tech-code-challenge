import { FormulaStrategy } from "./strategies/impl/formula.strategy";
import { LoopStrategy } from "./strategies/impl/loop.strategy";
import { SumHeadTailStrategy } from "./strategies/impl/sum-head-tail.strategy";
import { Validator } from "./validation/validator";

export class Calculator {
  // Loop Strategy
  // Time:  O(n)
  // Space: O(1)
  public sum_to_n_a(n: number): number {
    Validator.forSumToN(n);
    return LoopStrategy.getInstance().compute(n);
  }

  // Sum-head-tail Strategy
  // Time:  O(n)
  // Space: O(1)
  public sum_to_n_b(n: number): number {
    Validator.forSumToN(n);
    return SumHeadTailStrategy.getInstance().compute(n);
  }

  // Formular Strategy
  // Time:  O(1)
  // Space: O(1)
  public sum_to_n_c(n: number): number {
    Validator.forSumToN(n);
    return FormulaStrategy.getInstance().compute(n);
  }
}