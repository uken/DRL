var DRL = require('../drl.js');

var Rectangle = DRL.createClass({
  name: 'Rectangle',

  setup: function(context) {
    context.fillStyle = this.props.color;
    context.fillRect(this.props.x, this.props.y, this.props.w, this.props.h);
  },

  render: function(context) {
    return this.children;
  }
});

export default Rectangle;
