// Select elements
const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const message = document.getElementById('message');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const startBtn = document.getElementById('start-btn');

let gameActive = false;
let score = 0;

// Load background music
let bgMusic = new Audio('sounds/music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.5;

// Load Snitch catch sound effect
let snitchSound = new Audio('sounds/snitch-catch.mp3');
snitchSound.volume = 1.0;

// 🎵 Start game & Play music after user clicks button
startBtn.addEventListener("click", () => {
    startBtn.style.display = "none"; // Hide button
    gameActive = true;
    
    // Play background music after user interaction
    bgMusic.play().catch(error => {
        console.log("Music play failed: ", error);
    });

    // Start creating Snitches
    setInterval(createSnitch, 1500);
});

// Move player (Harry Potter)
function movePlayer(direction) {
    let left = parseInt(window.getComputedStyle(player).getPropertyValue('left'));

    if (direction === 'left' && left > 20) {
        player.style.left = (left - 30) + 'px';
    }
    if (direction === 'right' && left < 320) {
        player.style.left = (left + 30) + 'px';
    }
}

// Keyboard Controls (Arrow Keys + WASD)
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "a") movePlayer("left");
    if (event.key === "ArrowRight" || event.key === "d") movePlayer("right");
});

// Mobile Controls
leftBtn.addEventListener("touchstart", () => movePlayer("left"));
rightBtn.addEventListener("touchstart", () => movePlayer("right"));

// Create Snitches (Golden Snitch falling)
function createSnitch() {
    if (!gameActive) return;

    let snitch = document.createElement("div");
    snitch.classList.add("heart");
    snitch.style.left = Math.random() * 350 + "px"; 
    snitch.style.top = "0px";
    gameContainer.appendChild(snitch);

    let fallInterval = setInterval(() => {
        if (!gameActive) {
            clearInterval(fallInterval);
            return;
        }

        let snitchTop = parseInt(snitch.style.top);
        let playerLeft = parseInt(player.style.left);

        if (snitchTop < 480) {
            snitch.style.top = (snitchTop + 7) + "px";  
        } else {
            clearInterval(fallInterval);
            gameContainer.removeChild(snitch);
        }

        // Collision detection
        if (snitchTop > 420 && Math.abs(playerLeft - parseInt(snitch.style.left)) < 40) {
            collectSnitch(snitch);
            clearInterval(fallInterval);
        }
    }, 50);
}

// Snitch collected animation
function collectSnitch(snitch) {
    snitch.classList.add("caught");
    snitchSound.play();
    setTimeout(() => gameContainer.removeChild(snitch), 150);
    
    score++;
    if (score === 10) {
        endGame();
    }
}

if (score >= 10) {
    gameActive = false;
    message.innerHTML = "You proved your magic! I hope you forgive me. ⚡<br><br>Let's fly to Hogwarts together!";
    message.style.display = "block"; // Ensure message is visible
}

// End game after collecting 10 Snitches
function endGame() {
    gameActive = false;
    message.style.display = "block";
    message.innerHTML = "you proved you magic! I hope you forgive me. <br><br>lets fly to Hogwarts together!":
    bgMusic.pause();
}
