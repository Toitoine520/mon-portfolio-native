// document.addEventListener("load", () => {

let zoneDeTexte = document.querySelector(".texte-auto-ecrit");
let presentation = document.querySelector(".presentation > .contenu");

let texteAEcrire = zoneDeTexte;
autoWrite(texteAEcrire, zoneDeTexte.getAttribute("data-vitesse-ecriture"));
autoWrite(presentation, 8);

// });

/**
 * Texte auto écrit
 * | 1 vitesse lente, 10 rapide
 */
function autoWrite(zoneDeTexte, vitesseEcriture) {
  if (typeof zoneDeTexte != "object") {
    throw new Error("Le type de l'élément n'est pas object");
  }
  if (!isANumber(vitesseEcriture)) {
    throw new Error(vitesseEcriture + " devrait être un nombre");
  }

  if (vitesseEcriture == undefined) vitesseEcriture = 5;

  // decomposition de la string dans un tableau
  let texteDecompose = zoneDeTexte.innerText.split("");
  // nettoyage et remplissage de la zone de texte caractère par caractère

  zoneDeTexte.innerText = "";
  for (let i = 0; i < texteDecompose.length; i++) {
    let caractere = texteDecompose[i];
    setTimeout(() => {
      // bug javascript, obligé de réassigner la valeur " " (testé sur firefox)
      if (caractere === " ") {
        caractere = " ";
      }
      zoneDeTexte.innerHTML = zoneDeTexte.innerHTML + caractere;
    }, (1 / vitesseEcriture) * 500 * i);
  }
}

function isANumber(data) {
  let tabNum = "1234567890".split("");
  let tabData = data.toString().split("");
  let allNumbers = true;

  if (allNumbers) {
    for (let i = 0; i < data.length; i++) {
      const car = tabData[i];

      if (!tabNum.includes(car)) {
        allNumbers = false;
      }
    }
  }

  return allNumbers;
}
