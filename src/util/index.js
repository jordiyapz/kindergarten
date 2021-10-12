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
  sim.canvas.renderAll();
  const stream = sim.canvas.createPNGStream();
  streamToBuff(stream)
    .then((buffer) => {
      const imgBufStr = buffer.toString("base64");
      const imgSrc = `data:image/png;base64,${imgBufStr}`;
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

module.exports = {
  loadImage,
  loadImages,
  renderCanvas,
  streamToBuff,
  asyncClone,
};
