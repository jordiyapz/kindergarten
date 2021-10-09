const { fabric } = require("fabric");

class IconButton extends fabric.Group {
  constructor(iconTexture, options = {}) {
    // const { padding } = options;

    super([iconTexture], options);
    // this.interactive = true;
    // this.buttonMode = true;

    // this.width = size;
    // this.height = size;
    // this.iconTexture = iconTexture;
    // this._padding = padding || 0;

    // this._addIcon();
    // this._addOverlay();
    // this.on("mouseover", this._onHoverInFn);
    // this.on("mouseout", this._onHoverOutFn);
  }

  _addIcon() {
    //   const iconSprite = new Sprite(this.iconTexture);
    //   iconSprite.anchor.set(0.5);
    //   iconSprite.position.set(this._size / 2);
    //   this._iconSize = this._size - this._padding * 2;
    //   iconSprite.width = this._iconSize;
    //   iconSprite.height = this._iconSize;
    //   this.addChild(iconSprite);
  }

  // _addOverlay() {
  //   const overlay = new Graphics();
  //   overlay.beginFill(0xffffff, 0.2);
  //   overlay.drawRect(0, 0, this._width, this._height);
  //   overlay.visible = false;

  //   this.addChild(overlay);
  //   this._overlay = overlay;
  // }

  // onClick(fn, context = undefined) {
  //   this.on("click", fn, context);
  // }

  // _onHoverInFn(event) {
  //   this._overlay.visible = true;
  // }
  // _onHoverOutFn(event) {
  //   this._overlay.visible = false;
  // }
}

module.exports = IconButton;
