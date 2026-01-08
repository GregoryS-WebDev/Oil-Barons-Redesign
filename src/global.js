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

        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
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
  
/*==============================================================================================================*/
/* END ROOT SCRIPTS */
/*==============================================================================================================*/