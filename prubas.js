var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

canvas.width = canvas.height = 300;

var player1 = {
    x: 50,
    y: 150,
    velY: 0,
    velX: 0,
    color: "blue"
},
player2 = {
    x: 250,
    y: 150,
    velY: 0,
    velX: 0,
    color: "red"
};

var x = 150,
    y = 150,
    velY = 0,
    velX = 0,
    speed = 2,
    friction = 0.98,
    keys = [];

function update() {

    if (keys[38]) {
        if (player1.velY > -speed) {
            player1.velY--;
        }
    }

    if (keys[40]) {
        if (player1.velY < speed) {
            player1.velY++;
        }
    }
    if (keys[39]) {
        if (player1.velX < speed) {
            player1.velX++;
        }
    }
    if (keys[37]) {
        if (player1.velX > -speed) {
            player1.velX--;
        }
    }

    if (keys[87]) {
        if (player2.velY > -speed) {
            player2.velY--;
        }
    }

    if (keys[83]) {
        if (player2.velY < speed) {
            player2.velY++;
        }
    }
    if (keys[68]) {
        if (player2.velX < speed) {
            player2.velX++;
        }
    }
    if (keys[65]) {
        if (player2.velX > -speed) {
            player2.velX--;
        }
    }
    ctx.clearRect(0, 0, 300, 300);
    updatePlayer(player1);
    updatePlayer(player2);
    setTimeout(update, 10);
}

function updatePlayer(player) {
    player.velY *= friction;
    player.y += player.velY;
    player.velX *= friction;
    player.x += player.velX;

    if (player.x >= 295) {
        player.x = 295;
    } else if (player.x <= 5) {
        player.x = 5;
    }

    if (player.y > 295) {
        player.y = 295;
    } else if (player.y <= 5) {
        player.y = 5;
    }

    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x, player.y, 5, 0, Math.PI * 2);
    ctx.fill();
}

update();

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});