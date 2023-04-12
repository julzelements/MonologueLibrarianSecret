import fs from "fs";
import parse from "csv-parse/lib/sync";
import { transformDataFrom7BitTo8Bit } from "../utilities";
import { Monologue } from "../monologue";
import { prettyPrintBinary } from "../formatting";

const file = fs.readFileSync(`${__dirname}/sample_program_dump.csv`, "utf8");

describe("Snapshot test", () => {
  let records;
  let data;

  beforeAll(() => {
    records = parse(file)[0];
    data = transformDataFrom7BitTo8Bit(records);
  });
  it("parses the patch title correctly", () => {
    const patchString = Buffer.from(
      data.map((code) => String.fromCharCode(code)).join("")
    ).toString("base64");
    expect(
      data
        .slice(0, 15)
        .map((code) => String.fromCharCode(code))
        .join("")
    ).toBe("PROG<afx acid3>");
    expect(data.length).toBe(448);
    // need to work out what the next section of the dump should be
    // use the korg spec to debug each bit.
  });
});
