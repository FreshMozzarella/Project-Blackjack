/*----- constants -----*/
const symbols = ['🍒', '🍇', 'ッ', '💎', '𝟕']
const slots = []
const symbolPayout = {
  '🍒': 100,
  '🍇': 250,
  'ッ': 500,
  '💎': 1000,
  '𝟕': 2000
}
const AUDIO = new Audio('assets/other/SSBM.mp3')
/*----- state variables -----*/
let initialMoney = 500;
let betIncrement = 0;
let currentMoney;
isPlaying = false;
 
/*----- cached elements  -----*/

const increaseBtn = document.querySelector('.bet-increase')
const decreaseBtn = document.querySelector('.bet-decrease')
const totalMoney = document.querySelector('.total-amount')
const firstSlot = document.querySelector('.slot1')
const secondSlot = document.querySelector('.slot2')
const thirdSlot = document.querySelector('.slot3')
const fourthSlot = document.querySelector('.slot4')
const fifthSlot = document.querySelector('.slot5')
const sixthSlot = document.querySelector('.slot6')
const seventhSlot = document.querySelector('.slot7')
const eighthSlot = document.querySelector('.slot8')
const ninthSlot = document.querySelector('.slot9')
const musicBtn = document.querySelector('.music')
const spinBtn = document.querySelector('.spinBtn')
const textWindow = document.querySelector('.alert')
const slotWindow = document.querySelector('.slot-container')
const cancelBtn = document.querySelector('.btn-cancel');
const submitBtn = document.querySelector('.btn-submit');
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const modalTextBox = document.querySelector('.textbox')
const slotDivEls = document.querySelectorAll('.slot-container > div')
/*----- event listeners -----*/
document.querySelector('.btn-close').addEventListener('click', closeModal)
cancelBtn.addEventListener('click', closeModal)
submitBtn.addEventListener('click', () => {
  init();
  closeModal();
})
increaseBtn.addEventListener('click', () => {

  if (betIncrement === 0) {
    if (currentMoney < 5) {
      textWindow.innerText = "You don't have enough money"
      return;
    } else
      currentMoney -= 5
    totalMoney.innerText = `${currentMoney}`;
    textWindow.innerText = 'you bet 5$ - all horizontal paylines';
    betIncrement++;
    decreaseBtn.removeAttribute('disabled');
  }
  else if (betIncrement === 1) {
    if (currentMoney < 20) {
      textWindow.innerText = "You don't have enough money"
      return;
    } else
      currentMoney -= 20
    totalMoney.innerText = `${currentMoney}`;
    textWindow.innerText = 'you bet 20$ - all horizontal & vertical paylines';
    betIncrement++
  }
  else if (betIncrement === 2) {
    if (currentMoney < 40) {
      textWindow.innerText = "You don't have enough money"
      return;
    } else
      currentMoney -= 40
    totalMoney.innerText = `${currentMoney}`;
    textWindow.innerText = 'you bet 40$ Max Bet! - all horizontal, vertical, diagonal paylines';
    betIncrement++;
    increaseBtn.setAttribute('disabled', '');
  }
  else return 'CRITICAL ERROR'
})
decreaseBtn.addEventListener('click', () => {
  if (betIncrement === 3) {
    currentMoney += 40
    totalMoney.innerText = `${currentMoney}`
    textWindow.innerText = 'decreasing bet';
    betIncrement--;
    increaseBtn.removeAttribute('disabled');
  }
  else if (betIncrement === 2) {
    currentMoney += 20
    totalMoney.innerText = `${currentMoney}`
    textWindow.innerText = 'decreasing bet';
    betIncrement--
  }
  else if (betIncrement === 1) {
    currentMoney += 5
    totalMoney.innerText = `${currentMoney}`
    betIncrement--;
    textWindow.innerText = "Can't go any lower"
    decreaseBtn.setAttribute('disabled', '')
  } else return 'CRITICAL ERROR'
})
spinBtn.addEventListener('click', render)
musicBtn.addEventListener('click', function togglePlay() {
  AUDIO.volume = 0.01
  isPlaying ? AUDIO.pause() : AUDIO.play()
})
AUDIO.onplaying = function () {
  isPlaying = true
};
AUDIO.onpause = function () {
  isPlaying = false;
}


/*----- functions -----*/
function evalSlots() {
  if (betIncrement === 0) {
    console.log('checking bet increment and comparing to tests')
    console.log(betIncrement)
    const result = basicHorizontalTest();
    if (result !== null){
      return result;
    }
  } else if (betIncrement === 1) {
    console.log('checking bet increment and comparing to all horizontal tests')
    console.log(betIncrement)
    const result1 = basicHorizontalTest();
    const result2 = allHorizontalTest();
    if (result1 !== null) {
      return result1;
    }
    if (result2 !== null) {
      return result2;
    }

  } else if (betIncrement === 2) {
    console.log('checking for all vertical, horizontal, and basic tests')
    console.log(betIncrement)
    const result1 = basicHorizontalTest();
    const result2 = allHorizontalTest();
    const result3 = verticalTest();
    if (result1 !== null) {
      return result1;
    }
    if (result2 !== null) {
      return result2;
    }
    if (result3 !== null) {
      return result3;
    }
  } else if (betIncrement === 3) {
    console.log('performing all available tests')
    console.log(betIncrement)
    const result1 = basicHorizontalTest();
    const result2 = allHorizontalTest();
    const result3 = verticalTest();
    const result4 = diagonalTest();
    if (result1 !== null) {
      return result1;
    }
    if (result2 !== null) {
      return result2;
    }
    if (result3 !== null) {
      return result3;
    }
    if (result4 !== null) {
      return result4;
    }}
};
function spinning(){
  slotDivEls.classList.add('hidden')
  slotDivEls.setAttribute('id','isSpinning')
  setTimeout(() =>{
    slotDivEls.classList.remove('hidden')
    slotDivEls.removeAttribute('id')
  },4000)
}

function init() {
  console.log('initializing')
  currentMoney = initialMoney;
  totalMoney.innerText = `${currentMoney}`
  betIncrement = 0;
}
function render() {
  console.log('rendering data')
  spinBtn.setAttribute('disabled', '')
  make2D();
  renderSlots();
  const output = evalSlots();
  if (output !== null) {
    renderPayout(output);
  } else {
    textWindow.innerText = 'no luck!';
  }
  renderGameOver();
  decreaseBtn.setAttribute('disabled', '')
  increaseBtn.removeAttribute('disabled')
  slots.length = 0;
  betIncrement = 0;
  spinBtn.removeAttribute('disabled')
}

function renderGameOver() {
  if (currentMoney <= 5) {
    console.log('opening modal')
    openModal();
  }
}

function basicHorizontalTest() {
  if (
    slots[1][0] === slots[1][1] &&
    slots[1][1] === slots[1][2]
  ) {
    return slots[1][0];
  }
return null
}

function allHorizontalTest() {
  for (let i = 0; i < 3; i++) {
    if (
      slots[i][0] === slots[i][1] &&
      slots[i][1] === slots[i][2]
    ) {
      return slots[i][0]; 
    }
  }
  return null
}
function verticalTest() {
  for (let i = 0; i < 3; i++) {
    if (
      slots[0][i] === slots[1][i] &&
      slots[1][i] === slots[2][i]
    ) {
      return slots[0][i]; 
    }
  }
  return null
}
function diagonalTest() {
  if (slots[0][0] === slots[1][1] && slots[0][0] === slots[2][2]) {
    return slots[0][0]; 
  } else if (
    slots[0][2] === slots[1][1] &&
    slots[0][2] === slots[2][0]
  ) {
    return slots[0][2]; 
  } else
    return null; 
}

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
function openModal() {
  if (currentMoney >= 2000) {
    modalTextBox.innerText = "You are rich! Go home!"
  } else {
    modalTextBox.innerText = 'You ran out of money. Game over!'
  }
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function make2D() {
  currentMoney -= 5
  totalMoney.innerText = `${currentMoney}`;// betIncrement - 0$ gets charged -5$ for spinning the basic reel, 1- 5$-5$, 2- 5$-$20, 3- 5$- 40$
  textWindow.innerText = 'Spinning!'
  for (i = 0; i < 3; i++) {
    slots[i] = [];
    for (j = 0; j < 3; j++) {
      slots[i][j] = symbols[Math.floor(Math.random() * symbols.length)]
    }
  }
  return slots
}
function renderSlots() {
  slots.forEach((row, rowIndex) => {
    row.forEach((symbol, colIndex) => {
      const index = rowIndex * 3 + colIndex;
      slotDivEls[index].innerText = symbol;
    });
  });
}

function renderPayout(output) {
  if (output in symbolPayout) {
    currentMoney += symbolPayout[output];
    totalMoney.innerText = `${currentMoney}`;
  } else {
    textWindow.innerText = 'no luck!'
  }
}

init();