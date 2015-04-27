import DRL from '../drl.js';
import {Elements} from '../drl.js';
import Ship from './ship.js';

var {Rectangle, Group, Mask, Text, Sprite} = Elements;

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
})

var canvas = document.getElementById('main_content');
var render = function(t) {
  update(t);

  DRL.render(App({ships: ships, rockets: rockets}), canvas);

  requestAnimationFrame(render);
};

DRL.load(canvas, ['cat.jpeg', 'clouds.jpg'], function() {
  requestAnimationFrame(render);
});

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
