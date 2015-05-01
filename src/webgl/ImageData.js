class ImageData {
  constructor(element, texture, x, y, width, height, sourceWidth, sourceHeight) {
    this.width = width;
    this.height = height;
    this.texture = texture;

    this.coords = new Float32Array([
      0, 0,
      0, height,
      width, height,

      width, 0,
      0, 0,
      width, height,
    ]);

    this.uvs = new Float32Array([
      x / sourceWidth, y / sourceHeight,
      x / sourceWidth, (y + height) / sourceHeight,
      (x + width) / sourceWidth, (y + height) / sourceHeight,

      (x + width) / sourceWidth, y / sourceHeight,
      (x + width) / sourceWidth, (y + height) / sourceHeight,
      x / sourceWidth, y / sourceHeight,
    ]);

    this.indices = new Uint16Array([0, 1, 2, 0, 3, 2]);
  }
}

export default ImageData;