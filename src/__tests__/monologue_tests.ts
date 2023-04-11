import fs from "fs";
import parse from "csv-parse/lib/sync";
import { transformDataFrom7BitTo8Bit } from "../utilities";
import { Monologue } from "../monologue";

const file = fs.readFileSync(`${__dirname}/sample_program_dump.csv`, "utf8");

const printBytes = (records: any[]) => {
  return records.map((decimal, index) => {
    const paddedHex = `00${parseInt(decimal).toString(16).toUpperCase()}`.slice(-2);
    const paddedBinary = `00000000${parseInt(decimal).toString(2)}`.slice(-8);
    const paddedIndex = `   ${index}`.slice(-3);
    const paddedDecimal = `   ${decimal}`.slice(-3)
    return `${paddedIndex}  ${paddedDecimal}  ${paddedHex}  ${paddedBinary}`;
  })
}

describe("Snapshot test", () => {
  it("renders the sample_program_dump correctly", () => {
    const records = parse(file)[0];
    const data = transformDataFrom7BitTo8Bit(records);
  
    // const bytes = printBytes(data)
    // fs.writeFileSync(`${__dirname}/transformed_bytes.csv`, bytes.join("\n"));
    // const nibbles = bytes.map((byte) => [byte.slice(0, 4), byte.slice(3, 4)]);
    // const hex = data.map((decimal) => parseInt(decimal).toString(16));
    // console.log(JSON.stringify(data));
    expect(Monologue.createFromSysEx(data).toString()).toMatchSnapshot();
  });
});
