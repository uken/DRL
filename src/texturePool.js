var context, textures;

var TexturePool = {
  initialize: function(canvas) {
    context = canvas.getContext('2d');
  },

  load: function(imagePaths, onCompleteCallback) {
    textures = {};

    var loadedCount = 0;
    var toLoadCount = imagePaths.length;
    var onLoad = function() {
      loadedCount += 1;
      if (loadedCount >= toLoadCount) {
        onCompleteCallback();
      }
    }

    for (var imagePath of imagePaths) {
      var image = new Image();
      image.src = imagePath;
      image.onload = onLoad;
      textures[imagePath] = image;
    }
  },

  get: function(imagePath) {
    return textures[imagePath];
  },

  purge: function() {
    context = null;
    textures = null;
  }
}

export default TexturePool;