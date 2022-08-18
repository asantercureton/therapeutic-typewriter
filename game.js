const Quote_API_URL = `https://api.quotable.io/random`;
const quoteDisplayEl = document.getElementById('gameQuote');
const quoteInputEl = document.getElementById('quoteInput');
const gameTime = document.getElementById('timer');
const gameScore = document.getElementById('score');
const gameCompleted = document.getElementById('completed');
const doneBtn = document.getElementById('done-btn');
const charPerSecond = document.getElementById('charPerSecond');
let startTime;
let counterChar = 0;
let score = 0;
let completed = 0;

// Start Timer
let timeInterval = setInterval(getTimertime, 1000);

function startTimer() {
    startTime = new Date();
}

function getTimertime() {
    let time = Math.floor((new Date() - startTime) / 1000);
    return gameTime.innerText = time;
}

// Stop Timer
function stopTimer() {
    clearInterval(timeInterval);
}

// Fetch random quote
function getRandomQuote() {
    return fetch(Quote_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

// Render next quote
async function renderNextQuote() {
    const quote = await getRandomQuote();
    quoteDisplayEl.innerText = '';
    quote.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        quoteDisplayEl.appendChild(charSpan);
    })
    quoteInputEl.value = null;
}

// initialize functions
renderNextQuote();
startTimer();

// event listeners
quoteInputEl.addEventListener('input', () => {
    const arrayQuote = quoteDisplayEl.querySelectorAll('span');
    const arrayValue = quoteInputEl.value.split('');

    let correct = true;

    // Looping through every individual character
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];

        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        } else if (character === characterSpan.innerText) {
            // Count correct characters
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
            counterChar += 1;
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            correct = false;
        }
    })

    if (correct) {
        score += Math.ceil(counterChar/getTimertime());
        gameScore.innerText = score;
        completed += 1;
        gameCompleted.innerText = completed;
        charPerSecond.innerText = (Math.ceil(counterChar/getTimertime())/60).toFixed(2);
        renderNextQuote();
    }
})

doneBtn.addEventListener('click', () => {
    clearInterval(timeInterval);

    alert(`Thank you for your time, see your Summary Analysis Report below!
    \n<<< SUMMARY ANALYSIS REPORT >>>
    \nYou completed ` + completed + ` quotes within ` + (getTimertime()/60).toFixed(1) + ` minutes.
    \nYou averaged ` + (Math.ceil(counterChar/getTimertime())/60).toFixed(2) + ` characters per second.
    \nYour score is ` + score + `
    \nSee You Again Soon!`);
});
