import DRL from '../drl.js';
import TexturePool from '../texturePool.js';

var Sprite = DRL.createClass({
  name: 'Sprite',

  setup: function(context) {
    var image = TexturePool.get(this.props.path);
    var props = this.props;
    context.drawImage(image, props.x, props.y, props.w || image.width, props.h || image.height);
  },

  render: function() {
    return this.children;
  }
});

export default Sprite;
