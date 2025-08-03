// document.addEventListener("load", () => {

let zoneDeTexte = document.querySelector(".texte-auto-ecrit");
let presentation = document.querySelector(".presentation > .contenu");

let texteAEcrire = zoneDeTexte;
autoWrite(texteAEcrire, zoneDeTexte.getAttribute("data-vitesse-ecriture"));
autoWrite(presentation, 8);

/**
 * Menu
 */
let hamburger = document.querySelector(".hamburger");
let menu = document.querySelector(".menu");
let linkContainer = menu.querySelector(".link-container");
let tabTitres = document.querySelectorAll("h2");
let isCacher = true;

let liensMenu = document.querySelectorAll(".lien-menu");
let clickEvt;

hamburger.addEventListener("click", () => {
  if (!isCacher) {
    // hide menu
    menu.classList.add("cacher");
    isCacher = true;
    removeEventListener("click", clickEvt);
  } else {
    // show menu
    createLinkListener(liensMenu);
    menu.classList.remove("cacher");
    isCacher = false;
  }
});

assignerLiensMenu(tabTitres, linkContainer);

// EXPERIENCES

creerPopupsExperiences();

// });

function creerPopupsExperiences() {
  let cartesExperience = document.querySelectorAll(".carte-experience");
  
  for (let i = 0; i < cartesExperience.length; i++) {
    let carteExperienceHover = document.createElement("div");
    // template créé dans le html à la fin de la section EXPERIENCES
    let boutonVoirPlus = document.createElement("button");
    boutonVoirPlus.classList.add("voir-plus", "bouton", "primaire");
    boutonVoirPlus.innerText = "^";
    //Remplissage du contenu
    carteExperienceHover.innerHTML = cartesExperience[i].innerHTML;
    carteExperienceHover.classList.add("carte-experience-popup", "cacher");
    cartesExperience[i].appendChild(carteExperienceHover);

    carteExperienceHover.append(boutonVoirPlus);
    
    boutonVoirPlus.onclick = () => {
      console.log("click");
      // faire apparaître la popup indiquant les détails de mes expériences
    };
    
    let eventLeaveCard;

    //Apparition
    cartesExperience[i].addEventListener("mouseenter", () => {
      carteExperienceHover.classList.remove("cacher");

      //Disparition lorsqu'on leave le hover mais aussi quand on leave la carte sans survoler le hover et sans multiplier les listener
      eventLeaveCard = cartesExperience[i].addEventListener(
        "mouseleave",
        (e) => {
          carteExperienceHover.classList.add("cacher");
          removeEventListener("mouseleave", eventLeaveCard);
        }
      );
    });

    carteExperienceHover.addEventListener("mouseenter", (e) => {
      removeEventListener("mouseleave", eventLeaveCard);
      let eventListenerLeave = carteExperienceHover.addEventListener(
        "mouseleave",
        (e) => {
          e.target.classList.add("cacher");
          removeEventListener("mouseleave", eventListenerLeave);
        }
      );
    });
  }

}

/** 
 * Permet de créer une popup activée au hover des expériences
 * */ 
function assignerContenuExperiencesPopups() {
  
}

function assignerLiensMenu(titres, menu) {
  for (let i = 0; i < titres.length; i++) {
    let lien = document.createElement("a");
    let contenu = titres[i].textContent;
    let id = titres[i].getAttribute("id");
    let noLinkTo = false;
    if (id === null) {
      throw new Error(
        "l'élément cible n'a pas d'id -> " +
          titres[i].tagName +
          " " +
          titres[i].innerText
      );
    } else if (id == "noLink") {
      noLinkTo = true;
    }
    lien.innerText = contenu;
    lien.classList.add("lien-menu");
    if (!noLinkTo) {
      lien.setAttribute("href", "#" + id);
      menu.appendChild(lien);
    }
  }
  liensMenu = document.querySelectorAll(".lien-menu");
}

function createLinkListener(linksTab) {
  for (let i = 0; i < linksTab.length; i++) {
    clickEvt = linksTab[i].addEventListener("click", () => {
      menu.classList.add("cacher");
      isCacher = true;
      removeEventListener("click", clickEvt);
    });
  }
}

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
