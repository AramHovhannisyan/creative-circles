import { preloadImage } from '../utils/preloadImage';
import { COCONUT_IMG } from '../utils/constants';
import Game from './Game';

class Stage {
  // Preload Circle image to use for all Circle-s
  private preloadedImage: HTMLImageElement;

  constructor() {
    this.preloadedImage = new Image();
  }

  /**
   * Load all game assets
   * Start the Game
   */
  public async setup() {
    try {
      await this.preloadAssets();
      this.initializeGame();
    } catch (error) {
      console.error('Initialization error:', error);
    }
  }

  // Preload required assets
  private async preloadAssets() {
    try {
      this.preloadedImage = await preloadImage(COCONUT_IMG);
      console.info('Image preloaded successfully');
    } catch (error) {
      throw new Error(`Failed to preload assets: ${error}`);
    }
  }

  private initializeGame() {
    const game = new Game(this.preloadedImage);
    game.init();
  }
}

export default Stage;
