/*----- app's state (variables) -----*/
let slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8, slot9;
const betAmounts = [1, 5, 20, 40];
let betIndex = 0;
let bet = 1;
let coins = 100;
let isSpinning = false;
const MAX_BET = 10;
const MIN_BET = 1;
const AUDIO = new Audio('assets/other/SSBM.mp3')
AUDIO.volume = 0.2;
/*----- cached element references -----*/
const slotEls = Array.from(document.querySelectorAll('.slot')); 
const betEl = document.querySelector(".spinBtn");
const coinsEl = document.querySelector(".total-amount");
const musicButton = document.querySelector(".music");
const decreaseBetBtn = document.querySelector(".bet-decrease");
const increaseBetBtn = document.querySelector(".bet-increase");
const spinBtn = document.querySelector(".spinBtn");

/*----- event listeners -----*/
decreaseBetBtn.addEventListener("click", decreaseBet);
increaseBetBtn.addEventListener("click", increaseBet);
spinBtn.addEventListener("click", spin);
spinBtn.addEventListener("click", function() {
  let slots = document.querySelectorAll(".slot");
  slots.forEach(slot => slot.classList.add("spin"));

  
  setTimeout(() => {
      slots.forEach(slot => slot.classList.remove("spin"));
  }, 5000);  
});
musicButton.addEventListener("click", toggleAudioPlayback);
/*----- functions -----*/
function init() {
  slot1 = slot2 = slot3 = "🍒";
  slot4 = slot5 = slot6 = "🍒";
  slot7 = slot8 = slot9 = "🍒";
    render();
    updateDisplay();
}
function updateDisplay() {

  betEl.innerText = "Spin = " + bet + "$";
  coinsEl.innerText = coins;
  spinBtn.disabled = coins < bet;
}
function decreaseBet() {
  if (betIndex === 0) return;
  betIndex--;
  bet = betAmounts[betIndex];

 
  updateBetButtonStates();

  render();
}

function increaseBet() {
  if (betIndex === betAmounts.length - 1) return;
  betIndex++;
  bet = betAmounts[betIndex];

 
  updateBetButtonStates();

  render();
}

function spin() {
  
  if (isSpinning || spinBtn.disabled) return; 

  if (coins < bet) {
      alert("Not enough coins to spin!");
      return;
  }

  // Mark the start of the spinning
  isSpinning = true;
  spinBtn.disabled = true;

  setTimeout(() => {
      // Determine the random values for the slots
      slot1 = getRandomValue();
      slot4 = getRandomValue();
      slot7 = getRandomValue();
      slot2 = getRandomValue();
      slot5 = getRandomValue();
      slot8 = getRandomValue();
      slot3 = getRandomValue();
      slot6 = getRandomValue();
      slot9 = getRandomValue();
  

      // Deduct the bet amount from the player's coins
      coins -= bet;

      // Evaluate the slots to determine any winnings and apply the payout
      const winnings = evalSlots();
      winnings.forEach(symbol => {
        renderPayout(symbol);
      });

      // Mark the end of spinning
      isSpinning = false;
      spinBtn.disabled = coins < bet || (coins === 0);
      // Refresh the display to show the results
      render();
  }, 2000);
}

function render() {
    
    slotEls[0].textContent = slot1;
    slotEls[1].textContent = slot4;
    slotEls[2].textContent = slot7;
    slotEls[3].textContent = slot2;
    slotEls[4].textContent = slot5;
    slotEls[5].textContent = slot8;
    slotEls[6].textContent = slot3;
    slotEls[7].textContent = slot6;
    slotEls[8].textContent = slot9;
    updateDisplay();
    const output = evalSlots();
    
}
function updateBetButtonStates() {
  decreaseBetBtn.classList.toggle("hidden", betIndex === 0);
  increaseBetBtn.classList.toggle("hidden", betIndex === betAmounts.length - 1);
}
function evalSlots() {
  let results = [];
  switch (bet) {
    case 1: 
      results = basicHorizontalTest();
      break;
    case 5:
      results = allHorizontalTest();
      break;
    case 20:
      results = results.concat(verticalTest());
      break;
    case 40:
      results = results.concat(diagonalTest());
      break;
  }
  return results;
}


function basicHorizontalTest() {
  if (slot4 === slot5 && slot5 === slot6) return [slot4];
  return []
}

function allHorizontalTest() {
  let wins = [];
  if (slot1 === slot2 && slot2 === slot3) wins.push(slot1);
  if (slot4 === slot5 && slot5 === slot6) wins.push(slot4);
  if (slot7 === slot8 && slot8 === slot9) wins.push(slot7);
  return wins;
}

function verticalTest() {
  let wins = [];
  if (slot1 === slot4 && slot4 === slot7) wins.push(slot1);
  if (slot2 === slot5 && slot5 === slot8) wins.push(slot2);
  if (slot3 === slot6 && slot6 === slot9) wins.push(slot3);
  return wins;
}

function diagonalTest() {
  let wins = [];
  if (slot1 === slot5 && slot5 === slot9) wins.push(slot1);
  if (slot3 === slot5 && slot5 === slot7) wins.push(slot3);
  return wins;
}

function renderPayout(symbol) {
  if (symbol) {
    switch (symbol) {
      case '🍒':
          coins += bet * 2;
          break;
      case '🍋':
          coins += bet * 3;
          break;
      case '🍊':
          coins += bet * 4;
          break;
      case '🍉':
          coins += bet * 5;
          break;
      case '🍇':
          coins += bet * 6;
          break;
      case '🍓':
          coins += bet * 7;
          break;
      case '🍍':
          coins += bet * 8;
          break;
      case '🥝':
          coins += bet * 9;
          break;
      case '💎':
          coins += bet * 10;
          break;
      case '7️⃣':
          coins += bet * 15;
          break;
    } 
    updateDisplay();
  }
}


function getRandomValue() {
    const symbols = ['🍒', '🍋', '🍊', '🍉', '🍇', '🍓', '🍍', '🥝', '💎', '7️⃣'];
    return symbols[Math.floor(Math.random() * symbols.length)];
}
function toggleAudioPlayback() {
  if (AUDIO.paused) {
      AUDIO.play();
  } else {
      AUDIO.pause();    
  }
}

init();