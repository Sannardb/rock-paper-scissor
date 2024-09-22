let playerWins = 0;
let computerWins = 0;
let gameActive = true;

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function rockFunction() {
  if (gameActive) playRound("rock");
}

function paperFunction() {
  if (gameActive) playRound("paper");
}

function scissorsFunction() {
  if (gameActive) playRound("scissors");
}

function animateIcons(playerChoice, computerChoice) {
  const scaleUp = 1.5;
  const scaleDown = 1;

  const playerIcon = document
    .getElementById("playerChoiceImage")
    .querySelector("img");
  gsap.fromTo(
    playerIcon,
    { scale: scaleDown },
    { scale: scaleUp, duration: 0.5, yoyo: true, repeat: 1 }
  );

  const computerIcon = document
    .getElementById("computerChoiceImage")
    .querySelector("img");
  gsap.fromTo(
    computerIcon,
    { scale: scaleDown },
    { scale: scaleUp, duration: 0.5, yoyo: true, repeat: 1 }
  );
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  console.log("You chose " + playerChoice + "!");
  console.log("Computer chose " + computerChoice + "!");

  document.getElementById(
    "playerChoiceImage"
  ).innerHTML = `<img class="icon" src="${playerChoice}.png" alt="${playerChoice}" style="width: 50px;">`;
  document.getElementById(
    "computerChoiceImage"
  ).innerHTML = `<img class="icon" src="${computerChoice}.png" alt="${computerChoice}" style="width: 50px;">`;

  let result = "";
  switch (playerChoice) {
    case "rock":
      if (computerChoice === "scissors") {
        result = "You win! Rock crushes scissors!";
        playerWins++;
      } else if (computerChoice === "paper") {
        result = "You lose! Paper covers rock!";
        computerWins++;
      } else {
        result = "It's a tie!";
      }
      break;
    case "paper":
      if (computerChoice === "scissors") {
        result = "You lose! Scissors cut paper!";
        computerWins++;
      } else if (computerChoice === "rock") {
        result = "You win! Paper covers rock!";
        playerWins++;
      } else {
        result = "It's a tie!";
      }
      break;
    case "scissors":
      if (computerChoice === "rock") {
        result = "You lose! Rock crushes scissors!";
        computerWins++;
      } else if (computerChoice === "paper") {
        result = "You win! Scissors cut paper!";
        playerWins++;
      } else {
        result = "It's a tie!";
      }
      break;
    default:
      result = "Invalid choice!";
  }

  if (result) {
    document.getElementById("game-result").textContent = "Result: " + result;
  }

  document.getElementById("player-score").textContent =
    "Player Wins: " + playerWins;
  document.getElementById("computer-score").textContent =
    "Computer Wins: " + computerWins;

  // Check if someone has won the best of 3
  if (playerWins >= 3 || computerWins >= 3) {
    gameActive = false;
    displayGameOver(playerWins >= 3);
  }

  animateIcons(playerChoice, computerChoice);
}

function displayGameOver(playerWon) {
  const message = playerWon ? "You win the game!" : "Computer wins the game!";
  document.getElementById("game-result").textContent = message;

  document.getElementById(
    "player-final-score"
  ).textContent = `Final Player Score: ${playerWins}`;
  document.getElementById(
    "computer-final-score"
  ).textContent = `Final Computer Score: ${computerWins}`;

  if (!document.getElementById("reset-button")) {
    const resetButton = document.createElement("button");
    resetButton.id = "reset-button";
    resetButton.textContent = "Play Again";
    resetButton.onclick = resetGame;
    document.body.appendChild(resetButton);
  }
}

function resetGame() {
  playerWins = 0;
  computerWins = 0;
  gameActive = true; // Restart the game
  document.getElementById("player-score").textContent =
    "Player Wins: " + playerWins;
  document.getElementById("computer-score").textContent =
    "Computer Wins: " + computerWins;
  document.getElementById("game-result").textContent = ""; // Clear result

  document.getElementById("player-final-score").textContent = "";
  document.getElementById("computer-final-score").textContent = "";

  const resetButton = document.getElementById("reset-button");
  if (resetButton) {
    resetButton.remove();
  }
}
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");

rockButton.addEventListener("click", rockFunction);
paperButton.addEventListener("click", paperFunction);
scissorsButton.addEventListener("click", scissorsFunction);
