const View = require('./ttt-view.js');
const Game = require('../../solution/game.js');

$( () => {
  let $container = $('.ttt');
  let game = new Game();
  let view = new View(game, $container);
});
