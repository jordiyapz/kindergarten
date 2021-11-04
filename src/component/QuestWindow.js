const { fabric } = require("fabric");
const theme = require("../theme");
const { useObserver } = require("../util/hooks");
const ApplicationWindow = require("./ApplicationWindow");
const Holder = require("./Holder");

class QuestWindow extends ApplicationWindow {
  constructor(iconTexture, options) {
    super({ iconTexture, title: "Quest App" }, options);
    this._extendState({ text: "Move the cursor to red circle" });

    const questBodyContent = new fabric.Text(this.state.text, {
      ...theme.font,
      fill: "black",
    });

    this.body = new Holder([questBodyContent], {
      padding: 4,
      backgroundColor: theme.palette.stickyNoteYellow,
      width: this.bodyWidth,
      height: this.bodyHeight,
      selectable: false,
    });

    this.compile();

    this.onStateChange.text = (text) => {
      questBodyContent.set("text", text);
    };
  }
}

module.exports = QuestWindow;
