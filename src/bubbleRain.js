var song = new MySound("audio/tron2.mp3");

var Game = {

  version: "1.0",
  introTrack: null,
  soundTrack: null,
  bonusTrack: null,
  difficultyLevel: null,
  idInterval: null,
  ballEnemies: [],
  itemsGame: [],
  textScores: [],
  textGame: null,
  player: null,
  nBallsGenerated: 0,
  frameCounter: 0,
  generateEnemiesFrames: 100,
  radiusReduction: 0.02,
  fps: 60,
  score: 0,
  canvas: document.getElementById("bubbleRain"),
  ctx: null,
  ctx2: null,
  status: false,
  bonusTime: false,

  setDifficultyLevel: function(level) {
    this.difficultyLevel = level;
    console.log("la dificultad ha cambiado a: " + level);
  },

  _setCanvasDimensions: function() {
    document
      .querySelector("#bubbleRain")
      .setAttribute("height", window.innerHeight);
    document
      .querySelector("#bubbleRain")
      .setAttribute("width", window.innerWidth);
  },

  _setReductionPlayer: function() {
    this.player.radius -= this.radiusReduction;
  },

  _setBonusTime: function() {
    Game.bonusTime = true; 
    this.radiusReduction = 0.00,
    this.player.color = 2,
    this.player.radius = 30,
    console.log('parar')
    this.soundTrack.pause();
    this.soundTrack.pause();
    this.bonusTrack.play();
    Game._generateItemsCoins();
    setTimeout (function(){
      this.soundTrack.play();
      this.bonusTrack.pause();
      this.itemsGame.splice(this.itemsGame.findIndex(itemGame => itemGame.effect === "coin"));
      this.player.color = 0;
      this.radiusReduction = 0.02,
      Game.bonusTime = false;   
    }.bind(this), 7000)
  },

  _setTextGame: function() {
    this.textGame = new Text(this.ctx);
  },

  _generateEnemies: function() {
    
    this.nBallsGenerated++;

    var radius = Math.random() * (45 - 20) + 20;

    var randomX = Math.floor(Math.random() * 3);
    var x = [0, Math.random() * window.innerWidth, window.innerWidth];

    var randomY = Math.floor(Math.random() * 3);
    var y = [0, Math.random() * window.innerHeight, window.innerHeight];

    if (this.frameCounter % 2 === 0) {
      if (randomX === 0) {
        this.ballEnemies.push(new Enemy(this.ctx, radius, x[0], y[1]));
      } else if (randomX === 1) {
        this.ballEnemies.push(new Enemy(this.ctx, radius, x[1], y[0]));
      } else if (randomX === 2) {
        this.ballEnemies.push(new Enemy(this.ctx, radius, x[2], y[1]));
      }
    } else {
      if (randomY === 0) {
        this.ballEnemies.push(new Enemy(this.ctx, radius, x[1], y[0]));
      } else if (randomY === 1) {
        this.ballEnemies.push(new Enemy(this.ctx, radius, x[0], y[1]));
      } else if (randomY === 2) {
        this.ballEnemies.push(new Enemy(this.ctx, radius, x[1], y[2]));
      }
    }
  },

  _generateDeathScores: function() {
    this.textScores.forEach(function(score, i) {
      if (score.lifeTime < 0) {
        if (this.textScores !== undefined) {
          this.textScores.splice(i, 1);
        }
      }

      score.drawScore();
    });
  },

  _generateAllItems: function() {
      this._generateItemsCoins();
      this._generateItemsGrow()
  },

  _generateItemsCoins: function() {
    for (var i = 0; i < 20; i++) {
      this.itemsGame.push(
        new ItemGame(
          this.ctx2,
          Math.random() * (window.innerWidth - 100 - 100) + 100,
          Math.random() * (window.innerHeight - 100) + 100,
          5,
          5,
          10,
          "coin",
          3
        )
      );
    } 
 
  },

  _generateItemsGrow: function() {
    this.itemsGame.push(
      new ItemGame(
        this.ctx2,
        Math.random() * (window.innerWidth - 100 - 100) + 100,
        Math.random() * (window.innerHeight - 100) + 100,
        15,
        15,
        30,
        "grow",
        0
      )
    );
  },

  _generateItemMunition: function() {
    this.itemsGame.push(
      new ItemGame(
        this.ctx2,
        Math.random() * (window.innerWidth - 100 - 100) + 100,
        Math.random() * (window.innerHeight - 100) + 100,
        15,
        15,
        30,
        "munition",
        1
      )
    );
  },

  _generateItemSuper: function() {
    this.itemsGame.push(
      new ItemGame(
        this.ctx2,
        Math.random() * (window.innerWidth - 100 - 100) + 100,
        Math.random() * (window.innerHeight - 100) + 100,
        20,
        20,
        40,
        "super",
        2
      )
    );
  },

  _generateItemBonusCoins: function() {
    this.itemsGame.push(
      new ItemGame(
        this.ctx2,
        Math.random() * (window.innerWidth - 100 - 100) + 100,
        Math.random() * (window.innerHeight - 100) + 100,
        15,
        15,
        30,
        "bonusCoin",
        3
      )
    );
  },

  _generateDataModel: function() {
    
    this.score += 0.2;
    this.frameCounter++;

    if (!Game.bonusTime) {

      if (this.frameCounter % this.generateEnemiesFrames == 0) {
        this._generateEnemies();
      }
  
      if (this.frameCounter % 20 == 0) {
        this._generateItemsGrow();
      }
  
      if (this.frameCounter % 70 == 0) {
        this._generateItemMunition();
      }
  
      if (this.frameCounter % 1000 == 0) {
        this._generateItemSuper();
      }
  
      if (this.frameCounter % 600 == 0) {
        this._generateItemBonusCoins();
      }
  
      if (this.frameCounter % 800 == 0) {
        if (this.generateEnemiesFrames > 10) {
          this.generateEnemiesFrames -= 5;
        }
      }
  
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }
    }

   
  },

  _detectCollisions: function() {
    for (var i = 0; i < this.ballEnemies.length; i++) {
      if (!this.ballEnemies[i].hit) {
        detectCollition("enemies", this.player, this.ballEnemies[i]);
      }
    }

    for (var i = 0; i < this.player.bullets.length; i++) {
      for (var z = 0; z < this.ballEnemies.length; z++) {
        if (!this.player.bullets[i].hit) {
          detectCollition(
            "bullets",
            this.player.bullets[i],
            this.ballEnemies[z]
          );
        }
      }
    }

    for (var i = 0; i < this.itemsGame.length; i++) {
      detectCollition("itemsGame", this.player, this.itemsGame[i]);
    }
  },

  _clearArrayObjects: function() {
    for (var i = 0; i < this.itemsGame.length; i++) {
      this.itemsGame[i].draw();
      if (this.itemsGame[i].radius < 10 || this.itemsGame[i].hit === true) {
        if (this.itemsGame[i].effect === 'coin') {
          this.textScores.push(
            new ScoreText(
              this.ctx,
              this.itemsGame[i].x,
              this.itemsGame[i].y,
              50
            )
          );
        }
        this.itemsGame.splice(i, 1);
      }
    }

    for (var i = 0; i < this.ballEnemies.length; i++) {
      if (this.ballEnemies[i].radius < 10) {
        this.textScores.push(
          new ScoreText(
            this.ctx,
            this.ballEnemies[i].x,
            this.ballEnemies[i].y,
            this.ballEnemies[i].bornRadius * 10
          )
        );
        Game.score += this.ballEnemies[i].bornRadius * 10;
        this.ballEnemies.splice(i, 1);
      } else if (this.ballEnemies[i].hit === true) {
        this.ballEnemies.splice(i, 1);
      }
    }

    this.player.bullets.forEach(
      function(bullet, i) {
        if (
          bullet.hit === true ||
          bullet.x < 0 ||
          bullet.y < 0 ||
          bullet.x > window.innerWidth ||
          bullet.y > innerHeight
        )
          this.player.bullets.splice(i, 1);
      }.bind(this)
    );
  },

  _paintDataModel: function() {

    this.textGame.draw(this.score, this.player.numberOfBullets);

    this.itemsGame.forEach(
      function(item) {
        item.draw();
      }.bind(this)
    );

    if (this.status) {
      this.ballEnemies.forEach(
        function(oneBall) {
          oneBall.followPlayer();
        }.bind(this)
      );

      this.player.movePlayer();
    }

    this.textScores.forEach(function(score, i) {
      if (score.lifeTime < 0) {
        if (this.textScores !== undefined) {
          this.textScores.splice(i, 1);
        }
      }
      score.drawScore();
    });
  },

  _repeatOften: function() {
    
    var idInterval = setInterval(
      function() {
        this._clearArrayObjects();
        this._clear();
        this._paintDataModel();

        if (this.status) {
          this._setReductionPlayer();
          this._generateDataModel();
          this._detectCollisions();
          this._clearArrayObjects();
          this._stopGame();
        }
      }.bind(this),
      1000 / this.fps
    );
  },

  _stopGame: function() {

    if (this.player.radius < 10) {

      clearInterval(this.idInterval);
      $(".startGame").show();
      $(".infoGame").show();
      $("#yourScore").show();
      $(".finalScore").html(`Your score was: ${Math.floor(this.score)}`);
    
      this.status = false;
    }

  
  },

  _clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  init: function() {

    this.ctx = this.canvas.getContext("2d");
    this.ctx2 = this.canvas.getContext("2d");
    this.player = new Player(this.ctx);

    this.soundTrack = new MySound("audio/tron.mp3");
    this.bonusTrack = new MySound("audio/countDown.wav");
    this.introTrack = new MySound("audio/intro.mp3");

    this.introTrack.play();
    this._setCanvasDimensions();
    this._setTextGame();
    this._repeatOften();
  }
};
