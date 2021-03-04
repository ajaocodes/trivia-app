//Variable and constants

//API URL
const url = "https://opentdb.com/api.php?amount=10&category=21&type=multiple"
const gameStart = {
    player1: 0,
    player2: 0,
    currentquestion: {},
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
const $player1 = $('#player1 h4') 
const $player2 = $('#player2 h4') 


//*************************************/
//FUNCTIONS
//*********************************** */

const setBoard = (question) => {
    const randomIndex = Math.floor(Math.random() * question.length)
    const randomQuestion = question[randomIndex]
    
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
        console.log("correct")
        setBoard(questions)
    } else {
        // setBoard(questions)
        console.log("incorrect")
        setBoard(questions)
    }
}

  $('li').on("click", (event) => {
    chooseAnswer(event, randomQuestion)
})

}


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





// $('li').ready(function(){
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