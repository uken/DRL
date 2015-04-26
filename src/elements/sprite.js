import DRL from '../drl.js';
import TexturePool from '../texturePool.js';

var Sprite = DRL.createClass({
  name: 'Sprite',

  setup: function(context) {
    var image = TexturePool.get(this.props.path);
    context.drawImage(image, this.props.x, this.props.y);
  },

  render: function() {
    return this.children;
  }
});

export default Sprite;
