//Random rock paper scissor function for computer

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getComputerChoice() {
  let powers = ["rock", "paper", "scissors"];
  let max = 3;

  let choice = powers[getRandomInt(max)];

  return choice;
}

//Round function that compares computer and player choice
function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();

  if (playerSelection == computerSelection) {
    return "It's a draw!";
  }

  if (playerSelection == "scissors") {
    if (computerSelection == "paper") {
      return "You win! Scissors beats paper.";
    } else {
      return "You loose! Rock beats scissors.";
    }
  }

  if (playerSelection == "paper") {
    if (computerSelection == "rock") {
      return "You win! Paper beats rock.";
    } else {
      return "You loose! Scissors beats paper.";
    }
  }

  if (playerSelection == "rock") {
    if (computerSelection == "scissors") {
      return "You win! Rock beats scissors.";
    } else {
      return "You loose! Paper beats rock.";
    }
  }
}

function playAgain() {
  if (confirm("Play again?")) {
    game();
  } else {
    alert("Ok don't play");
  }
}

function displaySelection(selection, challenger) {
  const choice = document.createTextNode(`${selection}`);
  let displaySelection;
  if (challenger === "computer") {
    displaySelection = document.getElementById("computer-selection");
  } else {
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

function displayRoundResult(result){
  const displayResult = document.getElementById("result")

  displayResult.textContent = result;
}

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    clearSelectionText();

    const playerSelection = button.textContent;
    displaySelection(playerSelection, "player");

    const computerSelection = getComputerChoice();
    displaySelection(computerSelection, "computer");

    const result = playRound(playerSelection, computerSelection);

    displayRoundResult(result);
  });
});

// //Create a function that runs 5 rounds of the game till there's a winner
// function game() {
//   let rounds = 5;
//   let humanWins = 0;
//   let pcWins = 0;

//   for (let i = 0; i < rounds; i++) {
//     let playerSelection = prompt("What is your choice?");
//     let computerSelection = getComputerChoice();

//     var result = playRound(playerSelection, computerSelection);

//     console.log(result);

//     if (result.includes("You win")) {
//       humanWins++;
//     }
//     if (result.includes("It's a draw")) {
//       i--;
//     }
//     if (result.includes("You loose!")) {
//       pcWins++;
//     }
//   }

//   if (humanWins > pcWins) {
//     alert("You conquered the AI!!!!");

//     playAgain();

//   } else {
//     alert("The AI revolution has begun");

//     playAgain();
//   }
// }

// console.log(game());
