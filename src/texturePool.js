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

      for (var path in frames) {
        toLoadCount += 1;
      }

      var onSpritesheetLoad = function() {
        loadedCount += 1;
        if (loadedCount >= toLoadCount) {
          onLoad();
        }
      }

      var element = new Image();
      element.src = spritesheetData.meta.image;
      element.onload = function() {
        var texture = createTexture(context, this);
        for (var path in frames) {
          var {x, y, w, h} = frames[path].frame;
          textures[path] = new ImageData(this, texture, x, y, w, h, sourceWidth, sourceHeight);
          onSpritesheetLoad();
        }
      }
    }
  }

  xmlhttp.open('GET', spritesheetPath, true);
  xmlhttp.send();
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