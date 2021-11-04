const { fabric } = require("fabric");
const theme = require("../theme");
const ButtonBase = require("./ButtonBase");
const Logo = require("./Logo");

class Button extends ButtonBase {
  constructor(icon, { size, textOptions = { text: undefined }, ...options }) {
    const childs = [new Logo(icon, { size })];

    if (textOptions.text) {
      const text = new fabric.Text(textOptions.text, {
        ...theme.font,
        ...textOptions,
      });
      childs.push(text);
    }

    super(childs, options);
  }
}

module.exports = Button;
