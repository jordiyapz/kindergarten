const canvas = document.getElementById('main-canvas');

const renderer = new PIXI.Renderer({
  width: canvas.width,
  height: canvas.height,
  view: canvas,
  backgroundColor: 0x1099bb
})

export default renderer;