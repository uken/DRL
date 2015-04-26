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

  setup: function(context) {
    context.save();
    var props = this.props;
    context.transform(props.sx, 0, 0, props.sy, props.x, props.y);
  },

  teardown: function(context) {
    context.restore();
  },

  render: function() {
    return this.children;
  }
});

export default Group;
