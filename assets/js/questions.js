const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
const outPut = document.getElementById("outPut");
const nextBtn = document.getElementById("nextBtn");

let questionsArray = [];
let currentQuestionIndex = 0;

async function getQuestions(category) {
  try {
    const response = await fetch(`assets/data/${category}.json`);
    const data = await response.json();
    questionsArray = data.questions;
    showQuestion();
  } catch (error) {
    console.log("Error loading questions:", error);
  }
}

function showQuestion() {
  outPut.innerHTML = "";

  if (currentQuestionIndex >= questionsArray.length) {
    outPut.textContent =
      "you have finished questions you will be redirected to the home page in 5s";
    nextBtn.disabled = true;
    setTimeout(() => {
      window.location.href = "index.html";
    }, 5000);
    return;
  }

  const theQuestion = questionsArray[currentQuestionIndex];

  const questionTitle = document.createElement("p");
  questionTitle.textContent = theQuestion.question.en;
  outPut.appendChild(questionTitle);

  if (
    theQuestion.questionType === "multiple choice" ||
    theQuestion.questionType === "trueFalse"
  ) {
    const answersList = document.createElement("ul");
    theQuestion.answers.en.forEach((answer) => {
      const li = document.createElement("li");
      li.textContent = answer.text;
      li.addEventListener("click", () => {
        checkAnswer(answer.isCorrect);
      });
      answersList.appendChild(li);
    });
    outPut.appendChild(answersList);
  } else if (theQuestion.questionType === "text") {
    const input = document.createElement("input");
    input.type = "text";
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.addEventListener("click", () => {
      checkAnswer(theQuestion.correctAnswers.en.includes(input.value.trim()));
    });
    outPut.appendChild(input);
    outPut.appendChild(submitBtn);
  }

  // Hint Button
  const hintBtn = document.createElement("button");
  hintBtn.textContent = "Show Hint";
  const hintText = document.createElement("span");
  hintText.textContent = theQuestion.hint.en;
  hintText.style.display = "none";
  hintText.style.marginLeft = "10px";

  hintBtn.addEventListener("click", () => {
    if (hintText.style.display === "none") {
      hintText.style.display = "inline";
      hintBtn.textContent = "Hide Hint";
    } else {
      hintText.style.display = "none";
      hintBtn.textContent = "Show Hint";
    }
  });

  outPut.appendChild(hintBtn);
  outPut.appendChild(hintText);
}

function checkAnswer(isCorrect) {
  alert(isCorrect ? "Correct" : "Wrong");
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  showQuestion();
});

getQuestions(category);
