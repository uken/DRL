var renderElement = function(node, context) {
  var element = node.element;
  var children = node.children;

  if (element.setup) { element.setup(context); }

  for (var child of children) {
    renderElement(child, context)
  }

  if (element.teardown) { element.teardown(context); }
}

export default renderElement;