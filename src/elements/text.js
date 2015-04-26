import DRL from '../drl.js';

var Text = DRL.createClass({
  name: 'Text',

  setup: function(context) {
    context.fillStyle = this.props.color;
    context.fillText(this.props.text, this.props.x, this.props.y);
  },

  render: function() {
    return this.children;
  }
});

export default Text;
