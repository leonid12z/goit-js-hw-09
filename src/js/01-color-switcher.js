const refs = {
   body: document.querySelector('body'),
   startBut: document.querySelector('button[data-start]'),
   stopBut: document.querySelector('button[data-stop]'),
};

let idTimer = null;

refs.stopBut.disabled = true;
refs.startBut.addEventListener('click', onStartBut);
refs.stopBut.addEventListener('click', onStopBut);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBut() {
   idTimer = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor();
   }, 1000);

   refs.startBut.disabled = true;
   refs.stopBut.disabled = false;
}

function onStopBut() {
   clearInterval(idTimer);

   refs.startBut.disabled = false;
   refs.stopBut.disabled = true;

   console.log(` Interval with id ${idTimer} has stopped. `);
}
