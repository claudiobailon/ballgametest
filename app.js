'use strict';
console.log('We are connected');

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var myGamePiece;

function startGame() {
  myGameArea.start();
  myGamePiece = new Component(30, 30, 'navy', 100, 120);
}

var myGameArea = {
  canvas : document.createElement('canvas'),
  start : function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function (event) {
      myGameArea.key = event.keyCode;
    });
    window.addEventListener('keyup', function (event) {
      myGameArea.key = false;
    });
  },
  clear : function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};

function Component(width, height, color, x, y) {
  this.gamearea = myGameArea;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  };
}

function updateGameArea() {
  myGameArea.clear();
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
  if (myGameArea.key && myGameArea.key === 37) {myGamePiece.speedX = -2; }
  if (myGameArea.key && myGameArea.key === 39) {myGamePiece.speedX = 2; }
  if (myGameArea.key && myGameArea.key === 38) {myGamePiece.speedY = -2; }
  if (myGameArea.key && myGameArea.key === 40) {myGamePiece.speedY = 2; }
  myGamePiece.newPos();
  myGamePiece.update();
}
