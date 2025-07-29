// document.addEventListener("load", () => {

let zoneDeTexte = document.querySelector(".texte-auto-ecrit");

let texteAEcrire = zoneDeTexte;
autoWrite(texteAEcrire, zoneDeTexte.getAttribute("vitesse-ecriture"));

// });

/**
 * Texte auto écrit
 * // 1 vitesse lente, 10 rapide
 */
function autoWrite(zoneDeTexte, vitesseEcriture) {
    if (vitesseEcriture == undefined) vitesseEcriture = 5;
  // decomposition de la string dans un tableau
  let texteDecompose = zoneDeTexte.innerText.split("");
  // nettoyage et remplissage de la zone de texte caractère par caractère

  zoneDeTexte.innerText = "";
  for (let i = 0; i < texteDecompose.length; i++) {
    let caractere = texteDecompose[i];
    setTimeout(() => {
        // bug javascript, obligé de réassigner la valeur " " (testé sur firefox)
        if (caractere === ' ') {
            caractere = ' ';
        } 
        zoneDeTexte.innerHTML = zoneDeTexte.innerHTML + caractere;
    }, 1/vitesseEcriture * 500 * i);
  }
}
