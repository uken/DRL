import Act from '../drl.js';
import {Elements} from '../drl.js';

var {Sprite, Group} = Elements;

var Ship = Act.createClass({
  name: 'Ship',

  render: function(context) {
    return (
      Group({x: this.props.x, y: this.props.y},
        Sprite({path: 'cat.jpeg', x: 0, y: 0}, this.children)
      )
    );
  }
});

export default Ship;
