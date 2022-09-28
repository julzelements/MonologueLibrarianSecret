import { Key } from "./key";
import { Knob, GateTimeKnob } from "./knob";
import { StepResolutionSwith, OnOffSwitch, Switch } from "./switch";

export class Sequencer {
    bpm: Knob;
    stepLength: Knob;
    stepResolution: StepResolutionSwith;
    swing: Knob;
    defaultGateTime: Knob;
    motionSlotParams: any[];
    steps: any[];
    constructor(
      bpm: Knob,
      stepLength: Knob,
      stepResolution: StepResolutionSwith,
      swing: Knob,
      defaultGateTime: Knob,
      motionSlotParams: any[],
      steps: any[]
    ) {
      this.bpm = bpm;
      this.stepLength = stepLength;
      this.stepResolution = stepResolution;
      this.swing = swing;
      this.defaultGateTime = defaultGateTime;
      this.motionSlotParams = motionSlotParams; // 4 slot array
      this.steps = steps; // 16 slot array
    }
  
    toString() {
      return `SEQUENCER\n---------\n${this.bpm}${this.stepLength}${this.stepResolution}${this.swing}${this.defaultGateTime}\n${this.motionSlotParams}${this.steps}`;
    }
  }
  
  export class MotionSlotParams {
    slotNumber: number;
    active: OnOffSwitch;
    smooth: OnOffSwitch;
    parameter: Switch;
    constructor(
      slotNumber: number,
      active: OnOffSwitch,
      smooth: OnOffSwitch,
      parameter: Switch
    ) {
      this.slotNumber = slotNumber;
      this.active = active;
      this.smooth = smooth;
      this.parameter = parameter;
    }
  
    toString() {
      return `Motion Slot ${this.slotNumber}\n\t${this.active}\t${this.smooth}\t${this.parameter}\n`;
    }
  }
  
  export class Step {
    stepNumber: number;
    active: OnOffSwitch;
    motionActive: OnOffSwitch;
    slideActive: OnOffSwitch;
    event: SequencerEvent;
    constructor(
      stepNumber: number,
      active: OnOffSwitch,
      motionActive: OnOffSwitch,
      slideActive: OnOffSwitch,
      event: SequencerEvent
    ) {
      this.stepNumber = stepNumber;
      this.active = active;
      this.motionActive = motionActive;
      this.slideActive = slideActive;
      this.event = event;
    }
  
    toString() {
      return `Step ${this.stepNumber}\n\t${this.active}\t${this.motionActive}\t${this.slideActive}\n${this.event}`;
    }
  }
  
  export class SequencerEvent {
    note: Note;
    motionSlotsData: any[][];
    constructor(note: Note, motionSlotsData: any[][]) {
      this.note = note;
      this.motionSlotsData = motionSlotsData; // 4-Array of 4-Arrays
    }
  
    toString() {
      return `${this.note}\n\t${this.motionSlotsData}\n`;
    }
  }
  
  export class Note {
    key: Key;
    velocity: Knob;
    gateTime: GateTimeKnob;
    trigger: OnOffSwitch;
    constructor(
      key: Key,
      velocity: Knob,
      gateTime: GateTimeKnob,
      trigger: OnOffSwitch
    ) {
      this.key = key;
      this.velocity = velocity;
      this.gateTime = gateTime;
      this.trigger = trigger;
    }
  
    toString() {
      return `\t${this.key}\t${this.velocity}\t${this.gateTime}\t${this.trigger}`;
    }
  }