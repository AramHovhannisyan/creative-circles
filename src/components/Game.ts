import { canvas, ctx } from '../utils/canvas';
import Circle from './Circle';

class Game {
  private circles: Circle[];

  private animationLastTime: number;

  preloadedImage: HTMLImageElement;

  constructor(preloadedImage: HTMLImageElement) {
    this.circles = [];
    this.animationLastTime = 0;
    this.preloadedImage = preloadedImage;
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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private listenClicks() {
    canvas.addEventListener('click', this.handleCanvasClick);
  }

  private handleCanvasClick = (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (this.circles.length >= 15) {
      this.circles.shift();
    }

    this.circles.push(new Circle(x, y));
  };

  private startAnimation() {
    requestAnimationFrame(this.tick);
  }

  private tick = (currentTime: number) => {
    const deltaTime = currentTime - this.animationLastTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const circle of this.circles) {
      circle.update(deltaTime);
      circle.draw(ctx);
    }

    this.animationLastTime = currentTime;
    requestAnimationFrame(this.tick);
  };
}

export default Game;
