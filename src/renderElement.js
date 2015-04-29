var renderElement = function(node, gl) {
  var element = node.element;
  var children = node.children;

  if (element.setup) { element.setup(gl); }

  for (var child of children) {
    renderElement(child, gl)
  }

  if (element.teardown) { element.teardown(gl); }
}

export default renderElement;