import buildTree from './buildTree.js';
import renderElement from './renderElement.js';
import WebGL from './webgl/WebGL.js';
import Component from './Component.js';

var render = function(element, canvas) {
  var gl = new WebGL(canvas);

  var tree = {element: element, children: []};
  buildTree(tree, '0', 0);

  renderElement(tree, gl);
  return new Component(tree, gl);
}

export default render;