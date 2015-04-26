import DRL from '../drl.js';

var Group = DRL.createClass({
  name: "Group",
  render: function() {
    return this.children;
  }
});

export default Group;
