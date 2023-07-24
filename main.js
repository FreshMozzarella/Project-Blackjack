  /*----- constants -----*/
const symbols = ['🍒','🍋','🍉','🍇','𝟕']
const AUDIO = new Audio('assets/other/SSBM.mp3')
  /*----- state variables -----*/
let isSpinning
let isPlaying = false
  /*----- cached elements  -----*/

  const firstSlot = document.querySelector('.slot1')
  const secondSlot = document.querySelector('.slot2')
  const thirdSlot = document.querySelector('.slot3')
  const fourthSlot = document.querySelector('.slot4')
  const fifthSlot = document.querySelector('.slot5')
  const slotArray = [firstSlot, secondSlot, thirdSlot, fourthSlot, fifthSlot]
  const musicBtn = document.querySelector('.music')
  /*----- event listeners -----*/
    musicBtn.addEventListener('click', function togglePlay(){
        AUDIO.volume = 0.01
        isPlaying ? AUDIO.pause() : AUDIO.play()
    })
    AUDIO.onplaying = function(){
        isPlaying = true
    };
    AUDIO.onpause = function(){
        isPlaying = false;
    }
  /*----- functions -----*/
function spinSlots(){
    // have all slots go through the timer a random amount of time between 1 and 3 seconds
    // when finished display the result of the rdmIdx
    console.log('spinning slots!')
    setTimeout(() => firstSlot.innerHTML = rdmIdx(), Math.floor(Math.random() * 3000));
    setTimeout(() => secondSlot.innerHTML = rdmIdx(), Math.floor(Math.random() * 3000));
    setTimeout(() => thirdSlot.innerHTML = rdmIdx(), Math.floor(Math.random() * 3000));
    setTimeout(() => fourthSlot.innerHTML = rdmIdx(), Math.floor(Math.random() * 3000));
    setTimeout(() => fifthSlot.innerHTML = rdmIdx(), Math.floor(Math.random() * 3000));
//   setTimeout(rdmIdx, 3000) 
}

function init(){
    console.log('initializing')
    
    render()
}

function render(){
    spinSlots()
    console.log('rendering data')
}

function rdmIdx(){
    return symbols[Math.floor(Math.random() * symbols.length)]
    
}


init();
