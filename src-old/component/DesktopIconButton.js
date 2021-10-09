import IconButton from "./IconButton";
import { Graphics, Text, Texture } from "pixi.js";

class DesktopIconButton extends IconButton {
  /**
   * @param {number} size
   * @param {Texture} iconTexture
   * @param {string} name
   * @param {object} options
   */
  constructor(size, iconTexture, name, options) {
    const { fontSize, ...restOptions } = options;
    super(size.width || size, iconTexture, options);
    const text = new Text(name, {
      fontSize: fontSize || 12,
      align: "center",
      fill: 0xffffff,
      dropShadow: true,
      dropShadowAngle: 1,
      dropShadowColor: 0x000000,
      dropShadowDistance: 1,
    });
    text.position.set(size / 2, size);
    text.anchor.x = 0.5;
    // this.height = size.height || size;
    this.addChild(text);
  }

  _addOverlay() {
    const overlay = new Graphics();
    overlay.beginFill(0xffffff, 0.2);
    overlay.lineStyle(2, 0xffffff, 0.3);
    overlay.drawRect(0, 0, this._width, this._height);
    overlay.visible = false;
    this.addChild(overlay);
    this._overlay = overlay;
  }
}

export default DesktopIconButton;
