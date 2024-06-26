import { canvas } from '../utils/canvas';
import { Vector } from '../types/index';
import {
  GRAVITY_RATIO, DAMPING, RADIUS, VELOCITY_X, VELOCITY_Y, COCONUT_IMG,
} from '../utils/constants';

export default class Circle {
  private position: Vector;

  private velocity: Vector;

  private radius: number;

  private acceleration: number;

  private damping: number;

  private image: HTMLImageElement;

  private size: number;

  private isLoaded: boolean;

  constructor(x: number, y: number) {
    this.radius = RADIUS;
    this.position = this.adjustPosition({ x, y });
    this.velocity = { x: VELOCITY_X, y: VELOCITY_Y };
    this.acceleration = 9.8 * GRAVITY_RATIO;
    this.damping = DAMPING;

    this.image = new Image();
    this.image.src = COCONUT_IMG;
    this.size = this.radius * 2;
    this.isLoaded = false;

    // Listen to the load event of the image
    this.image.onload = () => {
      this.isLoaded = true;
    };

    // Catch image not loaded error
    this.image.onerror = () => {
      console.error('Failed to load image');
    };
  }

  // Move circle into canvas if click was too close to the border
  adjustPosition(position: Vector): Vector {
    const adjustedPosition = { ...position };

    // Check if the circle is out of the left border
    if (adjustedPosition.x - this.radius < 0) {
      adjustedPosition.x = this.radius;
    }

    // Check if the circle is out of the right border
    if (adjustedPosition.x + this.radius > canvas.width) {
      adjustedPosition.x = canvas.width - this.radius;
    }

    // Check if the circle is out of the top border
    if (adjustedPosition.y - this.radius < 0) {
      adjustedPosition.y = this.radius;
    }

    // Check if the circle is out of the bottom border
    if (adjustedPosition.y + this.radius > canvas.height) {
      adjustedPosition.y = canvas.height - this.radius;
    }

    return adjustedPosition;
  }

  // Draw Circle with emoji in it
  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);

    if (this.isLoaded) {
      // ctx.fillStyle = '#0000ff';
      // ctx.fill();

      ctx.drawImage(
        this.image,
        this.position.x - this.radius,
        this.position.y - this.radius,
        this.size,
        this.size,
      );
    }

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
}
