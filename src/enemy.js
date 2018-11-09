function Enemy(ctx, radius, x, y) {
  
  this.ctx = ctx

  this.life = 100;
  this.colors = "#ED553B";
  this.view = "Front";

  this.shoots = [];

  this.x = x;
  this.y = y;
  this.bornRadius = radius;
  this.radius = radius;
  this.radiusGrow = 1.3;
  this.hit = false;

  this.speed = 1;
  (this.friction = 0.6), (this.vx = 0);
  this.vy = 0;
}

Enemy.prototype.draw = function() {

      this.animation();
};

Enemy.prototype.animation = function() {
  
  this.ctx.beginPath();
  this.ctx.shadowColor = '#ea923a';
  this.ctx.fillStyle = this.colors;
  this.ctx.shadowBlur = 10;
  this.ctx.shadowOffsetX = 0;
  this.ctx.shadowOffsetY = 0;
  this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  this.ctx.fill();
  this.ctx.closePath();

};

Enemy.prototype.enemyMovement = function() {

  this.vy *= this.friction;
  this.y += this.vy;
  this.vx *= this.friction;
  this.x += this.vx;

    if (this.x >= window.innerWidth) {
      this.x = window.innerWidth;
    } else if (this.x <= 5) {
      this.x = 5;
    }
  
    if (this.y > window.innerHeight) {
      this.y = window.innerHeight;
    } else if (this.y <= 5) {
      this.y = 5;
    }

  this.draw();
};

Enemy.prototype.followPlayer = function() {

  this.enemyMovement();

  if (!Game.bonusTime) {

    if (Game.player.y - this.radius > this.y) {
      if (this.vy < this.speed) {
        this.vy += 2;
      }
    }
  
    if (Game.player.y + this.radius < this.y) {
      if (this.vy > -this.speed) {
        this.vy -= 2;
      }
    }
  
    if (Game.player.x - this.radius > this.x) {
      if (this.vx < this.speed) {
        this.vx += 2;
      }
    }
  
    if (Game.player.x + this.radius < this.x) {
      if (this.vx > -this.speed) {
        this.vx -= 2;
      }
    }
  }

};
