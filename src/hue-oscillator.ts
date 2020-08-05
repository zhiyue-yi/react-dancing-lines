import { HueOscillatorOptions } from './types';

class HueOscillator {
  public phase: number;
  public offset: number;
  public frequency: number;
  public amplitude: number;
  public value: number = 0;

  constructor(options: HueOscillatorOptions) {
    this.phase = options.phase || 0;
    this.offset = options.offset || 0;
    this.frequency = options.frequency || 0.001;
    this.amplitude = options.amplitude || 1;
  }

  update() {
    this.phase += this.frequency;
    this.value = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.value;
  }
}

export default HueOscillator;
