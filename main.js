/*----- constants -----*/
const symbols = ['🍒','🍇', 'ッ', '💎', '𝟕']
const AUDIO = new Audio('assets/other/SSBM.mp3')
/*----- state variables -----*/
let initialMoney = 500
let betIncrement = 0;
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
})
increaseBtn.addEventListener('click', () => {
      
     if (betIncrement === 0){
      if (parseInt(`${totalMoney.innerText}`) < 5){
        textWindow.innerText = "You don't have enough money"
        return;
      } else
      totalMoney.innerText = parseInt(`${totalMoney.innerText}`) - 5;
      console.log('betting 5$');
      betIncrement++;
      decreaseBtn.removeAttribute('disabled');
     } 
     else if (betIncrement === 1){
      if (parseInt(`${totalMoney.innerText}`) < 20){
        textWindow.innerText = "You don't have enough money"
        return;
      } else
      totalMoney.innerText = parseInt(`${totalMoney.innerText}`) - 20;
      console.log('betting 20$');
      betIncrement++
     }
     else if(betIncrement === 2){
      if (parseInt(`${totalMoney.innerText}`) < 40){
        textWindow.innerText = "You don't have enough money"
        return;
      } else
      totalMoney.innerText = parseInt(`${totalMoney.innerText}`) - 40;
      console.log('betting 40$. Max bet!');
      betIncrement++;
      increaseBtn.setAttribute('disabled', '');
     }
     else return 'CRITICAL ERROR' 
     console.log(parseInt(`${totalMoney.innerText}`))
    })
decreaseBtn.addEventListener('click', () => {
if (betIncrement === 3) { 
  totalMoney.innerText = parseInt(`${totalMoney.innerText}`) + 40;
  console.log('decreasing bet by 40$');
  betIncrement--;
  increaseBtn.removeAttribute('disabled');
} 
else if (betIncrement === 2) {
  totalMoney.innerText = parseInt(`${totalMoney.innerText}`) + 20;
  console.log('decreasing bet by 20$');
  betIncrement--
} 
else if(betIncrement === 1){
  totalMoney.innerText = parseInt(`${totalMoney.innerText}`) + 5
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
  totalMoney.innerText = parseInt(`${totalMoney.innerText}`) - 5;
  console.log('spinning slots!')
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
    await delay(5000);
   console.log('waited for 4 seconds')
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
    render(); 
};

function init() {
  console.log('initializing')
  totalMoney.innerText = '500'
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
setInterval(() => {
  if(parseInt(`${totalMoney.innerText}`) <= 5){
    openModal();
    clearInterval() 
   }
}, 100); // else
  // totalMoney.innerText = '500'
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
    totalMoney.innerText = parseInt(`${totalMoney.innerText}`) + 100
    return true // add paytable values here
  }
}

function allHorizontalTest() {
  if ((firstSlot.innerText === secondSlot.innerText && secondSlot.innerText === thirdSlot.innerText) || (fourthSlot.innerText === fifthSlot.innerText && fifthSlot.innerText === sixthSlot.innerText) || (seventhSlot.innerText === eighthSlot.innerText && eighthSlot.innerText === ninthSlot.innerText)) {
    console.log('test passed!, heres some money!')
    totalMoney.innerText = parseInt(`${totalMoney.innerText}`) + 200
    return true // add paytable values here
  }
}
function verticalTest() {
  if ((firstSlot.innerText === fourthSlot.innerText && fourthSlot.innerText === seventhSlot.innerText) || (secondSlot.innerText === fifthSlot.innerText && fifthSlot.innerText === eighthSlot.innerText) || (thirdSlot.innerText === sixthSlot.innerText && sixthSlot.innerText === ninthSlot.innerText)) {
    console.log('test passed!, heres some money!')
    totalMoney.innerText = parseInt(`${totalMoney.innerText}`) + 300
    return true // add paytable values here
  }
}
function diagonalTest() {
  if ((firstSlot.innerText === fifthSlot.innerText && fifthSlot.innerText === ninthSlot.innerText) || (thirdSlot.innerText === fifthSlot.innerText && fifthSlot.innerText === seventhSlot.innerText)) {
    console.log('test passed!, heres some money!')
    totalMoney.innerText = parseInt(`${totalMoney.innerText}`) + 200
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

 init();