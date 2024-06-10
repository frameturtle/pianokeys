import Deck from "./deck.js"
import { keys} from "./keys.js"

const computerCardSlot = document.querySelector('.card');
let deck = new Deck();

const beginButton = document.querySelector('#beginButton');

beginButton.addEventListener('click', () => startGame());

keys.forEach(key => {
    key.addEventListener('click', () => checkNote(key));
    console.log("event listener")
})

function startGame() {
    deck = new Deck();
    beginButton.removeChild(document.getElementById("begin"))
    clear();
    deck.shuffle();
    computerCardSlot.appendChild(deck.cards[0].getHTML());
}

function clear() {
    if(computerCardSlot.childElementCount > 1) {
        computerCardSlot.removeChild(document.getElementById("thing"));
    }
}

function checkNote(key) {
    if(deck.cards === undefined || deck.cards.length == 0) {
        
    } else {
        const thingy = document.getElementById(key.dataset.sound);
        if(deck.cards[0].note.name === thingy.id) {
            computerCardSlot.removeChild(document.getElementById("thing"));
            deck.pop();
            if(deck.cards === undefined || deck.cards.length == 0) {
                beginButton.appendChild(playAgain());
            } else {
                computerCardSlot.appendChild(deck.cards[0].getHTML());  
            } 
        }
    }
}

function playAgain() {
    const againDiv = document.createElement('h2');
    againDiv.textContent = "Play Again?";
    againDiv.id = "begin";
    againDiv.class = "button";
    return againDiv;
}