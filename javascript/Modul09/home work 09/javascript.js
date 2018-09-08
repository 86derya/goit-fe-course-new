"use strict"
const stopWatch = document.querySelector(".stopwatch");
const timerFace = document.querySelector(".js-time");
const startBtn = document.querySelector(".js-start");
const takeLapBtn = document.querySelector(".js-take-lap");
takeLapBtn.style.display = "none";
takeLapBtn.style.display = "none";
const resetBtn = document.querySelector(".js-reset");
resetBtn.style.cursor = "not-allowed";
const lapsList = document.querySelector(".js-laps");
const lapListArray = [];

function createPauseBtn() {
    const pauseBtn = document.createElement("button");
    pauseBtn.classList.add("btn");
    pauseBtn.classList.add("js-pause");
    pauseBtn.textContent = "Pause";
    stopWatch.insertBefore(pauseBtn, startBtn);
    pauseBtn.addEventListener('click', timer.pauseOn.bind(timer));
    return pauseBtn;
};

function removePauseBtn() {
    const pauseBtn = document.querySelector(".js-pause");
    pauseBtn.remove();
    pauseBtn.removeEventListener('click', timer.pauseOn.bind(timer));
};

function createContinueBtn() {
    const continueBtn = document.createElement("button");
    continueBtn.classList.add("btn");
    continueBtn.classList.add("js-continue");
    continueBtn.textContent = "continue";
    stopWatch.insertBefore(continueBtn, startBtn);
    continueBtn.addEventListener('click', timer.continue.bind(timer));
    return continueBtn;
};

function removeContinueBtn() {
    const continueBtn = document.querySelector(".js-continue");
    continueBtn.remove();
    continueBtn.addEventListener('click', timer.continue.bind(timer));
};

function resetBtnIsActive() {
    resetBtn.setAttribute("active", "true");
    resetBtn.style.cursor = "pointer";
};

function resetBtnDisable() {
    resetBtn.removeAttribute("active");
    resetBtn.style.cursor = "not-allowed";
};

function createLapNote() {
    const lap = document.createElement("li");
    lap.classList.add("lap_item");
    lap.style.listStyle = "none";
    lap.textContent = getFormattedTime(timer.deltaTime);
    lapsList.appendChild(lap);

    return lap;
}

function removeLapNotes() {
    const createdLaps = document.querySelectorAll(".lap_item");
    createdLaps.forEach(item => item.remove())
};

function updateTimerValue(time) {
    timerFace.textContent = getFormattedTime(time);
};
const timer = {
    startTime: null,
    deltaTime: null,
    timerId: null,
    start() {
        startBtn.style.display = "none";
        takeLapBtn.style.display = "inline";
        createPauseBtn();
        resetBtnIsActive();

        this.startTime = Date.now() - this.deltaTime;
        this.timerId = setInterval(() => {
            const currentTime = Date.now();
            this.deltaTime = currentTime - this.startTime;
            updateTimerValue(this.deltaTime);
            return timer.deltaTime;
        }, 100);

    },
    pauseOn() {
        resetBtnIsActive();
        clearInterval(this.timerId);
        const pauseBtn = document.querySelector(".js-pause");
        pauseBtn.removeEventListener('click', timer.pause);
        createContinueBtn();
        removePauseBtn();

    },
    continue () {
        timer.start();
        removeContinueBtn();
    },
    reset() {
        const pauseBtn = document.querySelector(".js-pause");
        const continueBtn = document.querySelector(".js-continue");

        if (!resetBtn.hasAttribute("active")) return;
        if (pauseBtn) { removePauseBtn(); };
        if (continueBtn) { removeContinueBtn(); };

        startBtn.style.display = "inline";
        takeLapBtn.style.display = "none";

        clearInterval(this.timerId);
        timerFace.textContent = "00:00.0";

        resetBtnDisable();
        removeLapNotes()
    },

    lap() {
        createLapNote();
    },
}

function getFormattedTime(time) {
    const date = new Date(time);
    let minutes = date.getMinutes();

    if (minutes > 10) {
        minutes = String(minutes).slice(1, length - 1);
    }
    let seconds = date.getSeconds();
    if (seconds < 10) {
        seconds = `0${date.getSeconds()}`;
    }
    const milisec = date.getMilliseconds();
    const milSecFormatted = String(milisec).slice(0, 1);
    return `0${minutes}:${seconds}.${milSecFormatted}`;

}


startBtn.addEventListener('click', timer.start.bind(timer));
takeLapBtn.addEventListener('click', timer.lap.bind(timer));
resetBtn.addEventListener('click', timer.reset.bind(timer));