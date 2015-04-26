import DRL from '../drl.js';

var Mask = DRL.createClass({
  name: "Mask",

  setup: function(context) {
    context.save();
    context.beginPath();
    context.arc(this.props.x, this.props.y, 30, 0, Math.PI*2, true);
    context.clip();
  },

  teardown: function(context) {
    context.restore();
  },

  render: function() {
    return this.children;
  }
});

export default Mask;
