import buildTree from './buildTree.js';
import renderElement from './renderElement.js';
import createElement from './createElement.js';

class Component {
  constructor(tree, context) {
    this.tree = tree;
    this.context = context;
  }

  update(newProps) {
    var rootElement = this.tree.element;
    var newTree = {
      element: createElement(rootElement.type, newProps),
      children: []
    }
    buildTree(newTree, '0', 0);
    this.tree = newTree;

    renderElement(this.tree, this.context);
  }
}

export default Component;