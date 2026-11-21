
// questions
const questions = [
  { q: "Which of these is the strongest password?", options: ["password123", "Drex2005", "T7#qL!9vR@2m", "qwerty"], answer: 2 },
  { q: "What does HTML stand for?", options: ["High Text Machine Language", "HyperText Markup Language", "Hyper Transfer Markup Link", "Home Tool Markup Language"], answer: 1 },
  { q: "Which attack tricks people into giving away details through fake emails?", options: ["Phishing", "DDoS", "Port scanning", "Keylogging"], answer: 0 },
  { q: "Which language is used to style a webpage?", options: ["Python", "SQL", "CSS", "Java"], answer: 2 },
  { q: "What does a firewall do?", options: ["Makes the internet faster", "Monitors and filters network traffic", "Stores your passwords", "Deletes every virus"], answer: 1 },
  { q: "Which symbol starts an ID selector in CSS?", options: [".", "#", "*", "&"], answer: 1 },
  { q: "What does SOC stand for in cybersecurity?", options: ["Secure Online Connection", "System Operating Code", "Security Operations Center", "Software Output Control"], answer: 2 },
  { q: "Which JavaScript keyword declares a variable that cannot be reassigned?", options: ["var", "let", "const", "static"], answer: 2 },
  { q: "What does the S in HTTPS stand for?", options: ["Speed", "Secure", "Server", "Simple"], answer: 1 },
  { q: "What does two-factor authentication (2FA) add to a login?", options: ["A second proof of identity", "A faster login", "A longer username", "A free VPN"], answer: 0 },
  { q: "What does VPN stand for?", options: ["Virtual Private Network", "Very Protected Node", "Verified Public Network", "Virtual Protocol Number"], answer: 0 },
  { q: "Which HTML attribute holds the address of a link?", options: ["src", "href", "alt", "id"], answer: 1 },
  { q: "Which type of malware locks your files and demands payment?", options: ["Spyware", "Adware", "Ransomware", "Worm"], answer: 2 },
  { q: "In CSS, what does display: flex help you do?", options: ["Play videos", "Connect to a database", "Encrypt text", "Arrange items in a row or column"], answer: 3 },
  { q: "Which JavaScript method adds an item to the end of an array?", options: ["pop()", "shift()", "push()", "slice()"], answer: 2 },
  { q: "What is the main job of a SOC analyst?", options: ["Design logos", "Write mobile games", "Repair printers", "Monitor and respond to security threats"], answer: 3 },
  { q: "What does SQL injection attack?", options: ["A website's images", "A database through unsafe input", "A computer's fan", "A phone battery"], answer: 1 },
  { q: "Which operator checks if two values are strictly equal in JavaScript?", options: ["=", "==", "===", "=>"], answer: 2 },
  { q: "What is the safest way to manage many passwords?", options: ["Use the same password everywhere", "Write them on a sticky note", "Use a password manager", "Share them with friends"], answer: 2 },
  { q: "What does DNS do?", options: ["Translates domain names into IP addresses", "Blocks all viruses", "Makes images load faster", "Stores your emails"], answer: 0 }
];

let current = 0;
let score = 0;
let userAnswers = [];

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const progressText = document.getElementById("progress-text");
const question = document.getElementById("question");
const options = document.getElementById("options");
const form = document.getElementById("options-form");
const scoreEl = document.getElementById("score");
const message = document.getElementById("message");
const review = document.getElementById("review");
const restartBtn = document.getElementById("restart-btn");
const timerEl = document.getElementById("timer");

// timer: seconds allowed for each question
const timeLimit = 10;
let timeLeft = timeLimit;
let timer;

// timer
function startTimer() {
  clearInterval(timer);
  timeLeft = timeLimit;
  timerEl.textContent = "Time left: " + timeLeft + "s";

  timer = setInterval(function () {
    timeLeft = timeLeft - 1;
    timerEl.textContent = "Time left: " + timeLeft + "s";

    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Time is up! The quiz will restart.");
      location.reload();
    }
  }, 1000);
}

// start button
startBtn.addEventListener("click", function () {
  startScreen.hidden = true;
  quizScreen.hidden = false;
  showQuestion();
});

// show questions
function showQuestion() {
  const item = questions[current];
  progressText.textContent = "Question " + (current + 1) + "/" + questions.length;
  question.textContent = item.q;

  options.innerHTML = "";
  for (let i = 0; i < item.options.length; i++) {
    options.innerHTML +=
      '<label class="option"><input type="radio" name="option" value="' + i + '">' + item.options[i] + "</label>";
  }

  startTimer();
}

// submit
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const picked = document.querySelector('input[name="option"]:checked');
  if (picked === null) {
    alert("Please pick an option");
    return;
  }

  const choice = Number(picked.value);
  if (choice === questions[current].answer) {
    score = score + 1;
  } else {
    score = score + 0;
  }

  userAnswers.push(choice);
  localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
  localStorage.setItem("score", score);

  current = current + 1;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

// results
function showResults() {
  clearInterval(timer);
  quizScreen.hidden = true;
  resultScreen.hidden = false;

  const savedScore = Number(localStorage.getItem("score"));
  const savedAnswers = JSON.parse(localStorage.getItem("userAnswers"));
  const percent = (savedScore / questions.length) * 100;

  scoreEl.textContent = savedScore + " / " + questions.length;

  if (percent >= 80) {
    message.textContent = "Excellent!";
  } else if (percent >= 50) {
    message.textContent = "Good.";
  } else {
    message.textContent = "Fail. You no know book.";
  }

  // review
  let html = "";
  for (let q = 0; q < questions.length; q++) {
    const item = questions[q];
    const yourAnswer = item.options[savedAnswers[q]];
    const correctAnswer = item.options[item.answer];

    let box = "got-wrong";
    if (yourAnswer === correctAnswer) {
      box = "got-right";
    }

    html += '<div class="review-item ' + box + '">';
    html += "<h3>" + (q + 1) + ". " + item.q + "</h3>";
    html += "<p>Your answer: " + yourAnswer + "</p>";
    html += "<p>Correct answer: " + correctAnswer + "</p>";
    html += "</div>";
  }

  // restart
  restartBtn.addEventListener("click", function () {
    localStorage.removeItem("userAnswers");
    localStorage.removeItem("score");
    location.reload();
  });

  review.innerHTML = html;
}