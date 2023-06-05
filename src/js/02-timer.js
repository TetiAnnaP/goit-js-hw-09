import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButtonEl = document.querySelector('button[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startButtonEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange() {
    invalidDate();
  },
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
  },
};

const fp = flatpickr(dateTimePicker, options);

startButtonEl.addEventListener('click', onClick);

const timer = {
  intervalID: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }

    this.intervalID = setInterval(() => {
      const dateNow = Date.now();
      const selectedDate = fp.selectedDates[0];
      const ms = selectedDate - dateNow;
      const { days, hours, minutes, seconds } = convertMs(ms);
      // console.log(`${minutes} : ${seconds}`);
      daysEl.textContent = `${days}`;
      hoursEl.textContent = `${hours}`;
      minutesEl.textContent = `${minutes}`;
      secondsEl.textContent = `${seconds}`;
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalID);
    this.isActive;
  },
};

function onClick() {
  timer.start();
}

function invalidDate() {
  const selectedDate = fp.selectedDates[0].getTime();
  const dateNow = fp.now.getTime();
  if (selectedDate < dateNow) {
    window.alert('Please choose a date in the future');
    return;
  }
  startButtonEl.disabled = false;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
