const burger = document.querySelector(".burger");
const nav = document.querySelector("#main-nav");
if (burger && nav) {
    burger.addEventListener("click", () => {
        nav.classList.toggle("open");
        if (nav.classList.contains("open")) {
            burger.textContent = "X";
        } else {
            burger.textContent = "☰";
        }
    });
    const liens = nav.querySelectorAll("a");
    liens.forEach((lien) => {
        lien.addEventListener("click", () => {
            nav.classList.remove("open");
            burger.textContent = "☰";
        });
    });
}
const evenements = [
    { nom: "Soiree musicale", date: "2026-12-15" },
    { nom: "Scene ouverte", date: "2027-01-10" },
    { nom: "Journee d'ateliers", date: "2027-02-05" }
];
const countdownEl = document.querySelector("#countdown");
if (countdownEl) {
    const prochain = new Date("2026-12-15");
    const aujourdhui = new Date();
    const diff = prochain - aujourdhui;
    const jours = Math.floor(diff / 86400000);
    countdownEl.textContent = "Plus que " + jours + " jours avant la Soiree musicale.";
}
const boutonsFiltre = document.querySelectorAll(".filtre-btn");
const cartesEvents = document.querySelectorAll(".events-container article");
boutonsFiltre.forEach((btn) => {
    btn.addEventListener("click", () => {
        boutonsFiltre.forEach((b) => b.classList.remove("actif"));
        btn.classList.add("actif");
        const categorie = btn.dataset.filtre;
        cartesEvents.forEach((carte) => {
            const catCarte = carte.dataset.categorie;
            if (categorie === "tous" || catCarte === categorie) {
                carte.hidden = false;
            } else {
                carte.hidden = true;
            }
        });
    });
});
const boutonsJaime = document.querySelectorAll(".btn-jaime");
boutonsJaime.forEach((btn) => {
    let compteur = 0;
    btn.addEventListener("click", () => {
        compteur++;
        btn.textContent = "J'aime (" + compteur + ")";
        btn.classList.toggle("actif");
    });
});
const instrumentSelect = document.querySelector("#instrument");
const autreDiv = document.querySelector("#autre-div");
if (instrumentSelect) {
    instrumentSelect.addEventListener("change", () => {
        if (instrumentSelect.value === "Other") {
            autreDiv.hidden = false;
        } else {
            autreDiv.hidden = true;
        }
    });
}
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
        if (nom.length < 3) {
            message.textContent = "Veuillez entrer votre nom complet.";
            message.classList.add("erreur");
            message.classList.remove("ok");
            champNom.classList.add("invalide");
            return;
        }
        if (!email.includes("@") || !email.includes(".")) {
            message.textContent = "Veuillez entrer une adresse e-mail valide.";
            message.classList.add("erreur");
            message.classList.remove("ok");
            champEmail.classList.add("invalide");
            return;
        }
        if (!champAge.value) {
            message.textContent = "Veuillez choisir votre tranche d'age.";
            message.classList.add("erreur");
            message.classList.remove("ok");
            return;
        }
        if (!champExp.value) {
            message.textContent = "Veuillez choisir votre niveau musical.";
            message.classList.add("erreur");
            message.classList.remove("ok");
            return;
        }
        if (raison.length < 10) {
            message.textContent = "Veuillez expliquer en quelques mots pourquoi vous voulez rejoindre HARMONY.";
            message.classList.add("erreur");
            message.classList.remove("ok");
            champRaison.classList.add("invalide");
            return;
        }
        if (!champAgree.checked) {
            message.textContent = "Veuillez confirmer que les informations sont exactes.";
            message.classList.add("erreur");
            message.classList.remove("ok");
            return;
        }
        message.textContent = "Merci " + nom + " ! Votre candidature a bien ete envoyee. Nous vous contacterons sur " + email + ".";
        message.classList.add("ok");
        message.classList.remove("erreur");
        form.reset();
        if (autreDiv) autreDiv.hidden = true;
    });
}

const heroLabel = document.querySelector(".hero-label");
if (heroLabel) {
    const heure = new Date().getHours();
    if (heure < 12) {
        heroLabel.textContent = "BONJOUR - BIENVENUE CHEZ HARMONY";
    } else if (heure < 18) {
        heroLabel.textContent = "BON APRES-MIDI - BIENVENUE CHEZ HARMONY";
    } else {
        heroLabel.textContent = "BONSOIR - BIENVENUE CHEZ HARMONY";
    }
}
const champs = document.querySelectorAll("#join-form input, #join-form select, #join-form textarea");
champs.forEach((champ) => {
    champ.addEventListener("focusout", () => {
        const valeur = champ.value.trim();
        if (champ.id === "email") {
            if (!valeur.includes("@") || !valeur.includes(".")) {
                champ.classList.add("invalide");
                champ.classList.remove("valide");
            } else {
                champ.classList.add("valide");
                champ.classList.remove("invalide");
            }
            return;
        }
        if (champ.hasAttribute("required") && valeur === "") {
            champ.classList.add("invalide");
            champ.classList.remove("valide");
        } else {
            champ.classList.add("valide");
            champ.classList.remove("invalide");
        }
    });
});