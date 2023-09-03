const rounds = 5;
let humanWins = 0;
let pcWins = 0;
const selectButtons = document.querySelectorAll(".select-button");

//Random rock paper scissor function for computer
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getComputerChoice() {
  let powers = ["Rock", "Paper", "Scissors"];
  let max = 3;

  let choice = powers[getRandomInt(max)];

  return choice;
}

//Round function that compares computer and player choice
function playRound(playerSelection, computerSelection) {
  if (playerSelection == computerSelection) {
    return "It's a draw!";
  }

  if (playerSelection == "Scissors") {
    if (computerSelection == "Paper") {
      return "You win! Scissors beats paper.";
    } else {
      return "You loose! Rock beats scissors.";
    }
  }

  if (playerSelection == "Paper") {
    if (computerSelection == "Rock") {
      return "You win! Paper beats rock.";
    } else {
      return "You loose! Scissors beats paper.";
    }
  }

  if (playerSelection == "Rock") {
    if (computerSelection == "Scissors") {
      return "You win! Rock beats scissors.";
    } else {
      return "You loose! Paper beats rock.";
    }
  }
}

function displaySelection(selection, challenger) {
  const choice = document.createTextNode(`${selection}`);
  let displaySelection;
  if (challenger === "computer") {
    displaySelection = document.getElementById("computer-selection");
  }
  if (challenger === "player") {
    displaySelection = document.getElementById("player-selection");
  }

  displaySelection.appendChild(choice);
}

function clearSelectionText() {
  let computerSelection = document.getElementById("computer-selection");
  let playerSelection = document.getElementById("player-selection");

  if (computerSelection.childNodes.length > 1) {
    computerSelection.removeChild(computerSelection.lastChild);
    playerSelection.removeChild(playerSelection.lastChild);
  }
}

function addScore(challenger, wins) {
  if (!challenger) {
    let playerScore = document.getElementById("player");
    let computerScore = document.getElementById("computer");

    playerScore.textContent = "Player: 0";
    computerScore.textContent = "Computer: 0";
  } else {
    if (challenger === "player") {
      let playerScore = document.getElementById("player");

      playerScore.textContent = "Player: " + wins;
    }
    if (challenger === "computer") {
      let computerScore = document.getElementById("computer");
      computerScore.textContent = "Computer: " + wins;
    }
  }
}

function displayRoundResult(result) {
  const displayResult = document.getElementById("result");

  displayResult.textContent = result;
}

function scoreCounter(roundResult) {
  if (roundResult.includes("You win")) {
    humanWins++;
    addScore("player", humanWins);
  }
  if (roundResult.includes("You loose!")) {
    pcWins++;
    addScore("computer", pcWins);
  }
}

function disableButtons(buttons) {
  buttons.forEach((button) => {
    button.disabled = true;
  });
}
function enableButtons(buttons) {
  buttons.forEach((button) => {
    button.disabled = false;
  });
}

function endGame() {
  if (humanWins > pcWins) displayRoundResult("You conquered the AI!!!!");
  displayRoundResult("The AI revolution has begun");
}

function createPlayAgainButton() {
  const resultDiv = document.getElementById("result");

  const button = document.createElement("button");

  button.setAttribute("id", "play-again-button");

  const buttonText = document.createTextNode("Play again!");

  button.appendChild(buttonText);

  resultDiv.appendChild(button);
}

function pressPlayAgainButton() {
  const resultDiv = document.getElementById("result");
  const button = document.getElementById("play-again-button");

  button.addEventListener("click", () => {
    humanWins = 0;
    pcWins = 0;
    addScore();
    resultDiv.replaceChildren();
    clearSelectionText();
    enableButtons(selectButtons);
  });
}

selectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    clearSelectionText();

    const playerSelection = button.textContent;
    displaySelection(playerSelection, "player");

    const computerSelection = getComputerChoice();
    displaySelection(computerSelection, "computer");

    const result = playRound(playerSelection, computerSelection);

    scoreCounter(result);

    displayRoundResult(result);

    if (humanWins === 3 || pcWins === 3) {
      disableButtons(selectButtons);
      endGame();
      createPlayAgainButton();
      pressPlayAgainButton();
    }
  });
});
