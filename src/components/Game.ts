import { canvas, ctx } from '../utils/canvas';
import Circle from './Circle';

class Game {
  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  private circles: Circle[];

  private animationLastTime: number;

  constructor() {
    this.canvas = canvas;
    this.ctx = ctx;
    this.circles = [];
    this.animationLastTime = 0;
    this.tick = this.tick.bind(this);
  }

  /**
   * Setup the stage canvas, Listeners, Animations
   */
  public init() {
    this.setupCanvas();
    this.listenClicks();
    this.startAnimation();
  }

  private setupCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private listenClicks() {
    this.canvas.addEventListener('click', this.handleCanvasClick.bind(this));
  }

  private handleCanvasClick(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (this.circles.length >= 15) {
      this.circles.shift();
    }

    this.circles.push(new Circle(x, y));
  }

  private startAnimation() {
    requestAnimationFrame(this.tick);
  }

  private tick(currentTime: number) {
    const deltaTime = currentTime - this.animationLastTime;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const circle of this.circles) {
      circle.update(deltaTime);
      circle.draw(this.ctx);
    }

    this.animationLastTime = currentTime;
    requestAnimationFrame(this.tick);
  }
}

export default Game;
