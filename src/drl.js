import instantiateElement from './instantiateElement.js';
import renderElement from './renderElement.js';
import TexturePool from './texturePool.js';

var DRL = {
  createClass: function(spec) {
    return function(props, children) {
      var node = Object.assign({
        props: props,
        children: children || []
      }, spec);
      return node;
    };
  },

  load: function(canvas, imagePaths, onCompleteCallback) {
    TexturePool.initialize(canvas);
    TexturePool.load(imagePaths, onCompleteCallback);
  },

  render: function(element, canvas) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, 600, 600);

    var tree = {element: element, children: []};
    var base_elem = instantiateElement(tree, '0', 0);

    renderElement(tree, context);
    return base_elem;
  }
};

export default DRL;
