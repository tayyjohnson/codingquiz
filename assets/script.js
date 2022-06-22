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
    questionEl.textContent = "Let's test your coding knowledge...";
    dialogueEl.innerHTML =
    "Each time a question is answered incorrectly, time is deducted. Good luck! :)";
    var startEl = document.createElement("button");
    startEl.className = "btn";
    startEl.textContent = "Ready... GO!";
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
  questionEl.textContent = "That's a wrap!";
  dialogueEl.innerHTML =
    "Your score is... " + savedTime + "! <br><br> Tell us who you are! <br><br>";
  
  inputEl.setAttribute("type", "text");
  dialogueEl.appendChild(inputEl);
  var logEl = document.createElement("button");
  logEl.className = "btn";
  logEl.textContent = "Score Recorded";
  choicesEl.appendChild(logEl);
};

//view scores
var showScores = function () {
  initializeElements();
  questionEl.textContent = "High Scores";
  var startEl = document.createElement("button");
  startEl.className = "btn";
  startEl.textContent = "Ready... GO!";
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

//load scores
var loadScores = function () {
    scoresObj = localStorage.getItem("scoresObj");
    if (!scoresObj) {
      console.log("there is no data");
      return;
    }
    scoresArr = JSON.parse(scoresObj);
  };
  
  // timer
  var countdown = function () {
    var timeInterval = setInterval(function () {
      if (time >= 1) {
        timerEl.textContent = "Time: " + time;
        time--;
      } else {
        timerEl.textContent = "Time: " + time;
        clearInterval(timeInterval);
      }
    }, 1000);
  };
  
  //element initalizer
  var initializeElements= function() {
    dialogueEl.innerHTML="";
    choicesEl.innerHTML="";
    questionEl.innerHTML="";
  }
  var buttonHandler = function (event) {
    var targetEl = event.target;
    if (targetEl.textContent === "Log Score") {
      var playerScore = { Player: inputEl.value, Score: savedTime };
      scoresArr.push(playerScore);
      localStorage.setItem("scoresObj", JSON.stringify(scoresArr));
      showScores();
    } else if (targetEl.textContent === "Ready... GO!") {
      countdown();
      questionIncrementer = 0;
      displayQuestions();
    } else if (targetEl.textContent !== quiz[questionIncrementer - 1].answer) {
      time = time - 5;
      if (questionIncrementer < quiz.length) {
        answerEl.textContent = "Nice try, but no.";
        displayQuestions();
      } else {
        savedTime = time;
        time = 0;
        endQuiz();
      }
    } else {
      if (questionIncrementer < quiz.length) {
        answerEl.textContent = "YAAAAAAS!";
        displayQuestions();
      } else {
        savedTime = time;
        time = 0;
        endQuiz();
      }
    }
  };
  
  choicesEl.addEventListener("click", buttonHandler);
  highScoreEl.addEventListener("click", showScores);
  
  loadScores();
  beginQuiz();