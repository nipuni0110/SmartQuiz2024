const questions = [
    {
        question:   "What is the capital of France?",
        answers: [
            {text: "Berlin", correct: false},
            {text: "Madrid", correct: false},
            {text: "Paris", correct: true},
            {text: "Rome", correct: false},
        ]
    },
    {
        question:   'Who wrote "Romeo and Juliet"?',
        answers: [
            {text: "Charles Dickens", correct: false},
            {text: "William Shakespeare", correct: true},
            {text: "Mark Twain", correct: false},
            {text: "Jane Austen", correct: false},
        ] 
    },
    {
        question:   "Which planet is known as the Red Planet?",
        answers: [
            {text: "Earth", correct: false},
            {text: "Jupiter", correct: false},
            {text: "Mars", correct: true},
            {text: "Venus", correct: false},
        ]
    },
    {
        question:   "Who was the first President of the United States?",
        answers: [
            {text: "George Washington", correct: true},
            {text: "Thomas Jefferson", correct: false},
            {text: "Abraham Lincoln", correct: false},
            {text: "Thomas Jefferson", correct: false},
        ]
    },
    {
        question:   "What is the largest ocean on Earth?",
        answers: [
            {text: "Atlantic Ocean", correct: false},
            {text: "Indian Ocean", correct: false},
            {text: "Southern Ocean", correct: false},
            {text: "Pacific Ocean", correct: true},
        ]
    },
    {
        question:   "What is the longest river in the world?",
        answers: [
            {text: "Amazon River", correct: false},
            {text: "Nile River", correct: true},
            {text: "Yangtze River", correct: false},
            {text: "Mississippi River", correct: false},
        ]
    },
    {
        question:   "Who painted the Mona Lisa?",
        answers: [
            {text: "Vincent van Gogh", correct: false},
            {text: "Pablo Picasso", correct: false},
            {text: "Leonardo da Vinci", correct: true},
            {text: "Claude Monet", correct: false},
        ]
    },
    {
        question:   "Which country is known as the Land of the Rising Sun?",
        answers: [
            {text: "China", correct: false},
            {text: "Japan", correct: true},
            {text: "South Korea", correct: false},
            {text: "Thailand", correct: false},
        ]
    },
    {
        question:   "What is the smallest country in the world by land area?",
        answers: [
            {text: "Monaco", correct: false},
            {text: "Vatican City", correct: true},
            {text: "San Marino", correct: false},
            {text: "Liechtenstein", correct: false},
        ]
    },
    {
        question:   "What is the hardest natural substance on Earth?",
        answers: [
            {text: "Gold", correct: false},
            {text: "Quartz", correct: false},
            {text: "Iron", correct: false},
            {text: "Diamond", correct: true},
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion()
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display ="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++; 
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
       showQuestion(); 
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();