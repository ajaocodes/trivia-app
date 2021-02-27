//Variable and constants



const url = "https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple"
$.ajax(url)
  .then((data) => {
    console.log(data)
})