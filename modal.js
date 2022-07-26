function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Modal element
const closemodal = document.querySelector(".close");

// Fermeture du modal event
closemodal.addEventListener("click", removeClick);

//Fonction pour faire disparaître le modal au clic
function removeClick() {
  modalbg.style.display = "none";
  reset();
}

function reset(){
  form.reset();
}

const modalSuccess = document.querySelector(".bgsuccess");

function launchSuccess(){
  modalSuccess.style.display="block";
  form.submit();
}

// Variable pour récupèrer le form
let form = document.querySelector("#form-action");

// On découpe chaque input pour pouvoir y effectuer les validations nécéssaires
form.first.addEventListener("change", function () {
  validName();
});

form.last.addEventListener("change", function () {
  validFamilyName();
});

form.email.addEventListener("change", function () {
  validEmail();
});
form.birthdate.addEventListener("change", function () {
  validDate();
});

form.quantity.addEventListener("change", function () {
  validTournament();
});

form.location.forEach((radioBtn) => {
  radioBtn.addEventListener("change", function () {
    validLocation();
  });
});

const Condition = document.getElementById("checkbox1");

Condition.addEventListener("click", function () {
  validCondition();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validate() === true) {
    return launchSuccess();
  } else {
    alert("Votre formulaire ne peut pas être envoyé");
  }
});

let Msg = document.createElement("span");

function isError(element, message) {
  Msg.classList.add("messageErreur");
  Msg.classList.remove("messageValid");
  Msg.innerHTML = message;
  if (element !== form.location) {
    element.parentElement.append(Msg);
  } else {
    element[0].parentElement.append(Msg);
  }
}

function isValid(element, message, ) {
  Msg.classList.add("messageValid");
  Msg.classList.remove("messageErreur");
  Msg.innerHTML = message;
  if (element !== form.location) {
    element.parentElement.append(Msg);
  } else {
    element[0].parentElement.append(Msg);
  }
}

function isInputError(element) {
  for(element of formData){
    if (element.children.value === false) {
      element.setAttribute("data-error-visible", "true");
    }
  }
} 

function isInputSuccess(element){
 
}


// Création des fonctions afin de mettre en place la validité
const validName = function () {
  // Création de la regex pour les inputs nom/prénom
  const nameRegExp = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ- -]{2,}$");
  // Mise en place de la condition de validité pour les inputs nom/prénom
  if (nameRegExp.test(form.first.value) === false) {
    isError(form.first, "Votre prénom doit contenir au minimum deux caractères valide");
    isInputError(form.first);

    return false;
  }
  console.log(form.first.value);
  isValid(form.first, "Votre prénom est valide");
  isInputSuccess(form.first);
  return true;
};

const validFamilyName = function () {
  const FamNameRegExp = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ- -]{2,}$");
  if (FamNameRegExp.test(form.last.value) === false) {
    isError(form.last, "Votre nom doit contenir au minimum deux caractères valide");
    isInputError(form.last);
    return false;
  }
  isValid(form.last, "Votre nom est valide");
  isInputSuccess(form.last);
  return true;
};

const validEmail = function () {
  const emailRegExp = new RegExp(
    "^[a-zA-Z0-9À-ÖØ-öø-ÿ. -_]{1,}[@]{1}[a-zA-Z0-9.-_]{1,}[.]{1}[a-zA-Z]{2,10}$"
  );
  if (emailRegExp.test(form.email.value) === false) {
    isError(form.email, "Vous devez entrer une adresse email valide");
    isInputError(form.email);
    return false;

  }
  isValid(form.email, "Votre email est valide");
  isInputSuccess(form.email);

  return true;
};

const validDate = function () {
  const birthDate = new Date(form.birthdate.value);
  const todayDate = new Date();

  // La condition nous sert à verifié que la date que rentre l'utilisateur n'est pas supérieur à la date d'aujourd'hui
  if (birthDate.getTime() > todayDate.getTime()) {
    isError(form.birthdate, "Vous devez entrer votre date de naissance.");
    isInputError(form.birthdate);
    
    return false;
  }
  isValid(form.birthdate, "Votre date de naissance est valide");
  isInputSuccess(form.birthdate);

  return true;
};
const validTournament = function () {
  const tournamentRegExp = new RegExp("^[0-9]{1,}$");
  if (tournamentRegExp.test(form.quantity.value) === false) {
    isError(form.quantity, "Vous devez indiquer le nombre de tournois GameOn déjà joué");
    isInputError(form.quantity);
  }
  isValid(form.quantity, "Vous avez renseigné votre nombre de tournois GameOn joué");
  isInputSuccess(form.quantity);
  console.log(form.quantity.value);
  return true;
};

const validLocation = function () {
  if (form.location.value === "") {
    isError(form.location, "Veuillez cochez un des choix présent");

    return false;
  }
  isValid(form.location, "Vous avez coché un des choix présent");

  return true;
};

const validCondition = function () {
  if (Condition.checked === false) {
    isError(Condition, "Vous devez accepter les termes d'utilisation");
    isInputError(Condition);

    return false;
  }
  isValid(Condition, "Vous avez accepter les termes d'utilisation");
  isInputSuccess(Condition);

  return true;
};

const validate = function () {
  if (
    validName() &&
    validFamilyName() &&
    validEmail() &&
    validDate() &&
    validTournament() &&
    validLocation() &&
    validCondition()
  ) {
    return true;
  }
};
