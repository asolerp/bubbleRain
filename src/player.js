var keys = [];

keys["74"] = false;
keys["70"] = false;
keys["87"] = false;
keys["88"] = false;
keys["83"] = false;
keys["68"] = false;
keys["65"] = false;

var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_LEFT = 37;

var count = 0;

document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
  // keys[e.keyCode] = false;
});

function Player(ctx) {
  
  this.ctx = ctx

  this.view = "Front";

  // this.weapon = new Weapon(this);
  this.typeOfShoot = "normal";
  
  this.bullet;
  this.bullets = [];
  this.numberOfBullets = 30;

  this.x = window.innerWidth/2
  this.y = window.innerHeight/2;

  this.w = 55;
  this.h = 55;

  this.radius = 25;
  this.radiusReduction = 0.02;

  this.speed = 6;
  this.friction = 0.8; 
  
  this.vx = 0;
  this.vy = 0;

  this.setListeners();
}

Player.prototype.setListeners = function() {
  document.onkeyup = function(e) {
    e.preventDefault();

    if (this.numberOfBullets > 0 || this.typeOfShoot === 'super') {
      switch (e.keyCode) {
        case KEY_UP:
          this.view = "Back";
          this.shoot(this.view);
          break;
        case KEY_DOWN:
          this.view = "Front";
          this.shoot(this.view);
          break;
        case KEY_LEFT:
          this.view = "Left";
          this.shoot(this.view);
          break;
        case KEY_RIGHT:
          this.view = "Right";
          this.shoot(this.view);
          break;
      }
    }
  }.bind(this);
};

Player.prototype.draw = function() {
  
  // this.radius -= this.radiusReduction;
    
    this.ctx.beginPath();
    this.ctx.shadowColor = "black";
    this.ctx.strokeStyle = "rgba(0,0,0,1)";
    this.ctx.fillStyle = "Black";
    this.ctx.shadowBlur = 5;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    this.drawBullets();



    // Game.stopGame();

};

Player.prototype.drawBullets = function() {

    this.bullets.forEach(
      function(shoot, i) {
        shoot.draw();
        shoot.move();
        // if (shoot.hit === true) {
        //   this.bullets.splice(i, 1);
        // } else if (
        //   shoot.x < 0 ||
        //   shoot.y < 0 ||
        //   shoot.x > innerWidth ||
        //   shoot.y > innerHeight
        // ) {
        //   this.bullets.splice(i, 1);
        // }
      }.bind(this)
    );
}

Player.prototype.updatePlayerPosition = function() {

  this.vy *= this.friction;
  this.y += this.vy;
  this.vx *= this.friction;
  this.x += this.vx;

  if (this.x > window.innerWidth) {
    this.x = 0;
  } else if (this.x <= 4) {
    this.x = window.innerWidth;
  }

  if (this.y > window.innerHeight) {
    this.y = 0;
  } else if (this.y <= 4) {
    this.y = window.innerHeight;
  }

  this.draw();
};

Player.prototype.movePlayer = function() {
  
  this.updatePlayerPosition();

  if (keys[87]) {
    this.view = "Back";

    if (this.vy > -this.speed) {
      this.vy -= 3;
    }
  }

  if (keys[83]) {
    this.view = "Front";

    if (this.vy < this.speed) {
      this.vy += 3;
    }
  }
  if (keys[68]) {
    this.view = "Right";

    if (this.vx < this.speed) {
      this.vx += 3;
    }
  }
  if (keys[65]) {
    this.view = "Left";

    if (this.vx > -this.speed) {
      this.vx -= 3;
    }
  }

  // for (var i = 0; i < Game.enemies.length; i++) {
  //   this.detectCollition("enemies", Game.enemies[i]);
  // }

  // for (var i = 0; i < this.character.game.itemsGame.length; i++) {
  //   this.detectCollition("itemsGame", this.character.game.itemsGame[i]);
  // }
};

Player.prototype.shoot = function() {
  
  if (this.typeOfShoot == "normal") {
    this.numberOfBullets--;
    this.bullet = new Weapon(
      Game.ctx,
      this.x,
      this.y,
      10,
      25,
      this.view,
      this.typeOfShoot
    );
  } else {
    this.bullet = new Weapon(
      Game.ctx,
      this.x,
      this.y,
      10,
      25,
      this.view,
      this.typeOfShoot
    );
  }

  this.bullets.push(this.bullet);
};


