const { loadImage } = require(".");
const { Mutex } = require("async-mutex");

class ImageLoader {
  constructor() {
    this._meta = [];
    this._images = null;
    this._isLoaded = false;
    this._loadingMutex = new Mutex();
  }
  /**
   *
   * @param {{name:string, url:string, options?:object} | []} arg
   * @returns
   */
  add(arg, { urlPrefix = "" } = {}) {
    if (Array.isArray(arg)) {
      this._meta = [
        ...this._meta,
        ...arg.map((img) => ({ ...img, url: urlPrefix + img.url })),
      ];
    } else {
      this._meta.push({ ...arg, url: urlPrefix + arg.url });
    }
    return this;
  }

  getImages() {
    if (this._isLoaded) return this._images;
    else return null;
  }

  async load() {
    const release = await this._loadingMutex.acquire();
    try {
      if (!this._isLoaded) {
        const images = await Promise.all(
          this._meta.map(async ({ name, url, options = {} }) => [
            name,
            await loadImage(url, options),
          ])
        );
        this._images = images.reduce(
          (obj, [key, image]) => ({ ...obj, [key]: image }),
          {}
        );
        this._isLoaded = true;
      }
    } catch (error) {
      release();
      return Promise.reject(error);
    } finally {
      release();
      return this._images;
    }
  }
}

module.exports = ImageLoader;
