 
// const topInput = document.querySelector(".top input");

// const playBody = document.querySelector('.play-body');
// const score = document.querySelector('.score');
// const highScore = document.querySelector('.high-score');

// let scoreValue = 0, highScoreValue = 0;
// let gameOver = false;
// let foodX, foodY;
// let snakeHeadX = 10, snakeHeadY = 10;
// let movementX = 0, movementY = 0;
// let snakeBody = [];

// // Snake Speed control
// let baseSpeed = 500;
// let maxSpeed = 50;
// let speedMultiplier = 5;
// let speed = speedControl(speedMultiplier);
// let gameInterval; // Declare the interval variable to be able to clear it

// function speedControl(multiplier) {
//     // Ensure multiplier is between 1 and 10
//     const clampedMultiplier = Math.min(Math.max(multiplier, 1), 10);

//     // Calculate speed: Higher multiplier -> Faster game (lower interval time)
//     const speed = maxSpeed + (baseSpeed - maxSpeed) * (10 - clampedMultiplier) / 9;

//     return speed;
// }



// function gameStart() {
//     if (gameOver) {
//         gameOverValidation();
//         return;
//     }

//     // Dynamic speed adjustment
//     speed = speedControl(speedMultiplier);
    
//     highScoreValue = localStorage.getItem('highScore') || 0;
//     highScore.innerHTML = `High Score: ${highScoreValue}`;

//     let playGrid = `<div class='food' style="grid-area:${foodY}/${foodX}"></div>`;
    
//     if (snakeHeadY === foodY && snakeHeadX === foodX) {
//         foodPosition();
//         snakeBody.push([foodX, foodY]);
//         scoreValue++;
//     }

//     // Update snake body
//     for (let i = snakeBody.length - 1; i > 0; i--) {
//         snakeBody[i] = snakeBody[i - 1];
//     }
//     snakeBody[0] = [snakeHeadX, snakeHeadY];

//     // Move the snake
//     snakeHeadY += movementY;
//     snakeHeadX += movementX;

//     // Check for boundaries and collisions
//     if (snakeHeadX <= 0 || snakeHeadY <= 0 || snakeHeadX >= 26 || snakeHeadY >= 26 || checkCollision()) {
//         gameOver = true;
//     }

//     // Draw the snake
//     for (let i = 0; i < snakeBody.length; i++) {
//         if (i === 0) {
//             playGrid += `<div class='head' style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
//         } else {
//             playGrid += `<div class='snake' style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
//         }
//     }

//     playBody.innerHTML = playGrid;
//     showScore();
// }

// function checkCollision() {
//     for (let i = 1; i < snakeBody.length; i++) {
//         if (snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]) {
//             return true;
//         }
//     }
//     return false;
// }

// function gameOverValidation() {
//     alert('Game over! Replay the game.');
//     if (scoreValue > highScoreValue) {
//         localStorage.setItem('highScore', scoreValue);
//     }
//     scoreValue = 0;
//     snakeHeadX = snakeHeadY = 10;
//     snakeBody = [];
//     movementX = movementY = 0;
//     gameOver = false;
//     foodPosition();
//     gameStart();  // Restart the game after the game over
// }

// function foodPosition() {
//     foodX = Math.floor(Math.random() * 25 + 1);
//     foodY = Math.floor(Math.random() * 25 + 1);
// }

// function snakeMovement(e) {
//     if (e.key === 'ArrowUp' && movementY !== 1) {
//         movementY = -1;
//         movementX = 0;
//     } else if (e.key === 'ArrowDown' && movementY !== -1) {
//         movementY = 1;
//         movementX = 0;
//     } else if (e.key === 'ArrowRight' && movementX !== -1) {
//         movementX = 1;
//         movementY = 0;
//     } else if (e.key === 'ArrowLeft' && movementX !== 1) {
//         movementX = -1;
//         movementY = 0;
//     }
// }

// function showScore() {
//     score.innerHTML = `Score: ${scoreValue}`;
// }

// topInput.addEventListener('input', (e) => {
//     // Update the speed multiplier based on input
//     speedMultiplier = parseInt(e.target.value);

//     // Clear the existing interval
//     clearInterval(gameInterval);

//     // Restart the game loop with the new speed
//     gameInterval = setInterval(gameStart, speed);
// });

// showScore();
// foodPosition();

// // Start the game with dynamic speed adjustment
// gameInterval = setInterval(gameStart, speed);

// window.addEventListener('keydown', snakeMovement);







const topInput = document.querySelector(".top input");
const playBody = document.querySelector('.play-body');
const score = document.querySelector('.score');
const highScore = document.querySelector('.high-score');

let scoreValue = 0, highScoreValue = 0;
let gameOver = false;
let foodX, foodY;
let headX = 10, headY = 10;
let movementX = 0, movementY = 0;
let snakeBody = [];

let baseSpeed = 500;
let maxSpeed = 50;
let speedMultiplier = 5;
let speed = speedControl(speedMultiplier);
let gameInterval;

function speedControl(multiplier) {
    const clampedMultiplier = Math.min(Math.max(multiplier, 1), 10);
    return maxSpeed + (baseSpeed - maxSpeed) * (10 - clampedMultiplier) / 9;
}

function gameStart() {
    if (gameOver) {
        gameOverValidation();
        return;
    }

    speed = speedControl(speedMultiplier);

    highScoreValue = localStorage.getItem('highScore') || 0;
    highScore.innerHTML = `High Score: ${highScoreValue}`;

    let playGrid = `<div class='food' style="grid-area:${foodY}/${foodX}"></div>`;

    if (headY === foodY && headX === foodX) {
        foodPosition();
        snakeBody.push([foodX, foodY]);
        scoreValue++;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [headX, headY];

    headY += movementY;
    headX += movementX;

    if (headX <= 0 || headY <= 0 || headX >= 26 || headY >= 26 || checkCollision()) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        playGrid += `<div class='${i === 0 ? 'head' : 'snake'}' style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
    }

    playBody.innerHTML = playGrid;
    showScore();
}

function checkCollision() {
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]) {
            return true;
        }
    }
    return false;
}

function gameOverValidation() {
    alert('Game over! Replay the game.');
    if (scoreValue > highScoreValue) {
        localStorage.setItem('highScore', scoreValue);
    }
    scoreValue = 0;
    headX = headY = 10;
    snakeBody = [];
    movementX = movementY = 0;
    gameOver = false;
    setTimeout(() => {
        foodPosition();
        gameStart();
    }, 1000);
}

function foodPosition() {
    do {
        foodX = Math.floor(Math.random() * 25 + 1);
        foodY = Math.floor(Math.random() * 25 + 1);
    } 
    while (isFoodOnSnake(foodX, foodY));
}

function isFoodOnSnake(x, y) {
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody[i][0] === x && snakeBody[i][1] === y) {
            return true;
        }
    }
    return false;
}

function snakeMovement(e) {
    if (e.key === 'ArrowUp' && movementY !== 1) {
        movementY = -1;
        movementX = 0;
    } else if (e.key === 'ArrowDown' && movementY !== -1) {
        movementY = 1;
        movementX = 0;
    } else if (e.key === 'ArrowRight' && movementX !== -1) {
        movementX = 1;
        movementY = 0;
    } else if (e.key === 'ArrowLeft' && movementX !== 1) {
        movementX = -1;
        movementY = 0;
    }
}

function showScore() {
    score.innerHTML = `Score: ${scoreValue}`;
}

topInput.addEventListener('input', (e) => {
    speedMultiplier = parseInt(e.target.value);
    speed = speedControl(speedMultiplier);
    clearInterval(gameInterval);
    gameInterval = setInterval(gameStart, speed);
});

//For mobile Controls
document.getElementById("up").addEventListener('click', () => {
    if (movementY !== 1) {
        movementY = -1;
        movementX = 0;
    }
});

document.getElementById("down").addEventListener('click', () => {
    if (movementY !== -1) {
        movementY = 1;
        movementX = 0;
    }
});

document.getElementById("left").addEventListener('click', () => {
    if (movementX !== 1) {
        movementX = -1;
        movementY = 0;
    }
});

document.getElementById("right").addEventListener('click', () => {
    if (movementX !== -1) {
        movementX = 1;
        movementY = 0;
    }
});


showScore();
foodPosition();
gameInterval = setInterval(gameStart, speed);
window.addEventListener('keydown', snakeMovement);
