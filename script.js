'use strict';

// Selecting elements
const _player0El = document.querySelector('.player--0');
const _player1El = document.querySelector('.player--1');

const _score0El = document.querySelector('#score--0');
const _score1El = document.getElementById('score--1');
const _current0El = document.getElementById('current--0');
const _current1El = document.getElementById('current--1');

const _diceEl = document.querySelector('.dice');
const _btnNew = document.querySelector('.btn--new');
const _btnRoll = document.querySelector('.btn--roll');
const _btnHold = document.querySelector('.btn--hold');

// Starting conditions
let _scores, _currentScore, _activePlayer, _playing;

const init = function() {
    _scores = [0, 0];
    _currentScore = 0;
    _activePlayer = 0;
    _playing = true;
    _score0El.textContent = 0;
    _score1El.textContent = 0;
    _current0El.textContent = 0;
    _current1El.textContent = 0;
    _diceEl.classList.add('hidden');
    _player0El.classList.remove('player--winner');
    _player1El.classList.remove('player--winner');
    _player0El.classList.add('player--active');
    _player1El.classList.remove('player--active');
}

init();

const switchPlayer = function () {
    document.getElementById(`current--${_activePlayer}`).textContent = 0;
    _currentScore = 0;
    _activePlayer = _activePlayer === 0 ? 1 : 0;
    _player0El.classList.toggle('player--active');
    _player1El.classList.toggle('player--active');
}

// Rolling dice functionality
_btnRoll.addEventListener('click', function() {
    if (_playing) {
        // 1. Generating a random dice roll
        const _dice = Math.trunc(Math.random() * 6) + 1;
        console.log(_dice);

        // 2. Display dice
        _diceEl.classList.remove('hidden');
        _diceEl.src = `dice-${_dice}.png`;

        // 3. Check for rolled 1: if true, switch to next player
        if ( _dice !== 1 ) {
        // Add dice to current score
            _currentScore += _dice;
            document.getElementById(`current--${_activePlayer}`).textContent = _currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }    
})

_btnHold.addEventListener( 'click', function() {
    if (_playing) {
        // 1.Add current score to active player's score
        _scores[_activePlayer] += _currentScore;
        // _scores[1] = _scores[1] + _currentScore;
        document.getElementById(`score--${_activePlayer}`).textContent = _scores[_activePlayer];

        // 2. Check if player's score is >= 100
        if( _scores[_activePlayer] >= 30 ) {
            // Finish the game
            _playing = false;
            _diceEl.classList.add('hidden');
            document.querySelector(`.player--${_activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${_activePlayer}`).classList.remove('player--active');
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
} )

_btnNew.addEventListener( 'click', init);