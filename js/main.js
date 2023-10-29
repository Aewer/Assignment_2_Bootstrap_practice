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
