//Scroll to top button
let scrollButton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


// Quiz


const quizData = [
  {
    question: "What is the main ingredient in guacamole?",
    options: ["Tomato", "Avocado", "Onion", "Lemon"],
    correctAnswer: "Avocado"
  },
  {
    question: "Which spice is often used in Indian curry dishes?",
    options: ["Cinnamon", "Turmeric", "Rosemary", "Oregano"],
    correctAnswer: "Turmeric"
  },
  {
    question: "What is the primary ingredient in hummus?",
    options: ["Chickpeas", "Black beans", "Lentils", "Pinto beans"],
    correctAnswer: "Chickpeas"
  },
  {
    question: "Which pasta is shaped like small rice grains?",
    options: ["Orzo", "Fusilli", "Penne", "Farfalle"],
    correctAnswer: "Orzo"
  },
  {
    question: "What is the key ingredient in a classic Margherita pizza?",
    options: ["Pepperoni", "Tomato sauce", "Mozzarella", "Olives"],
    correctAnswer: "Mozzarella"
  }
];

// DOM elements
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");

let currentQuestionIndex = 0;
let userScore = 0;

// Function to load the current question
function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;

  // Clear previous options
  optionsContainer.innerHTML = "";

  // Add options dynamically
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "btn btn-secondary me-2";
    button.textContent = option;
    button.addEventListener("click", () => selectOption(option, currentQuestion.correctAnswer));
    optionsContainer.appendChild(button);
  });
}

// Function to handle option selection
function selectOption(selectedOption, correctAnswer) {
  if (selectedOption === correctAnswer) {
    userScore++;
  }

  // Disable options after selection
  document.querySelectorAll("#options-container button").forEach(button => {
    button.disabled = true;
  });

  // Show next button
  nextButton.disabled = false;
}

// Function to load the next question or show the result
function loadNext() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
    // Enable options for the new question
    document.querySelectorAll("#options-container button").forEach(button => {
      button.disabled = false;
    });
    nextButton.disabled = true;
  } else {
    showResult();
  }
}

// Function to display the result
function showResult() {
  //resultContainer.innerHTML = `<p>Your Score: ${userScore} out of ${quizData.length}</p>`;
  let myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
  let modalBody = document.querySelector("#myModal .modal-body");
  //document.getElementById("myModal").innerHTML = "Your Score: ${userScore} out of ${quizData.length}";
  //document.getElementsByClassName("modal-body").innerHTML = "<p>Your Score: ${userScore} out of ${quizData.length}</p>";
  modalBody.innerHTML = `<p style="font-size:1.5rem">Your Score: ${userScore} out of ${quizData.length}</p>`;
  myModal.show();
}

// Event listeners
nextButton.addEventListener("click", loadNext);

// Initialize the quiz
loadQuestion();


//Form validation


function validateForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;

  var errorMessages = [];

  if (name.trim() === "") {
    errorMessages.push("Name is required");
  }

  if (email.trim() === "") {
    errorMessages.push("Email is required");
  } else {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailPattern)) {
      errorMessages.push("Invalid email format");
    }
  }

  if (subject.trim() === "") {
    errorMessages.push("Subject is required");
  }

  if (message.trim() === "") {
    errorMessages.push("Message is required");
  }

  if (errorMessages.length > 0) {
    var errorMessage = "Please correct the following errors:\n" + errorMessages.join("\n");
    alert(errorMessage);
    return false;
  }
  return true;
}



//Countdown timer



var myVar;
var minutesInput = document.getElementById("minutesInput");
var timerDisplay = document.getElementById("timer");
var countDownSeconds = 0;

function startTime() {
  var minutes = parseInt(minutesInput.value);

  if (isNaN(minutes)) minutes = 0;

  countDownSeconds = minutes * 60;

  timerDisplay.innerHTML = formatTime(countDownSeconds);
  myVar = setInterval(start, 1000);
}

function start() {
  countDownSeconds--;

  if (countDownSeconds >= 0) {
    timerDisplay.innerHTML = formatTime(countDownSeconds);
  } else {
    stop();
    timerDisplay.innerHTML = "00:00";
  }
}

function stop() {
  clearInterval(myVar);
}

function formatTime(seconds) {
  var mins = Math.floor(seconds / 60);
  var secs = seconds % 60;
  return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
}



// To-Do list



function addIngredient() {
  const newIngredientInput = document.getElementById("newIngredient");
  const newIngredient = newIngredientInput.value.trim();
  if (newIngredient === "") {
    return;
  }

  const toDoIngredientsList = document.getElementById("toDoIngredients");
  const listItem = document.createElement("li");
  listItem.className = "list-group-item d-flex justify-content-between align-items-center";
  listItem.innerHTML = `
        <input class="form-check-input me-1" type="checkbox">
        <label class="form-check-label">${newIngredient}</label>
        <button class="btn btn-danger btn-sm" style="margin-left: auto;" onclick="deleteIngredient(this)">Delete</button>
      `;

  toDoIngredientsList.appendChild(listItem);
  newIngredientInput.value = "";
}

function deleteIngredient(button) {
  const listItem = button.parentElement;
  const toDoIngredientsList = document.getElementById("toDoIngredients");
  toDoIngredientsList.removeChild(listItem);
}


// Star rating


const ratingStars = [...document.getElementsByClassName("rating__star")];

function executeRating(stars) {
  const starClassActive = "rating__star fas fa-star";
  const starClassInactive = "rating__star far fa-star";
  const starsLength = stars.length;
  let i;
  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);

      if (star.className===starClassInactive) {
        for (i; i >= 0; --i) stars[i].className = starClassActive;
      } else {
        for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
      }
    };
  });
}
executeRating(ratingStars);


// Audio


var startButton = document.getElementById("startButton");
startButton.addEventListener("click",play);
function play() {
  var audio = document.getElementById("audio");
  audio.play();
}
var stopButton = document.getElementById("stopButton");
stopButton.addEventListener("click",playStop);
function playStop() {
  var audio = document.getElementById("audioStop");
  audio.play();
}


//Fullscreen video


var elem = document.getElementById("myvideo");
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}


//Quiz


// Define the quiz questions and options
