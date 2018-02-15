document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    var Game = require('./game.js');

    var begin  = new Game();

begin.showFurry();
begin.showCoin();
begin.startGame();

document.addEventListener("keydown", function(event) {
    begin.furryDirection(event);
});

});