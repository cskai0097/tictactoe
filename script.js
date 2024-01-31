let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", "", ""];
let score = [0, 0];

const gameBoard = document.getElementById("gameBoard");
const cells = document.querySelectorAll('.cell');
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restartButton");

cells.forEach(cell => {
    cell.addEventListener('click', cellClicked);
});

restartButton.addEventListener('click', restartGame);

function cellClicked(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer === "X" ? "blue" : "red");
    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
}

function handleResultValidation() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        alert(`Player ${currentPlayer === "X" ? "O" : "X"} Wins!`);
        gameActive = false;
        updateScore(currentPlayer === "X" ? "O" : "X");
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        alert("Draw!");
        gameActive = false;
        return;
    }
}

function updateScore(winner) {
    if (winner === "X") {
        score[0] += 1;
    } else {
        score[1] += 1;
    }
    scoreDisplay.textContent = `${score[0]}-${score[1]}`;
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("blue", "red");
    });
}

// Rest of the code...
