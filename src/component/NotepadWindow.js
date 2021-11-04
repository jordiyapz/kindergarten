const theme = require("../theme");
const { useObserver } = require("../util/hooks");
const ApplicationWindow = require("./ApplicationWindow");
const Holder = require("./Holder");
const { fabric } = require("fabric");

class NotepadWindow extends ApplicationWindow {
  constructor(iconTexture, options) {
    super({ iconTexture, title: "Notepad" }, options);
    this._extendState({ text: "Lorem ipsum dolor sit amet!" });

    const notepadBodyContent = new fabric.Text(this.state.text, {
      ...theme.font,
      fill: "black",
    });

    this.body = new Holder([notepadBodyContent], {
      backgroundColor: "white",
      padding: 4,
      width: this.bodyWidth,
      height: this.bodyHeight,
    });
    this.body.setItemsUnselectable();

    this.compile();
  }
}

module.exports = NotepadWindow;
