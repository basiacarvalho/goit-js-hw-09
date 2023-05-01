import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayInput = document.querySelector('[name="delay"]');
const stepInput = document.querySelector('[name="step"]');
const amountInput = document.querySelector('[name="amount"]');
const button = document.querySelector('[type="submit"]');

button.addEventListener('click', event => {
  event.preventDefault();
  const amount = Number(amountInput.value);
  let currentDelay = Number(delayInput.value);
  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    currentDelay += Number(stepInput.value);
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
