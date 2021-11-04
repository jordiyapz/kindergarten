const { fabric } = require("fabric");
const { calcTotalDimension } = require("../util");

class Holder extends fabric.Rect {
  constructor(items, options) {
    super({ ...options, fill: options.bgColor || options.fill });

    this._items = Array.isArray(items) ? items : [items];

    const {
      autoLayout = true,
      spacing = 0,
      direction = "row",
      justify = "start",
      align = "top",
    } = options;

    this._options = {
      ...options,
      autoLayout,
      spacing,
      direction,
      justify,
      align,
    };

    this.rearrangeItemsPosition();

    this.bindItems();
    this.on("moving", this._updateItems);
  }

  addWithUpdate(...items) {
    this._items.push(...items);
    this.rearrangeItemsPosition();
    this.bindItems();
  }

  add(...items) {
    this._items.push(...items);
  }

  set(...args) {
    super.set.apply(this, args);
    this.fire("moving");
  }

  setItemsUnselectable(selectable = false) {
    this._items.forEach((item) => item.set("selectable", selectable));
  }

  item(i) {
    return this._items[i] || null;
  }

  items() {
    return [...this._items];
  }

  bindItems() {
    const refTransform = this.calcTransformMatrix();
    const invRefTransform = fabric.util.invertTransform(refTransform);
    this._items.forEach((item) => {
      const desiredTranform = fabric.util.multiplyTransformMatrices(
        invRefTransform,
        item.calcTransformMatrix()
      );
      item.ref = desiredTranform;
    });
  }

  renderTo(canvas) {
    canvas.add(this);
    this._items.forEach((item) => {
      if (item instanceof Holder) {
        item.renderTo(canvas);
      } else {
        canvas.add(item);
      }
    });
  }

  rearrangeItemsPosition() {
    const options = this._options;

    if (options.autoLayout) {
      const { spacing, direction } = options;
      let val = 0;
      this._items.forEach((item) => {
        switch (direction) {
          case "row": {
            item.set("left", val + (item.left || 0));
            val += item.width + spacing;
            break;
          }
          case "column": {
            item.set("top", val + (item.top || 0));
            val += item.height + spacing;
            break;
          }
        }
      });
    }

    const tDim = calcTotalDimension(this._items);

    let { width = 0, height = 0 } = options;
    this._cWidth = Math.max(width, tDim.left + tDim.width);
    this._cHeight = Math.max(height, tDim.top + tDim.height);

    // re-align children
    if (options.justify === "center") {
      switch (direction) {
        case "row":
          this._items.forEach((child) => {
            child.set("left", child.left + (this._cWidth - tDim.width) / 2);
          });
          break;
        case "column":
          this._items.forEach((child) => {
            child.set("top", child.top + (this._cHeight - tDim.height) / 2);
          });
          break;
      }
    }
    if (options.align === "center") {
      switch (direction) {
        case "column":
          this._items.forEach((child) => {
            child.set("left", (this._cWidth - child.width) / 2);
          });
          break;
        case "row":
          this._items.forEach((child) => {
            child.set("top", (this._cHeight - child.height) / 2);
          });
          break;
      }
    }

    const _parsePadding = ({ padding: pad = {} }) => {
      if (typeof pad === "object") {
        return { x: pad.x || 0, y: pad.y || 0 };
      } else if (typeof pad === "number") {
        return { x: pad, y: pad };
      }
    };

    // re-positioning self
    const padding = _parsePadding(options);
    this.set({
      width: this._cWidth + padding.x * 2,
      height: this._cHeight + padding.y * 2,
    });

    // re-positioning children, for rendering
    const _zx = this.left + padding.x;
    const _zy = this.top + padding.y;
    this._items.forEach((child) => {
      child.set({
        left: _zx + (child.left || 0),
        top: _zy + (child.top || 0),
      });
    });
  }

  _updateItems() {
    const currentTransform = this.calcTransformMatrix();
    this._items.forEach((item) => {
      const ref = item.ref;
      if (!ref) return;
      const transform = fabric.util.multiplyTransformMatrices(
        currentTransform,
        ref
      );
      const options = fabric.util.qrDecompose(transform);
      item.set({ flipX: false, flipY: false });
      item.setPositionByOrigin(
        { x: options.translateX, y: options.translateY },
        "center",
        "center"
      );
      item.set(options);
      item.setCoords();
    });
  }
}

module.exports = Holder;
