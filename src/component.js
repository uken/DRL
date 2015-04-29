import buildTree from './buildTree.js';
import renderElement from './renderElement.js';
import createElement from './createElement.js';

class Component {
  constructor(tree, gl) {
    this.tree = tree;
    this.gl = gl;
  }

  update(newProps) {
    var rootElement = this.tree.element;
    var newTree = {
      element: createElement(rootElement.type, newProps),
      children: []
    }
    buildTree(newTree, '0', 0);
    this.tree = newTree;

    this.gl.clear();
    renderElement(this.tree, this.gl);
  }
}

export default Component;