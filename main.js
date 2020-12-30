'use strict';

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameScore = document.querySelector('.game__score');
const timerIndicator = document.querySelector('.game__timer');

const BEAR_COUNT = 15;
const ICE_COUNT = 5;
const SET_GAME_SEC = 20;

let started = false;
let scroe = 0;
let timer = undefined;

console.log(fieldRect);
function initGame() {
    // gameScore.innerText = BEAR_COUNT;
    field.innerHTML = '';
    gameScore.innerText = BEAR_COUNT;
    addItem('bear', BEAR_COUNT, 'img/main_bear.png');
    addItem('ice3', ICE_COUNT, 'img/ice3.png');
    addItem('ice5', 3, 'img/ice5.png');
}
// initGame();

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - 80; // 시작값은 맞는데 당근 크기 넘어서서 생성돼 당근 사이즈 빼주어야해 ㅎㅎ
    const y2 = fieldRect.height - 270;


    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }

}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;

}

gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
});

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();

}

function stopGame() {
    started = false;
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function showTimerAndScore() {
    timerIndicator.style.visibility = "visible";
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let GamingTimeSec = SET_GAME_SEC;
    updateTimerText(GamingTimeSec);

    timer = setInterval(() => {
        if (GamingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(score === CARROT_COUNT); // 당근갯수만큼 점수 됐다면 finish해줘야해 ㅎㅎ
            return;
        }
        updateTimerText(--GamingTimeSec); // 하나하나씩 줄어들도록 4초 - 3초로 표기하도록
    }, 1000);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerIndicator.innerHTML = `${minutes}:${seconds}`;
}

