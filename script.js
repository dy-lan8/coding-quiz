//select DOM elements
var timerEl = document.querySelector('.timer');
var buttonEl = document.querySelectorAll('button')
var choiceA = document.querySelector('#choiceA')
var choiceB = document.querySelector('#choiceB')
var choiceC = document.querySelector('#choiceC')
var choiceD = document.querySelector('#choiceD')
var questionEl = document.querySelector('.question')


// create global variables 
var secondsLeft = 60;
var questions = [
    'what is the only food that cannot go bad?', 
    'on average, how many seeds are on the outside of a strawberry?', 
    "what country's national animal is a unicorn", 
    "what is the powerhouse of the cell?"
]

var answers = [
    'honey',
    '200',
    'scotland',
    'mitochondria'
]

//timer function
function setTime() {
    var timeInterval = setInterval(function(){
        secondsLeft--;
        timerEl.textContent = secondsLeft + ' seconds remaining';
        if(secondsLeft === 0) {
            clearInterval(timeInterval);
            window.alert = 'times up!'
        }

    }, 1000);
}
//
setTime();

//question function
function setQuestion() {
    chosenQuestion = questions[Math.floor(math.random() * questions.length)]
  
}
setQuestion()