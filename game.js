const Quote_API_URL = `https://api.quotable.io/random`;
const quoteDisplayEl = document.getElementById('gameQuote');
const quoteInputEl = document.getElementById('quoteInput');

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

quoteInputEl.addEventListener('input', () => {
    const arrayQuote = quoteDisplayEl.querySelectorAll('span');
    const arrayValue = quoteInputEl.value.split('');

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];

        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
        }
    })
})
