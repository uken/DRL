import flattenChildren from './flattenChildren.js';
import DRLCurrentElement from './currentElement.js';

var children = function(childrenEvaluator) {
  DRLCurrentElement.current = this;
  this._children = flattenChildren(childrenEvaluator() || []);
  return this;
}

var createElement = function(type, props) {
  var node = Object.assign({
    type: type,
    props: Object.assign({}, type.spec.defaultProps, props),
    children: children,
    _children: []
  }, type.spec);
  return node;
}

export default createElement;