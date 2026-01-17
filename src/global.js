/*==============================================================================================================*/
/* START ROOT SCRIPTS */
/*==============================================================================================================*/


/*-- mobile navigation menu behavior ---------------------------------------------------------------------------*/

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


/*-- desktop partner header behavior ---------------------------------------------------------------------------*/

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


/*-- desktop dropdown nav menus behavior -----------------------------------------------------------------------*/

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
  
/*==============================================================================================================*/
/* END ROOT SCRIPTS */
/*==============================================================================================================*/