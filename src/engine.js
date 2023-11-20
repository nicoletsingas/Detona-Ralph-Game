const state = {
  view: {
    squares: document.querySelectorAll('.square'),
    enemy: document.querySelector('.enemy'),
    timeLeft: document.querySelector('#time-left'),
    score: document.querySelector('#score'),
  },
  values: {
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },
  actions : {
    enemyPosition: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function playSound() {
  let audio = new Audio('./src/assets/hit.m4a');
  audio.volume = 0.2;
  audio.play();
}

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if(state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.enemyPosition);
    alert('Game Over! O tempo acabou, seu resultado foi de: ' + state.values.result + ' pontos!');
  }
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove('enemy');
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add('enemy');
  state.values.hitPosition = randomSquare.id;
}

function hitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener('click', () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound();
      }
    });
  });
}

function init() {
  hitBox();
}

init();