import DRL from '../drl.js';

var Rectangle = DRL.createClass({
  name: 'Rectangle',

  defaultProps: {
    red: 1,
    green: 1,
    blue: 1,
    alpha: 1
  },

  setup: function(gl) {
    var {red, green, blue, alpha} = this.props;
    gl.setColor(red, blue, green, alpha);

    var {x, y, w, h} = this.props;
    gl.polygon([
      x, y,
      x, y + h,
      x + w, y + h,
      x + w, y
    ]);

    gl.setColor(1, 1, 1, 1);
  },

  render: function() {
    return this.children;
  }
});

export default Rectangle;
