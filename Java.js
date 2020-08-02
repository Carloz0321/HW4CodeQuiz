var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var highScores = document.querySelector(".highscores")
var mainEl = document.getElementById("main")
var highPage = document.getElementById("high")
var timerInterval;


var timerEL = document.getElementsByClassName(".timer")
var secondsLeft = 75;

start.addEventListener("click", function() {
    quiz.style.display = "block"
    setTime()
    displayQuestion()
});
//  start.addEventListener("click", displayQuestions)
highScores.addEventListener("click", displayHighscores);

var codeQuestions = document.getElementById("codeQuestions")
var choiceList = document.querySelector("#choices")
var correction = document.getElementById("correction")
var container = document.getElementById("container")
var currentQuestion = 0;

var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
    },
]

function setTime() {
    timerEL.textContent == "Time: " + secondsLeft

    timerInterval = setInterval(function (){
        secondsLeft--;
        timerEL.textContent == "Time: " + secondsLeft

        if (secondsLeft === 0) {
            clearInterval(timerInterval)
            allDone()
        }
    }, 1000)
}

function displayQuestion() {
    container.style.display = "none";

    codeQuestions.innerHTML = ""
    choiceList.innerHTML = ""

    let question = questions [currentQuestion]
    codeQuestions.textContent = question.title

    let choiceLength = question.choices.length
    for (index = 0; index < choiceLength; index++) {
        var choice = question.choices[index]
        var choiceDiv = document.createElement("div")
        var li = document.createElement("input")
        var choiceText = document.createElement("span")
        choiceText.setAttribute("class", "choice")
        li.setAttribute("type", "radio")
        li.setAttribute("name", "choice")
        li.setAttribute("class", "list")

        li.addEventListener("click", chooseAnswer)
        choiceText.textContent = choice

        choiceDiv.appendChild(li)
        choiceDiv.appendChild(choiceText)
        choiceList.appendChild(choiceDiv)
    }
}

function chooseAnswer(event) {
    console.log(currentQuestion);
    let question = questions[currentQuestion];
    if (event.target.nextElementSibling.textContent === question.answer) {
        correction.textContent = "Correct!";
    } else {
        correction.textContent = "Wrong!"
        secondsLeft -= 10;
    }

    if (currentQuestion === questions.length - 1) {
        clearInterval(timerInterval);
        allDone();
    } else {
        currentQuestion++
        displayQuestion();
    };

}


function allDone() {
    console.log('inside allDone', currentQuestion);
    quiz.style.display = "none";
    // timerEL.style.display = "none";
    highScores.style.display = "none";
    mainEl.style.display = "block";
    mainEl.textContent = '';

    var allDone = document.createElement("h1")
    var finalScore = document.createElement("p")
    var initials = document.createElement("span")
    var input = document.createElement("input")
    var submit = document.createElement("button")

    initials.setAttribute("class", "initials")
    submit.setAttribute("class", "submit")
    input.setAttribute("class", "input")

    allDone.textContent = "All Done!"
    finalScore.textContent = "Your final score is " + secondsLeft
    initials.textContent = "Enter initials:"
    input.textContent = " "
    submit.textContent = "Submit"

    mainEl.appendChild(allDone)
    mainEl.appendChild(finalScore)
    mainEl.appendChild(initials)
    mainEl.appendChild(input)
    mainEl.appendChild(submit)
    console.log(mainEl)

    submit.addEventListener("click", storeScore)
}


function storeScore(){
    var score = secondsLeft
    var inputname = document.querySelector(".input").value

    console.log(inputname)
    let user = {}
    user[inputname] = score

    let highScores = localStorage.getItem('highScores')

    if(highScores) {
        let pHighScores = JSON.parse(highScores)
        pHighScores[inputname] = score
        localStorage.setItem("highScores", JSON.stringify(pHighScores))

    } else {
        localStorage.setItem("highScores", JSON.stringify(user))
    }

    displayHighscores()
}


function displayHighscores() {
    mainEl.style.display = "none"
    // timerEL.style.display = "none"
    highScores.style.display = "none"
    container.style.display = "none"
    quiz.style.display = "none"
    highPage.style.display = "block"
    highPage.textContent = ""

    var high = document.createElement("h1")
    var name = document.createElement("p")
    var goBack = document.createElement("button")
    var clear = document.createElement("button")
    name.setAttribute("class", "name")
    goBack.setAttribute("class", "goback")
    clear.setAttribute("class", "clear")

    high.textContent = "Highscores"

    goBack.textContent = "Go Back"
    clear.textContent = "Clear Highscores"

    highPage.appendChild(high)
    highPage.appendChild(name)
    highPage.appendChild(goBack)
    highPage.appendChild(clear)

    let scores = JSON.parse(localStorage.getItem("highScores"))

    for (var key in scores) {
        name.textContent = `${key}: ${scores[key]}`
    }


    goBack.addEventListener("click", homePage)
    clear.addEventListener("click", function clearHigh(){
        name.textContent = " "
    })

}

function homePage() {
    container.style.display = "block"
    highPage.style.display = "none"
    timerEL.style,display = "block"
    highScores.style.display = "block"
    mainEl.style.display = "none"

    secondsLeft = 75;
    currentQuestion = 0
}