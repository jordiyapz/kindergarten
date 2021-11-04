const Holder = require("./Holder");
const Button = require("./Button");

class TaskbarButton extends Button {
  constructor(...args) {
    super(...args);
    this.active = true;
  }
}

class Taskbar extends Holder {
  constructor(applications, windowsIcon, options) {
    super([], options);

    this.buttons = [windowsIcon, ...applications.map((app) => app.icon)].map(
      (icon) =>
        new TaskbarButton(icon, {
          size: 18,
          width: 42,
          height: options.height,
          justify: "center",
          align: "center",
        })
    );

    this.addWithUpdate(...this.buttons);
    this.setItemsUnselectable(false);
  }
}

module.exports = Taskbar;
