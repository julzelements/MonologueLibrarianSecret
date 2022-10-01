export enum FrameEncoding {
  decimal,
  hex,
  binary,
}

export class Frame {
  private decimals;
  private paddedBinary = (decimal: number) =>
    `00000000${decimal.toString(2)}`.slice(-8);

  constructor(buffer: Array<number | string>, encoding: FrameEncoding) {
    this.decimals = buffer;
  }
  getDecimal(): number[] {
    return this.decimals;
  }

  prettyPrintBinary(): string {
    return this.decimals
      .map((decimal) => this.paddedBinary(decimal))
      .map((byte) => byte.split("").join("  "))
      .join("\n");
  }
}
