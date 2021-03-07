const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 200;
canvas.height = 200;

const DELAY = 500;

const RESOLUTION = 20

const COLS = canvas.width / RESOLUTION;
const ROWS = canvas.height / RESOLUTION;

const buildGrid = () => {
    return new Array(COLS).fill(null)
        .map(() => new Array(ROWS).fill(null)
            .map(() => Math.floor(Math.random() * 2)));
};

const render = (grid) => {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];

            context.beginPath();
            context.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
            context.fillStyle = cell ? 'black' : 'white';
            context.fill();
            context.stroke();
        };
    };
};

const getNextGenGrid = (grid) => {
    const nextGenGrid = grid.map(arr => [...arr]);

    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            
            let numOfNeighbours = 0;

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    
                    if (i === 0 && j === 0) {
                        continue;
                    }

                    const x_cell = (col + i + COLS) % COLS;
                    const y_cell = (row + j + ROWS) % ROWS;

                    numOfNeighbours += grid[x_cell][y_cell];
                };
            };

            if (cell === 1 && numOfNeighbours < 2) {
                nextGenGrid[col][row] = 0;
            } else if (cell === 1 && numOfNeighbours > 3) {
                nextGenGrid[col][row] = 0;
            } else if (cell === 0 && numOfNeighbours === 3) {
                nextGenGrid[col][row] = 1;
            };
        };
    };

    return nextGenGrid;
};

let grid = buildGrid();

const update = () => {
  grid = getNextGenGrid(grid);
  render(grid);
};

let intervalId;

const start = () => {
    stop();
    intervalId = setInterval(update, DELAY);
};

const stop = () => {
    clearInterval(intervalId);
};

const reset = () => {
    stop();
    grid = buildGrid();
    start();
}

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
