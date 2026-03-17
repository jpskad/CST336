// Global Variables
let attempts = localStorage.getItem("total_attempts") || 0;
document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${attempts}`;

// Event Listeners
document.querySelector("button").addEventListener("click", gradeQuiz);
window.onload = displayQ4Choices;

function displayQ4Choices() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);

    let choicesContainer = document.querySelector("#q4Choices");
    choicesContainer.innerHTML = ""; 
    
    // Create rows for layout
    let row = document.createElement("div");
    row.className = "row";
    
    q4ChoicesArray.forEach(choice => {
        row.innerHTML += `
            <div class="col-6 mb-2">
                <div class="form-check p-2 border rounded">
                    <input class="form-check-input ms-1" type="radio" name="q4" id="${choice}" value="${choice}">
                    <label class="form-check-label ms-4" for="${choice}">${choice}</label>
                </div>
            </div>`;
    });
    choicesContainer.appendChild(row);
}

function gradeQuiz() {
    let score = 0;
    let feedbackElement = document.querySelector("#validationFdbk");
    feedbackElement.innerHTML = ""; 

    // Validation
    if (document.querySelector("#q1").value === "") {
        feedbackElement.innerHTML = "Question 1 must be answered!";
        feedbackElement.className = "bg-danger text-white p-2 mt-3";
        return;
    }

    // Q1: Text
    if (document.querySelector("#q1").value.toLowerCase() === "sacramento") { score += 10; rightAnswer(1); } else { wrongAnswer(1); }

    // Q2: Select
    if (document.querySelector("#q2").value === "mo") { score += 10; rightAnswer(2); } else { wrongAnswer(2); }

    // Q3: Checkbox
    if (document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked && !document.querySelector("#Jackson").checked) {
        score += 10; rightAnswer(3);
    } else { wrongAnswer(3); }

    // Q4: Radio (Shuffled)
    let q4Selected = document.querySelector("input[name=q4]:checked");
    if (q4Selected && q4Selected.value === "Rhode Island") { score += 10; rightAnswer(4); } else { wrongAnswer(4); }

    // Q5: Text
    if (document.querySelector("#q5").value.toLowerCase() === "arizona") { score += 10; rightAnswer(5); } else { wrongAnswer(5); }

    // Q6: Select
    if (document.querySelector("#q6").value === "fl") { score += 10; rightAnswer(6); } else { wrongAnswer(6); }

    // Q7: Radio
    let q7Selected = document.querySelector("input[name=q7]:checked");
    if (q7Selected && q7Selected.value === "Superior") { score += 10; rightAnswer(7); } else { wrongAnswer(7); }

    // Q8: Checkbox
    if (document.querySelector("#oregon").checked && document.querySelector("#washington").checked && !document.querySelector("#texas").checked) {
        score += 10; rightAnswer(8);
    } else { wrongAnswer(8); }

    // Q9: Text
    if (document.querySelector("#q9").value.toLowerCase() === "alaska") { score += 10; rightAnswer(9); } else { wrongAnswer(9); }

    // Q10: Select
    if (document.querySelector("#q10").value === "dv") { score += 10; rightAnswer(10); } else { wrongAnswer(10); }


    // Final Display
    let totalScoreElement = document.querySelector("#totalScore");
    totalScoreElement.innerHTML = `Total Score: ${score}`;

    // Submission Messages
    if (score >= 81) {
        totalScoreElement.innerHTML += " <br> <span class='text-success'>Congratulations! You nailed the quiz!</span>";
    } 
    
    if (score <= 80) {
        totalScoreElement.innerHTML += " <br> <span class='text-danger'>Please try again!</span>";
    }

    // Update Storage
    attempts++;
    localStorage.setItem("total_attempts", attempts);
    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${attempts}`;
}

function rightAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "feedback-slot text-success fw-bold";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='Correct'>";
}

function wrongAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "feedback-slot text-danger fw-bold";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='Incorrect'>";
}