// Global Vars

var time = 180;
var questionIncrementer = 0;

//vars
var timerEl = document.getElementById("timer");
var highScoreEl = document.getElementById("high-scores");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var answerEl = document.getElementById("answer");
var dialogueEl = document.getElementById("dialogue");
var quizBoxEl = document.getElementById("quiz-box");
var inputEl = document.createElement("input");

var playerScore = {};
var scoresArr = [];

// landing
var beginQuiz = function () {
    questionEl.textContent = "Coding Quiz Challenge";
    dialogueEl.innerHTML =
    "Try and beat the high score! Answer questions as accurately and quickly as possible. Time will be deducted for incorrect responses";
    var startEl = document.createElement("button");
    startEl.className = "btn";
    startEl.textContent = "Begin!";
    choicesEl.appendChild(startEl);
  };

// display questions
var displayQuestions = function () {
  initializeElements();
  questionEl.textContent = quiz[questionIncrementer].question;
  for (i = 0; i < quiz[questionIncrementer].choices.length; i++) {
    var listChoiceEl = document.createElement("li");
    listChoiceEl.textContent = quiz[questionIncrementer].choices[i];
    listChoiceEl.className = "btn";
    choicesEl.appendChild(listChoiceEl);
  }
  questionIncrementer++;
};

var endQuiz = function () {
  initializeElements();
  questionEl.textContent = "All Done!";
  dialogueEl.innerHTML =
    "Your final score is " + savedTime + "! <br><br> Enter your name! <br><br>";
  
  inputEl.setAttribute("type", "text");
  dialogueEl.appendChild(inputEl);
  var logEl = document.createElement("button");
  logEl.className = "btn";
  logEl.textContent = "Log Score";
  choicesEl.appendChild(logEl);
};

//view scores
var showScores = function () {
  initializeElements();
  questionEl.textContent = "High Scores";
  var startEl = document.createElement("button");
  startEl.className = "btn";
  startEl.textContent = "Begin!";
  choicesEl.appendChild(startEl);
  if (!scoresArr[0]) {
    return;
  }

  for (i = 0; i < scoresArr.length; i++) {
    var ScoresEl = document.createElement("li");
    ScoresEl.textContent = scoresArr[i].Player + " - " + scoresArr[i].Score;
    dialogueEl.appendChild(ScoresEl);
  }
};
