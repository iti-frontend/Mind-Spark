const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
const outPut = document.getElementById("outPut");

console.log("Category from URL:", category);

async function getQuestions(category) {
  try {
    const response = await fetch(`assets/data/${category}.json`);
    const finalResponse = await response.json();

    finalResponse.questions.forEach((questionObj) => {
      const questionTitle = document.createElement("p");
      questionTitle.textContent = questionObj.question.en;
      outPut.appendChild(questionEl);
    });
  } catch (error) {
    console.log("Error loading questions:", error);
  }
}

getQuestions(category);
