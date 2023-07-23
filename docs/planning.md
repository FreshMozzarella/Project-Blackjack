## Student: Alec Taylor
## Blackjack Project 1 Planning 

* Do not have to implement splitting hands
* (Stretch Goal) - implement wagering feature
* SVG for back of cards and front
* Watch, read, and paly a lot of blackjack to understand the rules completely

## Game Choice - Blackjack

## Screenshot for Wireframes
[First Draft of Wireframe](assets/imgs/wireframe_1.png)
### Sample Image - Example

![image for demonstration]{}

### Pseudo-Pseudo code
* Page loads
    * initialize the state variables
    * deck of cards and suits  stored in a class of objects (aces have either a value of 1 or 11)
    * render
* User clicks the start / deal hand button
* One of the dealers cards is flipped over
* series of dom elements reveal all of the players cards, storing svg card html info and revealing them when dealt
* Player can either hit (add another card), split (only if two cards have the same value, separate them to make two hands), double-down(wager is doubled, take another card value), stand(end turn without receiving card) or give up 
* Dealer must continue to take cards with some sort of hit() function until value reaches 17 or greater in which they can stand
* The first person to reach over 21 loses the game
## Pseudocode
* to make a new element when clicked- create function createElement, give it some content, then add node that contains the info you want, then add it to the newly created div
* what does the application need to 'remember' throughout its execution? 
    * The 52 card deck with each value, suit
    * a shuffled copy of the original is made in when the round begins
    * an array or object to hold the user and the computers current hand
    * face cards = 10
    * ace = 1 OR 11
    * Number cards 2-10
    * functions to check - ace is soft or hard, if only two cards in hand in order to double, two of the same value cards in order split
    * Dealers first 'revealed' card, then continue to draw until 17 or higher
    * function to compare the both and evaluate the higher score
