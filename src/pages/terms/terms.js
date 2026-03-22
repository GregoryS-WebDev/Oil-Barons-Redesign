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
/* CONTACT INFORMATION */
/*====================================================================================================*/

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("../../data/contact.json");
    const data = await res.json();

    const contact = data.universal?.[0];
    if (!contact) return;

    const addressEl = document.getElementById("address");
    const phoneEl = document.getElementById("phone");
    const emailEl = document.getElementById("email");

    addressEl.textContent = `${contact.address}, ${contact.city}, ${contact.state} ${contact.zipcode}`;

    phoneEl.textContent = contact.phone;
    phoneEl.href = `tel:${contact.phone.replace(/\D/g, "")}`;

    emailEl.textContent = contact.email;
    emailEl.href = `mailto:${contact.email}`;
  } catch (err) {
    console.error("Failed to load contact data:", err);
  }
});

/* END META INFORMATION */
