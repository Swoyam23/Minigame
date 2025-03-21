@import url('https://fonts.cdnfonts.com/css/harry-potter');

body {
    text-align: center;
    background-image: url('background.jpg'); /* Add a magical HP background */
    background-size: cover;
    background-position: center;
    font-family: 'Harry Potter', sans-serif;
    color: #ffd700;
}

h1 {
    font-size: 30px;
    text-shadow: 3px 3px 5px black;
}

#game-container {
    width: 400px;
    height: 500px;
    border: 2px solid #ffd700;
    margin: auto;
    position: relative;
    background: rgba(0, 0, 0, 0.8);
    overflow: hidden;
}

#player {
    width: 80px;  /* Increased size */
    height: 80px;
    background-image: url('harry-potter.png'); /* Harry Potter character */
    background-size: cover;
    position: absolute;
    bottom: 10px;
    left: 160px;
}

.heart {
    width: 60px;  /* Larger size */
    height: 60px;
    background-image: url('snitch.png'); /* Golden Snitch */
    background-size: cover;
    position: absolute;
}

#message {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 28px;
    font-weight: bold;
    color: #ffcc00;
    background: rgba(0, 0, 0, 0.9);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    text-shadow: 2px 2px 5px black;
}

#controls {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

#controls button {
    width: 70px;
    height: 70px;
    font-size: 28px;
    margin: 5px;
    border: none;
    background-color: #6a1b9a;
    color: white;
    border-radius: 50%;
    cursor: pointer;
}

#controls button:active {
    background-color: #4a148c;
}
