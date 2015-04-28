import buildTree from './buildTree.js';
import renderElement from './renderElement.js';
import TexturePool from './texturePool.js';
import createElement from './createElement.js';
import Component from './component.js';

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

  render: function(element, canvas) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, 600, 600);

    var tree = {element: element, children: []};
    buildTree(tree, '0', 0);

    renderElement(tree, context);
    return new Component(tree, context);
  }
};

export default DRL;
