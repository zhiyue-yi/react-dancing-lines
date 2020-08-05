export interface Point {
  x: number;
  y: number;
}

export interface TendrilOptions {
  spring: number;
  friction: number;
  size: number;
  dampening?: number;
  tension?: number;
  targetRef: React.MutableRefObject<Point>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export interface HueOscillatorOptions {
  phase?: number;
  offset?: number;
  frequency?: number;
  amplitude?: number;
}

export class Node {
  /** Position x in canvas */
  public x = 0;
  /** Position y in canvas */
  public y = 0;
  /** Velocity of x */
  public vx = 0;
  /** Velocity of y */
  public vy = 0;
}
