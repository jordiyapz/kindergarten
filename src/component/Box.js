const Box = new fabric.util.createClass(fabric.Group, {
  type: "Box",
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
    }
  ) {
    components.forEach((c) => {
      c.set({ top: c.top + padding, left: c.left + padding });
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
      padding,
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
          c.set({ left: c.left + (width - this.width) / 2 - padding });
        } else if (height !== undefined && direction === "column") {
          c.set({ top: c.top + (height - this.height) / 2 - padding });
        }
      });
    }

    const bgWidth = width || this.width + padding * 2;
    const bgHeight = height || this.height + padding * 2;

    if (align === "center") {
      components.forEach((c) => {
        if (direction === "row") {
          c.set({
            top: c.top + (bgHeight - c.height) / 2 - padding,
          });
        } else if (direction === "column") {
          c.set({ left: c.left + (bgWidth - c.width) / 2 - padding });
        }
      });
    }

    this.set({
      left: this.left + padding,
      top: this.top + padding,
    });

    const bg = new fabric.Rect({
      width: bgWidth,
      height: bgHeight,
      left: -(this.width / 2 + padding),
      top: -(this.height / 2 + padding),
      fill: backgroundColor,
    });
    this.insertAt(bg, 0);
    this.addWithUpdate();
  },
});

module.exports = Box;
