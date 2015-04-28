import getContext from './webgl/getContext.js';
import createTexture from './webgl/createTexture.js';
import ImageData from './webgl/ImageData.js'
var context, textures;

var TexturePool = {
  initialize: function(canvas) {
    context = getContext(canvas);
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

    for (var path of imagePaths) {
      var fileExtensionPattern = /\.([0-9a-z]+)$/;
      switch (path.match(fileExtensionPattern)[1]) {
        case 'json':
          loadSpritesheet(path, onLoad);
          break;
        case 'png':
        case 'gif':
        case 'jpg':
        case 'jpeg':
          loadImage(path, onLoad);
          break;
      }
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

var loadSpritesheet = function(spritesheetPath, onLoad) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 200) {
      var spritesheetData = JSON.parse(xmlhttp.responseText);
      var sourceWidth = spritesheetData.meta.size.w;
      var sourceHeight = spritesheetData.meta.size.h;

      var frames = spritesheetData.frames;
      var toLoadCount = 0;
      var loadedCount = 0;
      var onSpritesheetLoad = function() {
        loadedCount += 1;
        if (loadedCount >= toLoadCount) {
          onLoad();
        }
      }

      for (var path in frames) {
        toLoadCount += 1;
        loadFrame(path, frames[path], sourceWidth, sourceHeight, onSpritesheetLoad);
      }
    }
  }

  xmlhttp.open('GET', spritesheetPath, true);
  xmlhttp.send();
}

var loadFrame = function(imagePath, frameData, sourceWidth, sourceHeight, onLoad) {
  var {x, y, w, h} = frameData.frame;
  var image = new Image();
  image.src = imagePath;
  image.onload = function(){
    var texture = createTexture(context, this);
    textures[imagePath] = new ImageData(image, texture, x, y, w, h, sourceWidth, sourceHeight);
    onLoad();
  };
}

var loadImage = function(imagePath, onLoad) {
  var image = new Image();
  image.src = imagePath;
  image.onload = function(){
    var texture = createTexture(context, this);
    var width = this.width;
    var height = this.height;
    textures[imagePath] = new ImageData(image, texture, 0, 0, width, height, width, height);
    onLoad();
  };
}

export default TexturePool;