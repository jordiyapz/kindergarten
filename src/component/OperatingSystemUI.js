import { Container } from 'pixi.js';
import DesktopIconButton from './DesktopIconButton';
import IconButton from './IconButton';
import TaskbarIconButton from './TaskbarIconButton';
import TaskbarUI from "./TaskbarUI";

class OperatingSystemUI extends Container {
  constructor(width, height) {
    super();
    this._workspace = new Container();
    this.addChild(this._workspace);
    this._screen = { width, height };

    this._desktop = new Container();
    this._taskbar = new TaskbarUI({
      y: this._screen.height,
      width: this._screen.width,
      height: 32,
      backgroundColor: 0x404040
    })
    this._workspace.addChild(this._desktop, this._taskbar);
  }

  setup(resources) {
    const questButton = new DesktopIconButton(40, resources['quest-icon'].texture, 'Quest', { padding: 4 });
    this._desktop.addChild(questButton);

    const startButton = new TaskbarIconButton(this._taskbar._height, resources['windows-logo'].texture);
    startButton.setActive(true);
    this._taskbar.addChild(startButton);
  }
}

export default OperatingSystemUI;