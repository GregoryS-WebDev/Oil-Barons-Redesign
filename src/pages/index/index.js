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


/* # UPDATES REQUIRED ################################################################################*/
/*====================================================================================================*/
/* INDEX.HTML SPONSOR SECTION */
/*====================================================================================================*/



/* END INDEX.HTML SPONSOR SECTION */


/* # NO UPDATES ######################################################################################*/
/*====================================================================================================*/
/* NEWS ARTICLE SHOW/HIDE TOGGLE */
/*====================================================================================================*/

(function () {
    const container = document.getElementById('news-articles');
    const modal = document.getElementById('article-modal');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.getElementById('close-modal');

    if (!container) return;

    let articlesData = [];

    // =========================
    // FETCH + INIT
    // =========================
    async function init() {
        try {
            const res = await fetch('../news/articles.json');
            const data = await res.json();

            articlesData = data.articles || [];

            // sort newest → oldest
            articlesData.sort((a, b) => new Date(b.date) - new Date(a.date));

            renderArticles(articlesData.slice(0, 4));

        } catch (err) {
            console.error('Failed to load articles:', err);
            container.innerHTML = '<p>Unable to load latest news.</p>';
        }
    }

    // =========================
    // RENDER
    // =========================
    function renderArticles(articles) {
        if (!articles.length) {
            container.innerHTML = '<p>No news available.</p>';
            return;
        }

        container.innerHTML = '';

        // --- TOP ARTICLE ---
        const top = articles[0];

        const featuredArticle = document.createElement('article');
        featuredArticle.id = 'featured';
        featuredArticle.className = 'news-article';
        featuredArticle.dataset.article = top.id;

        featuredArticle.innerHTML = `
            <img class="news-img" src="${top.image}" alt="" />
            <h3 class="news-heading">
                ${top.title}
                <p id="latest-article-summary">${top.summary || ''}</p>
            </h3>
        `;

        container.appendChild(featuredArticle);

        // --- OTHER ARTICLES ---
        if (articles.length > 1) {
            const otherWrapper = document.createElement('div');
            otherWrapper.id = 'other-articles';

            articles.slice(1).forEach(article => {
                const el = document.createElement('article');
                el.className = 'news-article';
                el.dataset.article = article.id;

                el.innerHTML = `
                    <img class="news-img" src="${article.image}" alt="" />
                    <h3 class="news-heading">
                        <p class="article-date">${formatDate(article.date)}</p>
                        ${article.title}
                    </h3>
                `;

                otherWrapper.appendChild(el);
            });

            container.appendChild(otherWrapper);
        }

        attachClickHandlers();
    }

    // =========================
    // MODAL LOGIC
    // =========================
    function attachClickHandlers() {
        document.querySelectorAll('#news-articles .news-article').forEach(card => {
            card.addEventListener('click', async () => {
                const id = card.dataset.article;
                const article = articlesData.find(a => a.id === id);

                if (!article) return;

                try {
                    const res = await fetch(`../news/${article.file}`);
                    const html = await res.text();

                    modalContent.innerHTML = `
                        <h2 class="news-article-title">${article.title}</h2>
                        <p class="news-article-summary">${article.summary || ''}</p>
                        ${html}
                    `;

                    openModal();

                } catch (err) {
                    console.error('Failed to load article:', err);
                }
            });
        });
    }

    function openModal() {
        if (typeof modal.showModal === 'function') {
            modal.showModal();
        } else {
            modal.setAttribute('open', '');
        }
    
        // reset scroll AFTER it's rendered
        requestAnimationFrame(() => {
            modal.scrollTop = 0;
            modalContent.scrollTop = 0;
        });
    }

    function closeModal() {
        if (typeof modal.close === 'function') {
            modal.close();
        } else {
            modal.removeAttribute('open');
        }
    }

    closeBtn?.addEventListener('click', closeModal);

    // =========================
    // HELPERS
    // =========================
    function formatDate(dateStr) {
        const date = new Date(dateStr);

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    // =========================
    // INIT
    // =========================
    init();

})();

/* NEWS ARTICLE SHOW/HIDE TOGGLE */