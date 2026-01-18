/*==============================================================================================================*/
/* ALTERNATING HERO VIDEO BACKGROUND */
/*==============================================================================================================*/

const videos = document.querySelectorAll('#hero-background .background');
let currentIndex = 0;

videos[currentIndex].classList.add('active');

setInterval(() => {
  const current = videos[currentIndex];
  currentIndex = (currentIndex + 1) % videos.length;
  const next = videos[currentIndex];

  current.classList.remove('active');
  next.classList.add('active');
}, 7000);


/*==============================================================================================================*/
/* HERO OPENING DAY COUNTDOWN */
/*==============================================================================================================*/

// Target date: May 28, 2026 at 7:00 PM (local time)
const targetDate = new Date(2026, 4, 28, 19, 0, 0);

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    daysEl.textContent = 0;
    hoursEl.textContent = 0;
    minutesEl.textContent = 0;
    secondsEl.textContent = 0;
    clearInterval(timer);
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = days;
  hoursEl.textContent = hours.toString().padStart(2, "0");
  minutesEl.textContent = minutes.toString().padStart(2, "0");
  secondsEl.textContent = seconds.toString().padStart(2, "0");
}

updateCountdown();
const timer = setInterval(updateCountdown, 1000);
