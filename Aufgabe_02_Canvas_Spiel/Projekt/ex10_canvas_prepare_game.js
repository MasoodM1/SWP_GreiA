let game = {
    canvas: document.getElementById("field"),
    start() {
        console.log(this.canvas);
        this.context = this.canvas.getContext("2d");
        this.clear();
        this.interval = setInterval(redraw, 20);
        this.intervalNewEnemy = setInterval(newEnemy, 2000);
        this.intervalScore = setInterval(updateScore, 1000);
        this.intervalDifficulty = setInterval(increaseDifficulty, 10000); // Increase difficulty every 10 seconds
        this.player = new sprite(70, 70, "img/face-cool.png", 10, 120); // 3 times bigger
        this.enemies = [];
        this.bonusPoints = [];
        this.score = 0;
        this.difficulty = 1; // Initial difficulty level
        this.maxEnemies = 50; // Limit the number of enemies
        this.keyCode = -1; //when there is no key pressed
        this.enemyCount = 0; // Counter for enemies spawned
        this.isInvincible = false; // Player invincibility state
        window.addEventListener('keydown', (e) => {
            this.keyCode = e.keyCode;
        });

        window.addEventListener('keyup', (e) => {
            this.keyPressed = -1;
        });
    },
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop() {
        clearInterval(this.interval);
        clearInterval(this.intervalNewEnemy);
        clearInterval(this.intervalScore);
        clearInterval(this.intervalDifficulty);
        alert("Game Over! Your score: " + this.score);
    }
}

function start() {
    console.log("Game started");
    game.start();
}

function sprite(width, height, imageSrc, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = imageSrc;

    this.redraw = function() {
        ctx = game.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    this.isCollidingWith = function(other) {
        return !(this.x > other.x + other.width || 
                 this.x + this.width < other.x || 
                 this.y > other.y + other.height || 
                 this.y + this.height < other.y);
    }
}

const keysPressed = new Set();
const playfieldWidth = 1024;
const playfieldHeight = 768;

document.addEventListener('keydown', (event) => {
  keysPressed.add(event.keyCode);
});

document.addEventListener('keyup', (event) => {
  keysPressed.delete(event.keyCode);
});

function redraw() {
    game.clear();

    if (keysPressed.size > 0) {
        if (keysPressed.has(37) && game.player.x > 0) { // left
            game.player.x -= 3;
        }
        if (keysPressed.has(38) && game.player.y > 0) { // up
            game.player.y -= 3;
        }
        if (keysPressed.has(39) && game.player.x < playfieldWidth - game.player.width) { // right
            game.player.x += 3;
        }
        if (keysPressed.has(40) && game.player.y < playfieldHeight - game.player.height) { // down
            game.player.y += 3;
        }
    }

    game.player.redraw();

    // Filter out off-screen enemies
    game.enemies = game.enemies.filter(e => e.x + e.width > 0);

    for (let e of game.enemies) {
        let yDelta = Math.floor(Math.random() * 11) - 5;
        e.x -= game.difficulty; // Increase speed based on difficulty
        e.y += yDelta;
        e.redraw();

        if (!game.isInvincible && game.player.isCollidingWith(e)) {
            game.stop();
            return;
        }
    }

    // Filter out off-screen bonus points
    game.bonusPoints = game.bonusPoints.filter(b => b.x + b.width > 0);

    for (let b of game.bonusPoints) {
        b.x -= game.difficulty; // Move bonus point
        b.redraw();

        if (game.player.isCollidingWith(b)) {
            game.bonusPoints = game.bonusPoints.filter(bp => bp !== b); // Remove collected bonus point
            activateBonus();
        }
    }

    // Draw the score
    game.context.font = "30px Arial";
    game.context.fillStyle = "black";
    game.context.fillText("Score: " + game.score, 10, 50);
}

function newEnemy() {
    if (game.enemies.length < game.maxEnemies) {
        let y = Math.floor(Math.random() * (playfieldHeight - 70)); // Ensure enemy spawns within canvas height
        e = new sprite(70, 70, "img/face-monkey.png", playfieldWidth, y); 
        game.enemies.push(e);
        game.enemyCount++;

        // Spawn bonus point every 30 enemies
        if (game.enemyCount % 30 === 0) {
            newBonusPoint();
        }
    }
}

function newBonusPoint() {
    let y = Math.floor(Math.random() * (playfieldHeight - 70)); // Ensure bonus point spawns within canvas height
    let bonus = new sprite(70, 70, "img/face-devilish.png", playfieldWidth, y);
    game.bonusPoints.push(bonus);
}

function activateBonus() {
    game.isInvincible = true;
    game.player.image.src = "img/face-devilish.png";

    setTimeout(() => {
        game.isInvincible = false;
        game.player.image.src = "img/face-cool.png";
    }, 10000); // Revert after 10 seconds
}

function updateScore() {
    game.score += 1;
}

function increaseDifficulty() {
    game.difficulty += 1; // Increase difficulty level
    clearInterval(game.intervalNewEnemy);
    game.intervalNewEnemy = setInterval(newEnemy, 2000 / game.difficulty); // Increase spawn rate
}