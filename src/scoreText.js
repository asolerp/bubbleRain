function ScoreText(ctx, x, y, score) {

    this.ctx = ctx;
    this.scoreToText = score;
    this.colors = ["#A68403",'#36B1BF', '#F12522'];
    this.deg = 0;
    this.lifeTime = 30
    this.lifeTimeReduction = 1;
    this.x = x;
    this.y = y;

  }
  
  ScoreText.prototype.drawScore = function() {
  
    this.lifeTime -= this.lifeTimeReduction;

    if (this.lifeTime > 0) {

        this.ctx.beginPath();
        this.ctx.font = `30px Orbitron`;
        this.ctx.fillStyle = `black`;
        this.ctx.shadowColor = `black`;
        this.ctx.fillStyle = `black`;
        this.ctx.shadowBlur = 1;
        this.ctx.fillText(`+${Math.floor(this.scoreToText)}`, this.x, this.y);
        this.ctx.closePath();

    }

  }