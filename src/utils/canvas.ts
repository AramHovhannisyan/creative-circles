const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

if (!canvas || !ctx) {
  throw new Error('Failed to initialize canvas or context');
}

export { canvas, ctx };
