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

// landing page - holds the start button & beginning phrases - after the button is hit to start the quiz, the dialogue & question are hidden
var beginQuiz = function () {
    questionEl.textContent = "Let's test your coding knowledge...";
    dialogueEl.innerHTML =
    "Each time a question is answered incorrectly, time is deducted. Good luck! :)";
    var startEl = document.createElement("button");
    startEl.className = "btn";
    startEl.textContent = "Ready... GO!";
    choicesEl.appendChild(startEl);
  };

// display questions -- this i cannot get to work. i can understand what this portion of the code is SUPPOSED to do but my brain hurts trying to figure out why it wont work
var displayQuestions = function () {
  initializeElements();
  questionEl.message = quiz[questionIncrementer].question;
  for (i = 0; i < quiz[questionIncrementer].choices.length; i++) {
    var listChoiceEl = document.createElement("li");
    listChoiceEl.textContent = quiz[questionIncrementer].choices[i];
    listChoiceEl.className = "btn";
    choicesEl.appendChild(listChoiceEl);
  }
  questionIncrementer++;
};
// after all this questions are answered - this function tells the user their score - it also stops the timer
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

//when this button is clicked, the user can view the scores locally on their device - it will not show scores from other users
var showScores = function () {
  initializeElements();
  questionEl.textContent = "High Scores";
  var startEl = document.createElement("button");
  startEl.className = "btn";
  startEl.textContent = "Ready... GO!";
  choicesEl.appendChild(startEl);
  // IF the "High Scores" button is clicked, it will show you the high scores (locally stored)
  if (!scoresArr[0]) {
    return;
  }
  // Anything higher than a 0 is recorded in the High Scores
  for (i = 0; i < scoresArr.length; i++) {
    var ScoresEl = document.createElement("li");
    ScoresEl.textContent = scoresArr[i].Player + " - " + scoresArr[i].Score;
    dialogueEl.appendChild(ScoresEl);
  }
};

//truthfully not sure what this does 100%
// from what im gathering it means that if there are no scores to be loaded that the console log will return "there is no data"
var loadScores = function () {
    scoresObj = localStorage.getItem("scoresObj");
    if (!scoresObj) {
      console.log("there is no data");
      return;
    }
    scoresArr = JSON.parse(scoresObj);
  };
  
  // The timer of course
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
  
  //element initalizer - this assigns initial value to each variable being called below - essentially it helps better organize your code
  var initializeElements= function() {
    dialogueEl.innerHTML="";
    choicesEl.innerHTML="";
    questionEl.innerHTML="";
  }
  // the button handler has a big job - when the user clicks it, it goes down the list of what to do
  // after the button is clicked (the actual "event"), this function will start logging the user's score, start the timer & display the questions & answers
  // it also will tell the user wether or not the question was answered correctly
  var buttonHandler = function (event) {
    var targetEl = event.target;
    if (targetEl.textContent === "Log Score") {
      var playerScore = { Player: inputEl.value, Score: savedTime };
      scoresArr.push(playerScore);
      localStorage.setItem("scoresObj", JSON.stringify(scoresArr));
      showScores();
  // user presses the "start" button & tells the timer to start counting down & to display the questions on the quiz
    } else if (targetEl.textContent === "Ready... GO!") {
      countdown();
      questionIncrementer = 0;
      displayQuestions();
  // deducts 5 secs from timer - tells user they got the question wrong
    } else if (targetEl.textContent !== quiz[questionIncrementer - 1].answer) {
      time = time - 5;
      if (questionIncrementer < quiz.length) {
        answerEl.textContent = "Nice try, but no.";
        displayQuestions();
      } 
      else {
        savedTime = time;
        time = 0;
        endQuiz();
      }
  //does not deduct time since question is right -- tells user they chose the correct answer
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
 // event listeners - "listens" for the user clicking on button
  choicesEl.addEventListener("click", buttonHandler);
  highScoreEl.addEventListener("click", showScores);
  
  loadScores();
  beginQuiz();