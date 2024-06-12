import Deck from "./deck.js"
import { keys} from "./keys.js"

// setup

const noteCard = document.querySelector('.card');
let deck

const begin = document.querySelector('#begin');
const heading = document.querySelector('.heading');
const form = document.querySelector('form');
const buttonSection = document.getElementsByClassName('button');

const treble = document.getElementById('clef_1');
const bass = document.getElementById('clef_2');
const both = document.getElementById('clef_3');

const easy = document.getElementById('difficulty_1');
const medium = document.getElementById('difficulty_2');
const hard = document.getElementById('difficulty_3');

begin.addEventListener('click', () => startGame());

keys.forEach(key => {
    key.addEventListener('click', () => checkNote(key));
    console.log("event listener")
})


// game stuff

function startGame() {
    deck = new Deck(checkClef(),checkDifficulty());
    console.log(deck.cards[0].difficulty)
    // buttonSection.classList.add('playing');
    begin.removeChild(document.getElementById("beginButton"))
    heading.classList.add('playing');
    form.classList.add('playing');
    noteCard.classList.add('playing');
    clear();
    deck.shuffle();
    noteCard.appendChild(deck.cards[0].getHTML());
}

function checkClef() {
    if(treble.checked) {
        return "treble";
    } else if(bass.checked) {
        return "bass";
    } else {
        return "both";
    }
}

function checkDifficulty() {
    if(easy.checked) {
        return "easy";
    } else if(medium.checked) {
        return "medium";
    } else {
        return "hard";
    }
}

function clear() {
    if(noteCard.childElementCount > 1) {
        noteCard.removeChild(document.getElementById("thing"));
    }
}

function checkNote(key) {
    if(deck.cards === undefined || deck.cards.length == 0) {
        return;
    }
    const thingy = document.getElementById(key.dataset.sound);
    if(deck.cards[0].note.name === thingy.id) {
    } else {
    }
    noteCard.removeChild(document.getElementById("thing"));
    deck.pop();
    if(deck.cards === undefined || deck.cards.length == 0) {
        begin.appendChild(playAgain());
    } else {
        noteCard.appendChild(deck.cards[0].getHTML());  
    } 
}



function playAgain() {
    const againDiv = document.createElement('button');
    againDiv.textContent = "Play Again?";
    againDiv.id = "beginButton";
    againDiv.class = "button";
    return againDiv;
}