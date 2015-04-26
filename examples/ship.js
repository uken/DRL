import Act from '../drl.js';
import {Elements} from '../drl.js';

var {Sprite, Rectangle} = Elements;

var Ship = Act.createClass({
  name: 'Ship',

  render: function(context) {
    return (
      Sprite({path: 'cat.jpeg', x: this.props.x, y: this.props.y}, this.children)
    );
  }
});

export default Ship;
