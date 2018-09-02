// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};


Enemy.prototype.update = function(dt) {
    if (this.x > 510){
      this.x = 0;
      this.speed = 100 + Math.floor(Math.random() * 300)
    }

    collision(this.x,this.y,player.x,player.y);

    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player = function(x,y,speed){
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.update = function(dt){

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input){
  switch(input){
    case 'left':
      if(this.x <= 0){
        this.x = 0;
      }else{
        this.x -= 100;
        }
      break;
    case 'right':
      if(this.x >= 400){
        this.x = 400;
      }else{
        this.x += 100;
      }
      break;
    case 'up':
      this.y -= 90;
      console.log(this.y);
     break;
    case 'down':
      if(this.y >= 400){
        this.y = 400;
      }else{
        this.y += 90;
      }
      break;
  }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a letiable called player

let allEnemies = [];
let player = new Player(200,400,50);


let enemySpawn = [40,130,220];

enemySpawn.forEach(function(yCord){
  let enemy = new Enemy(0, yCord, 100 + Math.floor(Math.random() * 300));
  allEnemies.push(enemy);
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


let collision = function(enemyX, enemyY, charX, charY){
  if(enemyX >= charX - 50 && enemyX <= charX ){
    if(enemyY == charY){
      gameReset();
    }
  }
}

let gameReset = function(){
  player.x = 200;
  player.y = 400;
  player.sprite = charConveryor();
}


let characters = [
  'images/char-boy.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png',
  'images/char-princess-girl.png'
];

let charConveryor = function(){
  if(characters[0] === undefined){
    characters = [
      'images/char-cat-girl.png',
      'images/char-boy.png',
      'images/char-horn-girl.png',
      'images/char-pink-girl.png',
      'images/char-princess-girl.png'
    ];
    gameOver();
    return characters.shift();
  }else{
    return characters.shift();
  }
}


let gameOver = function(){
  document.getElementById('gameOverModal').style.display ="inline";
  document.getElementById('gameOverModal').classList.add('fadeIn');
}
