//assign variables
var initialsInput = document.getElementById("initials")
var bottomBox = document.getElementById('misc')
var questionsEl = document.getElementById("questions");
var triviaHeadEl = document.getElementById("trivia-header");
var questionContainerEl = document.getElementById("question-container");
var choicesButtonEl = document.getElementById("choices-btn");
var timerEl = document.getElementById("timer");
var startQuiz = document.getElementById("start-quiz");
var answerStatus = document.getElementById("answer-status")
var resetQuiz = document.getElementById('reset-quiz')
var submit = document.getElementById("submit-score")
var showScoreEl = document.getElementById("highscore-btn")
var scoreEl = document.getElementById("view-scores")
var confirmSaved = document.getElementById("saved-confirm")
var timeleft = 130;
var questionShuffled, currentQuestionIndex;
var gamesPlayed = [];
var displayScore = document.getElementById("highscore-score")
var displayScoreInitials = document.getElementById("highscore-initials")
var highscoreBox = document.getElementById("highscore-box")


//assign quiz questions
const quizQuestions = [
  {
      question: "Who won the champion's league in 2020?",
      answers:[ 
          { text: "Manchester City", correct:false},
          {text:"Chelsea", correct: false},
          {text:"Manchester United", correct: false},
          {text:"Bayern Munich", correct: true},
 
  
]},  {
  question: "Who is the top goal scorer in history?",
  answers:[ 
      { text: "Cristiano Ronaldo", correct:true},
      {text:"Lionel Messi", correct: false},
      {text:"Neymar", correct: false},
      {text:"Pele", correct: false},


]},
{
  question: "Who won the 2021 Super Bowl?",
  answers:[ 
      { text: "Tampa Bay Buccaneers", correct:false},
      {text:"Cincinatti Bengals", correct: false},
      {text:"New England Patriots", correct: false},
      {text:"Los Angeles Rams", correct: true},


]},
{
  question: "Who won the World Cup in 2018?",
  answers:[ 
      { text: "United States", correct:false},
      {text:"The Netherlands", correct: false},
      {text:"France", correct: true},
      {text:"Brazil", correct: false},


]},
{
  question: "Which team holds the most World Cup wins?",
  answers:[ 
      { text: "Argentina", correct:false},
      {text:"Brazil", correct: true},
      {text:"France", correct: false},
      {text:"Uruguay", correct: false},


]},
{
  question: "Who holds the record for Passing Yards in the NFL?",
  answers:[ 
      { text: "Drew Brees", correct:false},
      {text:"Tom Brady", correct: true},
      {text:"Dan Marino", correct: false},
      {text:"Joe Montana", correct: false},


]},
  ];

//event Listeners
startQuiz.addEventListener('click', startGame);
submit.addEventListener('click',storeScores);
showScoreEl.addEventListener('click',showHighscore);

//functions
function startGame(){
  startCountdown();
  questionShuffled = quizQuestions.sort(() => Math.random() - .5)
  triviaHeadEl.classList.add('hide');
  questionContainerEl.classList.remove('hide');
  currentQuestionIndex = 0;
  nextQuestion();
  startQuiz.classList.add('hide')
  
  scoreEl.classList.add('hide')
  bottomBox.classList.add('hide')
  highscoreBox.classList.add('hide')
  confirmSaved.textContent = "";
}

//function used to display next question
function nextQuestion(){
  resetState()
  displayQuestion(questionShuffled[currentQuestionIndex])
  if(currentQuestionIndex === 6){
    gameOver();
  }
}
//function used to display random question 
function displayQuestion(question){
questionsEl.innerText = question.question;
question.answers.forEach(answers =>{
  const button = document.createElement('button')
  button.innerText = answers.text
  button.classList.add('btn');
  if (answers.correct){
    button.dataset.correct = answers.correct
  }
button.addEventListener('click', selectAnswer)
choicesButtonEl.appendChild(button)
}   )
 

}


//function for answer selection
function selectAnswer(event){
var selectedAnswer = event.target
var correct = selectedAnswer.dataset.correct
if(correct){
answerStatus.textContent = "CORRECT"
currentQuestionIndex++
nextQuestion()}
else{
  answerStatus.textContent = "INCORRECT";
  timeleft-=3
}}

//function to remove listed choices when new question appears
function resetState(){
while (choicesButtonEl.firstChild)
choicesButtonEl.removeChild(choicesButtonEl.firstChild)
}








//function to set up and display Countdown
function startCountdown() {
    var timeInterval = setInterval(function () {
      if (timeleft >= 1 && currentQuestionIndex !== 6) {
        timerEl.textContent = "Time Remaining" + " " + timeleft;
        timeleft--;
      }
      
      else {
        
        clearInterval(timeInterval);
        gameOver()
        
      }
    }, 1000);
  };

//function to run once game is over
function gameOver(){
  timerEl.textContent = "GAME OVER, Your score is: " + timeleft;
  startQuiz.classList.remove('hide');
  questionContainerEl.classList.add('hide');
  bottomBox.classList.remove('hide')

}

//function to score your scores
function storeScores(event){
  event.preventDefault();
  var scores= {
    initials: initialsInput.value.trim(),
    score: timeleft};




  window.localStorage.setItem("scores", JSON.stringify(scores) )
  confirmSaved.textContent = "Your Score Has been saved!";
  initialsInput.value = "";
}

//function activated when show highscores is pressed
function showHighscore(){

  var hello = JSON.parse(window.localStorage.getItem("scores"));
  displayScoreInitials.textContent ="Your Initials are : " + hello.initials;
  displayScore.textContent = "Your Highscore Is:  " + hello.score;
  highscoreBox.classList.remove("hide");

}


console.log("hello")



