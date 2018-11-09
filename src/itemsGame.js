function ItemGame(ctx, x, y, w, h, frames, effect, color) {
  
  this.ctx2 = ctx;
  this.color = color;
  this.colors = ["#A68403",'#36B1BF', '#F12522', '#FF0DFF'];

  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.effect = effect;
  this.hit = false;

  this.radius = this.w * 3;
  this.radiusReducton = 0.05;
  this.deg = 0;

  this.assignValuesEffect(this.effect);

}

ItemGame.prototype.draw = function() {
  this.animateItemGame(this.animation);
};

ItemGame.prototype.assignValuesEffect = function(effect) {
  switch (effect) {
    case "coin":
      this.radiusReducton = 0.00;
      break;
    case "grow":
      this.radiusReducton = 0.08;
      break;
    case 'munition':
      this.radiusReducton = 0.05;
      break;
    case 'super':
      this.radiusReducton = 0.1;
      break;
    case 'bonusCoin':
      this.radiusReducton = 0.15;
      break;
  }
};

ItemGame.prototype.effectCollision = function(effect) {
  switch (effect) {
    case 'coin':
      Game.score += 50;
      break;
    case "grow":
      if (Game.player.radius < 30) {
        Game.player.radius += 4;
      }
      break;
    case "munition":
      Game.player.numberOfBullets += 15;
      break;
    case 'super':
      Game.player.bullet.changeShoot();
      break;
    case 'bonusCoin':
      Game._setBonusTime();
      break;
  }
};

ItemGame.prototype.animateItemGame = function() {
  this.deg += 1;
  this.radius -= this.radiusReducton;
  if (this.deg < 360) {
    if (Game.frameCounter % 1 === 0) {
      this.ctx2.beginPath();
      this.ctx2.shadowColor = this.colors[this.color];
      this.ctx2.shadowBlur = 5;
      this.ctx2.strokeStyle = this.colors[this.color];
      this.ctx2.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.ctx2.stroke();
      this.ctx2.save();
      this.ctx2.translate(this.x, this.y);
      this.ctx2.rotate((this.deg * Math.PI) / 180);
      this.ctx2.shadowBlur = 0;
      this.ctx2.fillStyle = this.colors[this.color];
      this.ctx2.shadowColor = this.colors[this.color];
      this.ctx2.strokeStyle = this.colors[this.color];
      this.ctx2.fillRect(-(this.w / 2), -(this.h / 2), this.w, this.h);
      this.ctx2.fillStyle = this.colors[this.color];
      this.ctx2.restore();
    }
  } else {
    this.deg = 0;
  }
};

ItemGame.prototype.clear = function() {};