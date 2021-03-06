"use strict"
const stopWatch = document.querySelector(".stopwatch");
const timerFace = document.querySelector(".js-time");
const startBtn = document.querySelector(".js-start");
const takeLapBtn = document.querySelector(".js-take-lap");
takeLapBtn.style.display = "none";
const resetBtn = document.querySelector(".js-reset");
resetBtn.style.display = "none";
const lapsList = document.querySelector(".js-laps");

function showPauseBtn() {
    startBtn.textContent = "Pause";
};

function showContinueBtn() {
    startBtn.textContent = "Continue";
};

function resetBtnIsActive() {
    resetBtn.style.display = "inline";
};

function resetBtnDisable() {
    resetBtn.style.active = "not-allowed";
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

function getFormattedTime(time) {
    const date = new Date(time);
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    const milisec = date.getMilliseconds();
    const milSecFormatted = String(milisec).slice(0, 1);
    return `${minutes}:${seconds}.${milSecFormatted}`;

}

const timer = {
    startTime: null,
    deltaTime: null,
    timerId: null,
    start() {
        resetBtnIsActive();
        takeLapBtn.style.display = "inline";

        if (startBtn.textContent === "Start") {
            showPauseBtn();
            this.startTime = Date.now();
            this.timerId = setInterval(() => {
                const currentTime = Date.now();
                this.deltaTime = currentTime - this.startTime;
                updateTimerValue(this.deltaTime);
                return timer.deltaTime;
            }, 100);
        } else if (startBtn.textContent === "Continue") {
            showPauseBtn();
            resetBtnIsActive();
            this.startTime = Date.now() - this.deltaTime;
            this.timerId = setInterval(() => {
                const currentTime = Date.now();
                this.deltaTime = currentTime - this.startTime;
                updateTimerValue(this.deltaTime);
                return timer.deltaTime;
            }, 100);
        } else {
            clearInterval(this.timerId);
            resetBtnIsActive();
            showContinueBtn();
        };
    },

    reset() {
        startBtn.textContent = "Start";
        takeLapBtn.style.display = "none";
        updateTimerValue(0);
        resetBtn.style.display = "none";
        clearInterval(this.timerId);
        removeLapNotes()
    },

    lap() {
        createLapNote();
    },
}

startBtn.addEventListener('click', timer.start.bind(timer));
takeLapBtn.addEventListener('click', timer.lap.bind(timer));
resetBtn.addEventListener('click', timer.reset.bind(timer));