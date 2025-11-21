import { SumStrategy } from "../strategy";

export class FormulaStrategy implements SumStrategy {
  private constructor(){}
  private static instance: FormulaStrategy;
  public static getInstance(): FormulaStrategy {
    if (!this.instance) {
      this.instance = new FormulaStrategy();
    }
    return this.instance;
  }
  compute(n: number): number {
    return (n * (n + 1)) / 2;
  }
}
