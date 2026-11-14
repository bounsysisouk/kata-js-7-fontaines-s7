// =====================================================
// Kata JS 7 — Fontaines à boire (aller plus loin)
// Suis les TODO dans l'ordre. La constante reponse vient de fontaines.js.
// =====================================================


// TODO 1 — Explorer la réponse dans la console
// Sans écrire de fonction, affiche avec console.log :
// a. le nombre total de fontaines annoncé par la réponse
// b. le nombre de fontaines réellement présentes dans results
// c. la voie de la première fontaine
// d. la latitude de la deuxième fontaine
// e. le motif d'indisponibilité de la cinquième fontaine

console.log(reponse.total_count); // reponse a: 8
console.log(reponse.results.length); //reponse b: 8
console.log(reponse.results[0].voie); // reponse c: RUE DE LA ROQUETTE
console.log(reponse.results[1].geo_point_2d.lat); //reponse d: 48.8547
console.log(reponse.results[4].motif_ind); // reponse e: Gel

// TODO 2 — extraireFontaines(reponse)
// Retourne le tableau des fontaines, sans l'enveloppe.
function extraireFontaines(reponse) {
    return reponse.results
}
// TODO 3 — afficherFontaines(liste)
// 1. Vide <ul id="liste">
// 2. Un <li> par fontaine : la voie, puis la commune
// 3. Une fontaine hors service reçoit la classe "hors-service"
//    et son motif entre parenthèses
// 4. Le compteur affiche « 8 fontaines »
function afficherFontaines(liste) {
    const ul = document.getElementById("liste");
    ul.innerHTML = "";
    liste.forEach((fontaine) => {
        const li = document.createElement("li");
        let texte = `${fontaine.voie}, ${fontaine.commune}`;
        if (fontaine.dispo !== "OUI") {
            li.classList.add("hors-service");
            texte = texte + ` (${fontaine.motif_ind})`;
        }
        li.textContent = texte;
        ul.appendChild(li)
    });
    const compteur = document.getElementById("compteur")
    if (liste.length > 1) {
        compteur.textContent = `${liste.length} fontaines`;
    } else {
        compteur.textContent = `${liste.length} fontaine`;
    }
}

// TODO 4 — Au chargement, affiche toutes les fontaines.
const fontaines = extraireFontaines(reponse);
afficherFontaines(fontaines);



// TODO 5 — Une fonction en argument
// a. estEnService(fontaine) retourne true si la fontaine est disponible
// b. filtrer(liste, test) retourne un nouveau tableau avec les fontaines
//    pour lesquelles test(fontaine) vaut true
// c. Au clic sur « En service seulement », affiche filtrer(..., estEnService)
function estEnService(fontaine) {
    return fontaine.dispo === "OUI";
}

function filtrer(liste, test) {
    const resultat = [];
    for (let i = 0; i < liste.length; i++) {
        if (test(liste[i])) {
            resultat.push(liste[i]);
        }
    }
    return resultat;
}
const btnEnService = document.getElementById("btn-en-service");
btnEnService.addEventListener("click", () => {
    const fontainesEnService = filtrer(fontaines, estEnService);
    afficherFontaines(fontainesEnService);
});

// TODO 6 — Une fonction fléchée en argument
// Quand on change l'arrondissement dans le <select>, affiche seulement
// les fontaines de cet arrondissement, avec filtrer et une fonction
// fléchée écrite directement dans l'appel.
// « Tous » réaffiche toutes les fontaines.
const selectCommune = document.getElementById("choix-commune");
selectCommune.addEventListener("change", () => {
    const valeur = selectCommune.value;
    if (valeur === "tous") {
        afficherFontaines(fontaines);
    } else {
        const fontainesFiltrees = filtrer(fontaines, (fontaine) => fontaine.commune === valeur)
        afficherFontaines(fontainesFiltrees);
    }
});


// =====================================================
// Questions de recul (réponds en commentaire ici)

// 1.Si on écrit estEnService(), la fonction est exécutée immédiatement
//  au moment de l'appel de filtrer ou de l'écouteur, et son résultat (un booléen)
//  est passé en argument au lieu de la fonction elle-même, ce qui provoque
//  une erreur car ce n'est pas une fonction appelable.

// 2.Le total_count représente le nombre total d'enregistrements disponibles sur le serveur
//  pour cette requête, mais l'API pagine les résultats et ne renvoie qu'une tranche (un lot)
//  à la fois dans results pour ne pas surcharger la réponse

// 3.Une fonction qui appelle une fonction exécute un outil prédéfini
//  pour obtenir un résultat précis, tandis qu'une fonction qui reçoit
//  une fonction (callback) délégue une règle ou un comportement
//  modulable qu'elle exécutera au moment opportun.
// =====================================================
