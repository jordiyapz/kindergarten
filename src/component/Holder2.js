const { fabric } = require("fabric");
const { calcTotalDimension } = require("../util");
const Box = require("./Box");

class Holder2 extends Box {
  constructor(items, options) {
    super(items, options);
  }

  _transformItems(items) {
    const mThis = this.calcTransformMatrix();
    return items.map((item) => {
      const mItem = item.calcTransformMatrix();
      const mTransform = fabric.util.multiplyTransformMatrices(mThis, mItem);
      fabric.util.applyTransformToObject(item, mTransform);
      return item;
    });
  }

  item(index) {
    return this._objects[index];
  }

  items() {
    return [...this._objects];
  }

  addTo(canvas) {
    const bg = fabric.util.object.clone(this);
    canvas.add(bg);

    let items = this._objects.map((item) => fabric.util.object.clone(item));
    items = this._transformItems(items);

    items.forEach((item) => {
      if (item instanceof Holder2) {
        item.addTo(canvas);
      } else canvas.add(item);
    });
  }
}

module.exports = Holder2;
