import DRL from '../drl.js';

var Mask = DRL.createClass({
  name: "Mask",

  setup: function(gl) {
    gl.enableScissor(this.props.x, this.props.y, this.props.w, this.props.h);
  },

  teardown: function(gl) {
    gl.disableScissor();
  },

  render: function() {
    return this.children;
  }
});

export default Mask;
