import DRL from '../drl.js';
import {Elements} from '../drl.js';
import Ship from './ship.js';

var {Rectangle, Group, Mask, Text, Sprite} = Elements;

var App = DRL.createClass({
  render: function() {
    return (
      <Sprite path='clouds.jpg' x={0} y={0} w={600} h={600}>
        {
          this.props.ships.map(function(ship){
            return (
              <Ship {...ship} >
                <Rectangle color={[0, 1, 1, 1]} x={-15} y={0} w={30} h={25} />
              </Ship>
            );
          })
        }
        {
          this.props.rockets.map(function(rocket){
            return <Rectangle color={[1, 0, 0, 1]} {...rocket} w={50} h={25} />
          })
        }
      </Sprite>
    );
  }
});

export default App;