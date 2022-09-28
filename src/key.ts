import { Knob } from "./knob";

export class Key extends Knob {
  value: number;
  constructor(value: number) {
    super("Key", value);
  }

  getReadableValue() {
    const octave = Math.floor(this.value / 12 - 1);
    const noteName = "C C#D D#E F F#G G#A A#B ".substr(
      (this.value % 12) * 2,
      2
    );
    return octave >= 0 ? noteName.trim() + octave : "--";
  }
}
