import { Container, Graphics } from 'pixi.js';

class TaskbarUI extends Container {
  /**
   *
   * @param {{ height: number, backgroundColor: number }} options
   */
  constructor(options) {
    let { y, width, height, backgroundColor } = options
    super()

    this.backgroundColor = backgroundColor || 0x202020;

    this._height = height;
    this._width = width;

    this.pivot.set(0, height);
    this.position.set(0, y);

    this._drawBackground();
  }

  _drawBackground() {
    const background = new Graphics();
    background.beginFill(this.backgroundColor);
    background.drawRect(0, 0, this._width, this._height);
    background.endFill();
    this.addChild(background);
  }

  addPin(icon) {
    console.log('Not implemented');
  }
}

export default TaskbarUI;