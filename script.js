let userScore = parseInt(localStorage.getItem('userScore')) || 0;
let compScore = parseInt(localStorage.getItem('compScore')) || 0;

const choices = document.querySelectorAll(".choice");
const message = document.getElementById('msg');
const userScorePara = document.getElementById('user-score');
const compScorePara = document.getElementById('computer-score');

// Load the previous scores and message from localStorage
userScorePara.innerText = userScore;
compScorePara.innerText = compScore;

// Function to generate computer's choice
function ZenComputerChoice() {
    let options = ['rock', 'paper', 'scissor'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

// Function to handle a draw scenario
function drowGameFunc() {
    message.innerText = 'Match Draw, Try Again!!!';
    message.style.backgroundColor = 'yellow';
    message.style.color = 'black';
}

// Function to show the winner and update the scores
function showWinner(userWin, userChoice, computerChoice) {
    if (userWin) {
        userScore++; // Increment user score
        userScorePara.innerText = userScore;
        message.innerText = `You Win, Your ${userChoice} beats ${computerChoice}`;
        message.classList.remove('warning-animation');
    } else {
        compScore++; // Increment computer score
        compScorePara.innerText = compScore;
        message.innerText = `You Lose, ${computerChoice} beats ${userChoice}`;
        message.classList.add('warning-animation');
    }

    // Save the scores to localStorage
    localStorage.setItem('userScore', userScore);
    localStorage.setItem('compScore', compScore);
}

// Function to play the game
function playGame(userChoice) {
    console.log('User choice is', userChoice);

    // Generate computer choice
    const computerChoice = ZenComputerChoice();
    console.log('Computer choice is:', computerChoice);

    if (computerChoice === userChoice) {
        drowGameFunc(); // Handle draw
    } else {
        let userWin = true;
        if (userChoice === 'rock') {
            
            userWin = computerChoice === 'paper' ? false : true;
        } else if (userChoice === 'paper') {
            userWin = computerChoice === 'scissor' ? false : true;
        } else {
            userWin = computerChoice === 'rock' ? false : true;
        }
        showWinner(userWin, userChoice, computerChoice); // Show result
    }
}

// Looping through choices for tracking user clicks
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id"); // Get the user's choice
        playGame(userChoice); // Start the game
    });
});
