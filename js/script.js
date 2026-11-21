// 1. Menu burger - mobile
const burger = document.querySelector(".burger");
const nav = document.querySelector("#main-nav");
if (burger && nav) {
  burger.addEventListener("click", () => {
    const ouvert = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", ouvert ? "true" : "false");
    burger.textContent = ouvert ? "✕" : "☰";
    burger.setAttribute("aria-label", ouvert ? "Fermer le menu" : "Ouvrir le menu");
  });
  nav.querySelectorAll("a").forEach((lien) => {
    lien.addEventListener("click", () => {
      nav.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      burger.textContent = "☰";
    });
  });
}

// 2. Countdown - événement le plus proche
const evenements = [
  { nom: "Soiree musicale", date: "2026-12-15" },
  { nom: "Scene ouverte", date: "2027-01-10" },
  { nom: "Journee d'ateliers", date: "2027-02-05" }
];
const countdownEl = document.querySelector("#countdown");
if (countdownEl) {
  const aujourdhui = new Date();
  const prochain = evenements.map(e => ({ ...e, d: new Date(e.date) })).find(e => e.d >= aujourdhui);
  if (prochain) {
    const jours = Math.ceil((prochain.d - aujourdhui) / 86400000);
    countdownEl.textContent = "Plus que " + jours + " jours avant : " + prochain.nom + ".";
  } else {
    countdownEl.textContent = "Merci pour votre participation à nos événements !";
  }
}

// 3. Filtres événements
const boutonsFiltre = document.querySelectorAll(".filtre-btn");
const cartesEvents = document.querySelectorAll(".events-container article");
boutonsFiltre.forEach((btn) => {
  btn.addEventListener("click", () => {
    boutonsFiltre.forEach((b) => b.classList.remove("actif"));
    btn.classList.add("actif");
    const categorie = btn.dataset.filtre;
    cartesEvents.forEach((carte) => {
      carte.hidden = !(categorie === "tous" || carte.dataset.categorie === categorie);
    });
  });
});

// 4. J'aime avec localStorage
const boutonsJaime = document.querySelectorAll(".btn-jaime");
boutonsJaime.forEach((btn, index) => {
  let compteur = Number(localStorage.getItem("jaime-" + index) || 0);
  if (compteur > 0) { btn.textContent = "J'aime (" + compteur + ")"; btn.classList.add("actif"); }
  btn.addEventListener("click", () => {
    compteur++;
    localStorage.setItem("jaime-" + index, compteur);
    btn.textContent = "J'aime (" + compteur + ")";
    btn.classList.add("actif");
  });
});

// 5. Instrument Autre
const instrumentSelect = document.querySelector("#instrument");
const autreDiv = document.querySelector("#autre-div");
if (instrumentSelect) {
  instrumentSelect.addEventListener("change", () => {
    autreDiv.hidden = instrumentSelect.value !== "Other";
  });
}

// 6. Formulaire
const form = document.querySelector("#join-form");
const message = document.querySelector("#form-message");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nom = document.querySelector("#fullname").value.trim();
    const email = document.querySelector("#email").value.trim();
    const raison = document.querySelector("#reason").value.trim();
    const champNom = document.querySelector("#fullname");
    const champEmail = document.querySelector("#email");
    const champRaison = document.querySelector("#reason");
    const champAge = document.querySelector("#age");
    const champExp = document.querySelector("#experience");
    const champAgree = document.querySelector("#agreement");
    const setErr = (champ, msg) => { message.textContent = msg; message.style.color = "#ff6b6b"; champ.classList.add("invalide"); champ.classList.remove("valide"); };
    if (nom.length < 3) return setErr(champNom, "Veuillez entrer votre nom complet.");
    if (!email.includes("@") || !email.includes(".")) return setErr(champEmail, "Veuillez entrer une adresse e-mail valide.");
    if (!champAge.value) return setErr(champAge, "Veuillez choisir votre tranche d'âge.");
    if (!champExp.value) return setErr(champExp, "Veuillez choisir votre niveau musical.");
    if (raison.length < 10) return setErr(champRaison, "Veuillez expliquer en quelques mots pourquoi vous voulez rejoindre HARMONY.");
    if (!champAgree.checked) return setErr(champAgree, "Veuillez confirmer que les informations sont exactes.");
    message.textContent = "Merci " + nom + " ! Votre candidature a bien été envoyée. Nous vous contacterons sur " + email + ".";
    message.style.color = "#c19aff";
    form.reset();
    form.querySelectorAll(".valide,.invalide").forEach(c => c.classList.remove("valide","invalide"));
    if (autreDiv) autreDiv.hidden = true;
  });
}

// 7. Hero selon l'heure
const heroLabel = document.querySelector(".hero-label");
if (heroLabel) {
  const heure = new Date().getHours();
  if (heure < 12) heroLabel.textContent = "BONJOUR - BIENVENUE CHEZ HARMONY";
  else if (heure < 18) heroLabel.textContent = "BON APRES-MIDI - BIENVENUE CHEZ HARMONY";
  else heroLabel.textContent = "BONSOIR - BIENVENUE CHEZ HARMONY";
}

// 8. Validation en direct
const champs = document.querySelectorAll("#join-form input, #join-form select, #join-form textarea");
champs.forEach((champ) => {
  champ.addEventListener("focusout", () => {
    const valeur = champ.value.trim();
    if (champ.id === "email") {
      const ok = valeur.includes("@") && valeur.includes(".");
      champ.classList.toggle("valide", ok);
      champ.classList.toggle("invalide", !ok && valeur !== "");
      return;
    }
    if (champ.hasAttribute("required") && valeur === "") {
      champ.classList.add("invalide"); champ.classList.remove("valide");
    } else if (valeur !== "") {
      champ.classList.add("valide"); champ.classList.remove("invalide");
    }
  });
});