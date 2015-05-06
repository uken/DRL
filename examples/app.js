import DRL from '../drl.js';
import {Elements} from '../drl.js';
import Ship from './ship.js';

var {Rectangle, Group, Mask, Text, Sprite} = Elements;

var App = DRL.createClass({
  name: 'App',

  shipElements: function(ship) {
    return Rectangle({x: ship.x, y: ship.y, w: 50, h: 50, color: [0, 1, 1, 1]})
  }

  mapShips: function() {
    return this.props.ships.map(this.shipElements);
  },

  render: function() {
    return Sprite({path: 'clouds.jpg', x: 0, y: 0, w: 600, h: 600}).children(this.mapShips);
    // return (
    //   <Sprite path='clouds.jpg' x={0} y={0} w={600} h={600}>
    //     {
    //       this.props.ships.map(function(ship){
    //         return (
    //           <Ship x={ship.x * 2} y={ship.y} >
    //             <Rectangle color={[0, 1, 1, 1]} x={-15} y={0} w={30} h={25} />
    //           </Ship>
    //         );
    //       })
    //     }
    //   </Sprite>
    // );
  }
});

export default App;