var buildTree = function(node, id, depth) {
  var element = node.element;

  if (element instanceof Array) {
    throw Error('cannot return an array from a render call');
  }

  element.id = id;

  var subnode = element.render();
  if (subnode instanceof Array) {
    node.children = subnode.map(function(subnode) { return {element: subnode, children: []}; });
  } else {
    node.children.push({element: subnode, children: []})
  }

  for (var i = 0; i < node.children.length; i++) {
    buildTree(node.children[i], id + '.' + i, depth + 1);
  }
}

export default buildTree;