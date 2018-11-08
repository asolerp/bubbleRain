var detectCollition = function(withWho, objectA, objectB) {

      var a;
      var x;
      var y;
    
      a = objectA.radius + objectB.radius;
      x = objectA.x - objectB.x;
      y = objectA.y - objectB.y;
    
      switch (withWho) {
        case "enemies":
          if (a > Math.sqrt(x * x + y * y)) {
            console.log('hit');
            objectB.hit = true;
            objectA.radius -= 5;
            return true;
          } else {
            return false;
          }
          break;
        case "itemsGame":
          if (a > Math.sqrt(x * x + y * y)) {
            objectB.radius -= 5;
            objectB.effectCollision(objectB.effect);
            objectB.hit = true;
            return true;
          } else {
            return false;
          }
          break;
        case 'bullets':
        if (a > Math.sqrt((x * x) + (y * y))) {
            objectA.hit = true;
            objectB.radius -= objectA.radiusReduction;
            return true;
        } else {
            return false;
        }
        break;
      }
    };