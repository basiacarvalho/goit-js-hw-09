import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let timerId = null;
let chosenDate = null;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    const ms = chosenDate.getTime() - new Date().getTime();
    const remainingTime = convertMs(ms);
    const { days, hours, minutes, seconds } = remainingTime;

    dataDays.innerHTML = days;
    dataHours.innerHTML = hours;
    dataMinutes.innerHTML = minutes;
    dataSeconds.innerHTML = seconds;
  }, 1000);
});

function processDateSelection() {
  if (chosenDate > new Date()) {
    startBtn.disabled = false;
  } else {
    window.alert('Please choose a date in the future');
    startBtn.disabled = true;
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = selectedDates[0];
    processDateSelection();
  },
};

flatpickr('#datetime-picker', options);
