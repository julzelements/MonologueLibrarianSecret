import { Key } from "./key";
import { GateTimeKnob, Knob } from "./knob";
import { oscillator, Filter, Envelope, LFO, MiscParams } from "./parameters";
import { Sequencer, Step, MotionSlotParams, Note, SequencerEvent } from "./sequencer";
import { DutySwitch, EnvelopeSwitch, LFOModeSwitch, OctaveSwitch, OnOffSwitch, PercentSwitch, StepResolutionSwith, Switch, TargetSwitch, TARGET_SWITCH_TYPE, WaveTypeSwitch, WAVE_TYPE_SWITCH_OSCILLATOR } from "./switch";
import { addLowerBits, bin, getBits } from "./utilities";

Array.prototype.toString = function () {
  return this.join("");
};

export class Monologue {
  patchName: string;
  drive: Knob;
  oscillators: any;
  filter: any;
  envelope: any;
  lfo: any;
  misc: any;
  sequencer: any;

  constructor(
    patchName: string,
    drive: Knob,
    oscillators: oscillator[],
    filter: Filter,
    envelope: Envelope,
    lfo: LFO,
    misc: MiscParams,
    sequencer: Sequencer
  ) {
    this.patchName = patchName;
    this.drive = drive;
    this.oscillators = oscillators;
    this.filter = filter;
    this.envelope = envelope;
    this.lfo = lfo;
    this.misc = misc;
    this.sequencer = sequencer;
  }

  static createFromSysEx(data: any[]) {
    const SLIDER_ASSIGN_MATRIX = {
      13: "VCO 1 PITCH",
      14: "VCO 1 SHAPE",
      17: "VCO 2 PITCH",
      18: "VCO 2 SHAPE",
      21: "VCO 1 LEVEL",
      22: "VCO 1 LEVEL",
      23: "CUTOFF",
      24: "RESONANCE",
      26: "ATTACK",
      27: "DECAY",
      28: "EG INT",
      31: "LFO RATE",
      32: "LFO INT",
      40: "PORTAMENT",
      56: "PITCH BEND",
      57: "GATE TIME",
    };

    const name = data
      .slice(4, 16)
      .map((x: number) => String.fromCharCode(x))
      .join("");
    const drive = new Knob("Drive", addLowerBits(data[29], data[35], 6));
    const oscOne = oscOneFromSysEx(data);
    const oscTwo = oscTwoFromSysEx(data);
    const filter = new Filter(
      new Knob("Cutoff", addLowerBits(data[22], data[33], 4)),
      new Knob("Resonance", addLowerBits(data[23], data[33], 6))
    );
    const envelope = envFromSysEx(data);
    const lfo = lfoFromSysEx(data);
    const misc = new MiscParams(
      new OnOffSwitch("BPM Sync", getBits(data[44], 3, 3)),
      new OnOffSwitch("Portament Mode", getBits(data[44], 0, 0)),
      new Knob("Potament Time", data[41]),
      new PercentSwitch("Cutoff Velocity", getBits(data[44], 4, 5)),
      new PercentSwitch("Cutoff Key Track", getBits(data[44], 6, 7)),
      new Switch("Slider Assign", SLIDER_ASSIGN_MATRIX[data[42]])
    );
    const sequencer = sequencerFromSysEx(data);

    return new Monologue(
      name,
      drive,
      [oscOne, oscTwo],
      filter,
      envelope,
      lfo,
      misc,
      sequencer
    );

    /* Convenience functions nested for privacy */

    function oscOneFromSysEx(data: number[]) {
      // Waveform
      const wave = new WaveTypeSwitch(
        WAVE_TYPE_SWITCH_OSCILLATOR.VCO1,
        getBits(data[30], 6, 7)
      );

      // Shape
      const shapeValue = addLowerBits(data[17], data[30], 2);
      const shape = new Knob("Shape", shapeValue);

      // Level
      const levelValue = addLowerBits(data[20], data[33], 0);
      const level = new Knob("Level", levelValue);

      return new oscillator(wave, shape, level);
    }

    function oscTwoFromSysEx(data: number[]) {
      // Waveform
      const wave = new WaveTypeSwitch(
        WAVE_TYPE_SWITCH_OSCILLATOR.VCO2,
        getBits(data[31], 6, 7)
      );

      // Shape
      const shapeValue = addLowerBits(data[19], data[31], 2);
      const shape = new Knob("Shape", shapeValue);

      // Level
      const levelValue = addLowerBits(data[21], data[33], 2);
      const level = new Knob("Level", levelValue);

      // Sync
      const syncValue = getBits(data[32], 0, 1);
      const duty = new DutySwitch(syncValue);

      // pitch
      const pitchValue = addLowerBits(data[18], data[31], 0);
      const pitch = new Knob("Pitch", pitchValue);

      // Octave
      const octaveValue = getBits(data[31], 4, 5);
      const octave = new OctaveSwitch(octaveValue);

      return new oscillator(wave, shape, level, pitch, duty, octave);
    }

    function envFromSysEx(data: number[]) {
      // type
      const type = new EnvelopeSwitch(getBits(data[34], 0, 1));

      // attack
      const attackValue = addLowerBits(data[24], data[34], 2);
      const attack = new Knob("Attack", attackValue);

      // delay
      const decayValue = addLowerBits(data[25], data[34], 4);
      const decay = new Knob("Decay", decayValue);

      //intensity
      const absIntValue = addLowerBits(data[26], data[35], 0);
      const intensity = new Knob("Intensity", absIntValue - 512);

      // target
      const target = new TargetSwitch(
        TARGET_SWITCH_TYPE.ENVELOPE,
        getBits(data[34], 6, 7)
      );

      return new Envelope(type, attack, decay, intensity, target);
    }

    function lfoFromSysEx(data: number[]) {
      // wave
      const wave = new WaveTypeSwitch(
        WAVE_TYPE_SWITCH_OSCILLATOR.LFO,
        getBits(data[36], 0, 1)
      );

      // mode
      const modeRaw = getBits(data[36], 2, 3);
      const mode = new LFOModeSwitch(modeRaw);

      // Rate
      const rateValue = addLowerBits(data[27], data[35], 2);
      const rate = new Knob("Rate", rateValue);

      // Intensity
      const absIntValue = addLowerBits(data[28], data[35], 4);
      const intensity = new Knob("Intensity", absIntValue - 512);

      // TargetSwitch
      const target = new TargetSwitch(
        TARGET_SWITCH_TYPE.LFO,
        getBits(data[36], 4, 5)
      );

      return new LFO(wave, mode, rate, intensity, target);
    }

    function sequencerFromSysEx(data: number[]) {
      const MOTION_PARAM_MATRIX = {
        0: "None",
        13: "VCO 1 PITCH",
        14: "VCO 1 SHAPE",
        15: "VCO 1 OCTAVE",
        16: "VCO 1 WAVE",
        17: "VCO 2 PITCH",
        18: "VCO 2 SHAPE",
        19: "VCO 2 OCTAVE",
        20: "VCO 2 WAVE",
        21: "VCO 1 LEVEL",
        22: "VCO 2 LEVEL",
        23: "CUTOFF",
        24: "RESONANCE",
        25: "SYNC/RING",
        26: "ATTACK",
        27: "DECAY",
        28: "EG INT",
        29: "EG TYPE",
        30: "EG TARGET",
        31: "LFO RATE",
        32: "LFO INT",
        33: "LFO TARGET",
        34: "LFO TYPE",
        35: "LFO MODE",
        37: "DRIVE",
        40: "PORTAMENT",
        56: "PITCH BEND",
        57: "GATE TIME",
      };

      const steps = [];
      for (let i = 0; i < 16; i++) {
        const note = new Note(
          new Key(data[96 + i * 22]),
          new Knob("Velocity", data[96 + 2 + i * 22]),
          new GateTimeKnob(getBits(data[96 + 4 + i * 22], 0, 6)),
          new OnOffSwitch("Trigger", getBits(data[96 + 4 + i * 22], 7, 7))
        );
        const motionSlotsData = [[], [], [], []];
        for (let j = 0; j < 4; j++) {
          motionSlotsData[j].push(
            new Knob(
              `Motion Slot ${j + 1} Data 1`,
              data[96 + 6 + j * 4 + i * 22]
            )
          );
          motionSlotsData[j].push(
            new Knob(
              `Motion Slot ${j + 1} Data 2`,
              data[96 + 7 + j * 4 + i * 22]
            )
          );
          motionSlotsData[j].push(
            new Knob(
              `Motion Slot ${j + 1} Data 3`,
              data[96 + 8 + j * 4 + i * 22]
            )
          );
          motionSlotsData[j].push(
            new Knob(
              `Motion Slot ${j + 1} Data 4`,
              data[96 + 9 + j * 4 + i * 22]
            )
          );
          // add the tabs to each motionSlotData Array toString method. Ugly Hack Alert!
          motionSlotsData[j].toString = function () {
            return this.join("\t");
          };
        }
        // add the tabs to the motionSlotsData Array toString method. Ugly Hack Alert!
        motionSlotsData.toString = function () {
          return this.join("\t");
        };
        const sequencerEvent = new SequencerEvent(note, motionSlotsData);
        const step = new Step(
          i + 1,
          new OnOffSwitch(
            `On/Off`,
            getBits(data[64 + Math.floor(i / 16)], i % 8, i % 8)
          ),
          new OnOffSwitch(
            `Motion On/Off`,
            getBits(data[66 + Math.floor(i / 16)], i % 8, i % 8)
          ),
          new OnOffSwitch(
            `Slide On/Off`,
            getBits(data[68 + Math.floor(i / 16)], i % 8, i % 8)
          ),
          sequencerEvent
        );
        steps.push(step);
      }
      const motionSlotParams = [];
      for (let i = 0; i < 4; i++) {
        motionSlotParams.push(
          new MotionSlotParams(
            i + 1,
            new OnOffSwitch("On/Off", getBits(data[72 + i * 2], 0, 0)),
            new OnOffSwitch("Smooth On/Off", getBits(data[72 + i * 2], 1, 1)),
            new Switch("Parameter", MOTION_PARAM_MATRIX[data[73 + i * 2]])
          )
        );
      }

      const bpm =
        parseInt(bin(getBits(data[53], 0, 3)) + bin(data[52]), 2) / 10;

      return new Sequencer(
        new Knob("BPM", bpm),
        new Knob("Step Length", data[54]),
        new StepResolutionSwith(data[55]),
        new Knob("Swing", data[56] > 75 ? data[56] - 256 : data[56]),
        new Knob("Default Gate Time", data[57] / 72),
        motionSlotParams,
        steps
      );
    }
  }

  toString() {
    return `MONOLOGUE PATCH: ${this.patchName}\n----------------------------\n\n${this.drive}VCO1:\n${this.oscillators[0]}VCO2:\n${this.oscillators[1]}Filter:\n${this.filter}Envelope:\n${this.envelope}LFO:\n${this.lfo}Misc Params:\n${this.misc}\n${this.sequencer}`;
  }
}



// TODO: work out smooth function for Pitch
/*class PitchKnob extends Knob {
  constructor(value) {
    super('Pitch', value);
  }

  getReadableValue() {
    if (this.value < 4) {
      return -1200;
    } else if (4 <= this.value < 356) {
      return -1200 + ((1200 - 256) * (this.value - 4) / 352);
    } else if (356 <= this.value < 476) {
      return -256 + ((256 - 16) * (this.value - 356) / 120);
    } else if (476 <= this.value < 492) {
      return -16 + (16 * (this.value - 375) / 16);
    } else if (492 <= this.value < 532) {
      return 0
    } else if (this.value >= 1020) {
      return 1200;
    } else if (668 <= this.value < 1020) {
      return 256 + ((1200 - 256) * (this.value - 668) / 352);
    } else if (548 <= this.value < 668) {
      return 16 + ((256 - 16) * (this.value - 548) / 120);
    } else if (532 <= this.value < 548) {
      return 0 + (16 * (this.value - 532) / 16);
    }
  }

}*/
