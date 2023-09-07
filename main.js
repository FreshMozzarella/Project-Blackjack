/*----- app's state (variables) -----*/
let slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8, slot9;
const betAmounts = [1, 5, 20, 40];
let betIndex = 0;
let bet = 1;
let coins = 100;
let isSpinning = false;
const AUDIO = new Audio('assets/other/SSBM.mp3');
AUDIO.volume = 0.2;
const SYMBOLS = ['🍒', '🍋', '🍊', '🍉', '🍇', '🍓', '🍍', '🥝', '💎', '7️⃣'];
let slotIndex = 1;

/*----- cached element references -----*/
const betEl = document.querySelector(".spinBtn");
const coinsEl = document.querySelector(".total-amount");
const musicButton = document.querySelector(".music");
const decreaseBetBtn = document.querySelector(".bet-decrease");
const increaseBetBtn = document.querySelector(".bet-increase");
const spinBtn = document.querySelector(".spinBtn");
const columns = document.querySelectorAll('.door .column'); 
/*----- event listeners -----*/
decreaseBetBtn.addEventListener("click", decreaseBet);
increaseBetBtn.addEventListener("click", increaseBet);
spinBtn.addEventListener("click", spin);
musicButton.addEventListener("click", toggleAudioPlayback);

/*----- functions -----*/

function init() {
  let slotCounter = 1;
  columns.forEach(column => {
      const slot = column.querySelector(`.slot.slot${slotCounter}`);
      const slotDup = column.querySelector(`.slot.slot${slotCounter}-dup`);
      
      if (slot && slotDup) {
          window[`slot${slotCounter}`] = "🍒";
          slot.textContent = window[`slot${slotCounter}`];
          slotDup.textContent = window[`slot${slotCounter}`];  // Initialize duplicate slot
      } else {
          console.error(`Slot ${slotCounter} or its duplicate not found!`);
      }
      
      slotCounter++;
  });
  
  render();
  updateDisplay();
}

function updateDisplay() {
  betEl.innerText = "Spin = " + bet + "$";
  coinsEl.innerText = coins;
  spinBtn.disabled = coins < bet || (coins === 0);
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
  console.log("Start Spin", slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8, slot9);
   
  if (isSpinning || spinBtn.disabled) return;
  isSpinning = true;
  spinBtn.disabled = true;

  columns.forEach(column => {
    let slotCounter = 1;
    while (true) {
        const slot = column.querySelector(`.slot.slot${slotCounter}`);
        const slotDup = column.querySelector(`.slot.slot${slotCounter}-dup`);
        
        if (!slot && !slotDup) break; // exit the loop if neither slot nor slotDup is found

        if (slot) slot.classList.add('spin-animation');
        if (slotDup) slotDup.classList.add('spin-animation');
        
        slotCounter++;
    }
  });

  setTimeout(() => {
      columns.forEach(column => {
          const slot = column.querySelector('.slot');
          const slotDup = column.querySelector('.slot-dup');

          if (slot) {
              slot.classList.remove('spin-animation');
              const randomValue = getRandomValue();
              slot.textContent = randomValue;
              const slotName = slot.className.split(' ')[1];
              const slotNum = slotName.replace('slot', '');
              window[`slot${slotNum}`] = randomValue;
          }

          if (slotDup) {
              slotDup.classList.remove('spin-animation');
              slotDup.textContent = getRandomValue(); // Assuming you want a random value for the duplicate slot as well
          }
      });

      coins -= bet;
      evalSlots().forEach(symbol => renderPayout(symbol));
      isSpinning = false;
      render();
  }, 5000);
}

function render() {
  let slotIndex = 1;
  columns.forEach((column) => {
      const slot = column.querySelector(`.slot.slot${slotIndex}`);
      const slotDup = column.querySelector(`.slot.slot${slotIndex}-dup`);
      
      if (slot) slot.textContent = window[`slot${slotIndex}`];
      if (slotDup) slotDup.textContent = window[`slot${slotIndex}`];
      
      slotIndex++;
  });

  updateDisplay();
}

function updateBetButtonStates() {
  decreaseBetBtn.classList.toggle("hidden", betIndex === 0);
  increaseBetBtn.classList.toggle("hidden", betIndex === betAmounts.length - 1);
}

function evalSlots() {
  let results = [];
  if (bet >= 1) results = results.concat(basicHorizontalTest());
  if (bet >= 5) results = results.concat(allHorizontalTest());
  if (bet >= 20) results = results.concat(verticalTest());
  if (bet === 40) results = results.concat(diagonalTest());
  return results;
}

function basicHorizontalTest() {
  if (slot4 === slot5 && slot5 === slot6) return [slot4];
  return [];
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
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

function toggleAudioPlayback() {
  if (AUDIO.paused) AUDIO.play();
  else AUDIO.pause();
}

init();
