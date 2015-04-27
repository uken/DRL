import DRL from '../drl.js';
import {Elements} from '../drl.js';
import Ship from './ship.js';

var {Rectangle, Group, Mask, Text, Sprite} = Elements;

var App = DRL.createClass({
  render: function() {
    return (
      Sprite({path: 'clouds.jpg', x: 0, y: 0, w: 600, h: 600},
        this.props.ships.map(function(ship){
          return Mask({x: ship.x + 25, y: ship.y + 25}, [
            Ship({x: ship.x, y: ship.y}, [
              Rectangle({color: 'teal', x: -15, y: 0, w: 30, h: 50})
            ])
          ]);
        }).concat(this.props.rockets.map(function(rocket){
          return Rectangle({color: 'red', x: rocket.x, y: rocket.y, w: 50, h: 25});
        })).concat(Text({text: 'Test', x: 50, y: 100, font: '26px sans-serif'}))
      )
    );
  }
});

export default App;