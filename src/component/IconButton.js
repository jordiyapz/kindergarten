import { Container , Sprite, Texture} from 'pixi.js';

class IconButton extends Container {
  /**
   *
   * @param {number} size
   * @param {Texture} iconTexture
   * @param {{ padding: number }} options
   */
  constructor(size, iconTexture, options={}) {
    const { padding } = options;
    super()

    this.width = size;
    this.height = size;
    this.iconTexture = iconTexture

    this._size = size;
    this._padding = padding || 0;

    this._drawIcon();
  }
  _drawIcon() {
    const iconSprite = new Sprite(this.iconTexture);
    iconSprite.anchor.set(.5);
    iconSprite.position.set(this._width/2);
    iconSprite.width = this._size - this._padding*2;
    iconSprite.height = iconSprite._width;
    this.addChild(iconSprite);
  }
}

export default IconButton;