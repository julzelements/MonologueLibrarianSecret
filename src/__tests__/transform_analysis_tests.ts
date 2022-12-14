import { prettyPrintBinary } from "../formatting";
import { transformDataFrom7BitTo8Bit } from "../utilities";

describe("transformDataFrom7BitTo8Bit()", () => {
  const headers = [240, 66, 49, 0, 1, 68, 64];
  const set1 = [parseInt("01000000", 2), 0, 0, 0, 0, 0, 0, 0];
  const set2 = [parseInt("00100000", 2), 0, 0, 0, 0, 0, 0, 0];
  const set3 = [parseInt("00010000", 2), 0, 0, 0, 0, 0, 0, 0];
  const set4 = [parseInt("00001000", 2), 0, 0, 0, 0, 0, 0, 0];
  const set5 = [parseInt("00000100", 2), 0, 0, 0, 0, 0, 0, 0];
  const set6 = [parseInt("00000010", 2), 0, 0, 0, 0, 0, 0, 0];
  const set7 = [parseInt("00000001", 2), 0, 0, 0, 0, 0, 0, 0];

  const data = [
    ...headers,
    ...set1,
    ...set2,
    ...set3,
    ...set4,
    ...set5,
    ...set6,
    ...set7,
  ];
  const midi = transformDataFrom7BitTo8Bit(data);
  describe("the lead midi message", () => {
    it("2nd bit is prefixed to 7th message", () => {
      expect(prettyPrintBinary(set1)).toMatchInlineSnapshot(`
"0  1  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0"
`);
      expect(prettyPrintBinary(midi.slice(0, 7))).toMatchInlineSnapshot(`
"0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
1  0  0  0  0  0  0  0"
`);
    });
    it("3rd bit is prefixed to 6th message", () => {
      expect(prettyPrintBinary(set2)).toMatchInlineSnapshot(`
"0  0  1  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0"
`);
      expect(prettyPrintBinary(midi.slice(7, 14))).toMatchInlineSnapshot(`
"0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
1  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0"
`);
    });

    it("4th bit is prefixed to 5th message", () => {
      expect(prettyPrintBinary(set3)).toMatchInlineSnapshot(`
"0  0  0  1  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0"
`);
      expect(prettyPrintBinary(midi.slice(14, 21))).toMatchInlineSnapshot(`
"0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
1  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0"
`);
    });

    it("5th bit is prefixed to 4th message", () => {
      expect(prettyPrintBinary(set4)).toMatchInlineSnapshot(`
"0  0  0  0  1  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0"
`);
      expect(prettyPrintBinary(midi.slice(21, 28))).toMatchInlineSnapshot(`
"0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
1  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0"
`);
    });

    it("6th bit is prefixed to 3rd message", () => {
      expect(prettyPrintBinary(set5)).toMatchInlineSnapshot(`
"0  0  0  0  0  1  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0"
`);
      expect(prettyPrintBinary(midi.slice(28, 35))).toMatchInlineSnapshot(`
"0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
1  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0"
`);
    });
    it("7th bit is prefixed to 2nd message", () => {
      expect(prettyPrintBinary(set6)).toMatchInlineSnapshot(`
"0  0  0  0  0  0  1  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0"
`);
      expect(prettyPrintBinary(midi.slice(35, 42))).toMatchInlineSnapshot(`
"0  0  0  0  0  0  0  0
1  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0"
`);
    });
    it("8th bit is prefixed to 1st message", () => {
      expect(prettyPrintBinary(set7)).toMatchInlineSnapshot(`
"0  0  0  0  0  0  0  1
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0"
`);
      expect(prettyPrintBinary(midi.slice(42, 56))).toMatchInlineSnapshot(`
"1  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  0"
`);
    });
  });
});
