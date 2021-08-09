import renderer from "../renderer.js";

const app = renderer;

export class TaskbarUI extends PIXI.Container {
  _xOffset = 0;
  _spacing = 4;

  constructor({ height, backgroundColor }) {
    backgroundColor = backgroundColor || 0x202020;

    super();
    this.height = height;
    this.position.set(0, app.screen.height-height);

    const toolbarBackground = new PIXI.Graphics();
    toolbarBackground.beginFill(backgroundColor);
    toolbarBackground.drawRect(0, 0, app.screen.width, height)
    toolbarBackground.endFill();
    super.addChild(toolbarBackground);
  }

  addItem(button) {
    button.position.set(this._xOffset+this._spacing, this.height/2-button.height/2)
    super.addChild(button);
  }
}