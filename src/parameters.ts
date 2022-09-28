class oscillator {
    wave: WaveTypeSwitch;
    shape: Knob;
    level: Knob;
    pitch: Knob;
    duty: DutySwitch;
    octave: OctaveSwitch;
    constructor(
      wave: WaveTypeSwitch,
      shape: Knob,
      level: Knob,
      pitch: Knob,
      duty: DutySwitch,
      octave: OctaveSwitch
    ) {
      this.wave = wave;
      this.shape = shape;
      this.level = level;
      this.pitch = pitch || new Knob("Pitch", 0);
      this.duty = duty || new DutySwitch(1);
      this.octave = octave || new OctaveSwitch(0);
    }
  
    toString() {
      return `\t${this.wave}\t${this.shape}\t${this.level}\t${this.pitch}\t${this.duty}\t${this.octave}`;
    }
  }
  
  class Filter {
    cutoff: Knob;
    resonance: Knob;
    constructor(cutoff: Knob, resonance: Knob) {
      this.cutoff = cutoff;
      this.resonance = resonance;
    }
  
    toString() {
      return `\t${this.cutoff}\t${this.resonance}`;
    }
  }
  
  class Envelope {
    type: EnvelopeSwitch;
    attack: Knob;
    decay: Knob;
    intensity: Knob;
    target: TargetSwitch;
    constructor(
      type: EnvelopeSwitch,
      attack: Knob,
      decay: Knob,
      intensity: Knob,
      target: TargetSwitch
    ) {
      this.type = type;
      this.attack = attack;
      this.decay = decay;
      this.intensity = intensity;
      this.target = target;
    }
  
    toString() {
      return `\t${this.type}\t${this.attack}\t${this.decay}\t${this.intensity}\t${this.target}`;
    }
  }
  
  class LFO {
    wave: WaveTypeSwitch;
    mode: LFOModeSwitch;
    rate: Knob;
    intensity: Knob;
    target: TargetSwitch;
    constructor(
      wave: WaveTypeSwitch,
      mode: LFOModeSwitch,
      rate: Knob,
      intensity: Knob,
      target: TargetSwitch
    ) {
      this.wave = wave;
      this.mode = mode;
      this.rate = rate;
      this.intensity = intensity;
      this.target = target;
    }
  
    toString() {
      return `\t${this.wave}\t${this.mode}\t${this.rate}\t${this.intensity}\t${this.target}`;
    }
  }
  
  class MiscParams {
    bpmSync: OnOffSwitch;
    portamentMode: OnOffSwitch;
    portamentTime: Knob;
    cutoffVelocity: PercentSwitch;
    cutoffKeyTrack: PercentSwitch;
    sliderAssign: Switch;
    constructor(
      bpmSync: OnOffSwitch,
      portamentMode: OnOffSwitch,
      portamentTime: Knob,
      cutoffVelocity: PercentSwitch,
      cutoffKeyTrack: PercentSwitch,
      sliderAssign: Switch
    ) {
      this.bpmSync = bpmSync;
      this.portamentMode = portamentMode;
      this.portamentTime = portamentTime;
      this.cutoffVelocity = cutoffVelocity;
      this.cutoffKeyTrack = cutoffKeyTrack;
      this.sliderAssign = sliderAssign;
    }
  
    toString() {
      return `\t${this.bpmSync}\t${this.portamentMode}\t${this.portamentTime}\t${this.cutoffVelocity}\t${this.cutoffKeyTrack}\t${this.sliderAssign}`;
    }
  }