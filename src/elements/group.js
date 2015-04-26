import DRL from '../drl.js';

var Group = DRL.createClass({
  name: "Group",

  setup: function(context) {
    context.save();
    context.transform(1, 0, 0, 1, this.props.x, this.props.y);
  },

  teardown: function(context) {
    context.restore();
  },

  render: function() {
    return this.children;
  }
});

export default Group;
