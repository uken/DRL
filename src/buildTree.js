var buildTree = function(tree, id) {
  var node = tree[id];
  var element = node.element;

  if (element instanceof Array) {
    throw Error('cannot return an array from a render call');
  }

  element.id = id;
  var idSubstring = id + '.';

  var subnode = element.render();
  if (subnode instanceof Array) {
    for (var i = 0; i < subnode.length; i++) {
      var childID = idSubstring + i;
      var child = subnode[i];
      node.childrenIDs.push(childID);
      node.children[childID] = {
        element: child,
        childrenIDs: [],
        children: {}
      }
    }
  } else {
    var childID = idSubstring + node.childrenIDs.length;
    node.childrenIDs.push(childID);
    node.children[childID] = {
      element: subnode,
      childrenIDs: [],
      children: {}
    }
  }

  for (var i = 0; i < node.childrenIDs.length; i++) {
    buildTree(node.children, node.childrenIDs[i]);
  }
}

export default buildTree;