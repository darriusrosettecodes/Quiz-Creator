'use strict'

const userQuestions = []

const score = {
    max: 0,
    correct: 0
}

//create a div that will store the question, the answer choices, and result
const questionDiv = document.createElement('div')
questionDiv.setAttribute('class', 'question-div')

const createQuestionBtn = document.querySelector('#create-question').addEventListener('click', function(){
    //stores the questions that the user specified into an array
    let userQuestion = document.querySelector('#get-question')
    userQuestions.push(userQuestion.value)

    //makes the max the amount of questions there are the max score
    score.max = userQuestions.length
    
    //creates an h1 that will be the question that the user specified
    const showQuestion = document.createElement('h2')
    showQuestion.textContent = userQuestion.value
    questionDiv.appendChild(showQuestion)

    //create a div that will store show the answer choices the user specified
    let userChoices = document.querySelector('#get-answer-choices')
    const choices = userChoices.value.toLowerCase().split('; ').map(choice => choice.trim())
    const showChoices = document.createElement('div')

    //create a variable to store the correct answer
    let correctAnswerElement = document.querySelector('#get-right-answer')
    let correctAnwser = correctAnswerElement.value.toLowerCase().trim();

    //create a function that will access the buttons from each question and disable them when one is clicked
    const disableAllButtons = function(questionContainer) {
        const buttons = questionContainer.querySelectorAll('.check');
        buttons.forEach(button => {
            button.setAttribute('disabled', 'true');
        });

    };
    
    //loop through the different choices in the array and create a div for each one that will also contain a checkbox
    for (const choice of choices) {
        const eachChoice = document.createElement('div');

        const checkbox = document.createElement('button');
        checkbox.setAttribute('class', 'check');

        // set a data attribute to store the correct answer
        eachChoice.setAttribute('data-answer', choice);

        //creates a span that will have the text of the coice
        const textElement = document.createElement('span');
        textElement.textContent = choice;

        eachChoice.appendChild(checkbox); //puts the checkbox in the answer choice div
        eachChoice.appendChild(textElement) //puts the span inside the answer choice div

        showChoices.appendChild(eachChoice); //puts each answer choice div inside the showChoices div

        //checks if the answer that is clicked is the correct answer
        checkbox.addEventListener('click', function(){
            // get the stored correct answer from the data attribute
            const storedAnswer = eachChoice.getAttribute('data-answer');
    
            if (storedAnswer === correctAnwser) {
                showResult.innerHTML = 'Correct'
                showResult.style.color = 'green'
                score.correct ++
            } 
            else {
                showResult.innerHTML = 'Incorrect'
                showResult.style.color = 'red'
            }
            
            //disables all buttons for the question once one is clicked
            disableAllButtons(showChoices)
    
        });

    }


    questionDiv.appendChild(showChoices); //adds the choices to the question div

    //creates an h1 to show the result
    const showResult = document.createElement('h2')
    questionDiv.appendChild(showResult) //adds the restult to the quetsion div
    
    

    userQuestion.value = ''
    userChoices.value = ''
    correctAnswerElement.value = ''

});

const showScore = document.createElement('h2')

//button that shows score
const scoreBtn = document.createElement('button')
    scoreBtn.innerHTML = 'Show Score'
    scoreBtn.addEventListener('click', function(){
    showScore.innerHTML = `You got ${score.correct} out of ${score.max} correct`
    scoreBtn.style.display = 'none'
})

//button that shows the saved questions when clicked
document.querySelector('#show-questions').addEventListener('click', function(){
    document.body.appendChild(questionDiv)
    document.body.appendChild(scoreBtn)
    document.body.appendChild(showScore)
    document.querySelector('.form').style.display = 'none'
})















