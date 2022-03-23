const wordEl = document.querySelector('#word');
const wrongLettersEl = document.querySelector('#wrong-letters');
const playAgainBtn = document.querySelector('#play-again');
const popup = document.querySelector('#endgame-messages');
const finalMessage = document.querySelector('#final-message');
const notification = document.querySelector('#notification-container');
const manParts = document.querySelectorAll('.man-part');

const words = ['institution', 'react', 'angular', 'experience', 'jobs', 'overthinking', 'crew', 'genius'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const wrongLetters = [];
const correctLetters = [];

//Function to show words to guess
function displayWord() {
    //split words to array of letters and display 
    wordEl.innerHTML = `
    ${selectedWord.split('').map((letter) => `
    <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
    </span>
    `
    ).join('')}
    `;

    //remove word from going vertically by replacing new line character with empty string globally
    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord){
        finalMessage.innerText = 'Great Job saving the man, You won! 😀';
        popup.style.display = 'flex';
    }
}

//Function to update the wrong letetrs
function updateWrongLettersEl() {

    //Displays the wrong words entered already
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? `<p>Wrong</p>` : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //Show parts as wrong words are entered
    manParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors){
            part.style.display = 'block';
        } else{
            part.style.display = 'none';
        }
    });

    //Check if game was lost
    if(wrongLetters.length === manParts.length){
        finalMessage.innerText = 'You couldn\'t save the man, You lost😢';
        popup.style.display = 'flex';
    }
}

//Show notification function
function showNotification(){
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2500)
}

//Keydown letter press once we enter window
//I used key codes in event parameter to only listen for letters
//letters go from 65 to 90(a to z)
window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        //check if letter is in selected word
        if(selectedWord.includes(letter)){

            //push letter to correct letters array if it's not there already
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLettersEl();
            }
            else{
                showNotification();
            }
        }
    }
});

//Event listener for play again button to play again
playAgainBtn.addEventListener('click', () => {
    //Emptying the array
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
})

displayWord();