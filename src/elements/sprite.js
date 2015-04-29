import DRL from '../drl.js';
import TexturePool from '../texturePool.js';

var Sprite = DRL.createClass({
  name: 'Sprite',

  defaultProps: {
    angle: 0,
    ox: 0,
    oy: 0,
    kx: 0,
    ky: 0
  },

  setup: function(gl) {
    var imageData = TexturePool.get(this.props.path);

    var x = this.props.x;
    var y = this.props.y;
    var angle = this.props.angle;
    var width = this.props.w || imageData.width;
    var height = this.props.h || imageData.height;
    var sx = this.props.sx || width / imageData.width;
    var sy = this.props.sy || height / imageData.height;
    var ox = this.props.ox;
    var oy = this.props.oy;
    var kx = this.props.kx;
    var ky = this.props.ky;

    gl.drawImage(imageData, x, y, angle, sx, sy, ox, oy, kx, ky);
  },

  render: function() {
    return this.children;
  }
});

export default Sprite;
