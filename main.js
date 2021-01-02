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

const BEAR_COUNT = 5;
const LESS_ICE_COUNT = 3;
const SMALL_ICE_COUNT = 5;
const ICE_COUNT = 10;
const Babam = new Audio('./sound/Babam.mp3');
const buk = new Audio('./sound/buk.mp3');
const click = new Audio('./sound/click.mp3');
const sigh = new Audio('./sound/sigh.mp3');
const start = new Audio('./sound/Arrival.mp3');

let SET_GAME_SEC = 20;
let BEAR_COUNTS = 5;
let LEVEL = 1;
let started = false;
let score = 0;
let timer = undefined;

function initGame() {
    score = 0;
    field.innerHTML = '';
    gameScore.innerText = BEAR_COUNT;
    gameLevel.innerText = 'Level : ' + LEVEL;
    playSound(start);

    switch (LEVEL) {
        case 1:
            SET_GAME_SEC = 20;
            BEAR_COUNTS = 5;
            addItem('slide_bear', BEAR_COUNT, 'img/angry.png');
            addItem('ice', ICE_COUNT, 'img/ice3.png');
            addItem('ice', LESS_ICE_COUNT, 'img/ice5.png');
            break;

        case 2:
            addItem('moving_ice', LESS_ICE_COUNT, 'img/ice1.png');
            addItem('bear', BEAR_COUNT, 'img/bear4.png');
            addItem('ice', ICE_COUNT, 'img/ice5.png');
            break;

        case 3:
            BEAR_COUNTS = BEAR_COUNT * 2;
            addItem('bear', BEAR_COUNTS, 'img/main_bear.png');
            addItem('ice', SMALL_ICE_COUNT, 'img/ice2.png');
            addItem('random_ice', SMALL_ICE_COUNT, 'img/ice1.png');
            break;

        case 4:
            BEAR_COUNTS = BEAR_COUNT * 2;
            addItem('bear', BEAR_COUNT, 'img/main_bear.png');
            addItem('slide_bear', BEAR_COUNT, 'img/bear4.png');
            addItem('random_ice', ICE_COUNT - 3, 'img/ice1.png');
            addItem('ice', SMALL_ICE_COUNT, 'img/ice2.png');
            break;

        case 5:
            BEAR_COUNTS = BEAR_COUNT * 2;
            addItem('shaking_bear', BEAR_COUNT, 'img/main_bear.png');
            addItem('ice', ICE_COUNT, 'img/ice2.png');
            addItem('bear', BEAR_COUNT, 'img/bear4.png');
            addItem('moving_ice', SMALL_ICE_COUNT, 'img/ice5.png');
            break;

        case 6:

            BEAR_COUNTS = BEAR_COUNT * 2;
            addItem('bear', BEAR_COUNT, 'img/main_bear.png');
            addItem('bear', BEAR_COUNT, 'img/bear4.png');
            addItem('ice', ICE_COUNT, 'img/ice1.png');
            addItem('small_moving_ice', SMALL_ICE_COUNT, 'img/ice3.png');
            break;

        case 7:
            SET_GAME_SEC = 10;
            BEAR_COUNTS = 5;
            addItem('slide_bear', BEAR_COUNT, 'img/main_bear.png');
            addItem('ice', ICE_COUNT, 'img/ice3.png');
            addItem('ice', LESS_ICE_COUNT, 'img/ice5.png');
            break;

        case 8:
            addItem('moving_ice', LESS_ICE_COUNT, 'img/ice1.png');
            addItem('bear', BEAR_COUNT, 'img/bear4.png');
            addItem('ice5', ICE_COUNT, 'img/ice5.png');
            break;

        case 9:
            BEAR_COUNTS = BEAR_COUNT * 2;
            addItem('bear', BEAR_COUNTS, 'img/main_bear.png');
            addItem('ice', SMALL_ICE_COUNT, 'img/ice2.png');
            addItem('random_ice', SMALL_ICE_COUNT, 'img/ice1.png');
            break;

        case 10:
            BEAR_COUNTS = BEAR_COUNT * 2;

            addItem('random_ice', ICE_COUNT - 3, 'img/ice1.png');
            addItem('slide_bear', BEAR_COUNT, 'img/bear4.png');
            addItem('ice', SMALL_ICE_COUNT, 'img/ice2.png');
            addItem('bear', BEAR_COUNT, 'img/main_bear.png');
            break;

        case 11:
            BEAR_COUNTS = BEAR_COUNT * 2;
            addItem('shaking_bear', BEAR_COUNT, 'img/main_bear.png');
            addItem('ice1', ICE_COUNT, 'img/ice2.png');
            addItem('bear', BEAR_COUNT, 'img/bear4.png');
            addItem('moving_ice', SMALL_ICE_COUNT, 'img/ice5.png');
            break;

        case 12:
            BEAR_COUNTS = BEAR_COUNT * 2;

            addItem('ice', ICE_COUNT, 'img/ice1.png');
            addItem('bear', BEAR_COUNT, 'img/main_bear.png');
            addItem('bear', BEAR_COUNT, 'img/bear4.png');
            addItem('moving_ice', SMALL_ICE_COUNT, 'img/ice3.png');
            break;
        case 13:
            SET_GAME_SEC = 5;
            BEAR_COUNTS = 5;
            addItem('slide_bear', BEAR_COUNT, 'img/main_bear.png');
            addItem('ice', ICE_COUNT, 'img/ice3.png');
            addItem('ice', LESS_ICE_COUNT, 'img/ice5.png');
            break;

        case 14:
            addItem('moving_ice', LESS_ICE_COUNT, 'img/ice1.png');
            addItem('bear', BEAR_COUNT, 'img/bear4.png');
            addItem('ice5', ICE_COUNT, 'img/ice5.png');
            break;

        case 15:
            BEAR_COUNTS = BEAR_COUNT * 2;
            addItem('bear', BEAR_COUNTS, 'img/main_bear.png');
            addItem('ice', SMALL_ICE_COUNT, 'img/ice2.png');
            addItem('random_ice', SMALL_ICE_COUNT, 'img/ice1.png');
            break;

        case 16:
            SET_GAME_SEC = 7;
            BEAR_COUNTS = BEAR_COUNT * 2;
            addItem('bear', BEAR_COUNT, 'img/main_bear.png');
            addItem('slide_bear', BEAR_COUNT, 'img/bear4.png');
            addItem('random_ice', ICE_COUNT - 3, 'img/ice1.png');
            addItem('ice', SMALL_ICE_COUNT, 'img/ice2.png');
            break;

        case 17:

            BEAR_COUNTS = BEAR_COUNT * 2;
            addItem('shaking_bear', BEAR_COUNT, 'img/main_bear.png');
            addItem('ice1', ICE_COUNT, 'img/ice2.png');
            addItem('bear', BEAR_COUNT, 'img/bear4.png');
            addItem('moving_ice', SMALL_ICE_COUNT, 'img/ice5.png');
            break;

        case 18:
            BEAR_COUNTS = BEAR_COUNT * 2;
            addItem('bear', BEAR_COUNT, 'img/main_bear.png');
            addItem('bear', BEAR_COUNT, 'img/bear4.png');
            addItem('ice', ICE_COUNT, 'img/ice1.png');
            addItem('moving_ice', SMALL_ICE_COUNT, 'img/ice3.png');
            break;

        default:
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
    startGameTimer(SET_GAME_SEC);
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    showPopUpWithText('CONTINUE❓');
    stopSound(start);
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fas');
    icon.classList.remove('fa-play');
    icon.classList.add('fa-stop');
    gameBtn.style.visibility = 'visible';
}

function showTimerAndScore() {
    timerIndicator.style.visibility = "visible";
    gameScore.style.visibility = 'visible';
}

// let GamingTimeSec = SET_GAME_SEC;
function startGameTimer(SET_GAME_SEC) {
    // let GamingTimeSec = SET_GAME_SEC;
    updateTimerText(SET_GAME_SEC);

    timer = setInterval(() => {
        if (SET_GAME_SEC <= 0) {
            clearInterval(timer);
            finishGame(score === BEAR_COUNTS); // 당근갯수만큼 점수 됐다면 finish해줘야해 ㅎㅎ
            return;
        }
        updateTimerText(--SET_GAME_SEC); // 하나하나씩 줄어들도록 4초 - 3초로 표기하도록
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
    // playSound(buk);
    startGame();
    hidePopUp();
});

field.addEventListener('click', onFieldClick);

function onFieldClick(event) {

    if (!started) {
        return;
    }
    const target = event.target;

    if (target.matches('.bear') || target.matches('.slide_bear') || target.matches('.shaking_bear')) {

        target.remove();
        score++;
        playSound(click);
        updateScoreBoard();
        if (score === BEAR_COUNTS) {
            finishGame(true);
        }
    } else if (target.matches('.ice') || target.matches('.moving_ice') || target.matches('.random_ice')) {
        playSound(buk);
        finishGame(false);
    }
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

function updateScoreBoard() {
    gameScore.innerText = BEAR_COUNTS - score;
}

function finish() {
    field.innerHTML = '';
}
function finishGame(win) {
    started = false;
    if (win) {
        // showPopUpWithText(win ? 'YOU WON 🎉' : 'YOU LOSE 💩');
        stopSound(start);
        playSound(Babam);
        showPopUpNextStage('YOU WON 🎉');

    }
    else if (LEVEL == 18) {
        stopSound(start);
        showPopUpWithText('Thank you 🎅');
    }
    else {
        stopSound(start);
        playSound(sigh);
        showAngryBear();
        setTimeout(function () {
            Angry.classList.add('angry-hide');
            showPopUpWithText(win ? 'YOU WON 🎉' : 'YOU LOSE 💩');
            LEVEL = 1;
        }, 3000);
    }

    hideGameButton();
    stopGameTimer();
}

function showAngryBear() {
    Angry.classList.remove('angry-hide');
}