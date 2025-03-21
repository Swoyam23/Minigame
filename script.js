const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const message = document.getElementById('message');

let playerPosition = 175;
let heartsCaught = 0;
let gameActive = true;  // To stop the game after 10 catches

// Move the player left and right
document.addEventListener('keydown', (event) => {
    if (!gameActive) return;  // Stop movement when game ends

    if (event.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= 20;
    } else if (event.key === 'ArrowRight' && playerPosition < 350) {
        playerPosition += 20;
    }
    player.style.left = playerPosition + 'px';
});

// Function to create falling hearts (or Snitches)
function createHeart() {
    if (!gameActive) return;  // Stop creating hearts when game ends

    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 360 + 'px';
    heart.style.top = '0px';
    gameContainer.appendChild(heart);

    let fallInterval = setInterval(() => {
        if (!gameActive) {
            clearInterval(fallInterval);
            return;
        }

        let heartTop = parseInt(heart.style.top);
        if (heartTop < 480) {
            heart.style.top = (heartTop + 5) + 'px';
        } else {
            clearInterval(fallInterval);
            gameContainer.removeChild(heart);
        }

        // Collision detection
        let heartLeft = parseInt(heart.style.left);
        let playerLeft = parseInt(player.style.left);
        if (heartTop > 450 && Math.abs(heartLeft - playerLeft) < 40) {
            heartsCaught++;
            gameContainer.removeChild(heart);
            clearInterval(fallInterval);
            updateMessage();
        }
    }, 50);
}

// Update message and stop the game
function updateMessage() {
    if (heartsCaught >= 10) {
        gameActive = false;  // Stop the game
        document.querySelectorAll('.heart').forEach(heart => heart.remove());  // Remove all hearts
        message.innerHTML = "You've caught all the Snitches! I hope you can forgive me ❤";
        message.style.display = 'block'; // Show the message in the center
    }
}

// Start game when page loads
window.onload = () => {
    setInterval(createHeart, 1000);
};
