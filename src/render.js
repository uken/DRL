import buildTree from './buildTree.js';
import renderElement from './renderElement.js';
import getContext from './webgl/getContext.js';
import Component from './Component.js';

var render = function(element, canvas) {
  var context = getContext(canvas);

  var tree = {element: element, children: []};
  buildTree(tree, '0', 0);

  renderElement(tree, context);
  return new Component(tree, context);
}

export default render;