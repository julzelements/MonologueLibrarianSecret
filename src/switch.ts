import { Knob } from "./knob";

export class Switch extends Knob {
  value: number;
  name: string;
  constructor(name: string, value: number) {
    super(name, value);
  }

  toString() {
    return `${this.name}: ${this.getReadableValue()}\n`;
  }
}

export class PercentSwitch extends Switch {
  value: number;
  constructor(name: string, value: number) {
    super(name, value);
  }

  getReadableValue() {
    return `${this.value * 50}%`;
  }
}

export class OnOffSwitch extends Switch {
  value: number;
  constructor(name: string, value: number) {
    super(name, value);
  }

  getReadableValue() {
    return `${this.value ? "On" : "Off"}`;
  }
}

export class StepResolutionSwith extends Switch {
  value: number;
  constructor(value: number) {
    super("Step Resolution", value);
  }

  getReadableValue() {
    return `1/${2 ^ this.value}`;
  }
}

export enum OSCILLATOR {
  VCO1 = 0,
  VCO2 = 1,
  LFO = 2,
}

export class WaveTypeSwitch extends Switch {
  oscillator: OSCILLATOR;
  value: number;

  constructor(oscillator: OSCILLATOR, value: number) {
    super("Wave", value);
    this.oscillator = oscillator;
  }

  getReadableValue() {
    switch (this.value) {
      case 2:
        return "Sawtooth";
      case 1:
        return "Triangle";
      case 0:
        if (this.oscillator === OSCILLATOR.VCO2) {
          return "Noise";
        } else {
          return "Square";
        }
      default:
        return "Unknown";
    }
  }
}

export class DutySwitch extends Switch {
  value: number;
  constructor(value: number) {
    super("Duty", value);
  }

  getReadableValue() {
    switch (this.value) {
      case 0:
        return "Ring";
      case 1:
        return "None";
      case 2:
        return "Sync";
      default:
        return "Unknown";
    }
  }
}

export class OctaveSwitch extends Switch {
  value: number;
  constructor(value: number) {
    super("Octave", value);
  }
  getReadableValue() {
    switch (this.value) {
      case 0:
        return '16"';
      case 1:
        return '8"';
      case 2:
        return '4"';
      case 3:
        return '2"';
      default:
        return "Unknown";
    }
  }
}

export class EnvelopeSwitch extends Switch {
  value: number;
  constructor(value: number) {
    super("Envelope Type", value);
  }

  getReadableValue() {
    switch (this.value) {
      case 0:
        return "Gate";
      case 1:
        return "AGD";
      case 2:
        return "AD";
      default:
        return "Unknown";
    }
  }
}

export enum TARGET {
  ENVELOPE = 0,
  LFO = 1,
}

export class TargetSwitch extends Switch {
  value: number;
  type: TARGET;

  constructor(type: TARGET, value: number) {
    super("Target", value);
    this.type = type;
  }

  getReadableValue() {
    switch (this.value) {
      case 0:
        return "Cutoff";
      case 1:
        return this.type == TARGET.LFO ? "Shape" : "Pitch 2";
      case 2:
        return "Pitch";
      default:
        return "Unknown";
    }
  }
}

export class LFOModeSwitch extends Switch {
  value: number;
  constructor(value: number) {
    super("LFO Mode", value);
  }

  getReadableValue() {
    switch (this.value) {
      case 0:
        return "1-Shot";
      case 1:
        return "Slow";
      case 2:
        return "Fast";
      default:
        return "Unknown";
    }
  }
}
