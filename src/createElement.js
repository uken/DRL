import flattenChildren from './flattenChildren.js';

var createElement = function(type, props, ...children) {
  var node = Object.assign({
    type: type,
    props: Object.assign({}, type.spec.defaultProps, props),
    children: flattenChildren(children || [])
  }, type.spec);
  return node;
}

export default createElement;