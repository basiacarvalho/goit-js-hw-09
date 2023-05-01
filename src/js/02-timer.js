import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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

    dataDays.innerHTML = addLeadingZero(days);
    dataHours.innerHTML = addLeadingZero(hours);
    dataMinutes.innerHTML = addLeadingZero(minutes);
    dataSeconds.innerHTML = addLeadingZero(seconds);
  }, 1000);
});

const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};

function processDateSelection() {
  if (chosenDate > new Date()) {
    startBtn.disabled = false;
  } else {
    Notify.failure('Please choose a date in the future');
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
