let playerScore = 0
let computerScore = 0
let roundWinner = ""

//Create logic for game program
function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        roundWinner = "tie"
    }
    if (
        (playerSelection === "ROCK" && computerSelection === "SCISSORS") ||
        (playerSelection === "PAPER" && computerSelection === "ROCK") ||
        (playerSelection === "SCISSORS" && computerSelection === "PAPER")
    
    ) {
        playerScore ++
        roundWinner = "player"
    }

    if ( 
        (computerSelection === "ROCK" && playerSelection === "SCISSORS") ||
        (computerSelection === "PAPER" && playerSelection === "ROCK") ||
        (computerSelection === "SCISSORS" && playerSelection === "PAPER") 
    ) {
        computerScore ++
        roundWinner = "computer"
    }
    updateScoreMessage(roundWinner, playerSelection, computerSelection)
}

//Get random choice for computer
function getRandomChoice() {
    let randomNumber = Math.floor(Math.random() * 3)
    switch(randomNumber) {
        case 0:
            return "ROCK"
        case 1:
            return "PAPER"
        case 2:
            return "SCISSORS"    
    }
}

//Check if game is over
function isGameOver() {
    return playerScore === 5 || computerScore === 5
}

//User Interface 
const scoreInfo = document.getElementById("scoreInfo")
const scoreMessage = document.getElementById("scoreMessage")
const playerScorePara = document.getElementById("playerScore")
const computerScorePara = document.getElementById("computerScore")
const playerSign = document.getElementById("playerSign")
const computerSign = document.getElementById("computerSign")
const rockBtn = document.getElementById("rockBtn")
const paperBtn = document.getElementById("paperBtn")
const scissorsBtn = document.getElementById("scissorsBtn")
const endgameModal = document.getElementById("endgameModal")
const endgameMsg = document.getElementById("endgameMsg")
const overlay = document.getElementById("overlay")
const restartBtn = document.getElementById("restartBtn")

rockBtn.addEventListener("click", () => handleClick("ROCK"))
paperBtn.addEventListener("click", () => handleClick("PAPER"))
scissorsBtn.addEventListener("click", () => handleClick("SCISSORS"))
restartBtn.addEventListener("click", restartGame)
overlay.addEventListener("click", closeEndgameModal)

//Handle user input when clicking programs buttons

function handleClick(playerSelection) {
    if (isGameOver()) {
        openEndgameModal()
        return
    }

    const computerSelection = getRandomChoice() 
    playRound(playerSelection, computerSelection)
    updateChoices(playerSelection, computerSelection)
    updateScore()

    if (isGameOver()) {
        openEndgameModal()
        setFinalMessage()
    }
}

//Show user and computer choice in the outlay
function updateChoices(playerSelection, computerSelection) {
    switch (playerSelection) {
        case "ROCK":
            playerSign.textContent = "🌑"
            break
        case "PAPER": 
            playerSign.textContent = "📃"
            break
        case "SCISSORS":
            playerSign.textContent = "✂"
            break
    }
    switch (computerSelection) {
        case "Rock":
            computerSign.textContent = "🌑"
            break
        case "PAPER":
            computerSign.textContent = "📃"
            break
        case "SCISSORS":
            computerSign.textContent = "✂"
            break
    }
}

//Update scores in the user interface
function updateScore() {
    if (roundWinner === "tie") {
        scoreInfo.textContent = "It's a Tie 😪"
    } else if (roundWinner === "player") {
        scoreInfo.textContent = "You WON!!!"
    } else if (roundWinner === "computer") {
        scoreInfo.textContent = "You lose"
    }
    
    playerScorePara.textContent = `Player: ${playerScore}`
    computerScorePara.textContent = `Computer: ${computerScore}`
}

//Update score message that indicates what choice beats what and outputs winner 
function updateScoreMessage(winner, playerSelection, computerSelection) {
    if (winner === "player") {
      scoreMessage.textContent = `${capitalizeFirstLetter(
         playerSelection
    )} defeats ${computerSelection.toLowerCase()}`
    return
    }
    if (winner === "computer") {
        scoreMessage.textContent = `${capitalizeFirstLetter(
            playerSelection
        )} is defeated by ${computerSelection.toLowerCase()}`
    }
}
//Capitalize the first letter and convert any other text to Lower Case
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
  //Prompt a message to the user after game is complete
  function openEndgameModal() {
    endgameModal.classList.add('active')
    overlay.classList.add('active')
  }
  //Allow user to exit the pop up message
  function closeEndgameModal() {
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
  }
  //Indicate to user whether they won or lost
  function setFinalMessage() {
    return playerScore > computerScore
      ? (endgameMsg.textContent = 'You won!')
      : (endgameMsg.textContent = 'You lost...')
  }
  //Restart the game once the pop up window is closed
  function restartGame() {
    playerScore = 0
    computerScore = 0
    scoreInfo.textContent = 'Choose your weapon'
    scoreMessage.textContent = 'First to score 5 points wins the game'
    playerScorePara.textContent = 'Player: 0'
    computerScorePara.textContent = 'Computer: 0'
    playerSign.textContent = '🤔'
    computerSign.textContent = '🤖'
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
  }



