let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let score = { X: 0, O: 0 }; // Objeto para almacenar el puntaje de ambos jugadores
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6]             // Diagonales
];

function startGame() {
    const username = document.getElementById("username").value;
    if (username) {
        document.getElementById("login-screen").style.display = 'none';
        document.getElementById("game-screen").style.display = 'block';
        updateScoreDisplay();
    } else {
        alert("Please enter your name to start the game.");
    }
}

function makeMove(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        document.getElementsByClassName("cell")[index].innerText = currentPlayer;
        if (checkWin()) {
            document.getElementById("result").innerText = `Player ${currentPlayer} wins!`;
            score[currentPlayer]++; // Incrementar el puntaje del jugador ganador
            updateScoreDisplay(); // Actualizar la visualización del puntaje
            gameActive = false;
        } else if (board.includes("")) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (currentPlayer === "O") {
                makeAIMove();
            }
        } else {
            document.getElementById("result").innerText = "It's a draw!";
            gameActive = false;
        }
    }
}

function makeAIMove() {
    let emptyCells = board.map((val, index) => val === "" ? index : null).filter(val => val !== null);
    if (emptyCells.length > 0) {
        let aiMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[aiMove] = currentPlayer;
        document.getElementsByClassName("cell")[aiMove].innerText = currentPlayer;
        if (checkWin()) {
            document.getElementById("result").innerText = `Player ${currentPlayer} wins!`;
            score[currentPlayer]++; // Incrementar el puntaje del jugador ganador
            updateScoreDisplay(); // Actualizar la visualización del puntaje
            gameActive = false;
        } else {
            currentPlayer = "X";
        }
    }
}

function checkWin() {
    return winConditions.some(condition => 
        condition.every(index => board[index] === currentPlayer)
    );
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.querySelectorAll(".cell").forEach(cell => cell.innerText = "");
    document.getElementById("result").innerText = "";
}

// Función para actualizar la visualización del puntaje
function updateScoreDisplay() {
    document.getElementById("scoreX").innerText = `Player X: ${score.X}`;
    document.getElementById("scoreO").innerText = `Player O: ${score.O}`;
}
