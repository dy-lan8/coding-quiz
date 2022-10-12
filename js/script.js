//variables for quiz
var currentQuestionIndex = 0;
var time = questions.length * 20;
var timerId;


//select DOM elements
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');
var choicesEl = document.getElementById('choices');

function startQuiz() {
    //change start screen to hidden
    var startScreenEl = document.getElementById('start-screen');
    startScreenEl.setAttribute('class', 'hide');

    //make questions visible
    questionsEl.removeAttribute('class');

    //start timer
    timerId = setInterval(clockTime, 1000);

    //show the time
    timerEl.textContent = time;

    getQuestion();
}

function getQuestion() {
    //pull question from array
    var currentQuestion = questions[currentQuestionIndex];

    // update title with current question
    var titleEL = document.getElementById('question-title');
    titleEL.textContent = currentQuestion.title;

    //clear old question choices
    choicesEl.innerHTML = '';

    // loop choices
    for (var i =0; i < currentQuestion.choices.length; i++) {
        // create new button for each choice
        var choice = currentQuestion.choices[i];
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute('class', 'choice');
        choiceNode.setAttribute('value', choice);

        choiceNode.textContent = i + 1 + '. ' + choice;

        //append to page
        choicesEl.appendChild(choiceNode);
    }
}

function questionClick(event) {
    var buttonEL = event.target;

    //do nothing if choice button isn't clicked
    if (!buttonEL.matches('.choice')) {
        return;
    }
    //check for wrong answer
    if (buttonEL.value !== questions[currentQuestionIndex].answer) {
        //reduce time remaining
        time -= 20;

        if (time < 0) {
            time = 0;
        }

        //show new time
        timerEl.textContent = time;
        feedbackEl.textContent = "wrong!";
    } else {
        feedbackEl.textContent = 'correct!';
    }
     // flash right/wrong feedback on page for half a second
        feedbackEl.setAttribute('class', 'feedback');
        setTimeout(function () {
        feedbackEl.setAttribute('class', 'feedback hide');
        }, 1000);

        //next question
        currentQuestionIndex++;

    // check if we've run out of questions
        if (time <= 0 || currentQuestionIndex === questions.length) {
        quizEnd();
        } else {
        getQuestion();
  }
}
function quizEnd() {
    // stop timer
    clearInterval(timerId);
  
    // show end screen
    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');
  
    // show final score
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;
  
    // hide questions section
    questionsEl.setAttribute('class', 'hide');
  }

  function clockTime() {
    //update time
    time--;
    timerEl.textContent = time;

    //check if times up
    if (time <= 0) {
        quizEnd();
    }
  }

  function saveHighscore() {
    // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== '') {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    // redirect to next page
    window.location.href = 'highscores.html';
  }
  }
  function checkForEnter(event) {
    if (event.key === 'Enter') {
      saveHighscore();
    }
  }
  
  //  submit initials
  submitBtn.onclick = saveHighscore;
  
  //  start quiz
  startBtn.onclick = startQuiz;
  
  // user clicks on element containing choices
  choicesEl.onclick = questionClick;
  
  initialsEl.onkeyup = checkForEnter;
  