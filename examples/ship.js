import Act from '../drl.js';
import {Elements} from '../drl.js';

var {Rectangle} = Elements;

var Ship = Act.createClass({
  name: 'Ship',

  render: function(context) {
    return (
      Rectangle({color: 'green', x: this.props.x, y: this.props.y, w: 50, h: 50}, [
        Rectangle({color: 'white', x: this.props.x + 10, y: this.props.y + 10, w: 30, h: 30}, this.children)
      ])
    );
  }
});

export default Ship;
