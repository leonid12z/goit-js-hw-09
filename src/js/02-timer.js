// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import Notiflix, { Notify } from 'notiflix';

// npm i flatpickr --save
// npm i notiflix

let start = true;

const input = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');

let timerId = null;
if (start) {
   buttonStart.setAttribute('disabled', true);
}

const refs = {
   dataDays: timer.querySelector('[data-days]'),
   dataHours: timer.querySelector('[data-hours]'),
   dataMinutes: timer.querySelector('[data-minutes]'),
   dataSeconds: timer.querySelector('[data-seconds]'),
};

const options = {
   // Включает выбор времени
   enableTime: true,
   // !Выбора времени в 24-часовом режиме без выбора AM/PM,
   //  Если включено.
   time_24hr: true,
   //   Устанавливает начальную выбранную дату
   defaultDate: new Date(),
   //   Регулирует шаг ввода минут
   minuteIncrement: 1,
  
   onClose(selectedDates) {
      if (selectedDates[0] < new Date().getTime()) {
         start = false;
         buttonStart.setAttribute('disabled', true);
         //   !window.alert("Please choose a date in the future");
         Notiflix.Notify.failure("Please choose a date in the future");
         return;
      }

      buttonStart.removeAttribute('disabled', true);
      start = true;
      buttonStart.addEventListener('click', function startTimer() {
         buttonStart.setAttribute('disabled', true);
         input.setAttribute('disabled', true);

         function time() {
            let counTime = selectedDates[0].getTime() - Date.now();
            convertMs(counTime);
         }
         timerId = setInterval(time, 1000);
      });
   },
};

flatpickr('input#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  refs.dataDays.textContent = days;
  refs.dataHours.textContent = hours;
  refs.dataMinutes.textContent = minutes;
  refs.dataSeconds.textContent = seconds;

  // !return {days, hours, minutes, seconds};
}

// ?console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// ?console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// ?console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}