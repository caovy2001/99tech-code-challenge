export class Validator {
  public static forSumToN(n: number): void {
    if (!Number.isFinite(n)) {
      throw new Error("Input must be a finite number.");
    }
    if (!Number.isInteger(n)) {
      throw new Error("Input must be an integer.");
    }
    if (n <= 0) {
      throw new Error("Input must be greater than 0.");
    }
    if (n > Number.MAX_SAFE_INTEGER) {
      throw new Error("Input is too large.");
    }
  }
}
