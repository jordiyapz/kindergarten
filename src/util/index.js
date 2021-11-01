const { fabric } = require("fabric");

const loadImage = (url, options = {}) =>
  new Promise((resolve, reject) => {
    fabric.Image.fromURL(
      url,
      (image, error) => {
        if (error) {
          return reject(error);
        }
        return resolve(image);
      },
      options
    );
  });

const loadImages = (urls, options = {}) => {
  return Promise.all(urls.map((url) => loadImage(url, options)));
};

const streamToBuff = (stream) =>
  new Promise((resolve, reject) => {
    const _buff = [];
    stream.on("data", function (chunk) {
      _buff.push(chunk);
    });
    stream.on("end", () => {
      resolve(Buffer.concat(_buff));
    });
    stream.on("error", reject);
  });

const renderCanvas = (socket, sim) => {
  const { canvas } = sim;
  canvas.renderAll();

  const stream = canvas.createPNGStream();
  streamToBuff(stream)
    .then((buffer) => {
      const imgBufStr = buffer.toString("base64");
      const imgSrc = `data:image/png;base64,${imgBufStr}`;
      socket.nsp.emit("sim_render", imgSrc);

      // deprecated
      socket.emit("render", imgSrc);
    })
    .catch((error) => {
      console.error(error.message || error);
    });
};

/**
 *
 * @param {fabric.Object} obj
 * @param {*} options
 * @returns
 */
const asyncClone = (obj, { useCloneAsImage, propertiesToInclude } = {}) =>
  new Promise((resolve, reject) => {
    try {
      obj.clone(resolve, propertiesToInclude || []);
    } catch (error) {
      reject(error);
    }
  });

/**
 *
 * @param {Array.<object>} rectangles
 * @returns
 */
const calcTotalDimension = (rectangles) => {
  const x = [Infinity, -Infinity];
  const y = [Infinity, -Infinity];

  for (const { left = 0, top = 0, width, height } of rectangles) {
    x[0] = Math.min(x[0], left);
    y[0] = Math.min(y[0], top);
    x[1] = Math.max(x[1], left + width);
    y[1] = Math.max(y[1], top + height);
  }

  return {
    left: x[0],
    top: y[0],
    width: x[1] - x[0],
    height: y[1] - y[0],
  };
};

function parsePoint({ left = 0, top = 0 }) {
  return { x: left, y: top };
}

function toPosition({ x = 0, y = 0 }) {
  return { left: x, top: y };
}

function translate(from, matrix) {
  const p = fabric.util.transformPoint(parsePoint(from), matrix);
  return toPosition(p);
}

function constraintNum(value, { min = 0, max = Infinity }) {
  return Math.max(min, Math.min(max, value));
}

module.exports = {
  loadImage,
  loadImages,
  renderCanvas,
  streamToBuff,
  asyncClone,
  calcTotalDimension,
  parsePoint,
  toPosition,
  translate,
  constraintNum,
};
