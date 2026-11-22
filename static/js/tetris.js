"use strict";

const COLS = 10;
const ROWS = 20;
const BLOCK = 30;

// Cada matriz descreve o formato de uma peça.
const SHAPES = [
  { color: "#4ddcff", matrix: [[1, 1, 1, 1]] },                 // I
  { color: "#557cff", matrix: [[1, 0, 0], [1, 1, 1]] },       // J
  { color: "#ffad4d", matrix: [[0, 0, 1], [1, 1, 1]] },       // L
  { color: "#ffe05b", matrix: [[1, 1], [1, 1]] },             // O
  { color: "#57e39a", matrix: [[0, 1, 1], [1, 1, 0]] },       // S
  { color: "#b16cff", matrix: [[0, 1, 0], [1, 1, 1]] },       // T
  { color: "#ff668a", matrix: [[1, 1, 0], [0, 1, 1]] }       // Z
];

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const nextCanvas = document.getElementById("next-canvas");
const nextCtx = nextCanvas.getContext("2d");

const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");
const linesElement = document.getElementById("lines");

const overlay = document.getElementById("game-overlay");
const overlayKicker = document.getElementById("overlay-kicker");
const overlayTitle = document.getElementById("overlay-title");
const overlayMessage = document.getElementById("overlay-message");

const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const restartButton = document.getElementById("restart-button");

let board;
let piece;
let nextShape;
let score = 0;
let lines = 0;
let level = 1;
let running = false;
let paused = false;
let gameOver = false;
let dropCounter = 0;
let lastTime = 0;
let animationId = null;

// Cria um tabuleiro vazio.
function createBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

// Escolhe uma peça e copia a matriz para não alterar os formatos originais.
function randomShape() {
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];

  return {
    color: shape.color,
    matrix: shape.matrix.map(row => row.slice())
  };
}

// Usa a peça seguinte e prepara outra para a pré-visualização.
function createPiece() {
  if (!nextShape) {
    nextShape = randomShape();
  }

  const shape = nextShape;
  nextShape = randomShape();

  return {
    color: shape.color,
    matrix: shape.matrix.map(row => row.slice()),
    x: Math.floor((COLS - shape.matrix[0].length) / 2),
    y: 0
  };
}

// Verifica colisões com paredes, fundo e peças que já estão no tabuleiro.
function collides(testPiece) {
  for (let y = 0; y < testPiece.matrix.length; y++) {
    for (let x = 0; x < testPiece.matrix[y].length; x++) {
      if (!testPiece.matrix[y][x]) {
        continue;
      }

      const boardX = testPiece.x + x;
      const boardY = testPiece.y + y;

      if (
        boardX < 0 ||
        boardX >= COLS ||
        boardY >= ROWS ||
        (boardY >= 0 && board[boardY][boardX] !== 0)
      ) {
        return true;
      }
    }
  }

  return false;
}

function updateStats() {
  scoreElement.textContent = score;
  levelElement.textContent = level;
  linesElement.textContent = lines;
}

// Desenha uma célula colorida no tabuleiro.
function drawCell(x, y, color) {
  const padding = 2;

  ctx.fillStyle = color;
  ctx.fillRect(
    x * BLOCK + padding,
    y * BLOCK + padding,
    BLOCK - padding * 2,
    BLOCK - padding * 2
  );

  ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
  ctx.fillRect(
    x * BLOCK + padding,
    y * BLOCK + padding,
    BLOCK - padding * 2,
    3
  );
}

// Desenha a próxima peça no painel.
function drawNextPiece() {
  nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);

  if (!nextShape) {
    return;
  }

  const cellSize = 20;
  const matrix = nextShape.matrix;
  const width = matrix[0].length * cellSize;
  const height = matrix.length * cellSize;
  const offsetX = (nextCanvas.width - width) / 2;
  const offsetY = (nextCanvas.height - height) / 2;

  matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (!cell) {
        return;
      }

      const px = offsetX + x * cellSize;
      const py = offsetY + y * cellSize;

      nextCtx.fillStyle = nextShape.color;
      nextCtx.fillRect(px + 2, py + 2, cellSize - 4, cellSize - 4);

      nextCtx.fillStyle = "rgba(255, 255, 255, 0.18)";
      nextCtx.fillRect(px + 2, py + 2, cellSize - 4, 3);
    });
  });
}

// Desenha a grelha, as peças fixas e a peça que está a cair.
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(165, 170, 210, 0.09)";
  ctx.lineWidth = 1;

  for (let x = 0; x <= COLS; x++) {
    ctx.beginPath();
    ctx.moveTo(x * BLOCK, 0);
    ctx.lineTo(x * BLOCK, ROWS * BLOCK);
    ctx.stroke();
  }

  for (let y = 0; y <= ROWS; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * BLOCK);
    ctx.lineTo(COLS * BLOCK, y * BLOCK);
    ctx.stroke();
  }

  if (board) {
    board.forEach((row, y) => {
      row.forEach((color, x) => {
        if (color) {
          drawCell(x, y, color);
        }
      });
    });
  }

  if (piece) {
    piece.matrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          drawCell(piece.x + x, piece.y + y, piece.color);
        }
      });
    });
  }

  drawNextPiece();
}

function showOverlay(kicker, title, message) {
  overlayKicker.textContent = kicker;
  overlayTitle.textContent = title;
  overlayMessage.textContent = message;
  overlay.classList.remove("hidden");
}

function hideOverlay() {
  overlay.classList.add("hidden");
}

// Remove linhas completas e atualiza pontuação, linhas e nível.
function clearFullLines() {
  let cleared = 0;

  for (let y = ROWS - 1; y >= 0; y--) {
    if (board[y].every(cell => cell !== 0)) {
      board.splice(y, 1);
      board.unshift(Array(COLS).fill(0));
      cleared++;

      // Volta a verificar esta linha porque a linha de cima desceu.
      y++;
    }
  }

  if (cleared > 0) {
    const pointsByLines = [0, 100, 300, 500, 800];
    score += (pointsByLines[cleared] || cleared * 200) * level;
    lines += cleared;
    level = Math.floor(lines / 10) + 1;
    updateStats();
  }
}

// Fixa a peça no tabuleiro, limpa linhas e cria a próxima.
function lockPiece() {
  piece.matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (!cell) {
        return;
      }

      const boardY = piece.y + y;
      const boardX = piece.x + x;

      if (boardY >= 0) {
        board[boardY][boardX] = piece.color;
      }
    });
  });

  clearFullLines();
  piece = createPiece();

  if (collides(piece)) {
    endGame();
  }
}

// Move a peça horizontalmente se não houver colisão.
function movePiece(direction) {
  if (!running || paused || gameOver) {
    return;
  }

  piece.x += direction;

  if (collides(piece)) {
    piece.x -= direction;
  }

  draw();
}

// Desce a peça uma linha ou fixa-a se encontrar um obstáculo.
function dropPiece() {
  if (!running || paused || gameOver) {
    return;
  }

  piece.y++;

  if (collides(piece)) {
    piece.y--;
    lockPiece();
  }

  dropCounter = 0;
  draw();
}

// Roda a matriz da peça 90 graus.
function rotateMatrix(matrix) {
  return matrix[0].map((_, column) =>
    matrix.map(row => row[column]).reverse()
  );
}

// Se a rotação tocar numa parede, tenta ajustar a peça para os lados.
function rotatePiece() {
  if (!running || paused || gameOver) {
    return;
  }

  const oldMatrix = piece.matrix;
  const oldX = piece.x;
  const rotated = rotateMatrix(oldMatrix);

  for (const offset of [0, -1, 1, -2, 2]) {
    piece.matrix = rotated;
    piece.x = oldX + offset;

    if (!collides(piece)) {
      draw();
      return;
    }
  }

  piece.matrix = oldMatrix;
  piece.x = oldX;
  draw();
}

// Desce a peça rapidamente até encontrar uma colisão.
function hardDrop() {
  if (!running || paused || gameOver) {
    return;
  }

  let distance = 0;

  while (true) {
    piece.y++;

    if (collides(piece)) {
      piece.y--;
      break;
    }

    distance++;
  }

  score += distance * 2;
  lockPiece();
  updateStats();
  draw();
}

// Inicia ou reinicia uma partida.
function startGame() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
  }

  board = createBoard();
  nextShape = randomShape();
  piece = createPiece();

  score = 0;
  lines = 0;
  level = 1;
  running = true;
  paused = false;
  gameOver = false;
  dropCounter = 0;
  lastTime = 0;

  updateStats();
  hideOverlay();

  startButton.textContent = "Jogo em curso";
  startButton.disabled = true;
  pauseButton.disabled = false;
  pauseButton.textContent = "Pausar";

  draw();
  animationId = requestAnimationFrame(update);
}

// Pausa ou retoma o jogo.
function togglePause() {
  if (!running || gameOver) {
    return;
  }

  paused = !paused;
  pauseButton.textContent = paused ? "Continuar" : "Pausar";

  if (paused) {
    showOverlay(
      "PAUSA",
      "Jogo pausado",
      "Carrega em “Continuar” ou prime P."
    );
  } else {
    hideOverlay();
    lastTime = 0;
    animationId = requestAnimationFrame(update);
  }
}

// Termina a partida quando não há espaço para uma nova peça.
function endGame() {
  running = false;
  paused = false;
  gameOver = true;

  startButton.disabled = false;
  startButton.textContent = "Jogar novamente";
  pauseButton.disabled = true;

  showOverlay("GAME OVER", "Fim de jogo", `Pontuação final: ${score}`);
}

// Ciclo principal: controla a queda automática e a velocidade por nível.
function update(time = 0) {
  if (!running || paused) {
    return;
  }

  const delta = time - lastTime;
  lastTime = time;
  dropCounter += delta;

  const dropInterval = Math.max(100, 800 - (level - 1) * 65);

  if (dropCounter > dropInterval) {
    dropPiece();
  }

  draw();

  if (running && !paused) {
    animationId = requestAnimationFrame(update);
  }
}

// Controlos do teclado.
document.addEventListener("keydown", event => {
  const gameKeys = [
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    " "
  ];

  if (gameKeys.includes(event.key)) {
    event.preventDefault();
  }

  if (event.key.toLowerCase() === "p") {
    togglePause();
    return;
  }

  if (!running || paused || gameOver) {
    return;
  }

  switch (event.key) {
    case "ArrowLeft":
      movePiece(-1);
      break;

    case "ArrowRight":
      movePiece(1);
      break;

    case "ArrowUp":
      rotatePiece();
      break;

    case "ArrowDown":
      dropPiece();

      if (running && !paused) {
        score += 1;
        updateStats();
      }
      break;

    case " ":
      hardDrop();
      break;
  }
});

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", togglePause);

// Botões para rato e ecrãs táteis.
document.querySelectorAll(".touch-controls button").forEach(button => {
  button.addEventListener("click", () => {
    switch (button.dataset.action) {
      case "left":
        movePiece(-1);
        break;

      case "right":
        movePiece(1);
        break;

      case "rotate":
        rotatePiece();
        break;

      case "down":
        dropPiece();

        if (running && !paused) {
          score += 1;
          updateStats();
        }
        break;

      case "drop":
        hardDrop();
        break;
    }
  });
});

// Desenha o tabuleiro vazio e uma pré-visualização antes de começar.
board = createBoard();
nextShape = randomShape();
piece = null;
draw();