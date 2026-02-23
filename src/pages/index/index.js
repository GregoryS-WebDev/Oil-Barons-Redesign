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

    Sections that require updates appear in semantic order at the top of the file.
    Sections that do not require updates appear in semantic order after the perpetually updated scripts.

*/

/* END META INFORMATION */


/* # UPDATES REQUIRED ################################################################################*/
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


/* # NO UPDATES ######################################################################################*/
/*====================================================================================================*/
/* NEWS ARTICLE SHOW/HIDE TOGGLE */
/*====================================================================================================*/

(function(){
    const modal = document.getElementById('article-modal');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.getElementById('close-modal');
    const templates = document.getElementById('news-article-content');

    let lastFocused = null;

    function openModal() {

        // store last focused element to restore focus on close
        lastFocused = document.activeElement;

        if (typeof modal.showModal === 'function') {
            modal.showModal();
        } else {

            // fallback for browsers without <dialog>
            const overlay = document.createElement('div');
            overlay.className = 'no-dialog-overlay';
            overlay.tabIndex = -1;
            overlay.innerHTML = '<div class="no-dialog-card" role="dialog" aria-modal="true"></div>';
            const card = overlay.querySelector('.no-dialog-card');
            card.appendChild(modalContent);
            document.body.appendChild(overlay);
            modal._fallbackOverlay = overlay;

        }

        document.body.classList.add('modal-open');

        closeBtn.focus();

    }

    function closeModal() {

        if (typeof modal.close === 'function' && modal.open) {
            modal.close();
        } else if (modal._fallbackOverlay) {

            // restore modalContent into a temporary container so DOM stays consistent
            const overlay = modal._fallbackOverlay;
            const card = overlay.querySelector('.no-dialog-card');

            // move modalContent back inside the dialog element so subsequent opens work
            document.body.appendChild(modalContent);
            document.body.removeChild(overlay);
            modal._fallbackOverlay = null;

        } else {
            modal.removeAttribute('open');
        }

        document.body.classList.remove('modal-open');

        // restore previous focus
        if (lastFocused && typeof lastFocused.focus === 'function') {
            lastFocused.focus();
        }

    }

    // open article when clicked
    document.querySelectorAll('.news-article').forEach(card => {

        card.addEventListener('click', () => {

            const key = card.dataset.article;
            const articleTemplate = templates.querySelector(`[data-article="${key}"]`);

            if (!articleTemplate) {
                console.warn('No template for article:', key);
                return;
            }

            // clear and append clone (so original templates remain in DOM)
            modalContent.innerHTML = '';
            const clone = articleTemplate.cloneNode(true);

            // ensure the main heading inside modal has an id for aria-labelledby
            const heading = clone.querySelector('h2, h1, h3');

            if (heading) {
                heading.id = 'modal-heading';
            }

            modalContent.appendChild(clone);

            openModal();

            requestAnimationFrame(() => {
                modal.scrollTop = 0;
            });

        });

    });

    closeBtn.addEventListener('click', closeModal);

    // close when clicking backdrop
    modal.addEventListener('click', (e) => {
        const rect = modal.getBoundingClientRect();
        const inside =
            rect.top <= e.clientY &&
            e.clientY <= rect.top + rect.height &&
            rect.left <= e.clientX &&
            e.clientX <= rect.left + rect.width;

        if (!inside) closeModal();
    });

    // close on 'cancel' (Esc)
    modal.addEventListener('cancel', (e) => {
        e.preventDefault();
        closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && (modal.open || modal._fallbackOverlay)) {
            closeModal();
        }
    });

    // cleanup when dialog closes
    modal.addEventListener('close', () => {
        document.body.classList.remove('modal-open');

        if (lastFocused && typeof lastFocused.focus === 'function') {
            lastFocused.focus();
        }
    });

})();


/* NEWS ARTICLE SHOW/HIDE TOGGLE */