const startButton = document.querySelector('.start');
const startScreen = document.querySelector('.start-screen');
const quizContainer = document.querySelector('.quiz-container');
const questionElement = document.querySelector('.question');
const optionElements = document.querySelectorAll('.options button');
const scoreScreen = document.querySelector('.score-screen');
const submitForm = document.querySelector('.form');
const inputElement = document.querySelector('.form input');
const highScores = document.querySelector('.high-scores');
const highScoreUsers = document.querySelector('.high-scores ul');
const leaderboard = document.querySelector('#leaderboard');
const goBack = document.querySelector('.goHome');
const status = document.querySelector('.status');
const timer = document.querySelector('.right-side span');
let result = document.querySelector('.score');
let clear = document.querySelector('.clear');

const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

let totalQuestions = questions.length;
let questionIndex = -1;
let score = 0;
let interval;

startButton.addEventListener('click', startQuiz);

function startQuiz(){
    startScreen.classList.add('hide');
    quizContainer.classList.remove('hide');
    scoreScreen.classList.add('hide');
    highScores.classList.add('hide');
    timer.innerText = 50;
    setQuestion();
    stop();
    countDownStart()
}

function setQuestion(){
    questionIndex += 1;
    if(questionIndex <= totalQuestions-1){
        questionElement.innerText = questions[questionIndex].questionText;
        optionElements.forEach((button, index) => {
            button.innerText = questions[questionIndex].options[index];
            button.addEventListener('click', checkSelectedOption);
        })
    }else{
        questionIndex = -1;
        timer.innerText = 0;
        startScreen.classList.add('hide');
        quizContainer.classList.add('hide');
        scoreScreen.classList.remove('hide');
        highScores.classList.add('hide');
        result.innerText = score;
    }
}

function checkSelectedOption(){
    if(this.innerText === questions[questionIndex].answer){
        status.innerText = 'Correct!';
        score = score + 1;
        if(questionIndex === questions.length - 1){
            timer.innerText = 0;
        }
    }else{
        status.innerText = 'Incorrect!';
        if(questionIndex === questions.length - 1){
            timer.innerText = 0;
        }else if(timer.innerText > 10){
            timer.innerText = timer.innerText - 10;
        }else{
            timer.innerText = 0;
        }
    }
    setQuestion();
}

function countDownStart() {
   interval = setInterval(start, 1000);
}

function start() {
    if(timer.innerText == 0){
        questionIndex = -1;
        startScreen.classList.add('hide');
        quizContainer.classList.add('hide');
        scoreScreen.classList.remove('hide');
        highScores.classList.add('hide');
        result.innerText = score;
        stop();
    }else if(timer.innerText > 0){
        timer.innerText = timer.innerText - 1;
    }
}

function stop() {
    clearInterval(interval); 
}

submitForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    saveToLocal({
        initials: inputElement.value,
        score: score
    });
    inputElement.value = "";
    score = 0;
    startScreen.classList.add('hide');
    quizContainer.classList.add('hide');
    scoreScreen.classList.add('hide');
    highScores.classList.remove('hide');
    getFromLocal();
})

goBack.addEventListener('click', ()=>{
    startScreen.classList.remove('hide');
    quizContainer.classList.add('hide');
    scoreScreen.classList.add('hide');
    highScores.classList.add('hide');
})

leaderboard.addEventListener('click', ()=>{
    questionIndex = -1;
    timer.innerText = "";
    startScreen.classList.add('hide');
    quizContainer.classList.add('hide');
    scoreScreen.classList.add('hide');
    highScores.classList.remove('hide');
    getFromLocal();
})

clear.addEventListener('click', ()=>{
    clearAllFromLocal();
    getFromLocal();
});

function saveToLocal(newUser){
    let allUsers;
    if(localStorage.getItem('allUsers') === null){
        allUsers = [];
    }else{
        allUsers = JSON.parse(localStorage.getItem('allUsers'));
    }
    allUsers.push(newUser);
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
}

function getFromLocal(){
    highScoreUsers.innerHTML = "";
    let allUsers;
    if(localStorage.getItem('allUsers') === null){
        allUsers = [];
    }else{
        allUsers = JSON.parse(localStorage.getItem('allUsers'));
    }
    allUsers = allUsers.sort((a, b)=> b.score-a.score);
    allUsers.forEach((user, index)=>{
        const userDetails = document.createElement('li');
        userDetails.innerHTML = `<span>${index + 1}. </span><span>${user.initials}</span> - <span>${user.score}</span>`;
        userDetails.classList.add('user-details');
        highScoreUsers.appendChild(userDetails);
    })
}

function clearAllFromLocal(){
    let allUsers;
    if(localStorage.getItem('allUsers') === null){
        allUsers = [];
    }else{
        allUsers = JSON.parse(localStorage.getItem('allUsers'));
    }
    allUsers = [];
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
}
