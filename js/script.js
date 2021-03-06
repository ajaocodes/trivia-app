//Variable and constants

//API URL
const url = "https://opentdb.com/api.php?amount=10&category=21&type=multiple&encode=url3986"

//Game scoring
const gameStart = {
    player1: 0,
    player2: 0,
    which: true,
}

// let questions = [];
const $upper = $('#upper')
const $question = $('#question')
const $difficulty = $('#difficulty')
const $answer = $('#answer')
const $a = $('#a') 
const $b = $('#b') 
const $c = $('#c') 
const $d = $('#d') 
const $scores = $('#scores') 
const $reset = $('#reset')
const $player1 = $('#player1 h4') 
const $player2 = $('#player2 h4') 


//*************************************/
//FUNCTIONS
//*********************************** */

// to obtain random questions from the array
const setBoard = (question) => {
    const randomIndex = Math.floor(Math.random() * question.length)
    const randomQuestion = question[randomIndex]

//Decoding the URI component for all answer options

    if (typeof randomQuestion.correct_answer === 'string') {
    try {
        fixCorrectAns = decodeURIComponent(randomQuestion.correct_answer);
              } catch (error) { console.log(error) 
          }
    }

    if (typeof randomQuestion.incorrect_answers[0] === 'string') {
    try {
        fixIncorrectAnsOne = decodeURIComponent(randomQuestion.incorrect_answers[0]);
              } catch (error) { console.log(error) 
         }
    }

    if (typeof randomQuestion.incorrect_answers[1]=== 'string') {
    try {
        fixIncorrectAnsTwo = decodeURIComponent(randomQuestion.incorrect_answers[1]);
            } catch (error) { console.log(error) 
        }
    }

    if (typeof randomQuestion.incorrect_answers[2]=== 'string') {
    try {
        fixIncorrectAnsThree = decodeURIComponent(randomQuestion.incorrect_answers[2]);
             } catch (error) { console.log(error) 
        }
    }


//all answwer options put in an array

    const allAnswers = [
                     fixCorrectAns,
                     fixIncorrectAnsOne,
                     fixIncorrectAnsTwo,
                     fixIncorrectAnsThree
    ]


    let randomAns;
    const answerSpots = [$a,$b,$c,$d]
    allAnswers.forEach((answer) => {
        randomAns = Math.floor(Math.random() * answerSpots.length)
        answerSpots[randomAns].text(answer)
        answerSpots.splice(randomAns, 1)
      })


//to fix questions string issues
    if (typeof randomQuestion.question === 'string') {
        try {
            fixQuesIssues = decodeURIComponent(randomQuestion.question);
            } catch (error) { console.log(error) 
        }
    }

//updating questions
    $question.text(fixQuesIssues)


// updating question difficulty
    $difficulty.text("Difficulty: " + randomQuestion.difficulty)  

//Updating Player scores
    $player1.text(gameStart.player1)
    $player2.text(gameStart.player2)


//listener event with some game logic
const chooseAnswer = (event, question) => {
    if (event.target.innerText === fixCorrectAns)  {
        console.log(event)
        
        let which = true;
        if(gameStart.which) {
            gameStart.player1++
            gameStart.which = !gameStart.which
        } else{
            // let which = true;
            gameStart.player2++
            gameStart.which = !gameStart.which           
        }
        setBoard(questions)
    } else {
        console.log("incorrect")
        setBoard(questions)
        gameStart.which = !gameStart.which
    }

    if (gameStart.player1 === 5) { 
        alert ("PLAYER 1 WINS")
        alert ("Click game reset button")
    } else{
        console.log("Keep playing")
    }

    if (gameStart.player2 === 5) {
        alert ("PLAYER 2 WINS")
        alert ("Click game reset button")
        } else {
            console.log("Keep playing")
        }

    $reset.on("click", event => {
    location.reload()
    })

}

//Event listener functions
$('li').off()
  $('li').on("click", (event) => {
    chooseAnswer(event, randomQuestion)
})

$('button').on("click", (event) => {
    console.log(event)
})
}


//Getting the data from the API
$.ajax(url)
  .then((data) => {
      questions = data.results;
      console.log(questions)
   setBoard(questions)
})


