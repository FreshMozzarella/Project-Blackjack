/*----- constants -----*/
const symbols = ['🍒','🍇', 'ッ', '💎', '𝟕']
const symbolPayout = {
  '🍒': 100,
  '🍇': 250,
  'ッ': 500,
  '💎': 1000,
  '𝟕': 2000
}
const AUDIO = new Audio('assets/other/SSBM.mp3')
/*----- state variables -----*/
let initialMoney = 60;
let betIncrement = 0;
let currentMoney;
isPlaying = false;

// betIncrement - 0$ gets charged -5$ for spinning the basic reel, 1- 5$-5$, 2- 5$-$20, 3- 5$- 40$ 
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
const delay = ms => new Promise(res => setTimeout(res, ms));
const cancelBtn = document.querySelector('.btn-cancel');
const submitBtn = document.querySelector('.btn-submit');
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')

/*----- event listeners -----*/

cancelBtn.addEventListener('click', closeModal)
submitBtn.addEventListener('click', () =>{
  init();
  closeModal();
})
increaseBtn.addEventListener('click', () => {
      
     if (betIncrement === 0){
      if (currentMoney < 5){
        textWindow.innerText = "You don't have enough money"
        return;
      } else
      currentMoney -= 5
      totalMoney.innerText = `${currentMoney}` ;
      textWindow.innerText = 'you bet 5$';
      betIncrement++;
      decreaseBtn.removeAttribute('disabled');
     } 
     else if (betIncrement === 1){
      if (currentMoney < 20){
        textWindow.innerText = "You don't have enough money"
        return;
      } else
      currentMoney -= 20
      totalMoney.innerText = `${currentMoney}`;
      textWindow.innerText = 'you bet 20$';
      betIncrement++
     }
     else if(betIncrement === 2){
      if (currentMoney < 40){
        textWindow.innerText = "You don't have enough money"
        return;
      } else
      currentMoney -= 40
      totalMoney.innerText = `${currentMoney}`;
      textWindow.innerText = 'you bet 40$ Max Bet!';
      betIncrement++;
      increaseBtn.setAttribute('disabled', '');
     }
     else return 'CRITICAL ERROR' 
     console.log(parseInt(`${totalMoney.innerText}`))
     console.log(currentMoney)
    })
decreaseBtn.addEventListener('click', () => {
if (betIncrement === 3) { 
  currentMoney += 40
  totalMoney.innerText = `${currentMoney}`
  console.log('decreasing bet by 40$');
  betIncrement--;
  increaseBtn.removeAttribute('disabled');
} 
else if (betIncrement === 2) {
  currentMoney += 20
  totalMoney.innerText = `${currentMoney}`
  console.log('decreasing bet by 20$');
  betIncrement--
} 
else if(betIncrement === 1){
  currentMoney += 5
  totalMoney.innerText = `${currentMoney}`
  console.log('decreasing bet by 5$');
  betIncrement--;
  textWindow.innerText = "Can't go any lower"
  decreaseBtn.setAttribute('disabled', '')
} else return 'CRITICAL ERROR'
})
spinBtn.addEventListener('click', evalSlots)
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
function spinSlots() {
  currentMoney -= 5
  totalMoney.innerText = `${currentMoney}`;
  textWindow.innerText = 'Spinning!'
  setTimeout(() => firstSlot.innerText = rdmIdx(), Math.floor(Math.random() * 3000));
  setTimeout(() => secondSlot.innerText = rdmIdx(), Math.floor(Math.random() * 3000));
  setTimeout(() => thirdSlot.innerText = rdmIdx(), Math.floor(Math.random() * 3000));
  setTimeout(() => fourthSlot.innerText = rdmIdx(), Math.floor(Math.random() * 3000));
  setTimeout(() => fifthSlot.innerText = rdmIdx(), Math.floor(Math.random() * 3000));
  setTimeout(() => sixthSlot.innerText = rdmIdx(), Math.floor(Math.random() * 3000));
  setTimeout(() => seventhSlot.innerText = rdmIdx(), Math.floor(Math.random() * 3000));
  setTimeout(() => eighthSlot.innerText = rdmIdx(), Math.floor(Math.random() * 3000));
  setTimeout(() => ninthSlot.innerText = rdmIdx(), Math.floor(Math.random() * 3000));
}
async function evalSlots() {
    spinSlots()
    await delay(3000);
   console.log('waited for 3 seconds')
    if (betIncrement === 0) {
      console.log('checking bet increment and comparing to tests')
      console.log(betIncrement)
       basicHorizontalTest();
    } else if (betIncrement === 1) {
      console.log('checking bet increment and comparing to all horizontal tests')
      console.log(betIncrement)
        basicHorizontalTest();
       allHorizontalTest();
    } else if (betIncrement === 2){
      console.log('checking for all vertical, horizontal, and basic tests')
      console.log(betIncrement)
      basicHorizontalTest();
      allHorizontalTest();
      verticalTest();
    } else if (betIncrement === 3){
      console.log('performing all available tests')
      console.log(betIncrement)
      basicHorizontalTest();
      allHorizontalTest();
      verticalTest();
      diagonalTest();
    }
   await delay(2000);
   render();
};

function init() {
  console.log('initializing')
  currentMoney = initialMoney;
  totalMoney.innerText = `${currentMoney}`
  // totalMoney.innerText = '20'
  betIncrement = 0;
 render()
}
function render() {
  console.log('rendering data')
  decreaseBtn.setAttribute('disabled', '')
  increaseBtn.removeAttribute('disabled')
  betIncrement = 0;
  renderGameOver();
  // renderSlots();
  // while (slotWindow.firstChild) {
  //   slotWindow.removeChild(slotWindow.firstChild)
  // }
}
function renderGameOver() {
  if (currentMoney <= 5){
    console.log('opening modal')
    openModal();
  }
}

function renderSlots(){
firstSlot.innerText = ''
secondSlot.innerText = ''
thirdSlot.innerText = ''
fourthSlot.innerText = ''
fifthSlot.innerText = ''
sixthSlot.innerText = ''
seventhSlot.innerText = ''
eighthSlot.innerText = ''
ninthSlot.innerText = ''
}


function rdmIdx() {
  return symbols[Math.floor(Math.random() * symbols.length)]

}
function basicHorizontalTest() {
  if (fourthSlot.innerText === fifthSlot.innerText && fifthSlot.innerText === sixthSlot.innerText) {
    console.log('test passed!, heres some money!')
    textWindow.innerText = 'You won $100!'
    currentMoney += 100
    totalMoney.innerText = `${currentMoney}`
    return true // add paytable values here
  }
}

function allHorizontalTest() {
  if ((firstSlot.innerText === secondSlot.innerText && secondSlot.innerText === thirdSlot.innerText) || (fourthSlot.innerText === fifthSlot.innerText && fifthSlot.innerText === sixthSlot.innerText) || (seventhSlot.innerText === eighthSlot.innerText && eighthSlot.innerText === ninthSlot.innerText)) {
    console.log('test passed!, heres some money!')
    textWindow.innerText = 'You won $200!'
    currentMoney += 200
    totalMoney.innerText = `${currentMoney}`
    return true // add paytable values here
  }
}
function verticalTest() {
  if ((firstSlot.innerText === fourthSlot.innerText && fourthSlot.innerText === seventhSlot.innerText) || (secondSlot.innerText === fifthSlot.innerText && fifthSlot.innerText === eighthSlot.innerText) || (thirdSlot.innerText === sixthSlot.innerText && sixthSlot.innerText === ninthSlot.innerText)) {
    console.log('test passed!, heres some money!')
    textWindow.innerText = 'You won $300!'
    currentMoney += 300
    totalMoney.innerText = `${currentMoney}`
    return true // add paytable values here
  }
}
function diagonalTest() {
  if ((firstSlot.innerText === fifthSlot.innerText && fifthSlot.innerText === ninthSlot.innerText) || (thirdSlot.innerText === fifthSlot.innerText && fifthSlot.innerText === seventhSlot.innerText)) {
    console.log('test passed!, heres some money!')
    textWindow.innerText = 'You won $500!'
    currentMoney += 500
    totalMoney.innerText = `${currentMoney}`
    return true // add paytable values here
  }
}

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function checkPayout(){
  let payAmount = 0;
  if (){}
}

 init();