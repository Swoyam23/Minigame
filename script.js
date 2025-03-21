// Game variables
let score = 0;
let gameActive = false;

// Selecting elements
const character = document.getElementById("character");
const gameContainer = document.getElementById("game-container");
const message = document.getElementById("message");
const startButton = document.getElementById("start-btn");
const scoreDisplay = document.getElementById("score");

// Background music
const bgMusic = new Audio("music.mp3");
const catchSound = new Audio("catch.mp3"); // Load Snitch catching sound   
bgMusic.loop = true;

// Play music only after user interaction
function playMusic() {
    bgMusic.play().catch(error => console.log("Music play failed:", error));
}

// Start Game
function startGame() {
    score = 0;
    gameActive = true;
    message.style.display = "none";
    startButton.style.display = "none";
    scoreDisplay.innerText = "Score: 0";
    gameContainer.innerHTML = "";
    gameContainer.appendChild(character);
    playMusic();

    spawnSnitch();
}

// Spawn a Snitch at a random position
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
            scoreDisplay.innerText = "Score: " + score;
            snitch.classList.add("caught");
            setTimeout(() => snitch.remove(), 300);
            checkGameEnd();
        }
    });

    catchSound.play(); // Play Snitch catching sound
}

    setTimeout(spawnSnitch, 1000);
}

// Check if game should end
function checkGameEnd() {
    if (score >= 10) {
        gameActive = false;
        message.innerHTML = "You proved your magic! ⚡<br><br>I hope you forgive me.<br>Let's fly to Hogwarts together!";
        message.style.display = "block";

        document.querySelectorAll(".snitch").forEach(snitch => snitch.remove());
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }
}

// Character movement
document.addEventListener("keydown", function (event) {
    if (!gameActive) return;

    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left")) || 50;
    let top = parseInt(window.getComputedStyle(character).getPropertyValue("top")) || 50;

    if (event.key === "ArrowLeft") character.style.left = left - 20 + "px";
    if (event.key === "ArrowRight") character.style.left = left + 20 + "px";
    if (event.key === "ArrowUp") character.style.top = top - 20 + "px";
    if (event.key === "ArrowDown") character.style.top = top + 20 + "px";
});

// Start button
startButton.addEventListener("click", startGame);
document.addEventListener("click", playMusic);
