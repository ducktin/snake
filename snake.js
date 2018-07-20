var gameCanvas = document.getElementById("gameCanvas");
var ctx = gameCanvas.getContext("2d");

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

const GAME_TICK = 200;


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
var direction = {
    x: 1,
    y: 0
};
var paused = false;

setupGame();
move();

function setupGame() {
    setupEventListeners();
    clearCanvas();

    drawSnake();
}

function move() {
    setTimeout(() => {
        moveSnake(direction);
        if (!paused) {
            move();
        }
    }, GAME_TICK);
}

function setupEventListeners() {
    document.addEventListener("keypress", moveEventHandler, false);
    document.addEventListener("keypress", pauseEventHandler, false);
}

function moveEventHandler(event) {
    if (event.key === "w") {
        direction = UP;
    } else if (event.key === "a") {
        direction = LEFT;
    } else if (event.key === "s") {
        direction = DOWN;
    } else if (event.key === "d") {
        direction = RIGHT;
    }
}

function pauseEventHandler(event) {
    if (event.key === " ") {
        pausePressed();
    }
}

function pausePressed() {
    if (paused) {
        paused = false;
        move();
    } else {
        paused = true;
    }
}

function clearCanvas() {
    ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
    ctx.strokestyle = CANVAS_BORDER_COLOUR;

    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = SNAKE_COLOUR;
    ctx.strokestyle = SNAKE_BORDER_COLOUR;

    ctx.fillRect(snakePart.x * CELL_WIDTH, snakePart.y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
    ctx.strokeRect(snakePart.x * CELL_WIDTH, snakePart.y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function moveSnake(direction) {
    advanceSnake(direction.x, direction.y);
    clearCanvas();
    drawSnake();
}

function advanceSnake(xVelocity, yVelocity) {

    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    };

    snake.unshift(head);

    snake.pop();
}