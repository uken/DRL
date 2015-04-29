import DRL from '../drl.js';

var Group = DRL.createClass({
  name: "Group",

  defaultProps: {
    x: 0,
    y: 0,
    sx: 1,
    sy: 1,
    kx: 0,
    ky: 0
  },

  setup: function(gl) {
    gl.push();
    gl.transform(this.props.x, this.props.y, 0, this.props.sx, this.props.sy, 0, 0, this.props.kx, this.props.ky);
  },

  teardown: function(gl) {
    gl.pop();
  },

  render: function() {
    return this.children;
  }
});

export default Group;
