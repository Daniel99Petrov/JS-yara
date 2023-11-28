let categoryDropdown = document.getElementById("select-category");
let countDropdown = document.getElementById("select-count");
let searchButton = document.querySelector(".search");
let nextButton = document.querySelector(".next");
let resetButton = document.querySelector(".reset");
let questText = document.querySelector(".quest-text");
let answers = document.querySelector(".answers");

// let history = {};
// history.array.forEach(element => {
//     document.createElement(p)
// });

let allQuestions = [];
let currentQuestion = {};
let currentAnswers = [];
let correctAnswer;
let categoryTransformer = 22;
let count = 20;
let currentCount = 0;
let points = 0;

categoryDropdown.onchange = (ev) => {
  let selecetedIndex = categoryDropdown.selectedIndex;
  let selectedOption = categoryDropdown.options[selecetedIndex];
  if (selectedOption.value === "1") {
    categoryTransformer = 21;
  } else if (selectedOption.value === "3") {
    categoryTransformer = 23;
  } else {
    categoryTransformer = 22;
  }
};

countDropdown.onchange = (ev) => {
  let selecetedIndex = countDropdown.selectedIndex;
  let selectedOption = countDropdown.options[selecetedIndex];
  if (selectedOption.value === "1") {
    count = 10;
  } else if (selectedOption.value === "3") {
    count = 30;
  } else {
    count = 20;
  }
};

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

searchButton.addEventListener("click", function () {
  fetch(
    `https://opentdb.com/api.php?amount=${count}&category=${categoryTransformer}&type=multiple`
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => {
        if(currentCount === 0){
            answers.classList.remove("hidden");
            resetButton.classList.remove("hidden");
            nextButton.classList.remove("hidden");
            searchButton.classList.add("hidden");
        }
        currentCount++;
      console.log(data);
      console.log(data.results[0].question);
      data.results.forEach(element => {
        allQuestions.push(element);
      });
      console.log(allQuestions);
      currentQuestion = allQuestions[currentCount - 1];
      questText.textContent = `${currentCount}.${currentQuestion.question}`;
      console.log(currentQuestion.correct_answer);
      currentAnswers.push(currentQuestion.correct_answer);
      currentQuestion.incorrect_answers.forEach(element => {
        currentAnswers.push(element);
      })
      console.log(currentAnswers);
      shuffle(currentAnswers);
      console.log(currentAnswers);

    //   currentAnswers.forEach()
// TODO add answers to radio buttons
// TODO 

    //   currentQuestion.questionCorrect = data.results[0].correct_answer;
    });

    // allQuestions.array.forEach(element => {
    //     element
    // });
});
