import Deck from "./deck.js"
import { keys} from "./keys.js"

// setup

const noteCard = document.querySelector('.card');

const begin = document.querySelector('#begin');
const heading = document.querySelector('.heading');
const form = document.querySelector('form');
const buttonSection = document.getElementsByClassName('button');
const answer = document.getElementById('answer');
const main = document.querySelector('.main');

const treble = document.getElementById('clef_1');
const bass = document.getElementById('clef_2');
const both = document.getElementById('clef_3');

const easy = document.getElementById('difficulty_1');
const medium = document.getElementById('difficulty_2');
const hard = document.getElementById('difficulty_3');

begin.addEventListener('click', () => startGame());

let incorrect = 0;
let correct = 0;
let timeoutLength = 750;
let startTime = 0;
let endTime = 0;

// game stuff

// basic game setup - deck creation, setting displays to none

function startGame() {
    startTime = performance.now();
    incorrect = 0;
    correct = 0;
    const deck = new Deck(checkClef(),checkDifficulty());
    keys.forEach(key => {
        key.addEventListener('click', () => checkNote(key, deck));
    })
    begin.removeChild(document.getElementById('beginButton'))
    heading.classList.add('playing');
    form.classList.add('playing');
    main.classList.add('playing');
    noteCard.classList.add('playing');
    clear();
    deck.shuffle();
    // console.log(deck.cards);
    noteCard.appendChild(deck.cards[0].getHTML());
}

// checks form selections for deck creation

function checkClef() {
    if(treble.checked) {
        noteCard.removeChild(document.getElementById('base'));
        noteCard.appendChild(baseMaker('assets/trebleStaff.svg'));
        return 'treble';
    } else if(bass.checked) {
        noteCard.removeChild(document.getElementById('base'));
        noteCard.appendChild(baseMaker('assets/bassStaff.svg'));
        return 'bass';
    } else {
        return 'both';
    }
}

function checkDifficulty() {
    if(easy.checked) {
        return 'easy';
    } else if(medium.checked) {
        return 'medium';
    } else {
        return 'hard';
    }
}

// creates base staff image depending on the chosen cleff (to prevent 'flickering' effect between cards)

function baseMaker(baseSrc) {
    const baseImage = document.createElement('img');
    baseImage.src = baseSrc;
    baseImage.alt = 'staff';
    baseImage.id = 'base';
    return baseImage;
}

// this doesn't really do anything anymore but I might need it in the future

function clear() {
    if(noteCard.childElementCount > 1) {
        noteCard.removeChild(document.getElementById('thing'));
    }
}

// checks if the key pressed matches the displayed note

function checkNote(key, deck) {
    if(deck.cards === undefined || deck.cards.length == 0) {
        return;
    } else if(answer.classList.contains('checking')) {
        return; // hopefully prevents issues caused by rapid key pressing
    }
    answer.classList.add('checking')
    const thingy = document.getElementById(key.dataset.sound);
    if(deck.cards[0].note.name === thingy.id) {
        correct++;
        answer.appendChild(answerMaker(true, deck.cards[0].note.name));
        nextCard(true, deck);
    } else {
        incorrect++;
        let correctKey
        keys.forEach(key => {
            if(document.getElementById(key.dataset.sound).id === deck.cards[0].note.name) {
                correctKey = key;
                correctKey.classList.add('correctKey');
            }
        })
        answer.appendChild(answerMaker(false, deck.cards[0].note.name));
        nextCard(false, deck);
    }
}

// creates answer response

function answerMaker(isCorrect, name) {
    const answerDiv = document.createElement('h3');
    answerDiv.id = ('answerText');
    answer.classList.add('display');
    if(isCorrect) {
        answerDiv.textContent = "✔\t" + name;
        answerDiv.classList.add('correct');
    } else {
        answerDiv.textContent = "X\t" + name;
        answerDiv.classList.add('incorrect');
    }
    return answerDiv;
}

// moves to next card

function nextCard(isCorrect, deck) {
    setTimeout(() => {
        if(!isCorrect) {
            let correctKey = document.querySelector('.correctKey');
            correctKey.classList.remove('correctKey');
        }
        answer.classList.remove('checking');
        answer.removeChild(document.querySelector('#answerText'));
        noteCard.removeChild(document.getElementById('thing'));
        deck.pop();
        if(deck.cards === undefined || deck.cards.length == 0) {
            noteCard.removeChild(document.getElementById('base'));
            noteCard.classList.remove('playing');
            answer.classList.add('end');
            main.classList.add('end');
            main.appendChild(playAgain());
        } else {
            noteCard.appendChild(deck.cards[0].getHTML());  
        } 
    }, timeoutLength);
}



// creates result screen

function playAgain() {
    const againDiv = document.createElement('div');
    againDiv.id = 'again';
    const correctText = document.createElement('h2');
    correctText.textContent = 'Correct: ' + correct;
    const incorrectText = document.createElement('h2');
    incorrectText.textContent = 'Incorrect: ' + incorrect;
    const timeTaken = document.createElement('h2');
    endTime = performance.now();
    let totalTime = (endTime - startTime) / 1000;
    timeTaken.textContent = "Time: " + (Math.round(totalTime*10)/10).toString() + "s";
    const againButton = document.createElement('button');
    againButton.textContent = 'Play Again?';
    againButton.id = 'againButton';
    againButton.addEventListener('click', () => location.reload());
    againDiv.appendChild(correctText);
    againDiv.appendChild(incorrectText);
    againDiv.appendChild(timeTaken);
    againDiv.appendChild(againButton);
    return againDiv;
}