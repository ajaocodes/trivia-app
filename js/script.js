//Variable and constants

//API URL
const url = "https://opentdb.com/api.php?amount=10&category=21&type=multiple"

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
    

    //To group all answer options in an array
    const allAnswers = [
                     randomQuestion.correct_answer,
                     randomQuestion.incorrect_answers[0],
                     randomQuestion.incorrect_answers[1],
                     randomQuestion.incorrect_answers[2]
    ]

    let randomAns;
    const answerSpots = [$a,$b, $c, $d]
    allAnswers.forEach((answer) => {
        randomAns = Math.floor(Math.random() * answerSpots.length)
        answerSpots[randomAns].text(answer)
        answerSpots.splice(randomAns, 1)
      })
    
    //Updating questions 
$question.text(randomQuestion.question) 

// updating question difficulty
$difficulty.text(randomQuestion.difficulty)  

//Updating Player scores
$player1.text(gameStart.player1)
$player2.text(gameStart.player2)



//event listeners

const chooseAnswer = (event, question) => {
    // console.log(event)
    if (event.target.innerText === randomQuestion.correct_answer)  {
        // console.log("correct")  
        // setBoard(questions)
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
        // setBoard(questions)
        console.log("incorrect")
        setBoard(questions)
        gameStart.which = !gameStart.which
    }

if (gameStart.player1 === 5) { 
    console.log("PLAYER 1 WINS")
    alert ("Click game reset button")
    } else{
        console.log("Keep playing")
    }

if (gameStart.player2 === 5) {
        console.log("PLAYER 2 WINS")
        console.log("Click game reset button")
        } else {
            console.log("Keep playing")
        }
// if (gameStart.player1 || gameStart.player2 === 5){
//     $reset = location.reload()
// }
$reset.on("click", event => {
    location.reload()
})

}




$('li').off()
  $('li').on("click", (event) => {
    chooseAnswer(event, randomQuestion)
})

$('button').on("click", (event) => {
    console.log(event)
})
}


// $reset.on("click", (event) => {
//     console.log(event)
// }

$.ajax(url)
  .then((data) => {

    //   console.log(data.results)
      questions = data.results;
   setBoard(questions)
   console.log(questions)
    // console.log(setBoard(questions))
})


// console.log(questions)
// console.log(data)





// $('document').ready(function(){
//     $("li").on({
    
//          mouseenter: function(){
//             $("li").css("background-color", "gray");
//         },  
        
//         mouseleave: function(){
//             $("li").css("background-color", "white");
//         }, 
        
//         dblclick: function(){
//             $("li").css("background-color", "yellow");
//         },
       
//     });
// });