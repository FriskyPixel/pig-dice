'use strict';

/*
*   VARIABLES
*/


const UI_player0 = document.querySelector('.player--0');
const UI_player1 = document.querySelector('.player--1');
const UI_scoreTotal0 = document.getElementById('score--0');
const UI_scoreTotal1 = document.getElementById('score--1');
const UI_scoreCurrent0 = document.getElementById('current--0');
const UI_scoreCurrent1 = document.getElementById('current--1');
const UI_btnNewGame = document.querySelector('.btn--new'); 
const UI_btnRollDice = document.querySelector('.btn--roll');
const UI_btnHold = document.querySelector('.btn--hold');
const UI_imgDice = document.querySelector('.dice');

let scoreTotal, scoreCurrent, activePlayer, winningScore = 100;


resetGame();


/*
*   CLICK EVENTS
*/

//  New Game Btn
UI_btnNewGame.addEventListener('click', (e) => {
  e.preventDefault();
  resetGame();
});


// Roll Dice Btn
UI_btnRollDice.addEventListener('click', (e) => {
  e.preventDefault();

  const roll = rollDice();
  if (roll === 1) {
    updateCurrentScore(0);
    switchPlayer();
  }
  else {
    updateCurrentScore(roll+scoreCurrent);
  }
})


// Hold Btn
UI_btnHold.addEventListener('click', (e) => {
  e.preventDefault();

  if (scoreCurrent === 0) return;

  updateTotalScore(scoreCurrent);
  updateCurrentScore(0);

  if (scoreTotal[activePlayer] >= winningScore) {
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    UI_btnRollDice.setAttribute('disabled', '');
    UI_btnHold.setAttribute('disabled', '');
  } else {
    switchPlayer();
  }
})



/*
*   HELPER FUNCTIONS
*/


function resetGame() {
  scoreTotal = [0, 0];
  scoreCurrent = 0;
  activePlayer = 0;

  UI_scoreTotal0.textContent = 0;
  UI_scoreTotal1.textContent = 0;
  UI_scoreCurrent0.textContent = 0;
  UI_scoreCurrent1.textContent = 0;

  UI_imgDice.classList.add('hide');
  UI_player0.classList.add('player--active');
  UI_player1.classList.remove('player--active');
  UI_player0.classList.remove('player--winner');
  UI_player1.classList.remove('player--winner');

  UI_btnRollDice.removeAttribute('disabled');
  UI_btnHold.removeAttribute('disabled');

}

function rollDice() {
  const roll = Math.trunc(((Math.random() * 6) + 1));
  UI_imgDice.setAttribute('src', `dice-${roll}.png`);
  UI_imgDice.classList.remove('hide');
  return roll;
}

function updateCurrentScore(score) {
  scoreCurrent = score;
  document.getElementById(`current--${activePlayer}`).textContent = scoreCurrent;
}

function updateTotalScore(score) {
  scoreTotal[activePlayer] += score;
  document.getElementById(`score--${activePlayer}`).textContent = scoreTotal[activePlayer];
}

function switchPlayer() {
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
}