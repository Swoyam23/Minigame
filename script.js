const bgMusic = new Audio("music.mp3");
const catchSound = new Audio("catch.mp3");

let score = 0;
let gameActive = false;
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const gameMessage = document.getElementById("game-message");
const startButton = document.getElementById("start-btn");

document.addEventListener("click", () => {
    bgMusic.play().catch(err => console.log("Music play error:", err));
});

startButton.addEventListener("click", startGame);

function startGame() {
    gameActive = true;
    score = 0;
    scoreDisplay.innerText = "Snitches Caught: 0";
    gameMessage.style.display = "none";
    startButton.style.display = "none";
    spawnSnitch();
}

function spawnSnitch() {
    if (!gameActive) return;

    let snitch = document.createElement("img");
    snitch.src = "snitch.png";
    snitch.classList.add("snitch");
    snitch.style.left = Math.random() * 90 + "%";
    snitch.style.top = Math.random() * 90 + "%";
    gameContainer.appendChild(snitch);

    snitch.addEventListener("click", function () {
        if (gameActive) {
            score++;
            scoreDisplay.innerText = "Snitches Caught: " + score;
            snitch.classList.add("caught");
            catchSound.currentTime = 0;
            catchSound.play();
            setTimeout(() => snitch.remove(), 300);
            checkGameEnd();
        }
    });

    setTimeout(spawnSnitch, 1000);
}

function checkGameEnd() {
    if (score >= 10) {
        gameActive = false;
        gameMessage.innerText = "Congratulations! You caught 10 Snitches!";
        gameMessage.style.display = "block";
        startButton.style.display = "block";
    }
}
