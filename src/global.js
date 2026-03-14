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


    ** GLOBAL VARIABLES **

    Global variables in this file are variables that will be referenced in multiple page .js files.
    They are stored here for contsistency and convenience.
    The global.js file is the first script linked in every file in /root.

*/

/* END META INFORMATION */


/*====================================================================================================*/
/* GLOBAL VARIABLES AND ARRAYS */
/*====================================================================================================*/

const globalRoster = [
    {
        name: "First Guy",
        birthday: "01",
        birthmonth: "01",
        birthyear: "2001",
        jersey: "9",
        height: "6'0\"",
        weight: "180lbs",
        position: "3B",
        category: "Infielders",
        bats: "R",
        throws: "R",
        hometown: "Beaumont, TX",
        twitter: "https://x.com/home",
        facebook: "https://facebook.com/",
        instagram: "https://instagram.com/",
        bio: "These are words that describe the player to which this popup is linked these are a lot of words with nothing to say this is a run on sentence maybe I should stop typing or maybe I should use punctuation but is it really worth it is anything really worth anything why am I even doing this why am I here",
        image: "../../assets/images/player-profile-img-placeholder.png"
    },
    {
        name: "Second Dude",
        birthday: "09",
        birthmonth: "09",
        birthyear: "1999",
        jersey: "10",
        height: "6'6\"",
        weight: "233lbs",
        position: "CF",
        category: "Outfielders",
        bats: "L",
        throws: "L",
        hometown: "College Station, TX",
        twitter: "",
        facebook: "",
        instagram: "",
        bio: "These are words that describe the player to which this popup is linked these are a lot of words with nothing to say this is a run on sentence maybe I should stop typing or maybe I should use punctuation but is it really worth it is anything really worth anything why am I even doing this why am I here",
        image: "../../assets/images/player-profile-img-placeholder.png"
    },
    {
        name: "Third Goober",
        birthday: "10",
        birthmonth: "11",
        birthyear: "1923",
        jersey: "-5",
        height: "4'6\"",
        weight: "764lbs",
        position: "C",
        category: "Catchers",
        bats: "L",
        throws: "R",
        hometown: "Goobertown, AR",
        twitter: "",
        facebook: "",
        instagram: "",
        bio: "These are words that describe the player to which this popup is linked these are a lot of words with nothing to say this is a run on sentence maybe I should stop typing or maybe I should use punctuation but is it really worth it is anything really worth anything why am I even doing this why am I here",
        image: "../../assets/images/player-profile-img-placeholder.png"
    },
    {
        name: "Fourth Loser",
        birthday: "05",
        birthmonth: "04",
        birthyear: "1994",
        jersey: "44",
        height: "6'2\"",
        weight: "200lbs",
        position: "LHP",
        category: "Pitchers",
        bats: "L",
        throws: "L",
        hometown: "Vidor, TX",
        twitter: "",
        facebook: "",
        instagram: "",
        bio: "These are words that describe the player to which this popup is linked these are a lot of words with nothing to say this is a run on sentence maybe I should stop typing or maybe I should use punctuation but is it really worth it is anything really worth anything why am I even doing this why am I here",
        image: "../../assets/images/player-profile-img-placeholder.png"
    }
];

const globalCoaches = [
    {
        name: "Last Human",
        birthday: "03",
        birthmonth: "10",
        birthyear: "1976",
        jersey: "74",
        position: "MANAGER", // position should be all caps
        hometown: "Beaumont, TX",
        twitter: "",
        facebook: "",
        instagram: "",
        bio: "These are words that describe the player to which this popup is linked these are a lot of words with nothing to say this is a run on sentence maybe I should stop typing or maybe I should use punctuation but is it really worth it is anything really worth anything why am I even doing this why am I here",
        image: "../../assets/images/player-profile-img-placeholder.png"
    }
];

const globalSponsors = [
    {
        name: "Entergy",
        id: "entergy",
        address: "https://www.entergytexas.com/about",
        image: "../../assets/sponsors/platinum/EntergyTexas_Logo.png",
        tier: "platinum"
    },
    {
        name: "Avenue Axe Sports Bar",
        id: "avenue-axe",
        address: "https://www.avenueaxe.com/",
        image: "../../assets/sponsors/gold/avenue-axe-sports-bar-logo.png",
        tier: "gold"
    },
    {
        name: "Del Papa Distributing Company",
        id: "del-papa",
        address: "https://delpapadistributing.com/",
        image: "../../assets/sponsors/gold/DelPapa_logo_circle.png",
        tier: "gold"
    },
    {
        name: "Giglio Distributing Company",
        id: "giglio",
        address: "https://www.gigliodistributing.com/",
        image: "../../assets/sponsors/gold/giglio-distributing-logo-compact.png",
        tier: "gold"
    },
    {
        name: "Curt Woodard Enterprises LLC",
        id: "curt-woodard",
        address: "https://curtwoodardllc.com/",
        image: "../../assets/sponsors/gold/curt-woodard-logo.png",
        tier: "gold"
    },
    {
        name: "KidMed",
        id: "kidmed",
        address: "https://kidmedpediatrics.com/",
        image: "../../assets/sponsors/gold/kidmed-logo.png",
        tier: "gold"
    },
    {
        name: "G&T Insurance Agency",
        id: "gt-insurance",
        address: "https://www.gandtinsuranceagency.com/",
        image: "../../assets/sponsors/gold/g-t-insurance-agency-logo.png",
        tier: "gold"
    },
    {
        name: "Refinery Terminal Fire Company",
        id: "rtfc",
        address: "https://rtfc.org/",
        image: "../../assets/sponsors/silver/rtfc-logo.png",
        tier: "silver"
    },
    {
        name: "Jason's Deli",
        id: "jasons-deli",
        address: "https://www.jasonsdeli.com/",
        image: "../../assets/sponsors/silver/jasons-deli-logo.png",
        tier: "silver"
    },
    {
        name: "Tekton Research",
        id: "tekton",
        address: "https://tektonresearch.com/",
        image: "../../assets/sponsors/silver/Tekton-logo.png",
        tier: "silver"
    }
];

/* GLOBAL ARRAYS */


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

const sponsorsEl = document.getElementById('mobile-sponsors');
const footerEl = document.querySelector('footer');

const fadeDuration = 800;
const displayDuration = 4000;

if (!sponsorsEl || !globalSponsors?.length) {
    console.warn('Sponsors not initialized: missing container or sponsor data.');
} else {

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
            nextImg.offsetHeight; // force reflow
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
};

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