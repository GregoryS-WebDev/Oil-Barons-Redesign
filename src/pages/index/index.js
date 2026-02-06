/*====================================================================================================*/
/* META INFORMATION */
/*====================================================================================================*/

/*

    ** FILE STRUCTURE **

    This javascript file is separated into logical sections, with subsection headers integrated within. The start
    of these sections are denoted by comments such as:

    /*=============================================================*/
    /* SECTION NAME */
    /*=============================================================*\

    The end of each primary section is marked with a comment such as: /* END ROOT STYLES *\
    Subsections have a single header comment such as:

    /*-- subsection name ------------------------------------------*\

*/

/* END META INFORMATION */


/*====================================================================================================*/
/* NEXT GAME COUNTDOWN */
/*====================================================================================================*/

// CHANGE THESE VALUES TO UPDATE TARGET DATE AND TIME
const targetYear   = "2026";
const targetMonth  = "05"; // 01–12  MONTH
const targetDay    = "28"; // 01-31  DAY
const targetHour   = "19"; // 00-23  HOUR
const targetMinute = "00"; // 00-59  MINUTE

const targetDate = new Date(
    `${targetYear}-${targetMonth}-${targetDay}T${targetHour}:${targetMinute}:00`
);

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        daysEl.textContent = "0";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        clearInterval(timer);
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = days;
    hoursEl.textContent = hours.toString().padStart(2, "0");
    minutesEl.textContent = minutes.toString().padStart(2, "0");
    secondsEl.textContent = seconds.toString().padStart(2, "0");
}

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

updateCountdown();
const timer = setInterval(updateCountdown, 1000);

/* END NEXT GAME COUNTDOWN */