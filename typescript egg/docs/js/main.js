"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject() {
        console.log("I am a gameobject");
    }
    GameObject.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    GameObject.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    return GameObject;
}());
var Basket = (function (_super) {
    __extends(Basket, _super);
    function Basket(xp, left, right) {
        var _this = _super.call(this) || this;
        _this.leftSpeed = 0;
        _this.rightSpeed = 0;
        _this.div = document.createElement("basket");
        document.body.appendChild(_this.div);
        _this.leftKey = left;
        _this.rightKey = right;
        _this.x = 20;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Basket.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Basket.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.leftKey:
                this.leftSpeed = 5;
                break;
            case this.rightKey:
                this.rightSpeed = 5;
                break;
        }
    };
    Basket.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.leftKey:
                this.leftSpeed = 0;
                break;
            case this.rightKey:
                this.rightSpeed = 0;
                break;
        }
    };
    Basket.prototype.update = function () {
        var newX = this.x - this.leftSpeed + this.rightSpeed;
        if (newX > 0 && newX < window.innerWidth - 270)
            this.x = newX;
        this.div.style.transform = "translatex(" + this.x + "px)";
        this.div.style.top = (window.innerHeight - 150) + "px";
    };
    return Basket;
}(GameObject));
var Egg = (function (_super) {
    __extends(Egg, _super);
    function Egg() {
        var _this = _super.call(this) || this;
        _this.div = document.createElement("egg");
        document.body.appendChild(_this.div);
        _this.x = window.innerWidth / 2;
        _this.y = Math.random() * (window.innerHeight - 100);
        _this.speedX = -3 - (Math.random() * 6);
        _this.speedY = Math.random() * 6 - 3;
        return _this;
    }
    Egg.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Egg.prototype.hitBasket = function () {
        this.speedX *= -1;
    };
    Egg.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y + this.getRectangle().height > window.innerHeight || this.y < 0) {
            this.speedY *= -1;
        }
        if (this.x + this.getRectangle().width > window.innerWidth || this.x < 0) {
            this.speedX *= -1;
        }
        if (this.x > window.innerWidth) {
            this.speedX *= -1;
        }
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Egg;
}(GameObject));
var PlayScreen = (function () {
    function PlayScreen(g) {
        this.eggs = [];
        this.game = g;
        this.basket = new Basket(20, 65, 68);
        for (var i = 0; i < 1; i++) {
            this.eggs.push(new Egg());
        }
    }
    PlayScreen.prototype.update = function () {
        for (var _i = 0, _a = this.eggs; _i < _a.length; _i++) {
            var b = _a[_i];
            if (this.checkCollision(b.getRectangle(), this.basket.getRectangle())) {
                b.hitBasket();
            }
            if (b.getRectangle().bottom < 0) {
                this.game.showGameoverScreen();
            }
            b.update();
        }
        this.basket.update();
    };
    PlayScreen.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return PlayScreen;
}());
var Game = (function () {
    function Game() {
        this.currentscreen = new StartScreen(this);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.currentscreen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.showPlayScreen = function () {
        document.body.innerHTML = "";
        this.currentscreen = new PlayScreen(this);
    };
    Game.prototype.showGameoverScreen = function () {
        document.body.innerHTML = "";
        this.currentscreen = new GameOver(this);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var GameOver = (function () {
    function GameOver(g) {
        var _this = this;
        this.game = g;
        this.div = document.createElement("splash");
        document.body.appendChild(this.div);
        this.div.addEventListener("click", function () { return _this.splashClicked(); });
        this.div.innerHTML = "BETTER LUCK NEXT TIME";
    }
    GameOver.prototype.update = function () {
    };
    GameOver.prototype.splashClicked = function () {
        this.game.showPlayScreen();
    };
    return GameOver;
}());
var Score = (function () {
    function Score() {
        this.score = 0;
        this.scoreview = document.createElement("score");
        document.body.appendChild(this.scoreview);
        var container = document.getElementsByTagName("game")[0];
        container.appendChild(this.scoreview);
    }
    Score.prototype.update = function () {
        this.scoreview.innerHTML = "Score: " + this.score;
    };
    Score.prototype.addScore = function (n) {
        this.score += n;
    };
    return Score;
}());
var StartScreen = (function () {
    function StartScreen(g) {
        var _this = this;
        this.game = g;
        this.div = document.createElement("splash");
        document.body.appendChild(this.div);
        this.div.addEventListener("click", function () { return _this.splashClicked(); });
        this.div.innerHTML = "GUDETAMA";
    }
    StartScreen.prototype.update = function () {
    };
    StartScreen.prototype.splashClicked = function () {
        this.game.showPlayScreen();
    };
    return StartScreen;
}());
//# sourceMappingURL=main.js.map