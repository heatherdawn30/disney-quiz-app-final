'use strict';
const myQuestions = [
{
    question: "In the Disney movie, Brave, how many brothers does Merida have?",
    answers: {
        a: "2",
        b: "3",
        c: "1",
        d: "none of the above"
    },
    correctAnswer: "b"
},
{
    question: "In Frozen, who is Anna’s true love?",
    answers: {
        a: "Hans",
        b: "Christoff",
        c: "Sven",
        d: "none of the above"
    },
    correctAnswer: "b"
},
{
    question: "According to the Disney version of Tarzan, how did Tarzan’s parents die?",
    answers: {
        a: "Jaguar",
        b: "Shipwreck",
        c: "Fell off a cliff",
        d: "none of the above"
    },
    correctAnswer: "a"
},
{
    question: "The song, “A Whole New World” was sung in which of the following films:",
    answers: {
        a: "The Little Mermaid",
        b: "Toy Story",
        c: "Aladdin",
        d: "none of the above"
    },
    correctAnswer: "c"
},
{
    question: "What Disney film stars a “daughter of a chief” not a princess, and states this exact phrase?",
    answers: {
        a: "Pocahontas",
        b: "Moana",
        c: "Cinderella",
        d: "none of the above"
    },
    correctAnswer: "b"
},
{
    question: "According to the Disney film, “Tangled” how old was Rapunzel about to turn when she first left her tower?",
    answers: {
        a: "16",
        b: "84",
        c: "18",
        d: "none of the above"
    },
    correctAnswer: "c"
},
{
    question: "In the classic Disney movie, “Snow White” what was the princes name?",
    answers: {
        a: "No name is mentioned in the film",
        b: "Prince Charming",
        c: "Prince Ferdinand",
        d: "none of the above"
    },
    correctAnswer: "a"
},
{
    question: "What is the princesses name in, “Sleeping Beauty”?",
    answers: {
        a: "No name is mentioned in the film",
        b: "Prince Charming",
        c: "Prince Ferdinand",
        d: "none of the above"
    },
    correctAnswer: "a"
},
{
    question: "What object is Lumiere in Disney’s, “Beauty and the Beast”?",
    answers: {
        a: "Clock",
        b: "Cup",
        c: "Candelabra",
        d: "none of the above"
    },
    correctAnswer: "c"
},
{
    question: "Which is the best Disney movie of all time?",
    answers: {
        a: "That is an opinion, I refuse to answer.",
        b: "The Little Mermaid",
        c: "Aladdin",
        d: "Robin Hood"
    },
    correctAnswer: "a"
}
];

let questionCounter = 1;
let incorrect = 0;
let correct = 0;
let randomQuestions = [];
let currentAnswer = "";



//computer optimized shuffle array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

//DONE!
//make a copy of the questions' array, randomize the order of the contents, and cut off after 5
//render first question with loadQuestion()
//start the question counter at 1
//start the total correct/incorrect at 0 and 0
//render the counters and totals
$('#start-button').on('click', (event) => {
    randomQuestions = shuffleArray(myQuestions).splice(5,9);
    console.log(randomQuestions);
    questionCounter = 1;
    incorrect = 0;
    correct = 0;
    loadQuestion(0)
    $(".start-quiz").hide();
    $(`<div class="counters">
        <p id="question-number">You are on question number ` + questionCounter + `</p>
        <p id="incorrect">Incorrect: ` + incorrect + `</p>
        <p id="correct">Correct: ` + correct + `</p>
    </div>`).appendTo("body");
});

//locks the ability to submit (deletes itself)
//finds what the user put as an answer, and determines if it is right or wrong
//gives the "textual feedback" and informs user to move to next question
  // if it is right, say "correct!"
  // if it is wrong, say "incorrect! The correct answer is ''"
//update total correct/total incorrect
//adds the next question button
//checks if this was the last question, and if it is, call finishQuiz()
function questionSubmit() {
    $("#question-form").submit(function(event) {
        event.preventDefault();
        $("#submit-button").remove();
        let correctAnswer = randomQuestions[questionCounter - 1].correctAnswer;

        if (currentAnswer === correctAnswer) {
            correct++;
            $(`<p>'You are right!'</p>`).appendTo("#question-form");
            $("#correct").text("Correct: " + correct);
        } else {
            incorrect++;
            $("<p> You are wrong, the right answer is " + correctAnswer + "</p>").appendTo("#question-form");
            $("#incorrect").text("Incorrect: " + incorrect);
        }

        if (questionCounter >= 5) {
            finishQuiz()
        } else {
            $('<button id="next-question" type="button">Next Question</button>').appendTo("#question-form");
            $(nextQuestion);
        }
    });
}

//update question counter
//remove old question HTML cruft
//load the next question with loadQuestion()
function nextQuestion() {
    $('#next-question').on('click', (event) => {
        questionCounter++;
        $(".question").remove();
        loadQuestion(questionCounter-1);
        $("#question-number").text("You are on question number " + questionCounter);
    });
}

//unlock the submit button when a radio button is selected
function answerSelected() {
    $('.answer').on('click', (event) => {
        $('#submit-button').removeAttr('disabled');
        currentAnswer = $(event.currentTarget).attr("value");
    });
}

//render the next question in the question array
  //this will involve some variable that we use as the incrementing index to the myQuestions array
//make sure the submit button is locked and the next question button is locked
//if this question is the last question, then don't put a "next question" button
//and turn the "submit" button text into finish quiz
function loadQuestion(index) {
    $(`<div class="question">
        <p>` + randomQuestions[index].question + `</p>
        <form id="question-form">
            <input class="answer" type="radio" name="options1" value="a"> `+ randomQuestions[index].answers.a +`<br>
            <input class="answer" type="radio" name="options1" value="b"> `+ randomQuestions[index].answers.b +`<br>
            <input class="answer" type="radio" name="options1" value="c"> `+ randomQuestions[index].answers.c +`<br>
            <input class="answer" type="radio" name="options1" value="d"> `+ randomQuestions[index].answers.d +`<br>
            <button id="submit-button" type="submit">Submit</button>
        </form>
    </div>`).prependTo("body");
    document.getElementById("submit-button").disabled = true;
    $(answerSelected);
    $(questionSubmit);
}

//remove any HTML cruft?
//total score reflected
//display try again button
function finishQuiz() {
    $(".question").remove();
    $(".counters").remove();
    $(`<div class="finish">
        <p>Your score is ` + correct + ` out of 5</p>
        <button id="again-button" type="submit">Try Again</button>
    </div>`).prependTo("body");
    $(tryAgain)
}

//just refresh the page
function tryAgain() {
    $('#again-button').on('click', (event) => {
        location.reload()
    });
}