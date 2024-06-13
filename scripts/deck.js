const CLEFS = ["TREBLE","BASS"]
const NAMES = [
    "D1",
    "E1",
    "F1",
    "G1",
    "A1",
    "B1",
    "C2",
    "D2",
    "E2",
    "F2",
    "G2",
    "A2",
    "B2",
    "C3",
    "D3",
    "E3",
    "F3",
    "G3",
    "A3",
    "B3",
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
    "A5",
    "B5",
    "C6",
    "D6",
    "E6",
    "F6",
    "G6",
    "A6",
    "B6"
]
const IMAGES = [
    "assets/cardImages/D1bassClef.svg",
    "assets/cardImages/E1bassClef.svg",
    "assets/cardImages/F1bassClef.svg",
    "assets/cardImages/G1bassClef.svg",
    "assets/cardImages/A1bassClef.svg",
    "assets/cardImages/B1bassClef.svg",
    "assets/cardImages/C2bassClef.svg",
    "assets/cardImages/D2bassClef.svg",
    "assets/cardImages/E2bassClef.svg",
    "assets/cardImages/F2bassClef.svg",
    "assets/cardImages/G2bassClef.svg",
    "assets/cardImages/A2bassClef.svg",
    "assets/cardImages/B2bassClef.svg",
    "assets/cardImages/C3bassClef.svg",
    "assets/cardImages/D3bassClef.svg",
    "assets/cardImages/E3bassClef.svg",
    "assets/cardImages/F3bassClef.svg",
    "assets/cardImages/G3bassClef.svg",
    "assets/cardImages/A3bassClef.svg",
    "assets/cardImages/B3bassClef.svg",
    "assets/cardImages/C4bassClef.svg",
    "assets/cardImages/D4bassClef.svg",
    "assets/cardImages/E4bassClef.svg",
    "assets/cardImages/F4bassClef.svg",
    "assets/cardImages/G4bassClef.svg",
    "assets/cardImages/F3trebleClef.svg",
    "assets/cardImages/G3trebleClef.svg",
    "assets/cardImages/A3trebleClef.svg",
    "assets/cardImages/B3trebleClef.svg",
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
    "assets/cardImages/A5trebleClef.svg",
    "assets/cardImages/B5trebleClef.svg",
    "assets/cardImages/C6trebleClef.svg",
    "assets/cardImages/D6trebleClef.svg",
    "assets/cardImages/E6trebleClef.svg",
    "assets/cardImages/F6trebleClef.svg",
    "assets/cardImages/G6trebleClef.svg",
    "assets/cardImages/A6trebleClef.svg",
    "assets/cardImages/B6trebleClef.svg"

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

let TREBLE_INDEX = 16;
let BASS_INDEX = 24;

export default class Deck {
    constructor(clefSelection, difficultySelection) {
        const cardsDirty = freshDeck(clefSelection);
        this.cards = difficultyComb(difficultySelection, cardsDirty);
        console.log(this.cards);
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
    constructor(img, name, clef) {
        this.img = img;
        this.name = name;
        this.clef = clef;
    }
}

function makeNotes() {
    const notes = [];
    let j = BASS_INDEX + 1;
    for (let index = 0; index <= BASS_INDEX; index++) {
        notes[index] = new Note(IMAGES[index], NAMES[index], "BASS");
    }
    for(let index = TREBLE_INDEX; index < IMAGES.length-9; index++) {
        notes[index] = new Note(IMAGES[j], NAMES[index], "TREBLE");
        j++;
    }
    return notes;
}

function freshDeck(clefSelection) {
    if(clefSelection === "both") {
        const notes = makeNotes();
        const cards = [];
        let i = 0;
        notes.forEach(note => {
            if(note.clef.toLowerCase() != clefSelection) {
                cards[i] = new Card(note.clef, note);
                i++;
            } else {
                notes.splice(notes.indexOf(note),1);
            }
        })
        return cards;

    } else {
        const notes = makeNotes();
        const cards = [];
        let i = 0;
        notes.forEach(note => {
            if(note.clef.toLowerCase() != clefSelection) {
                notes.splice(notes.indexOf(note),1);
            } else {
                cards[i] = new Card(note.clef, note);
                i++;
            }
        })
        return cards;
    }
}

function difficultyComb(difficultySelection, c) {
    const dirtyCards = c;
    const cards = [];
    let i = 0;
    for(let index = 0; index < dirtyCards.length; index++) {
        if(CARD_DIFFICULTY_MAP[dirtyCards[index].difficulty] === undefined || CARD_DIFFICULTY_MAP[dirtyCards[index].difficulty] > DIFFICULTY_VALUE_MAP[difficultySelection]) {
            dirtyCards.splice(index, 1);
        } else {
            cards[i] = dirtyCards[index];
            i++;
        }

    }
    return cards;
}
