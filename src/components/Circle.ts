import { canvas } from '../utils/canvas';
import { Vector } from '../utils/types';

// Constant rate of acceleration for realistic falling effect
const GRAVITY_RATIO = 300;

export default class Circle {
  private position: Vector;

  private velocity: Vector;

  private emoji: string;

  private radius: number;

  private emojiSize: number;

  private acceleration: number;

  private damping: number;

  constructor(x: number, y: number) {
    this.position = { x, y };
    this.radius = 40;
    this.emojiSize = this.radius * 2;
    this.velocity = { x: 0, y: 0 };
    this.acceleration = 9.8 * GRAVITY_RATIO;
    this.damping = 0.7;
    this.emoji = this.getRandomEmoji();
  }

  // Draw Circle with emoji in it
  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.font = `${this.emojiSize}px Arial`;
    ctx.fillText(this.emoji, this.position.x - this.radius / 2, this.position.y + this.radius / 2);
    ctx.closePath();
  }

  // Update Position and velocity on each frame
  public update(deltaTime: number) {
    const timeInSeconds = deltaTime * 0.001;

    /**
     * Velocity formula: V2 =  V1 + A * T
     * Position formula: S =  V * T
     */
    this.velocity.y += this.acceleration * timeInSeconds;
    this.position.y += this.velocity.y * timeInSeconds;

    /**
     * Circle collided with the lower border
     * Reverse the direction
     * Apply 70 of velocity for bouncing effect
     */
    if (this.position.y + this.radius > canvas.height) {
      this.position.y = canvas.height - this.radius;
      this.velocity.y *= -this.damping;

      // Stop circle when velocity is very low
      if (Math.abs(this.velocity.y) < 1) {
        this.velocity.y = 0;
      }
    }
  }

  // Get random emoji to fill the circle
  private getRandomEmoji(): string {
    const emojis = ['😀', '😎', '😊', '🤔', '😄', '😍', '😃', '😉', '😁', '🥳', '😂', '🤣', '😇', '😜', '😘', '🤩', '😋', '😌', '😏', '😇'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }
}
