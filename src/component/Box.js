const { fabric } = require("fabric");
const { calcTotalDimension } = require("../util");

const _parsePadding = ({ padding: pad = {} }) => {
  if (typeof pad === "object") {
    return { x: pad.x || 0, y: pad.y || 0 };
  } else if (typeof pad === "number") {
    return { x: pad, y: pad };
  }
};

const _setChildrenPosition = (children, { spacing, direction }) => {
  let val = 0;
  children.forEach((child) => {
    switch (direction) {
      case "row": {
        child.set("left", val + (child.left || 0));
        val += child.width + spacing;
        break;
      }
      case "column": {
        child.set("top", val + (child.top || 0));
        val += child.height + spacing;
        break;
      }
    }
  });
};

const Box = fabric.util.createClass(fabric.Rect, {
  type: "Box",

  initialize: function (children, options) {
    if (options === undefined) {
      throw new Error("Missing argument children");
    }

    this.callSuper("initialize", {
      strokeWidth: options.stroke ? 1 : 0,
      stroke: options.bgColor || null,
      ...options,
      fill: options.bgColor || null,
    });

    this._objects = Array.isArray(children) ? children : [children];

    const {
      autoLayout = true,
      spacing = 0,
      direction = "row",
      justify = "left",
      align = "left",
    } = options;

    if (autoLayout) {
      _setChildrenPosition(this._objects, { spacing, direction });
    }

    const tDim = calcTotalDimension(this._objects);

    let { width = 0, height = 0 } = options;
    this._cWidth = Math.max(width, tDim.left + tDim.width);
    this._cHeight = Math.max(height, tDim.top + tDim.height);

    // re-align children
    if (justify === "center") {
      switch (direction) {
        case "row":
          this._objects.forEach((child) => {
            child.set("left", child.left + (this._cWidth - tDim.width) / 2);
          });
          break;
        case "column":
          this._objects.forEach((child) => {
            child.set("top", child.top + (this._cHeight - tDim.height) / 2);
          });
          break;
      }
    }
    if (align === "center") {
      switch (direction) {
        case "column":
          this._objects.forEach((child) => {
            child.set("left", (this._cWidth - child.width) / 2);
          });
          break;
        case "row":
          this._objects.forEach((child) => {
            child.set("top", (this._cHeight - child.height) / 2);
          });
          break;
      }
    }

    // re-positioning self
    const padding = _parsePadding(options);
    this.set({
      width: this._cWidth + padding.x * 2,
      height: this._cHeight + padding.y * 2,
    });

    // re-positioning children, for rendering
    const _zx = -this._cWidth / 2;
    const _zy = -this._cHeight / 2;
    this._objects.forEach((child) => {
      child.set({
        left: _zx + (child.left || 0),
        top: _zy + (child.top || 0),
      });
    });
  },

  item: function (index) {
    if (index < 0 || index > this._objects.length) {
      return null;
    }
    return this._objects[index];
  },

  _render: function (ctx) {
    this.callSuper("_render", ctx);
    this._objects.forEach((ob, i) => {
      ob.render(ctx);
    });
  },
});

module.exports = Box;
