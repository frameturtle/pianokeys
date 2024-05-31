const CLEFS = ["BASS","TREBLE"]
const NOTES = ["C4","C-4","D4","D-4","E4","F4","F-4","G4","G-4","A4",
"A-4","B4","C5","C-5","D5","D-5","E5","F5","F-5","G5","G-5","A5","A-5"]


export default class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards
    }

    get numberOfCards() {
        return this.cards.length
    }

    shuffle() {
        for(let i = this.numberOfCards - 1; i >0; i--) {
            const newIndex = Math.floor(Math.random()*(i+1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }
}


class Card {
    constructor(clef, note) {
        this.clef = clef
        this.note = note
    } 
}

class Image {
    constructor(img, name) {

    }
}

function freshDeck() {
    return CLEFS.flatMap(clef => {
        return NOTES.map(note => {
            return new Card(clef, note)
        })
    })
}