const CLEFS = ["TREBLE","BASS"]
const NAMES = [
    "C4",
    "D4",
    "E4",
    "F4",
    "G4",
    "A4",
    "B4",
    "C5",
    "D5",
    "E5",
    "F5",
    "G5",
    "A5"
]
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

const CLEF_VALUE_MAP = {
    "treble" : "TREBLE",
    "bass" : "BASS",
}

const DIFFICULTY_VALUE_MAP = {
    "easy" : 1,
    "medium" : 2,
    "hard" : 3
}

const CARD_DIFFICULTY_MAP = {
// difficulty level 1
    "BASSF2" : 1,
    "BASSG2" : 1,
    "BASSA2" : 1,
    "BASSB2" : 1,
    "BASSC3" : 1,
    "BASSD3" : 1, 
    "BASSE3" : 1,
    "BASSF3" : 1,
    "BASSG3" : 1,
    "BASSA3" : 1,
    "BASSB3" : 1,
    "BASSC4" : 1,

    "TREBLEC4" : 1,
    "TREBLED4" : 1,
    "TREBLEE4" : 1,
    "TREBLEF4" : 1,
    "TREBLEG4" : 1,
    "TREBLEA4" : 1,
    "TREBLEB4" : 1,
    "TREBLEC5" : 1,
    "TREBLED5" : 1,
    "TREBLEE5" : 1,
    "TREBLEF5" : 1,
    "TREBLEG5" : 1,
// difficulty level 2
    "BASSA1" : 2,
    "BASSB1" : 2,
    "BASSC2" : 2,
    "BASSD2" : 2,
    "BASSE2" : 2,
    "BASSD4" : 2,
    "BASSE4" : 2,
    "BASSF4" : 2,
    "BASSG4" : 2,

    "TREBLEA5" : 2,
    "TREBLEB5" : 2,
    "TREBLEC6" : 2,
    "TREBLED6" : 2,
    "TREBLEE6" : 2,
    "TREBLEF3" : 2,
    "TREBLEG3" : 2,
    "TREBLEA3" : 2,
    "TREBLEB3" : 2,
// difficulty level 3
    "BASSD1" : 3,
    "BASSE1" : 3,
    "BASSF1" : 3,
    "BASSG1" : 3,

    "TREBLEF6" : 3,
    "TREBLEG6" : 3,
    "TREBLEA6" : 3,
    "TREBLEB6" : 3
}

export default class Deck {
    constructor(clefSelection, difficultySelection) {
        const cardsDirty = freshDeck(clefSelection);
        this.cards = difficultyComb(difficultySelection, cardsDirty);
    }

    get numberOfCards() {
        return this.cards.length;
    }

    pop() {
        return this.cards.shift();
    }

    shuffle() {
        for(let i = this.numberOfCards - 1; i > 0; i--) {
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
        this.difficulty = clef + note.name;
    } 

    getHTML() {
        const cardImg = document.createElement('img');
        cardImg.src = this.note.img;
        cardImg.alt = this.note.name;
        cardImg.id = "thing";
        return cardImg;
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

function freshDeck(clefSelection) {
    if(clefSelection === "both") {
        return CLEFS.flatMap(clef => {
            return makeNotes().map(note => {
                return new Card(clef, note);
            })
        })
    } else {
        return makeNotes().map(note => {
            return new Card(CLEF_VALUE_MAP[clefSelection.toString()], note)
        })
    }
}

function difficultyComb(difficultySelection, c) {
    const cards = c;
    for(let index = 0; index < cards.length; index++) {
        if(CARD_DIFFICULTY_MAP[cards[index].difficulty] > DIFFICULTY_VALUE_MAP[difficultySelection.toString()]) {
            cards.splice(index, 1);
        }
    }
    return cards;
}
