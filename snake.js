var gameCanvas = document.getElementById("gameCanvas");

const CANVAS_BORDER_COLOUR = 'black';
const CANVAS_BACKGROUND_COLOUR = "white";

const CELL_WIDTH = 20;
const CELL_HEIGHT = 20;

const CANVAS_CELL_WIDTH = gameCanvas.width / CELL_WIDTH;
const CANVAS_CELL_HEIGHT = gameCanvas.height / CELL_HEIGHT;

const SNAKE_COLOUR = 'lightgreen';
const SNAKE_BORDER_COLOUR = 'darkgreen';


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

// Get the canvas element
// Return a two dimensional drawing context
var ctx = gameCanvas.getContext("2d");
//  Select the colour to fill the canvas
ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
//  Select the colour for the border of the canvas
ctx.strokestyle = CANVAS_BORDER_COLOUR;
// Draw a "filled" rectangle to cover the entire canvas
ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
// Draw a "border" around the entire canvas
ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);

function drawSnakePart(snakePart) {
    ctx.fillStyle = 'lightgreen';
    ctx.strokestyle = 'darkgreen';

    ctx.fillRect(snakePart.x * CELL_WIDTH, snakePart.y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
    ctx.strokeRect(snakePart.x * CELL_WIDTH, snakePart.y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}