import Deck from "./deck.js"
import { keys} from "./keys.js"

// setup

const noteCard = document.querySelector('.card');

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

// keys.forEach(key => {
//     key.addEventListener('click', () => checkNote(key, deck));
//     console.log("event listener")
// })


// game stuff

function startGame() {
    const deck = new Deck(checkClef(),checkDifficulty());
    console.log(deck.cards);
    keys.forEach(key => {
        key.addEventListener('click', () => checkNote(key, deck));
        console.log("event listener")
    })
    // console.log(deck.cards[0].difficulty)
    // buttonSection.classList.add('playing');
    begin.removeChild(document.getElementById("beginButton"))
    heading.classList.add('playing');
    form.classList.add('playing');
    noteCard.classList.add('playing');
    clear();
    deck.shuffle();
    console.log(deck.cards);
    noteCard.appendChild(deck.cards[0].getHTML());
}

function checkClef() {
    if(treble.checked) {
        noteCard.removeChild(document.getElementById("base"));
        noteCard.appendChild(baseMaker("assets/trebleStaff.svg"));
        return "treble";
    } else if(bass.checked) {
        noteCard.removeChild(document.getElementById("base"));
        noteCard.appendChild(baseMaker("assets/bassStaff.svg"));
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

function baseMaker(baseSrc) {
    const baseImage = document.createElement('img');
    baseImage.src = baseSrc;
    baseImage.alt = "staff";
    baseImage.id = "base";
    return baseImage;
}

function clear() {
    if(noteCard.childElementCount > 1) {
        noteCard.removeChild(document.getElementById("thing"));
    }
}

function checkNote(key, deck) {
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