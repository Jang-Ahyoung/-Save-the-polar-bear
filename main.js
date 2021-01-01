'use strict';

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameScore = document.querySelector('.game__score');
const imgPopUp = document.querySelector('.img-pop-up');


const Angry = document.querySelector('.angry');

const timerIndicator = document.querySelector('.game__timer');
const popUp = document.querySelector('.pop-up');
const popUpMsg = document.querySelector('.pop-up-message');
const popUpCtn = document.querySelector('.pop-up-refresh');
const gameLevel = document.querySelector('.game_level');



console.log(popUpCtn);

const BEAR_COUNT = 5;
const LESS_ICE_COUNT = 3;
const SMALL_ICE_COUNT = 5;
const ICE_COUNT = 10;
const SET_GAME_SEC = 20;

let BEAR_COUNTS = 5;
let LEVEL = 1;
let started = false;
let score = 0;
let timer = undefined;

const bubble = new Audio('./sound/bubble.mp3');
const sigh = new Audio('./sound/sigh.mp3');

function initGame() {
    score = 0;
    field.innerHTML = '';
    gameScore.innerText = BEAR_COUNT;
    gameLevel.innerText = 'Level : ' + LEVEL;

    switch (LEVEL) {
        case 1:
            //             const LESS_ICE_COUNT = 3;
            // const SMALL_ICE_COUNT = 5;
            // const ICE_COUNT
            BEAR_COUNTS = 5;
            addItem('bear', BEAR_COUNT, 'img/main_bear.png');
            addItem('ice3', ICE_COUNT, 'img/ice3.png');
            addItem('ice5', LESS_ICE_COUNT, 'img/ice5.png');
            break;
        case 2:
            BEAR_COUNTS = 5;
            addItem('bear2', BEAR_COUNT, 'img/bear4.png');
            addItem('ice1', LESS_ICE_COUNT, 'img/ice1.png');
            addItem('ice5', ICE_COUNT, 'img/ice5.png');
            break;
        case 3:
            BEAR_COUNTS = BEAR_COUNT * 2;
            addItem('bear', BEAR_COUNT, 'img/main_bear.png');
            addItem('bear2', BEAR_COUNT, 'img/bear4.png');
            addItem('ice1', LESS_ICE_COUNT, 'img/ice1.png');
            addItem('ice5', SMALL_ICE_COUNT, 'img/ice2.png');
        case 4:
            break;
        default:
            console.log('Sorry, we are out of ' + expr + '.');
    }

}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - 80; // 시작값은 맞는데 당근 크기 넘어서서 생성돼 당근 사이즈 빼주어야해 ㅎㅎ
    const y2 = fieldRect.height - 280;


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
    startGameTimer(GamingTimeSec);
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    showPopUpWithText('CONTINUE❓');
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fas');
    icon.classList.remove('fa-play');
    icon.classList.add('fa-stop');
    gameBtn.style.visibility = 'visible';
    // console.log(icon);

}

function showTimerAndScore() {
    timerIndicator.style.visibility = "visible";
    gameScore.style.visibility = 'visible';
}

let GamingTimeSec = SET_GAME_SEC;
function startGameTimer(GamingTimeSec) {
    // let GamingTimeSec = SET_GAME_SEC;
    updateTimerText(GamingTimeSec);

    timer = setInterval(() => {
        if (GamingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(score === BEAR_COUNTS); // 당근갯수만큼 점수 됐다면 finish해줘야해 ㅎㅎ
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

function stopGameTimer() {
    clearInterval(timer);

}
function hideGameButton() {
    gameBtn.style.visibility = 'hidden';

}

function showPopUpWithText(text) {
    popUpMsg.innerText = text;
    const nextStageIcon = popUpCtn.querySelector('.fas');
    nextStageIcon.classList.add('fa-redo');
    nextStageIcon.classList.remove('fa-play');
    nextStageIcon.classList.remove('fa-chevron-circle-right');
    popUp.classList.remove('pop-up-hide');
}

function showPopUpNextStage(text) {
    popUpMsg.innerText = text;
    popUp.classList.remove('pop-up-hide');
    const nextStageIcon = popUpCtn.querySelector('.fas');
    nextStageIcon.classList.remove('fa-redo');
    nextStageIcon.classList.add('fa-chevron-circle-right');
    LEVEL++;

}
function hidePopUp() {
    popUp.classList.add('pop-up-hide'); // REM0VE 대신 ADD해주면돼!
}

popUpCtn.addEventListener('click', () => {
    startGame();
    hidePopUp();
});

field.addEventListener('click', onFieldClick);

function onFieldClick(event) {
    if (!started) {
        return;
    }
    const target = event.target;

    if (target.matches('.bear') || target.matches('.bear2')) {
        target.remove();
        score++;
        playSound(bubble);
        updateScoreBoard();
        if (score === BEAR_COUNTS) {
            finishGame(true);
        }
    } else if (target.matches('.ice1') || target.matches('.ice3') || target.matches('.ice5')) {
        finishGame(false);
    }
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function updateScoreBoard() {
    gameScore.innerText = BEAR_COUNTS - score;
}

function finishGame(win) {
    started = false;
    if (win) {
        // showPopUpWithText(win ? 'YOU WON 🎉' : 'YOU LOSE 💩');
        showPopUpNextStage('YOU WON 🎉');

    } else {
        playSound(sigh);
        showAngryBear();
        setTimeout(function () {
            Angry.classList.add('angry-hide');
            showPopUpWithText(win ? 'YOU WON 🎉' : 'YOU LOSE 💩');
            LEVEL = 1;
        }, 3000);
    }

    hideGameButton();
    stopGameTimer(); // 25. 영원한 버그에 걸려 -> 꼭 타이머 종료해줘야해~~
    //   stopSound(bgSound); // 24 끝났을떄도 소리 없애줘
}

function showAngryBear() {
    Angry.classList.remove('angry-hide');
    console.log(Angry);

}