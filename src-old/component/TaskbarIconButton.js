import IconButton from "./IconButton";
import { Graphics } from "pixi.js";

class TaskbarIconButton extends IconButton {
  /**
   *
   * @param {number} size
   * @param {Texture} iconTexture
   * @param {{ padding: 7, isActive: false, underlineColor: 0x70a0d0 }} options
   */
  constructor(size, iconTexture, options = {}) {
    const { isActive, padding, underlineColor, ...iconButtonOptions } = options;

    super(size, iconTexture, {
      padding: padding || 7,
      ...iconButtonOptions,
    });
    this._underline = this._createUnderline(3, underlineColor);
    this.setActive(isActive || false);
    this.addChild(this._underline);
  }

  _createUnderline(height, color) {
    const underlineGraphic = new Graphics();
    underlineGraphic.pivot.set(0, height);
    underlineGraphic.beginFill(color || 0x70a0d0);
    underlineGraphic.drawRect(0, this._size, this._size, height);
    underlineGraphic.endFill();
    return underlineGraphic;
  }

  /**
   *
   * @param {boolean} state
   */
  setActive(state = true) {
    this.isActive = state;
    this._underline.visible = this.isActive;
  }
}

export default TaskbarIconButton;
