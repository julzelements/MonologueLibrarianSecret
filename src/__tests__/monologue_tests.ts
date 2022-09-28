import fs from "fs";
import parse from "csv-parse/lib/sync";
import { transformDataFrom7BitTo8Bit } from "../utilities";
import Monologue from "../monologue";

const file = fs.readFileSync("./__tests__/sample_program_dump.csv", "utf8");

describe("Snapshot test", () => {
  it("renders the sample_program_dump correctly", () => {
    const records = parse(file)[0];
    const data = transformDataFrom7BitTo8Bit(records);
    expect(Monologue.createFromSysEx(data).toString()).toMatchSnapshot();
  });
});
