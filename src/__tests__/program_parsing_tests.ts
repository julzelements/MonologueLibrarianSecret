import fs from "fs";
import parse from "csv-parse/lib/sync";
import { transformDataFrom7BitTo8Bit } from "../utilities";
import { Monologue } from "../monologue";
import { prettyPrintBinary } from "../formatting";

const file = fs.readFileSync(`${__dirname}/sample_program_dump.csv`, "utf8");

describe("Snapshot test", () => {
  it("renders the sample_program_dump correctly", () => {
    const records = parse(file)[0];
    const data = transformDataFrom7BitTo8Bit(records);

    expect(
      data
        .slice(0, 15)
        .map((code) => String.fromCharCode(code))
        .join("")
    ).toBe("PROG<afx acid3>");
    expect(prettyPrintBinary(data.slice(15, 29))).toBe("PROG<afx acid3>");
  });
});
