function Text(ctx) {
  
    this.ctx = ctx;
    this.colors = ["#A68403",'#36B1BF', '#F12522', '#FF0DFF'];
    this.deg = 0;

  }
  
  Text.prototype.draw = function(score, bullets) {

    this.ctx.beginPath();
    this.drawText('Tron', 50, 'black', 2, 'Bubble Rain', window.innerWidth/2 - 300, 100),
    this.drawText('Orbitron', 25 , 'black', 2, `YOUR SCORE IS: ${Math.floor(score)}`, window.innerWidth/2 - 190, window.innerHeight - 50),
    this.drawText('Orbitron', 25 , 'black', 2, `BULLETS: ${bullets}`, 10,40),
    this.drawLegend(3, window.innerWidth - 50, 50,10,10,20, '     Coin', 8)
    this.drawLegend(0, window.innerWidth - 50, 100,10,10,20, 'Grow', 4)
    this.drawLegend(1, window.innerWidth - 50, 150,10,10,20, 'Munition', 8)
    this.drawLegend(2, window.innerWidth - 50, 200,10,10,20, '   Super', 8)
    this.ctx.closePath();
    
  }

  Text.prototype.drawText = function(font, font_size, color, blur, text, x , y) {

    this.ctx.font = `${font_size}px ${font}`;
    this.ctx.fillStyle = `${color}`;
    this.ctx.shadowColor = `${color}`; 
    this.ctx.fillStyle = `${color}`;
    this.ctx.shadowBlur = blur;
    this.ctx.fillText(text, x,y);

  }


  Text.prototype.drawLegend = function(color, x , y, w, h, radius, text, lenght) {

    this.deg += 1;
    this.ctx.beginPath();
    this.ctx.font = `15px Tron`;
    this.ctx.fillStyle = `black`;
    this.ctx.shadowColor = `black`;
    this.ctx.fillStyle = `black`;
    this.ctx.shadowBlur = blur;
    this.ctx.fillText(`${text}`, (lenght > 5)?x-140:x-100,y+10);
    this.ctx.strokeStyle = this.colors[color];
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate((this.deg * Math.PI) / 180);
    this.ctx.fillStyle = this.colors[color];
    this.ctx.shadowColor = this.colors[color];
    this.ctx.strokeStyle = this.colors[color];
    this.ctx.fillRect(-(w / 2), -(h / 2), w, h);
    this.ctx.fillStyle = this.colors[color];
    this.ctx.restore();
    this.ctx.closePath();

  }


  
  