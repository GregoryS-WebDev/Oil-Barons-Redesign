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
/* ROSTER HELPER FUNCTIONS */
/*====================================================================================================*/

const categories = [
    "PITCHERS",
    "CATCHERS",
    "INFIELDERS",
    "OUTFIELDERS",
    "COACHES",
];

function calcAge(day, month, year) {
    if (!day || !month || !year) return "";
    const dob = new Date(`${year}-${month}-${day}`);
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function formatBirthday(day, month, year) {
    if (!day || !month || !year) return "";
    const d = new Date(`${year}-${month}-${day}`);
    const age = calcAge(day, month, year);
    return `${d.toLocaleDateString()} (${age})`;
}

function extendHandedness(handedness) {
    if (!handedness) return "NA";
    const h = handedness.toUpperCase();
    if (h === "L") return "Left";
    if (h === "R") return "Right";
    return "NA";
}

function el(tag, classAttribute, content) {
    const e = document.createElement(tag);
    if (classAttribute) e.className = classAttribute;
    if (content) e.innerHTML = content;
    return e;
}

function buildSocials(obj) {
    const wrap = el("div", "socials");

    if (obj.twitter) wrap.appendChild(link("twitter", obj.twitter));
    if (obj.instagram) wrap.appendChild(link("instagram", obj.instagram));
    if (obj.facebook) wrap.appendChild(link("facebook", obj.facebook));

    return wrap.childElementCount ? wrap : null;
}

function link(platform, href) {
    const a = document.createElement("a");
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = `social ${platform}`;
    a.setAttribute("aria-label", platform);
    a.innerHTML = getSocialIcon(platform);
    return a;
}

function getSocialIcon(platform) {
    const icons = {
        twitter: `<img src="../../assets/images/icons/x-icon.png" alt="twitter" />`,
        instagram: `<img src="../../assets/images/icons/instagram-icon.png" alt="instagram" />`,
        facebook: `<img src="../../assets/images/icons/facebook-icon.png" alt="facebook" />`,
    };
    return icons[platform] || "";
}

/* END ROSTER HELPER FUNCTIONS */

/*====================================================================================================*/
/* FETCH DATA AND CALL RENDER */
/*====================================================================================================*/

async function initRoster() {
    const [rosterRes, coachesRes] = await Promise.all([
        fetch("../../data/roster.json"),
        fetch("../../data/coaches.json"),
    ]);

    if (!rosterRes.ok || !coachesRes.ok) {
        throw new Error("Failed to load JSON data");
    }

    const roster = await rosterRes.json();
    const coaches = await coachesRes.json();

    render(roster, coaches);
}

/* END FETCH DATA AND CALL RENDER */

/*====================================================================================================*/
/* ROSTER RENDERING */
/*====================================================================================================*/

const rosterEl = document.getElementById("roster");
const filterEl = document.getElementById("category-filter");

function buildPlayerCard(player) {
    const card = el("article", "card");

    const img = document.createElement("img");
    img.src = player.image;
    img.alt = player.name;

    const position = el("p", "position", player.position);

    const infoBox = el("div", "info-box");
    const nameJersey = el("div", "name-jersey");
    infoBox.appendChild(nameJersey);

    const name = el("h3", "name", `${player.name}&nbsp;`);
    const jersey = el("p", "jersey", player.jersey);
    nameJersey.append(name, jersey);

    const playerInfo = el(
        "p",
        "info",
        `B/T: ${player.bats}/${player.throws} &nbsp; Ht: ${
            player.height
        } &nbsp; Wt: ${player.weight} <br />
        DOB: ${formatBirthday(
            player.birthday,
            player.birthmonth,
            player.birthyear
        )} <br />
        FROM: ${player.hometown}`
    );

    infoBox.appendChild(playerInfo);
    card.append(img, position, infoBox);

    card.addEventListener("click", () => openModal(player, false));

    return card;
}

function buildCoachCard(coach) {
    const card = el("article", "card");

    const img = document.createElement("img");
    img.src = coach.image;
    img.alt = coach.name;

    const infoBox = el("div", "info-box");
    const nameJersey = el("div", "name-jersey");
    infoBox.appendChild(nameJersey);

    const name = el("h3", "name", `${coach.name}&nbsp;`);
    const jersey = el("p", "jersey", coach.jersey);
    nameJersey.append(name, jersey);

    const coachInfo = el(
        "p",
        "info",
        `${coach.position} <br />
        DOB: ${formatBirthday(
            coach.birthday,
            coach.birthmonth,
            coach.birthyear
        )} <br />
        FROM: ${coach.hometown}`
    );

    infoBox.appendChild(coachInfo);
    card.append(img, infoBox);

    card.addEventListener("click", () => openModal(coach, true));

    return card;
}

function render(roster, coaches, filter = "All") {
    rosterEl.classList.remove("unloaded");
    rosterEl.innerHTML = "";

    categories.forEach((category) => {
        if (filter !== "All" && filter.toUpperCase() !== category) return;

        const group = el("div", "roster-category");
        group.appendChild(el("h2", "category-header", category));

        if (category === "COACHES") {
            coaches.forEach((c) => group.appendChild(buildCoachCard(c)));
        } else {
            roster
                .filter((p) => (p.category || "").toUpperCase() === category)
                .forEach((p) => group.appendChild(buildPlayerCard(p)));
        }

        rosterEl.appendChild(group);
    });

    currentRoster = roster;
    currentCoaches = coaches;
}

/* END ROSTER RENDERING */

/*====================================================================================================*/
/* FILTER HANDLING */
/*====================================================================================================*/

let currentRoster = [];
let currentCoaches = [];

filterEl.addEventListener("change", (e) => {
    render(currentRoster, currentCoaches, e.target.value);
});

/* END FILTER HANDLING */

/*====================================================================================================*/
/* MODAL */
/*====================================================================================================*/

const modal = document.getElementById("player-modal");
const modalName = document.getElementById("modal-name");
const modalJerseyPos = document.getElementById("jersey-pos");
const modalImg = document.getElementById("modal-img");
const modalBio = document.getElementById("modal-bio");
const modalMeta = document.getElementById("modal-meta");
const modalSocials = document.getElementById("modal-socials");
const closeBtn = document.getElementById("close-modal");
const body = document.getElementById("body");

function openModal(obj, isCoach) {
    modalName.textContent = obj.name;

    modalImg.src = obj.image;
    modalImg.alt = obj.name;

    modalBio.textContent = obj.bio || "";

    if (isCoach) {
        modalJerseyPos.innerHTML = "";
        modalMeta.innerHTML = `
      Position: ${obj.position}<br>
      DOB: ${formatBirthday(obj.birthday, obj.birthmonth, obj.birthyear)}
    `;
    } else {
        modalJerseyPos.innerHTML = `
      #${obj.jersey} | ${obj.position}
    `;
        modalMeta.innerHTML = `
      Ht: ${obj.height}&nbsp;&nbsp; Wt: ${obj.weight}<br>
      BAT/THR: ${extendHandedness(obj.bats)}/${extendHandedness(obj.throws)}<br>
      DOB: ${formatBirthday(obj.birthday, obj.birthmonth, obj.birthyear)}<br>
    `;
    }

    modalSocials.innerHTML = "";

    const socials = buildSocials(obj);
    if (socials) modalSocials.appendChild(socials);

    modal.showModal();
    body.classList.add("modal-open");
}

function closeModal() {
    modal.close();
    body.classList.remove("modal-open");
}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    const rect = modal.getBoundingClientRect();
    const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

    if (!inside) modal.close();
});

/* END MODAL */

/*====================================================================================================*/
/* INIT */
/*====================================================================================================*/

document.addEventListener("DOMContentLoaded", () => {
    initRoster().catch((err) => console.error(err));
});

/* END INIT */
