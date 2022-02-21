// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

// npm i flatpickr --save
// npm i notiflix

const refs = {
   input: document.querySelector('#datetime-picker'),
   button: document.querySelector('button[data-start]'),
   days: document.querySelector('span[data-days]'),
   hours: document.querySelector('span[data-hours]'),
   minutes: document.querySelector('span[data-minutes]'),
   seconds: document.querySelector('span[data-seconds]'),
};

refs.button.disabled = true;
refs.button.addEventListener('click', () => {
   timer.start(); 
})

const timer = {
   intervalId: null,
   start() {
      setInterval(() => {

         const currentTime = Date.now();
         const selectedData = new Date(refs.input.value).getTime();
         const deltaTime = selectedData - currentTime;
         const time = convertMs(deltaTime);

         refs.button.disabled = true;

         if (deltaTime < 0) {
            clearInterval(this.intervalId)
            return;
         }
         // console.log(time);
         upDateClockmin(time);
      }, 1000)
   },
};

function upDateClockmin({ days, hours, minutes, seconds }) {
   refs.days.textContent = addLeadingZero(days);
   refs.hours.textContent = addLeadingZero(hours);
   refs.minutes.textContent = addLeadingZero(minutes);
   refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
   return String(value).padStart(2, '0');
}

const options = {
   // включает выбор времени.
   enableTime: true,
   // выбор времени в 24-часовом режиме без выбора AM/PM,
  // если включено.
   time_24hr: true,
  // устанавливает начальную выбранную дату.
   defaultDate: new Date(),
   // регулирует вод минут.
   minuteIncrement: 1,
  
   onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const dateNow = Date.now();
      
      if (selectedDate <= dateNow) {
         // ! window.alert("Please choose a date in the future")
         Notiflix.Notify.failure("Please choose a date in the future");
      } else { 
         refs.button.disabled = false;
      }

      console.log(selectedDates[0]);
      
  },
};

flatpickr(refs.input, options);

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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}