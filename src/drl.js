import TexturePool from './texturePool.js';
import createElement from './createElement.js';
import render from './render.js';

var DRL = {
  createClass: function(spec) {
    return {
      spec: spec
    };
  },

  createElement: createElement,

  load: function(canvas, imagePaths, onCompleteCallback) {
    TexturePool.initialize(canvas);
    TexturePool.load(imagePaths, onCompleteCallback);
  },

  render: render
};

export default DRL;
