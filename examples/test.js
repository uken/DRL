import DRL from '../drl.js';
import App from './app.js';

var canvas = document.getElementById('main_content');
var ships = [{x: 50, y: 100}, {x: 50, y: 200}, {x: 50, y: 300}];
var rockets = [];

setInterval(function() {
  for (var i = 0; i < ships.length; i++) {
    var ship = ships[i];
    rockets.push({x: ship.x, y: ship.y});
  };
}, 1000);

var render = function(t) {
  update(t);
  DRL.render(DRL.createElement(App, {ships: ships, rockets: rockets}), canvas);
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
