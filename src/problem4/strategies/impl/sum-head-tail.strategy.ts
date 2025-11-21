import { SumStrategy } from "../strategy";

export class SumHeadTailStrategy implements SumStrategy {
  private constructor(){}
  private static instance: SumHeadTailStrategy;
  public static getInstance(): SumHeadTailStrategy {
    if (!this.instance) {
      this.instance = new SumHeadTailStrategy();
    }
    return this.instance;
  }
  compute(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n/2; i++) {
      // sum head and tail
      sum += i + (n-i+1);
    }

    if (n%2 === 1) sum += n/2+0.5; // sum the middle number of n if n is odd 
    return sum;
  }
}
