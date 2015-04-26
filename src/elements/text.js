import DRL from '../drl.js';

var Text = DRL.createClass({
  name: 'Text',

  defaultProps: {
    color: 'black',
    font: '10px sans-serif'
  },

  setup: function(context) {
    context.font = this.props.font;
    context.fillStyle = this.props.color;
    context.fillText(this.props.text, this.props.x, this.props.y);
  },

  render: function() {
    return this.children;
  }
});

export default Text;
