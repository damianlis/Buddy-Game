/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    var Game = __webpack_require__(1);

    var begin  = new Game();

begin.showFurry();
begin.showCoin();
begin.startGame();

document.addEventListener("keydown", function(event) {
    begin.furryDirection(event);
});

});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


var Furry = __webpack_require__(2);
var Coin = __webpack_require__(3);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
};

module.exports = Furry;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
};

module.exports = Coin;

/***/ })
/******/ ]);