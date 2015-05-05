var renderElement = function(node, gl) {
  var {element, childrenIDs, children} = node;

  if (element.setup) { element.setup(gl); }

  for (var id of childrenIDs) {
    renderElement(children[id], gl)
  }

  if (element.teardown) { element.teardown(gl); }
}

export default renderElement;