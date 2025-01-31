let currentQuestion = 0;
let score = 0;
let timerValue = 90;
let timerInterval;
let quizQuestions = [
    // Data Science Questions
    {
        question: "What is the primary purpose of data normalization in machine learning?",
        options: ["To reduce the dimensionality of the dataset", "To ensure all features have the same scale", "To convert categorical data into numerical data", "To perform data augmentation"],
        correct: 1
    },
    {
        question: "Which algorithm is commonly used for classification tasks in machine learning?",
        options: ["K-means", "Linear Regression", "Decision Trees", "K-Nearest Neighbors"],
        correct: 2
    },
    {
        question: "Which of the following is a common tool used for data visualization in Python?",
        options: ["TensorFlow", "Matplotlib", "PyTorch", "NumPy"],
        correct: 1
    },
    {
        question: "What is the main purpose of overfitting in a machine learning model?",
        options: ["To make the model too generalized", "To make the model fit the training data too well", "To improve accuracy on unseen data", "To reduce the bias of the model"],
        correct: 1
    },
    {
        question: "Which of these is an example of unsupervised learning?",
        options: ["Regression", "Classification", "Clustering", "Prediction"],
        correct: 2
    },

    // Web Development Questions
    {
        question: "Which of the following is primarily used for styling web pages?",
        options: ["JavaScript", "HTML", "CSS", "PHP"],
        correct: 2
    },
    {
        question: "Which of the following is a JavaScript framework for building single-page applications?",
        options: ["React", "Django", "Flask", "Angular"],
        correct: 0
    },
    {
        question: "What does the 'HTTP' in a URL stand for?",
        options: ["HyperText Transfer Protocol", "HyperText Transmission Protocol", "Hyper Transfer Text Protocol", "HyperTransfer Time Protocol"],
        correct: 0
    },
    {
        question: "Which HTML tag is used to link an external CSS file?",
        options: ["<link>", "<script>", "<style>", "<a>"],
        correct: 0
    },
    {
        question: "What is the purpose of 'localStorage' in web development?",
        options: ["Store data temporarily for the session", "Store data permanently on the user's computer", "Enhance the performance of web pages", "Transfer data between servers"],
        correct: 1
    }
];

function loadQuestion() {
    if (currentQuestion >= quizQuestions.length) {
        clearInterval(timerInterval);
        document.getElementById("next-button").style.display = "none";
        document.getElementById("submit-button").style.display = "inline-block";
        return;
    }

    let question = quizQuestions[currentQuestion];
    let questionHTML = `
        <h3>${question.question}</h3>
        <div class="options">
            ${question.options.map((option, index) => {
                return `<label><input type="radio" name="question${currentQuestion}" value="${index}"> ${option}</label>`;
            }).join('')}
        </div>
    `;
    document.getElementById("question-container").innerHTML = questionHTML;
    document.getElementById("result").innerHTML = ''; // Clear previous results
}

function nextQuestion() {
    let selectedAnswer = document.querySelector(`input[name="question${currentQuestion}"]:checked`);
    
    if (!selectedAnswer) {
        alert("Please select an answer.");
        return;
    }

    let answerIndex = selectedAnswer.value;
    if (parseInt(answerIndex) === quizQuestions[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;
    loadQuestion();
}

function submitQuiz() {
    let selectedAnswers = document.querySelectorAll('input[type="radio"]:checked');
    selectedAnswers.forEach(answer => {
        let questionIndex = answer.name.replace('question', '');
        let selectedAnswer = parseInt(answer.value);
        if (selectedAnswer === quizQuestions[questionIndex].correct) {
            score++;
        }
    });

    document.getElementById("result").innerHTML = `Your score is: ${score} out of ${quizQuestions.length}`;
}

function startTimer() {
    timerInterval = setInterval(function() {
        timerValue--;
        document.getElementById("timer-value").textContent = timerValue;

        if (timerValue <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}

function initializeQuiz() {
    loadQuestion();
    startTimer();
}

initializeQuiz();
