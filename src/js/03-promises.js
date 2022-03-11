// npm i notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import Notiflix from 'notiflix';
const form = document.querySelector('.form');


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({position, delay});
      } else {
        // Reject
        reject({position, delay});
      }
    }, delay);
  });
}


form.addEventListener('submit', createOnSubmit);

function createOnSubmit(e) {
  e.preventDefault();
  let firstDelay = Number(e.target.elements.delay.value);
  const amountValue = e.target.elements.amount.value;

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    firstDelay += Number(e.target.elements.step.value);
  }
}
