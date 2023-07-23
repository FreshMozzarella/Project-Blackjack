/*----- constants -----*/

const cardDeck = class Card {
    constructor(suit, rank, score){
        this.suit = suit
        this.rank = rank
        this.score = score
    }
}
const userHand = []
const computerHand= []

/*----- state variables -----*/

/*----- cached elements  -----*/

/*----- event listeners -----*/

/*----- functions -----*/
function init() {
    console.log('game started')
}
function render() {
    console.log('rendering data..')
    // styling DOM elements
    // accesssing properties
}

function checkForAces() {
    // search through computer and player array hand
    // return if they have an ace
    console.log('checking for aces')
}

function aceVerify(){
    console.log('current  aces in deck: ', checkForAces())
    console.log('comparing if ace should be high or low..')
    // is total value is 21 or under, let it have value of 11
    // if it does, turn into value of 1
}
function shuffleDeck(){
    // take shallow copy of class, rearrange card order and store it in an array
    console.log('shuffling cards') 
}

function renderHit(){
    // adds card from shallow copy of the shuffled deck to user or computer hand array
}

function renderSplit(){
    // split deck array into two different arrays ONLY if the values of the original array are the same
}

function doubleDown(){
    // adds one more card to the array hand and doubles bet amount
    // Note- since without the betting system is not a priority, this function isn't important right now--the hit function achieves the same thing
}

function standHand(){
    // person ends their turn and the next person starts their turn
}

function dealerChoice(){
    // renderHit() until 17 or over
    // end turn (stand) 
}



function renderScore(){
    //  aceVerify()
    // if not 21, continue evaluating. Otherwise, display if computer or player won if not -
    // if over 21, that person loses and the other wins. If not then -
    // compare statement - higher number wins
}