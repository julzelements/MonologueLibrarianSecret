//TODO: Add Int checking
/**
 * Place more complex annotations (like "implements" and "template")
 * on their own lines.  Multiple simple tags (like "export" and "final")
 * may be combined in one line.
 * @export @final
 * @implements {Iterable<TYPE>}
 * @template TYPE
 */
export const bin = (dec: number, padding?: number) => {
  return dec.toString(2).padStart(padding || 8,'0');
}

// TODO: Add range out of bounds checking
export const getBits = (num: number, start: number, end: number) => {
  const bits = bin(num);
  return parseInt(bits.slice(-end-1, start ? -start : undefined), 2);
}

export const addLowerBits = (numForHighBits: number, numForLowBits: number, offset: number) => {
  const hiBits = bin(numForHighBits);
  const loBits = bin(numForLowBits).slice(-offset-2, offset ? -offset : undefined);
  const tenBitString = hiBits + loBits;
  return parseInt(tenBitString,2);
}

export const addHighBit = (numForLowBits: number, numForHighBit: number, offset: number) => {
  const loBits = bin(numForLowBits, 7);
  const hiBit = bin(numForHighBit).slice(-offset-1, offset ? -offset : undefined);
  const eightBitString = hiBit + loBits;
  return parseInt(eightBitString,2);
}

export const transformDataFrom7BitTo8Bit = (records: number[]) => {

  // remove the the header and footer bytes
  const sBitValues = records.slice(7,records.length - 1);
  const setArray = [];
  let index = 0;
  while (index < sBitValues.length) {
    setArray.push(sBitValues.slice(index, 8+index));
    index += 8;
  }
  const eBitValues = [];
  for (const set of setArray) {
    for (let j = 1; j < 8; j++) {
      eBitValues.push(addHighBit(set[j]*1, set[0]*1, j-1));
    }
  }
  return eBitValues;
}
