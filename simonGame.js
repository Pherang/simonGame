/* 
 The game of Simon
 We need a few buttons: start/reset, on/off, strict. 
 We need a counter to track the current pattern and a way to track the player's input.

 Player presses start and the pads are enabled.
 The computer then plays a tone, the tone it played also lights up.

 Computer adds random color to array. Reads each array element and lights the color and plays a tone.
 Each play lasts about 500ms. Once the computer has played the entire pattern from the array it is the players 
 turn to play the pattern. Perhaps I can remove the event handlers for the pad until it is the players turn.
 Computer has no more elements in its array to play then call playersTurn() to unlock pads.
 
 playersTurn needs to track the player's presses somehow. 
 If the player has pressed the pads as many times as the computer has pressed them in the computer's
 array then the turn is over.

 The players array is compared to the computers array. If they match the computer starts its next turn.
 If they dont match and strict mode is NOT on then the player gets to try again.
 If they don't match and strict mode is ON the game is reset and the computer starts again.

*/

// Need an array to store the computer's pattern and the players pattern so they can be compared.
var computerPattern = [];
var playerPattern = [];
var strictEnabled = false;
var score = 0;
/*
* Need a way to detect a win after user gets twenty patterns.
*/
function detectWin(boardObject){

}

/*
 Check patterns
 */
function checkPatterns (oneArray, anotherArray) {

  for (i = 0; i < oneArray.length; i++) {
    if (oneArray[i] !== anotherArray[i]) {
      return false;
    }
  }
  return true;

}

/* User presses simon pad.*/
function pressPad () {
  playerPattern.push(this.id);
  console.log('Player pattern ' + playerPattern.toString());
  console.log('Computer pattern ' + computerPattern.toString());
  if (playerPattern.length === computerPattern.length) {
    // check the pattern and then call the computers turn depending on the check result.
    
    if (!checkPatterns(playerPattern, computerPattern)) { 
      console.log('You forgot the pattern');
      if (strictEnabled) {
        scoreBoard.textContent = '! !'
        setTimeout( function () { scoreBoard.textContent = '- -';}, 800);
        setTimeout(initGame, 800);
        return true;
      } else {
        scoreBoard.textContent = '! !';
        playerPattern = [];
        setTimeout(function () { scoreBoard.textContent = score;}, 1000);
        return true;
      }
      
    }
    if (checkPatterns(playerPattern, computerPattern)) { 
      setTimeout(computerTurn, 500);
      return true;
    }
  }
}


function replayPattern () {
  
  function playButton (buttonName) {
    console.log(buttonName);
  }
  for (i=0; i < computerPattern.length; i++) {
    setTimeout(playButton, 500, computerPattern[i]);
  }
}

/* Enables strict mode which is game over if the player gets the pattern wrong */
function enableStrict () {
  if (strictEnabled === false ) {
    strictEnabled = true;
    strict.classList.add('strictEnabled');
  } else if (strictEnabled === true) {
    strictEnabled = false;
    strict.classList.remove('strictEnabled');
  }
  console.log(strictEnabled);
}

// function marks the visual grid and calls a function to mark the logical grid that is tracking the game.
// gridSpot is the HTML element ID of the spot on the grid clicked.
function playerTurn (padpressed) {
  unfreezePads();
  
}

// Computer presses a random pad and records the pad pressed.
function computerTurn () {
  score++;
  scoreBoard.textContent = score;
  freezePads();
  var randomPress = Math.round(Math.random() * 10);
  if (randomPress < 5) {
    if (randomPress % 2 === 0){
      computerPattern.push('green');
    }
    if(randomPress % 2 !== 0) {
      computerPattern.push('yellow');
    }
  }
  if (randomPress >= 5) {
    if (randomPress % 2 === 0){
      computerPattern.push('red');
    }
    if(randomPress % 2 !== 0) {
      computerPattern.push('blue');
    }
  }

  console.log('Playing computer pattern');
  replayPattern()
  playerPattern = [];
  setTimeout(playerTurn, 500);
}

// Four simon pads
var green = document.getElementById('green');
var red = document.getElementById('red');
var yellow = document.getElementById('yellow');
var blue = document.getElementById('blue');

function trackPress () {
  
}

function startGame () {
  // Passes 'this' so that the markSpot and markGrid functions knows which grid location to update.
  computerPattern = [];
  playerPattern = [];
  score = 0;
  scoreBoard.textContent = '- -';
  strict.removeEventListener('click', enableStrict, false);
  setTimeout(computerTurn, 300);
}

function unfreezePads () {
  green.addEventListener('click', pressPad, false );
  red.addEventListener('click', pressPad, false );
  yellow.addEventListener('click', pressPad, false );
  blue.addEventListener('click', pressPad, false );
}

function freezePads () {
  green.removeEventListener('click', pressPad, false );
  red.removeEventListener('click', pressPad, false );
  yellow.removeEventListener('click', pressPad, false );
  blue.removeEventListener('click', pressPad, false );
}

var scoreBoard = document.getElementById('scoreOne');
var isOn = false;

function powerOn () {

  if (isOn === false) {
    isOn = true;
    start.addEventListener('click', startGame, false);
    strict.removeEventListener('click', enableStrict, false);
    powerSlider.classList.add('sliderOn');
  } else if (isOn === true) {
    isOn = false;
    start.removeEventListener('click', startGame, false);
    strict.addEventListener('click', enableStrict, false);
    powerSlider.classList.remove('sliderOn');
  }
}

function initGame () {
  score = 0;
  
  strict.addEventListener('click', enableStrict, false);
}

var start = document.getElementById('startOne');
var strict = document.getElementById('strictOne');
var powerButton = document.getElementById('onOff');
var powerSlider = document.getElementById('onOffSlider');

strict.addEventListener('click', enableStrict, false);
powerButton.addEventListener('click', powerOn, false);

scoreBoard.textContent = '- -';
window.onload = initGame;