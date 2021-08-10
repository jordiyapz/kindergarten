import IconButton from "./IconButton";
import { Text, Texture } from 'pixi.js';

class DesktopIconButton extends IconButton {
  /**
   * @param {number} size
   * @param {Texture} iconTexture
   * @param {string} name
   * @param {object} options
   */
  constructor(size, iconTexture, name, options) {
    const { fontSize, ...restOptions } = options;
    super(size, iconTexture, options);
    const text = new Text(name, {
      fontSize: fontSize || 12,
      align: "center",
      fill: 0xffffff,
      dropShadow: true,
      dropShadowAngle: 1,
      dropShadowColor: 0x000000,
      dropShadowDistance: 1,
    });
    text.position.set(size/2, size);
    text.anchor.x = .5;
    this.addChild(text);
  }
}

export default DesktopIconButton;