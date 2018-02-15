
var Furry = require('./furry.js');
var Coin = require('./coin.js');

function Game() {
    this.board = document.querySelector("#board").children;
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    var self = this;
    
    this.getIndex = function(x,y) {
        return x + (y * 10);
        };
    this.showFurry = function() {
        var furryPosition = this.getIndex(this.furry.x, this.furry.y);
        this.board[furryPosition].classList.add("furry");
        };
    this.showCoin = function() {
        var coinPosition = this.getIndex(this.coin.x, this.coin.y);
        this.board[coinPosition].classList.add("coin");
        };
    this.hideVisibleFurry = function() {
        document.querySelector('.furry').classList.remove('furry');
        };
    this.moveFurry = function() {
        this.gameOver();
        this.hideVisibleFurry();
        if( this.furry.direction === "right" ) {
            this.furry.x = this.furry.x + 1;
            } else if( this.furry.direction === "left" ) {
                this.furry.x = this.furry.x - 1;
            } else if( this.furry.direction === "up" ) {
                this.furry.y = this.furry.y + 1;
            } else if( this.furry.direction === "down") {
                this.furry.y = this.furry.y - 1;
            };
        this.showFurry();
        this.checkCoinCollision();
    };
    this.furryDirection = function(event) {
        switch (event.which) {
            case 37:
                self.furry.direction = "left";
                break;
            case 39:
                self.furry.direction = "right";
                break;
            case 38:
                self.furry.direction = "down";
                break;
            case 40:
                self.furry.direction = "up";
                break;
            default:
        };
    };
    this.startGame = function() {
        this.idSetInterval = setInterval( function() {
            self.moveFurry();
            }, 250);
    };
    this.checkCoinCollision = function() {
        if( this.furry.x === this.coin.x && this.furry.y === this.coin.y ) {
            document.querySelector(".coin").classList.remove("coin");
            var scoreInner = document.querySelector("#score div strong");
            this.score ++;
            scoreInner.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        };
    };
    this.gameOver = function() {
        if( this.furry.x < 0 || this.furry.y < 0 || this.furry.x > 9 || this.furry.y > 9 ) {
            clearInterval(this.idSetInterval);

            document.querySelector("#board").classList.add("invisible");
            document.querySelector("#score").classList.add("invisible");
            document.querySelector("#over").classList.remove("invisible");
            document.querySelector("#over strong").innerText = " " + this.score;
            this.hideVisibleFurry();
        };
    };
};

module.exports = Game;
