var DRL = require('../drl.js');

var Group = DRL.createClass({
  name: "Group",
  render: function(context) {
    return this.children;
  }
});

export default Group;
