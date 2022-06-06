const transformDataFrom7BitTo8Bit = require('./utilities').transformDataFrom7BitTo8Bit;
const Monologue = require('./monologue');

const fs = require('fs')

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

const easymidi = require('easymidi');
const input = new easymidi.Input('monologue KBD/KNOB');
input.on('sysex', function (msg) {
  const data = transformDataFrom7BitTo8Bit(msg.bytes);
  const patch = Monologue.createFromSysEx(data)
  const patchName = patch.patchName.split('\x00')[0]
  console.log(`saving: ${patchName}`)
  storeData(patch, `./patches/dutch-bass/${patchName}.json`)
});
