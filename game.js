const Quote_API_URL = `https://api.quotable.io/random`;
const quoteDisplayEl = document.getElementById('gameQuote');
const quoteInputEl = document.getElementById('quoteInput');
const gameTime = document.getElementById('timer');
const gameScore = document.getElementById('score');
const gameCompleted = document.getElementById('completed');
const doneBtn = document.getElementById('done-btn');
let startTime;
let score = 0;
let completed = 0;

let timeInterval = setInterval(getTimertime, 1000);

// Start Timer
function startTimer() {
    startTime = new Date();
}

function stopTimer() {
    clearInterval(timeInterval);
}

function getTimertime() {
    let time = Math.floor((new Date() - startTime) / 1000);
    return gameTime.innerText = time;
}

function getRandomQuote() {
    return fetch(Quote_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

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

renderNextQuote();
startTimer();

// event listeners
quoteInputEl.addEventListener('input', () => {
    const arrayQuote = quoteDisplayEl.querySelectorAll('span');
    const arrayValue = quoteInputEl.value.split('');

    let correct = true;

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];

        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            correct = false;
        }
    })

    if (correct) {
        score += getTimertime();
        gameScore.innerText = score;
        completed += 1;
        gameCompleted.innerText = completed;
        renderNextQuote();
    }
})

doneBtn.addEventListener('click', () => {
    clearInterval(timeInterval);
    alert(`Great typing, see your Summary Report below!
    \nYou completed ` + completed + ` quotes within ` + (getTimertime()/60).toFixed(1) + ` minutes.
    \nYour score is ` + score + `
    \nSee You Soon!`);
    // alert('You completed ' + completed + ' quotes within ' + (getTimertime()/60).toFixed(1) + ' minutes. \nYour score is ' + score + ', Great Job!');
});
