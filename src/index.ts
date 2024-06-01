import { transformDataFrom7BitTo8Bit } from "./utilities";
import { Monologue } from "./monologue";

const fs = require("fs");

const storePatch = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

const easymidi = require("easymidi");
const input = new easymidi.Input("monologue KBD/KNOB");
input.on("sysex", function (msg) {
  const data = transformDataFrom7BitTo8Bit(msg.bytes);
  const patchString = Buffer.from(data.map((code) => String.fromCharCode(code)).join("")).toString("base64");
  const patch = Monologue.createFromSysEx(data);
  const patchName = patch.patchName.split("\x00")[0];
  const underscorePatchName = patchName.replace(/\s/g, "_").toString();

  console.log(`saving: ${underscorePatchName}`);
  fs.writeFileSync(`./test-patches/${underscorePatchName}-bytes`, msg.bytes);
  fs.writeFileSync(`./test-patches/${underscorePatchName}-data`, data);
  fs.writeFileSync(`./test-patches/${underscorePatchName}-string`, patchString);
  storePatch(patch, `./test-patches/${underscorePatchName}.json`);
});
