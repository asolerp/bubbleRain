function Weapon(ctx, x, y, w, h, side, typeOfShoot) {
  
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.side = side;
    this.damage;
    this.color;

    if (typeOfShoot === 'normal') {
      this.radius = 5
      this.radiusReduction = 5;
      this.vx = 10;
      this.vy = 10;
      this.color = 'black';
    } else {
      this.radius = 8;
      this.radiusReduction = 20;
      this.vx = 20;
      this.vy = 20;
      this.color = '#F12522'
    }


    this.hit = false;
  
    this.vx;
    this.vy;

  
  }
  
  Weapon.prototype.draw = function() {

    console.log(this.radiusReduction);
    
    this.ctx.beginPath(); 
    this.ctx.fillStyle = this.color;
    this.ctx.shadowBlur = 0;
    this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
    this.ctx.fill();
    
  }

  Weapon.prototype.changeShoot = function(){

    Game.player.typeOfShoot = 'super';

    setTimeout(function(){
      Game.player.typeOfShoot = 'normal';
    }.bind(this),5000)
    
  }
  
  Weapon.prototype.move = function() {


    switch(this.side) {
        
        case 'Front':
        this.y += this.vy;
        break;

        case 'Right':
        this.x += this.vx;
        break;

        case 'Left':
        this.x -= this.vx;
        break;

        case 'Back':
        this.y -= this.vy;
        break;

        case 'BR':
        this.y -= this.vy;
        this.x += this.vx;
        break;

        case 'BL':
        this.y -= this.vy;
        this.x -= this.vx;
        break;

        case 'FR':
        this.y += this.vy;
        this.x += this.vx;
        break;

        case 'FL':
        this.y += this.vy;
        this.x -= this.vx;
        break;
    
    }

    // for (var i = 0; i < this.character.enemies.length; i++) {
    //   this.detectCollition(this.character.enemies[i]);
    // }
    
  };


  // Weapon.prototype.detectCollition = function(object2) {    
    
  //   var a;
  //   var x;
  //   var y;
    
  //   a = this.radius + object2.radius;
  //   x = this.x - object2.x;
  //   y = this.y - object2.y;
    
  
  //   if (a > Math.sqrt((x * x) + (y * y))) {
  //     this.hit = true;
  //     object2.radius -= this.radiusReduction;
  //     return true;
  //   } else {
  //     return false;
  //   }
  
    
  //   }