import { SumStrategy } from "../strategy";

export class LoopStrategy implements SumStrategy {
  private constructor(){}
  private static instance: LoopStrategy;
  public static getInstance(): LoopStrategy {
    if (!this.instance) {
      this.instance = new LoopStrategy();
    }
    return this.instance;
  }
  
  compute(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) sum += i;
    return sum;
  }
}
