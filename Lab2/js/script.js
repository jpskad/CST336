// Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

// Global variables
let randomNumber;
let attempts = 0;
let wins = 0;  
let losses = 0;

initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("Random number:" + randomNumber);
    attempts = 0;

    // UI Reset
    document.querySelector("#resetBtn").style.display = "none";
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus();
    playerGuess.value = "";

    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    document.querySelector("#guesses").textContent = "";
    
    // Ensure scoreboard is visible immediately
    updateScoreboard();
}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    let guessDisplay = document.querySelector("#guesses");
    let guess = Number(document.querySelector("#playerGuess").value);

    // Validation
    if (guess < 1 || guess > 99 || isNaN(guess)) {
        feedback.textContent = "Error: Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    attempts++;
    guessDisplay.textContent += guess + " ";

    if (guess == randomNumber) {
        feedback.textContent = "Congratulations! You guessed it!";
        feedback.style.color = "darkgreen";
        wins++; // Increment wins
        gameOver();
    } else {
        if (attempts == 7) {
            // Updated to show the random number in red per rubric
            feedback.textContent = `You Lost! The number was ${randomNumber}.`;
            feedback.style.color = "red";
            losses++;
            gameOver();
        } else {
            feedback.style.color = "orange";
            if (guess > randomNumber) {
                feedback.textContent = "Your guess was too high!";
            } else {
                feedback.textContent = "Your guess was too low!";
            }
        }
    }
    updateScoreboard();
}

function gameOver() {
    document.querySelector("#guessBtn").style.display = "none";
    document.querySelector("#resetBtn").style.display = "inline";
}

// Function to handle the win/loss display requirement
function updateScoreboard() {
    let scoreboard = document.querySelector("#scoreboard");
    
    // If the scoreboard div doesn't exist in HTML yet, create it
    if (!scoreboard) {
        scoreboard = document.createElement("div");
        scoreboard.id = "scoreboard";
        document.querySelector("#main").appendChild(scoreboard);
    }
    
    scoreboard.innerHTML = `<br><strong>Games Won: ${wins} | Games Lost: ${losses}</strong>`;
}
