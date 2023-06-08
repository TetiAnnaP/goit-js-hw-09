const formEl = document.querySelector('form');
const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');
const submitBtnEl = document.querySelector('button[type="submit"]');

const delay = parseInt(delayEl.value);
const step = parseInt(stepEl.value);
const amount = parseInt(amountEl.value);

formEl.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  let position = 1;
  let currentDelay = delay;

  const promises = [];

  for (let i = 0; i < amount; i += 1) {
    const promise = createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    promises.push(promise);

    position += 1;
    currentDelay += step;
  }

  Promise.all(promises)
    .then(() => {
      console.log('All promises resolved');
      formEl.reset();
    })
    .catch(() => {
      console.log('At least one promise rejected');

      formEl.reset();
    });
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
