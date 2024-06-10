const CLEFS = ["TREBLE"]
const NAMES = ["C4","D4","E4","F4","G4","A4",
            "B4","C5","D5","E5","F5","G5","A5"]
const IMAGES = [
    "assets/cardImages/C4trebleClef.svg",
    "assets/cardImages/D4trebleClef.svg",
    "assets/cardImages/E4trebleClef.svg",
    "assets/cardImages/F4trebleClef.svg",
    "assets/cardImages/G4trebleClef.svg",
    "assets/cardImages/A4trebleClef.svg",
    "assets/cardImages/B4trebleClef.svg",
    "assets/cardImages/C5trebleClef.svg",
    "assets/cardImages/D5trebleClef.svg",
    "assets/cardImages/E5trebleClef.svg",
    "assets/cardImages/F5trebleClef.svg",
    "assets/cardImages/G5trebleClef.svg",
    "assets/cardImages/A5trebleClef.svg"
]

export default class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards;
    }

    get numberOfCards() {
        return this.cards.length;
    }

    shuffle() {
        for(let i = this.numberOfCards - 1; i >0; i--) {
            const newIndex = Math.floor(Math.random()*(i+1));
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }
}


class Card {
    constructor(clef, note) {
        this.clef = clef;
        this.note = note;
    } 
}

class Note {
    constructor(img, name) {
        this.img = img;
        this.name = name;
    }
}

function makeNotes() {
    const notes = [];
    for (let index = 0; index < IMAGES.length; index++) {
        notes[index] = new Note(IMAGES[index], NAMES[index])
    }
    return notes;
}

function freshDeck() {
    return CLEFS.flatMap(clef => {
        return makeNotes().map(note => {
            return new Card(clef, note);
        })
    })
}