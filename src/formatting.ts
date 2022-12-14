export const prettyPrintBinary = (decimals: number[]): string => {
  return decimals
    .map((decimal) => `00000000${decimal.toString(2)}`.slice(-8))
    .map((byte) => byte.split("").join("  "))
    .join("\n");
};

export const printPrintBytes = (records: any[]) => {
  return records.map((decimal, index) => {
    const paddedHex = `00${parseInt(decimal).toString(16).toUpperCase()}`.slice(-2);
    const paddedBinary = `00000000${parseInt(decimal).toString(2)}`.slice(-8);
    const paddedIndex = `   ${index}`.slice(-3);
    const paddedDecimal = `   ${decimal}`.slice(-3)
    return `${paddedIndex}  ${paddedDecimal}  ${paddedHex}  ${paddedBinary}`;
  })
}