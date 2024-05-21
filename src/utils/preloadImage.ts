// Preload circle image once, to use for all circles
const preloadImage = (src: string): Promise<HTMLImageElement> => new Promise((resolve, reject) => {
  const img = new Image();
  img.src = src;
  img.onload = () => resolve(img);
  img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
});

export { preloadImage };
