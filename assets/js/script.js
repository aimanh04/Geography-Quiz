const quizQuestions = [
    {
        question : "Which country has the capital city Vienna?",
        answers : [
            { text : "Sweden", correct : false},
            { text : "Italy", correct : false},
            { text : "Austria", correct : true}
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
            { text : "Nigeria", correct : false},
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
const questions = document.getElementById('question');
const answerButtons = document.getElementById('answers-buttons-container');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

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

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = quizQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questions.innerHTML = questionNo + '.' + currentQuestion.question;

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

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
    } else{
        selectedBtn.classList.add("incorrect");
    }
}

startQuiz();
