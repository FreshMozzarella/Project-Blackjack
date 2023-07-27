## Pseudocode
* each slot html element will display an innertext based on a random symbol from an array
* spinning set by a timeout function
* render() function is invoked once the spin button is clicked
* render functions disables the spin button to make sure it is not spam clicked
* A new 2d 3x3 array is created from random indexes of the symbol array
* The slots are then turned into a 1 dimensional array that outputs the value into the DOM
* the slots are then evaluated
* depending on the number of bets placed, the eval checks for horizontal, all horizontal, all vertical, and all diagonal patterns that match three in a row
* some of the test go through a for loop to run through conditional statements
* if a value is equal to a pattern, then it is hoisted up from the eval and becomes the output constant variable, otherwise the function returns null
* using the in syntax, the output goes through each of the properties inside the symbolPayout object and returns a payout amount. In this case, luck 7s have the highest payout of 2000$
* a variable currentMoney keeps track of the money inside the code and then prints it out onto the DOM
* If the currentMoney reaches less than or equal to 5, and since it costs 5$ to spin, the game ends and the modal appears to ask if the player wants to play again.
* If the player reaches 5000$ dollars, they are rich and can go home, the modal pops up and asks if the player wants to play again (note-this can take some time to accumulate)
* if the player selects the confirm button , the game is reinitialized and the money is reset to 500$
* the betting system keeps track of how many times you have clicked the increase or decrease bet by using a counter that increases based on conditional statements
* if the bet reaches max amount - 3 clicks or you do not have enough money to bet, the button is disabled
* the bets are 5- 20 -and 40$ each time they are increased- this is to mimic the pay-lines you have enabled
* the decrease button decrements the counter and adds money back into your total if you choose to undo before you spin
* initially it is disabled when you start so you can't click for more money
* the audio button enables a ternary statement that when is false, will begin playing the song, and can be paused when clicked on again
