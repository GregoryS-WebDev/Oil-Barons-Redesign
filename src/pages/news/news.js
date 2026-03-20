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

(function () {
    const container = document.getElementById('news-articles');
    const filterSelect = document.getElementById('news-filter-select');

    const modal = document.getElementById('article-modal');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.getElementById('close-modal');

    if (!container) return;

    let articlesData = [];

    // =========================
    // INIT
    // =========================
    async function init() {
        try {
            const res = await fetch('./articles.json');
            const data = await res.json();

            articlesData = data.articles || [];

            // sort newest → oldest
            articlesData.sort((a, b) => new Date(b.date) - new Date(a.date));

            renderArticles(articlesData);

        } catch (err) {
            console.error('Failed to load articles:', err);
            container.innerHTML = '<p>Unable to load news.</p>';
        }
    }

    // =========================
    // RENDER
    // =========================
    function renderArticles(articles) {
        if (!articles.length) {
            container.innerHTML = '<p>No articles found.</p>';
            return;
        }

        container.innerHTML = '';

        articles.forEach(article => {
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

            el.addEventListener('click', () => openArticle(article));

            container.appendChild(el);
        });
    }

    // =========================
    // FILTER
    // =========================
    filterSelect?.addEventListener('change', () => {
        const value = filterSelect.value;

        if (value === 'all') {
            renderArticles(articlesData);
            return;
        }

        const filtered = articlesData.filter(a => a.type === value);
        renderArticles(filtered);
    });

    // =========================
    // MODAL
    // =========================
    async function openArticle(article) {
        try {
            const res = await fetch(article.file);
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
    }

    function openModal() {
        if (typeof modal.showModal === 'function') {
            modal.showModal();
        } else {
            modal.setAttribute('open', '');
        }

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
    // START
    // =========================
    init();

})();