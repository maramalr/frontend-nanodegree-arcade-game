// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    //  reset position of enemy to move across again
    if (this.x > 500) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 200);
    }

    this.collision();


};

//collision method invoked
// credits MDN URL "https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection"
Enemy.prototype.collision = function() {


    // the keyword this refers to the "current" ememy instance inside the Enemy prototype methods
    var rect1 = {
        x: this.x,
        y: this.y,
        width: 50,
        height: 50
    };
    var rect2 = {
        x: player.x,
        y: player.y,
        width: 50,
        height: 50
    };

    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
        // collision detected!
        player.x = 200;
        player.y = 400;
        console.log("collision detected");
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

   /* if (this.x > 400) {
        this.x = 400;
        this.speed = 100 + Math.floor(Math.random() * 200);
    }*/
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(Press) {
    // key should move the player selected position left, right, down, up
    if (Press === 'left') {
        (this.x -= this.speed + 40);
    } else if (Press === 'right') {
        (this.x += this.speed + 40);

    } else if (Press === 'down') {
        (this.y += this.speed + 20);
    } else if (Press === 'up') {
        this.y -= this.speed + 20;
    }

    // Prevent player from moving beyond canvas wall boundaries

    if (this.y > 400) {
        this.y = 400;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    //left
    if (this.x < 0) {
        this.x = 0;
    }

    // Check for player reaching the water then return it to the start position down in the middle
    if (this.y < -1) {
        this.x = 200;
        this.y = 400;
    }

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// https://www.w3schools.com/js/js_function_parameters.asp

var allEnemies = [new Enemy(30, 140, 220), new Enemy(30, 230, 220), new Enemy(30, 60, 220) /* add arguments here*/ ];
var player = new Player(200, 400, 50);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});