export class Knob {
  name: string;
  value: number | string;
  constructor(name: string, value: number | string) {
    this.name = name;
    this.value = value;
  }

  getReadableValue() {
    return this.value;
  }

  toString() {
    return `${this.name}: ${this.getReadableValue()}\n`;
  }

  getName() {
    return this.name;
  }
}

export class GateTimeKnob extends Knob {
  value: number;
  constructor(value: number) {
    super("GateTime", value);
  }

  getReadableValue() {
    return this.value < 73 ? `${Math.floor((this.value * 100) / 72)}%` : "TIE";
  }
}
