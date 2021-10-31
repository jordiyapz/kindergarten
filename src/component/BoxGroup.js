const { fabric } = require("fabric");

const Box = new fabric.util.createClass(fabric.Group, {
  type: "BoxGroup",
  /**
   *
   * @param {fabric.Object[]} components
   * @param {{
   *  direction: 'row' | 'column',
   *  justify: 'start' | 'end' | 'center',
   *  autoLayout?: boolean,
   * }} options
   */
  initialize: function (
    components,
    {
      top = 0,
      left = 0,
      width,
      height,
      backgroundColor,
      padding = 0,
      direction = "row",
      justify = "start",
      align = "start",
      autoLayout = false,
      spacing = 0,
      ...options
    } = {}
  ) {
    padding =
      typeof padding === "object" ? padding : { x: padding, y: padding };

    components.forEach((c) => {
      c.set({ top: c.top + padding.y, left: c.left + padding.x });
    });

    if (autoLayout) {
      let val = 0;
      components.forEach((c) => {
        if (direction === "row") {
          c.set({ left: c.left + val });
          val += c.width + spacing;
        } else if (direction === "column") {
          c.set({ top: c.top + val });
          val += c.height + spacing;
        }
      });
    }

    this.callSuper("initialize", components, {
      padding: Math.max(padding.x, padding.y),
      top,
      left,
      originX: "left",
      originY: "top",
      ...options,
    });
    this.justify = justify;
    this.autoLayout = autoLayout;
    this.direction = direction;
    this.align = align;

    if (justify === "center") {
      components.forEach((c) => {
        if (width !== undefined && direction === "row") {
          c.set({ left: c.left + (width - this.width) / 2 - padding.x });
        } else if (height !== undefined && direction === "column") {
          c.set({ top: c.top + (height - this.height) / 2 - padding.y });
        }
      });
    }

    const bgWidth = width || this.width + padding.x * 2;
    const bgHeight = height || this.height + padding.y * 2;

    if (align === "center") {
      components.forEach((c) => {
        if (direction === "row") {
          c.set({
            top: c.top + (bgHeight - c.height) / 2 - padding.y,
          });
        } else if (direction === "column") {
          c.set({ left: c.left + (bgWidth - c.width) / 2 - padding.x });
        }
      });
    }

    this.set({
      left: this.left + padding.x,
      top: this.top + padding.y,
    });

    const bg = new fabric.Rect({
      width: bgWidth,
      height: bgHeight,
      left: -(this.width / 2 + padding.x),
      top: -(this.height / 2 + padding.y),
      fill: backgroundColor,
    });
    this.insertAt(bg, 0);
    this.addWithUpdate();
  },
});

module.exports = Box;
