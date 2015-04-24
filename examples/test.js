import DRL from '../drl.js';
import {Elements} from '../drl.js';
import Ship from './ship.js';

var {Rectangle, Group} = Elements;

var ships = [{x: 50, y: 100}, {x: 50, y: 200}, {x: 50, y: 300}];
var rockets = [];

setInterval(function() {
  for (var i = 0; i < ships.length; i++) {
    var ship = ships[i];
    rockets.push({x: ship.x, y: ship.y});
  };
}, 1000)

var App = DRL.createClass({
  render: function() {
    return (
      Group({}, [
        Rectangle({color: 'lightblue', x: 0, y: 0, w: 600, h: 600},
          this.props.ships.map(function(ship){
            return Ship({x: ship.x, y: ship.y}, [
              Rectangle({color: 'blue', x: ship.x + 15, y: ship.y + 15, w: 30, h: 30})
            ]);
          }).concat(this.props.rockets.map(function(rocket){
            return Rectangle({color: 'red', x: rocket.x, y: rocket.y, w: 50, h: 25});
          }))
        ),
      ])
    );
  }
})

var canvas = document.getElementById('main_content');

var render = function(t) {
  update(t);

  DRL.render(App({ships: ships, rockets: rockets}), canvas);

  requestAnimationFrame(render);
};
requestAnimationFrame(render);

var update = function(t) {
  updateShips(t);
  updateRockets(t);
};

var updateShips = function(t) {
  for (var i = 0; i < ships.length; i++) {
    var ship = ships[i];
    ship.y -= Math.sin(t / 1000) / 5;
  };
};

var updateRockets = function(t) {
  for (var i = 0; i < rockets.length; i++) {
    var rocket = rockets[i];
    rocket.x += 2;
  };

  rockets = rockets.filter(function(rocket) {
    return rocket.x < 600;
  })
};
