var gameCanvas = document.getElementById("gameCanvas");
var ctx = gameCanvas.getContext("2d");
var pointsTxt = document.getElementById("points");

const UP = {
    x: 0,
    y: -1
};
const LEFT = {
    x: -1,
    y: 0
};
const DOWN = {
    x: 0,
    y: 1
};
const RIGHT = {
    x: 1,
    y: 0
};

const CANVAS_BORDER_COLOUR = 'black';
const CANVAS_BACKGROUND_COLOUR = "white";

const CELL_WIDTH = 20;
const CELL_HEIGHT = 20;

const CANVAS_CELL_WIDTH = gameCanvas.width / CELL_WIDTH;
const CANVAS_CELL_HEIGHT = gameCanvas.height / CELL_HEIGHT;

const SNAKE_COLOUR = 'lightgreen';
const SNAKE_BORDER_COLOUR = 'darkgreen';
const FRUIT_COLOUR = 'red';
const FRUIT_BORDER_COLOUR = 'black';

const GAME_TICK = 100;

let snake = [{
        x: 8,
        y: 4
    },
    {
        x: 7,
        y: 4
    },
    {
        x: 6,
        y: 4
    },
    {
        x: 5,
        y: 4
    },
    {
        x: 4,
        y: 4
    }
];
var fruit;
var direction = RIGHT;
var paused = false;
var points = 0;

setupGame();
move();

function setupGame() {
    setupEventListeners();

    spawnFruit();
}

function move() {
    setTimeout(() => {
        moveSnake(direction);
        if (!paused) {
            move();
        }
    }, GAME_TICK);
    console.log('timeout set');
}

function setupEventListeners() {
    document.addEventListener("keypress", moveEventHandler, false);
    document.addEventListener("keypress", pauseEventHandler, false);
}

function moveEventHandler(event) {
    if (event.key === "w") {
        if(direction !== DOWN){
            direction = UP;
        }
    } else if (event.key === "a") {
        if(direction !== RIGHT){
        direction = LEFT;
        }
    } else if (event.key === "s") {
        if(direction !== UP){
            direction = DOWN;
        }
    } else if (event.key === "d") {
        if(direction !== LEFT){
        direction = RIGHT;
        }
    }
}

function pauseEventHandler(event) {
    if (event.key === " ") {
        pauseGame();
    }
}

function pauseGame() {
    if (paused) {
        console.log("game continued");
        paused = false;
        move();
    } else {
        console.log("game paused");
        paused = true;
    }
}

function clearCanvas() {
    ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
    ctx.strokeStyle = CANVAS_BORDER_COLOUR;

    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = SNAKE_COLOUR;
    ctx.strokeStyle = SNAKE_BORDER_COLOUR;

    ctx.fillRect(snakePart.x * CELL_WIDTH, snakePart.y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
    ctx.strokeRect(snakePart.x * CELL_WIDTH, snakePart.y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function drawFruit() {
    ctx.fillStyle = FRUIT_COLOUR;
    ctx.strokeStyle = FRUIT_BORDER_COLOUR;

    var circleCenter = {
        x: fruit.x * CELL_WIDTH + CELL_WIDTH/2,
        y: fruit.y * CELL_HEIGHT + CELL_HEIGHT/2
    }

    ctx.beginPath();
    ctx.arc(circleCenter.x, circleCenter.y, CELL_WIDTH/2-2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function moveSnake(direction) {
    advanceSnake(direction.x, direction.y);
    clearCanvas();
    drawSnake();
    drawFruit();
}

function advanceSnake(xVelocity, yVelocity) {
    // we move the snake by creating a new head in the movement direction, and then removing the tail from the end
    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    };
    if (checkHit(head)) {
        gameOver();
    } else {
        if(checkFruitHit(head)){
            fruitHit();
        }
        snake.unshift(head);
        snake.pop();
    }
}

function checkHit(head) {
    return checkSelfHit(head) || checkWallHit(head);
}

function checkSelfHit(head) {
    for (const element of snake) {
        if (head.x == element.x && head.y == element.y) {
            console.log("self hit");
            return true;
        }
    }
    return false;
}

function checkWallHit(head) {
    if (head.x >= 0 && head.x < CANVAS_CELL_WIDTH && head.y >= 0 && head.y < CANVAS_CELL_HEIGHT ) {
        return false;
    }
    else {
        console.log("wall hit");
        return true;
    }
}

function checkFruitHit(head) {
    if (head.x == fruit.x && head.y == fruit.y) {
        console.log("fruit hit");
        return true;
    } else {
        return false;
    }
}

function fruitHit() {
    addPoints(10);
    spawnFruit();
}

function spawnFruit() {
    var pos = getRandomPosition();
    console.log(`fruit spawned at x:${pos.x}, y:${pos.y}`);
    fruit = pos;
}

function getRandomPosition(){
    return {
        x: Math.floor(Math.random()*CANVAS_CELL_WIDTH),
        y: Math.floor(Math.random()*CANVAS_CELL_HEIGHT)
    }
}

function addPoints(plusPoints) {
    points += plusPoints;
    pointsTxt.innerHTML = points;
}

function gameOver() {
    pauseGame();
    // TODO
}