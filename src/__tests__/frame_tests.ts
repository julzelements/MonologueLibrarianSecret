import { Frame, FrameEncoding } from "../Frame";

describe("Frame class", () => {
  describe("intialising with array of decimal integers", () => {
    const buffer = Buffer.from([0, 1, 2, 3, 4, 5, 6, 255]);
    const frame = new Frame([0, 1, 2, 3, 4, 5, 6, 255], FrameEncoding.decimal);
    test("correctly returns a buffer of decimal integers", () => {
      expect(frame.getDecimal()).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 255]);
    });
    test("correctly pretty prints binary", () => {
      expect(frame.prettyPrintBinary()).toStrictEqual(
        `0  0  0  0  0  0  0  0
0  0  0  0  0  0  0  1
0  0  0  0  0  0  1  0
0  0  0  0  0  0  1  1
0  0  0  0  0  1  0  0
0  0  0  0  0  1  0  1
0  0  0  0  0  1  1  0
1  1  1  1  1  1  1  1`
      );
    });
  });
});
