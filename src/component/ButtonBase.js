const BoxGroup = require("./BoxGroup");

class ButtonBase extends BoxGroup {
  onClick(onClickCb) {
    this.on("mouseup", onClickCb);
  }
}

module.exports = ButtonBase;
