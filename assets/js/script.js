//The questions, options, answer array
const questions = [
    {
        question : "Which country has the capital city Vienna?",
        answers : [
            { text : "Sweden", correct : false},
            { text : "Italy", correct : false},
            { text : "Austria", correct : true},
        ]
    },
    {
        question : "Which of these countries is known for it's Christ the Redeemer statue?",
        answers : [
            { text : "France", correct : false},
            { text : "Argentina", correct : false},
            { text : "Brazil", correct : true}
        ]
    },
    {
        question : "In which of these countries is Niagra Falls located?",
        answers : [
            { text : "Australia", correct : false},
            { text : "USA", correct : false},
            { text : "Canada", correct : true}
        ]
    },
    {
        question : "Which of these countries is famous for its chocalate?",
        answers : [
            { text : "Australia", correct : false},
            { text : "Austria", correct : false},
            { text : "Switzerland", correct : true}
        ]
    },
    {
        question : "Which of these countries have the capital city of Copenhagen?",
        answers : [
            { text : "Finland", correct : false},
            { text : "Denmark", correct : true},
            { text : "Canada", correct : false}
        ]
    },
    {
        question : "Which of these countries is known for it's Pyramids?",
        answers : [
            { text : "Egypt", correct : true},
            { text : "Yemen", correct : false},
            { text : "Morocco", correct : false}
        ]
    },
    {
        question : "In which of these countries does the traditional dish Paella come from?",
        answers : [
            { text : "Croatia", correct : false},
            { text : "Germany", correct : false},
            { text : "Spain", correct : true}
        ]
    },
    {
        question : "Which African country is located in the west coast of Africa?",
        answers : [
            { text : "Namibia", correct : false},
            { text : "Ghana", correct : true},
            { text : "Somalia", correct : false}
        ]
    },
    {
        question : "Which country is known for it's remarkably preserved ruins and it's archaeological museums?",
        answers : [
            { text : "Greece", correct : true},
            { text : "England", correct : false},
            { text : "Kosovo", correct : false}
        ]
    },
    {
        question : "Which of these countries has the capital city of Jakarta?",
        answers : [
            { text : "Thailand", correct : false},
            { text : "Indonesia", correct : true},
            { text : "Japan", correct : false}
        ]
    }  
];

// Variables
let homePage = document.getElementById('game-container');
let gameContainer = document.getElementById('gameplay-container');
let playButton = document.getElementById('game-button');
let homeButton = document.getElementById('home-button');
let restartButton = document.getElementById('play-again');
let correctDisplay = document.getElementById('score');
let incorrectDisplay = document.getElementById('incorrect');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answers-buttons-container');
const nextButton = document.getElementById('next-btn');

// Variables for tracking game progress
let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

// Adding event listeners to buttons to start game play or bring back to home screen
let buttons = document.getElementsByTagName("button");

/**
 * Event listener for the buttons, when first button(play button) is clicked the homePage Div is hidden and 
 * the game container(gameplay) display is blocked so the gameplay shows up.
 * Else if home button on footer is clicked it redirects user back to home page and
 * the game container(gameplay) is blocked again.
 */
for (let button of buttons) {
    button.addEventListener("click", function() {
        if (this.getAttribute("id") === "game-button"){
            homePage.style.display = "none";
            gameContainer.style.display = "block";
        } else if (this.getAttribute("id") === "home-button"){
            gameContainer.style.display = "none";
            homePage.style.display = "";
        } else if (this.getAttribute("id") === "play-again"){
            window.gameContainer.reload();
        }
    });
} 

/**
 * Function to start the quiz when the button is clicked
 * When starting the quiz the questions and scores will reset the currentQuestionIndex, score and
 * the correct and wrong answers display.
 * Then send you to the next function
 */
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

/**This function display the questions and option answer when gameplay is started.
 * First set of question and answers from the Questions array will be added.
 * Then depending on what question is displayed the question number will
 * show in this case if the currentQuestionIndex is 0(the first question) the question number will be 1 etc.
 * Then the text on the buttons for the choices in the quiz will go to answers in the array.
 * Then make the buttons clickable with click function.
 */
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '.' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("buttons");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
    });
}

/**This function will reset the previous question and answer */
function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

/**This function will check if your answer you clicked on is true or not
 * Whether you choose the correct or incorrect answer the background color
 * will change to green or red.
 * Then the correctAnswers and incorrectAnswers will increment when you choose right or wrong answer.
 * Then it will disable buttons from being clicked after you selected your answer and the next button will pop up.
 */
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
        correctAnswers++;
        correctDisplay.innerText = correctAnswers;
    } else{
        selectedBtn.classList.add("incorrect");
        incorrectAnswers++;
        incorrectDisplay.innerText = incorrectAnswers;
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
};

/**This function will send you to a new question when you click the next button.
 * Else if you've reached the end of the questions you will be sent to the showScore function to see your final score.
 */
function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

/**This function will show your final score when you finished the game and suggest you to play again */
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

/**This will send you to the next question and with handleNextButton function for new question.
 * Else if you finished the game it will send you to startQuiz function to restart the game.
 */
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz()
        correctDisplay.innerText = 0;
        incorrectDisplay.innerText = 0;
    }
});

startQuiz();



