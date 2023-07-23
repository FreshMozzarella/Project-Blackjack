class Card{
    constructor(suit, rank, score){ 
      this.suit = suit
      this.rank = rank
      this.score = score 
    }
    
    toString(){
      return `${this.rank} of ${this.suit}`
    }
  }
  
  const aceOfSpades = new Card("spades", "A", 1)
  const threeOfClubs = new Card("clubs", "3", 3)
  
  class Deck{
    
    static suits = ["club", "heart", "spade", "diamond"]
    static ranks = ['A', 2,3,4,5,6,7,8,9,10,"J","Q","K"]
    static scores = [1,2,3,4,5,6,7,8,9,10,11,12,13]
    
    constructor(){
      this.cards = []
    }
    
    makeCards (){
      Deck.suits.forEach(suit=>{
        Deck.ranks.forEach((rank, idx)=>{
          // console.log(suit, rank, Deck.scores[idx])       
          this.cards.push(new Card(suit, rank, Deck.scores[idx]))
        })
      })
    }
    
    shuffle(){
    }
  }
  
  const testDeck = new Deck()
  
  testDeck.makeCards()
  
  testDeck.cards[0].toString()