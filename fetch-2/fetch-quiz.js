let categoryDropdown = document.getElementById("select-category");
let countDropdown = document.getElementById("select-count");
let searchButton = document.querySelector(".search");
let nextButton = document.querySelector(".next");
let resetButton = document.querySelector(".reset");
let questText = document.querySelector(".quest-text");
let answers = document.querySelector(".answers");
let history = document.querySelector('.history-cards');

// let history = {};
// history.array.forEach(element => {
//     document.createElement(p)
// });

let allQuestions = [];
let currentQuestion = {};
let questionText;
let currentAnswers = [];
let myAnswers = [];
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
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function displayQuestion() {
  currentQuestion = allQuestions[currentCount - 1];
 questionText= `${currentCount}.${currentQuestion.question}`;
 questText.textContent = questionText;
  console.log(currentQuestion.correct_answer);
  currentAnswers.push(currentQuestion.correct_answer);
  currentQuestion.incorrect_answers.forEach((element) => {
    currentAnswers.push(element);
  });
  console.log(currentAnswers);
  shuffle(currentAnswers);
  console.log(currentAnswers);
  console.log(answers);
  answers.innerHTML = "";

  currentAnswers.forEach((answer, index) => {
    const answerContainer = document.createElement("div");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answers";
    input.value = index + 1;
    input.classList.add(`${index + 1}`);

    const label = document.createElement("label");
    label.htmlFor = `${index + 1}`;
    label.textContent = answer;

    // Append the input and label to the answers container
    answerContainer.appendChild(input);
    answerContainer.appendChild(label);
    answers.appendChild(answerContainer);
  });
    currentAnswers = [];
    
}

function handleNextButtonClick() {
  // Get the selected radio button
  const selectedRadioButton = document.querySelector(
    'input[name="answers"]:checked'
  );
  console.log(selectedRadioButton);
  console.log(currentCount);

  // Check if a radio button is selected
  if (selectedRadioButton) {
    selectedRadioButton.classList.add("checked")
    history.innerHTML += `${questionText}
    <br><br>
    ${answers.innerHTML} 
    <br><br><hr>`;
    console.log(history.innerHTML);
    // Get the label text corresponding to the selected radio button
    const selectedLabel = document.querySelector(
      `label[for="${selectedRadioButton.value}"]`
    ).textContent;
    
    document.querySelector(
      `label[for="${selectedRadioButton.value}"]`
    ).classList.add("checked");

    // Store the chosen answer in the array
    myAnswers.push(selectedLabel);
    console.log(myAnswers);

    // Move to the next question
    currentCount++;

    if (currentCount < count) {
      displayQuestion();
    } else {
      // No more questions, hide the "Next" button
      nextButton.classList.add("hidden");
    }
  } else {
    // Handle the case where no radio button is selected
    // alert("Please select an answer before moving to the next question.");
  }
}

searchButton.addEventListener("click", function () {
  fetch(
    `https://opentdb.com/api.php?amount=${count}&category=${categoryTransformer}&type=multiple`
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      if (currentCount === 0) {
        answers.classList.remove("hidden");
        resetButton.classList.remove("hidden");
        nextButton.classList.remove("hidden");
        searchButton.classList.add("hidden");
      }
      currentCount++;
      console.log(data);
      console.log(data.results[0].question);
      data.results.forEach((element) => {
        allQuestions.push(element);
      });
      console.log(allQuestions);
      displayQuestion();
    });
});

nextButton.addEventListener('click', handleNextButtonClick);

// TODO make radio buttons invisible in history
// TODO chosen answer to be marked in orange