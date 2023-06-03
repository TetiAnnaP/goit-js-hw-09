const startButtonEl = document.querySelector('button[data-start]');
const stopButtonEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

stopButtonEl.disabled = true;
let intervalID;

startButtonEl.addEventListener('click', onStartClick);
stopButtonEl.addEventListener('click', onStopClick);

function onStartClick() {
  intervalID = setInterval(() => {
    const color = getRandomHexColor();
    bodyEl.style.backgroundColor = `${color}`;
  }, 1000);
  startButtonEl.disabled = true;
  stopButtonEl.disabled = false;
}

function onStopClick() {
  clearInterval(intervalID);
  startButtonEl.disabled = false;
  stopButtonEl.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
