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

    Script sections are sorted according to viewport size, with mobile scripts appearing first followed
    by scripts for successively larger viewports.

*/

/* END META INFORMATION */


/*====================================================================================================*/
/* MOBILE NAVIGATION MENU SCRIPT */
/*====================================================================================================*/

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('#mobile-nav');
    const navTabs = document.querySelectorAll('.nav-tab');
    const primaryItems = document.querySelectorAll('.primary-li');
    const subLists = document.querySelectorAll('.sub-list');

    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.classList.toggle('is-active');
        menu.classList.toggle('is-open');
        document.body.classList.toggle("nav-open");

        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navTabs.forEach(tab => {
        tab.addEventListener('mouseenter', (e) => {
            e.preventDefault();

            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            subLists.forEach(list => list.classList.remove('active'));
            const targetId = tab.getAttribute('data-target');
            const targetList = document.getElementById(targetId);

            if (targetList) {
                targetList.classList.add('active');
            }
        });
    });
});

/* END MOBILE NAVIGATION MENU SCRIPT */


/*====================================================================================================*/
/* MOBILE SPONSORS SCRIPT */
/*====================================================================================================*/

fetch('../../data/sponsors.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load sponsors.json');
        }
        return response.json();
    })
    .then(globalSponsors => {

        const sponsorsEl = document.getElementById('mobile-sponsors');
        const footerEl = document.querySelector('footer');

        const fadeDuration = 800;
        const displayDuration = 4000;

        if (!sponsorsEl || !globalSponsors?.length) {
            console.warn('Sponsors not initialized: missing container or sponsor data.');
            return;
        }

        const sponsorEls = globalSponsors.map(sponsor => {
            const anchor = document.createElement('a');
            anchor.className = 'mobile-sponsor';
            anchor.href = sponsor.address;
            anchor.target = '_blank';
            anchor.rel = 'noopener noreferrer';
            anchor.dataset.id = sponsor.id;
            anchor.inert = 'true';

            const img = document.createElement('img');
            img.src = sponsor.image;
            img.alt = `${sponsor.name} logo`;

            anchor.appendChild(img);
            sponsorsEl.appendChild(anchor);

            return anchor;
        });

        let currentIndex = Math.floor(Math.random() * sponsorEls.length);

        function updateSponsorsPosition() {
            if (!footerEl) return;

            const footerRect = footerEl.getBoundingClientRect();
            const sponsorsRect = sponsorsEl.getBoundingClientRect();
            const scrollY = window.scrollY;
            const distanceToFooter = window.innerHeight - footerRect.top;

            if (distanceToFooter > 0) {
                const footerTopInDoc = footerRect.top + scrollY;
                sponsorsEl.style.position = 'absolute';
                sponsorsEl.style.top = `${footerTopInDoc - sponsorsRect.height - 12}px`;
                sponsorsEl.style.bottom = 'auto';
            } else {
                sponsorsEl.style.position = 'fixed';
                sponsorsEl.style.bottom = '12px';
                sponsorsEl.style.top = 'auto';
            }
        }

        function showNextSponsor() {
            const current = sponsorEls[currentIndex];
            const nextIndex = (currentIndex + 1) % sponsorEls.length;
            const next = sponsorEls[nextIndex];

            const currentImg = current.querySelector('img');
            currentImg.style.opacity = '0';

            setTimeout(() => {
                current.classList.remove('active');
                currentImg.style.display = 'none';

                const nextImg = next.querySelector('img');
                nextImg.style.display = 'block';
                nextImg.offsetHeight;
                nextImg.style.opacity = '1';
                next.classList.add('active');

                currentIndex = nextIndex;

                updateSponsorsPosition();
                setTimeout(showNextSponsor, displayDuration);

            }, fadeDuration);
        }

        sponsorEls.forEach((sponsor, i) => {
            const img = sponsor.querySelector('img');
            if (i === currentIndex) {
                img.style.display = 'block';
                img.style.opacity = '1';
                sponsor.classList.add('active');
            } else {
                img.style.display = 'none';
                img.style.opacity = '0';
            }
        });

        setTimeout(showNextSponsor, displayDuration);

        window.addEventListener('scroll', updateSponsorsPosition);
        window.addEventListener('resize', updateSponsorsPosition);
        updateSponsorsPosition();

    })
    .catch(err => {
        console.error('Error loading sponsors:', err);
    });

/* END MOBILE SPONSORS SCRIPT */


/*====================================================================================================*/
/* DESKTOP HEADER SPONSORS SCRIPT */
/*====================================================================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const gold = document.querySelector(".partner-tier.gold");
    const silver = document.querySelector(".partner-tier.silver");
    const tier = document.getElementById("tier");

    const displayDuration = 5000;
    const fadeDuration = 1000;
    const tierFadeDuration = 800;

    let showingA = true;

    function swapContent() {
        const current = showingA ? gold : silver;
        const next = showingA ? silver : gold;

        current.classList.remove("active");
        tier.classList.remove("active");

        setTimeout(() => {
            tier.textContent = showingA ? "SILVER TIER" : "GOLD TIER";
            next.classList.add("active");
            tier.classList.add("active");

            if (tier.textContent === "SILVER TIER") {
                tier.style.color = "var(--white)";
            } else if (tier.textContent === "GOLD TIER") {
                tier.style.color = "var(--barons-gold)";
            }

            showingA = !showingA;
        }, Math.max(fadeDuration, tierFadeDuration));
    }

    setInterval(swapContent, displayDuration + fadeDuration);

});

/* END DESKTOP HEADER SPONSORS SCRIPT */


/*====================================================================================================*/
/* DESKTOP NAVIGATION DROPDOWN SCRIPT */
/*====================================================================================================*/

const EDGE_PADDING = 4;

document.querySelectorAll('.has-dropdown').forEach(item => {
    const trigger = item.querySelector('.desktop-nav-link');
    const dropdown = item.querySelector('.desktop-nav-dropdown');

    item.addEventListener('mouseenter', () => {
        item.classList.add('open');
        dropdown.style.left = '0px';

        const triggerRect = trigger.getBoundingClientRect();
        const dropdownRect = dropdown.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        const idealLeft = triggerRect.left - 16;
        const maxLeft = viewportWidth - dropdownRect.width - EDGE_PADDING;

        const finalLeft = Math.min(idealLeft, maxLeft);

        dropdown.style.left = `${finalLeft}px`;
    });

    item.addEventListener('mouseleave', () => {
        item.classList.remove('open');
    });
});

/* END DESKTOP NAVIGATION DROPDOWN SCRIPT */