window.onload = function() {

  Game.init();
  

  var topTenArray = [];

  Object.keys(localStorage).forEach(player => {
    topTenArray.push({
      player: `${player}`,
      score: ` ${localStorage[player]}`
    });
  });

  topTenArray
    .sort(function(a, b) {
      return b.score - a.score;
    })
    .forEach(player => {
      var liTag = document.createElement("li");
      var pTag = document.createElement("p");
      var text = document.createTextNode(
        `${player["player"]} : ${player["score"]} points.`
      );

      pTag.append(text);
      liTag.append(pTag);
      document.querySelector(".topTenScores ul").appendChild(liTag);
    });

  $("#info").animatedModal({ color: "rgba(226, 226, 226, 0.95)" });
  $("#yourScore").hide();
  // $(".countDown").hide();

  var countDownTrack = new MySound("audio/5sec.mp3");

  $(".startGame").click(function() {
    Game.introTrack.pause();
    countDownTrack.play();
    $(".countDown").show();
    var countDown = 5;

    var startGame = setInterval(function(){
      console.log(countDown);
      $(".countDown").html(countDown);
      countDown--;
    },1450)

    setTimeout(function(){
      $(".countDown").hide();
      clearInterval(startGame);
      Game.status = true;
      Game.soundTrack.play();
    }, 8500)
    
    // game.startedGame = true;
    $(".startGame").hide(100, "swing");
    $(".infoGame").hide(100, "swing");
  });

  function saveScore(name, score) {
    localStorage.setItem(`${name}`, `${Math.floor(score)}`);
  }
  $("#scoreButton").click(function() {
    var name = $("#inputName").val();
    saveScore(name, Game.score);
    console.log(window);
    window.location.reload();
  });

}