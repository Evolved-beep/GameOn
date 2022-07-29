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
  modalbg.style.display="none";
}

const modalSuccess = document.querySelector(".bgsuccess");

function launchSuccess(){
  modalSuccess.style.display="block";
}



const button_close = document.querySelector("#button_close");
button_close.addEventListener("click", successModal);

function successModal (){
  modalSuccess.style.display= "none";
  modalbg.style.display="none";
  location.reload()
}

// Variable pour récupèrer le form
let form = document.querySelector("#form-action");

// On découpe chaque input pour pouvoir y effectuer les validations nécéssaires
form.first.addEventListener("focusout", function () {
  validName();
});

form.last.addEventListener("focusout", function () {
  validFamilyName();
});

form.email.addEventListener("focusout", function () {
  validEmail();
});
form.birthdate.addEventListener("focusout", function () {
  validDate();
});

form.quantity.addEventListener("focusout", function () {
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
    event.stopPropagation();
  return launchSuccess();
  } else {
    alert("Votre formulaire ne peut pas être envoyé");
  }
});

let Msg = document.createElement("span");

// traite les erreurs
function setError(element, message){
  Msg.classList.remove("messageValid")
  Msg.classList.add("messageErreur");
  Msg.innerHTML = message;
  element.classList.remove("inputSuccess");
  element.classList.add("inputError");
  element.parentElement.append(Msg)

  return false;
} 

// traite la validation
function setValid(element, message) {
  Msg.classList.remove("messageErreur");
  Msg.classList.add("messageValid");
  Msg.innerHTML = message;
  element.classList.remove("inputErreur");
  element.classList.add("inputSuccess");
  element.parentElement.append(Msg)

  return true;
}

// traite les erreurs du bouton radio
function setErrorLocation(element,message){
  Msg.classList.remove("messageValid");
  Msg.classList.add("messageErreur")
  Msg.innerHTML= message;
  element[0].parentElement.append(Msg)
  return false;
}

// traite la validation du bouton radio
function setValidLocation(element,message){
  Msg.classList.remove("messageErreur");
  Msg.classList.add("messageValid");
  Msg.innerHTML = message
  element[0].parentElement.append(Msg)

  return true;
}

// test la validité du prénom
const validName = function () {
const nameRegExp = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ- -]{2,}$");
  if (nameRegExp.test(form.first.value.trim())) {
    return setValid(form.first, "Votre prénom est valide");
  }
  
  return setError(form.first, "Votre prénom doit contenir au minimum deux caractères valide"); 
};

// test la validité du nom de famille
const validFamilyName = function () {
  const FamNameRegExp = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ- -]{2,}$");
  if (FamNameRegExp.test(form.last.value.trim())) {   
    return setValid(form.last, "Votre nom est valide") ;
  }

  return setError(form.last, "Votre nom doit contenir au minimum deux caractères valide");
};

// test la validation de l'email
const validEmail = function () {
  const emailRegExp = new RegExp(
    "^[a-zA-Z0-9À-ÖØ-öø-ÿ. -_]{1,}[@]{1}[a-zA-Z0-9.-_]{1,}[.]{1}[a-zA-Z]{2,10}$"
  );
  const emailValue = form.email.value.trim();
  if (emailRegExp.test(emailValue)) { 
    
    return setValid(form.email, "Votre email est valide");

  }
  
  return setError(form.email, "Vous devez entrer une adresse email valide");;
};

// test la validation de la date de naissance
const validDate = function () {
  const birthDate = new Date(form.birthdate.value);
  const todayDate = new Date();
  const intervalYears = 100;
  if (birthDate.getTime() > todayDate.getTime() || birthDate.getFullYear() < todayDate.getFullYear() - intervalYears) {
    return setError(form.birthdate, "Vous devez entrer votre date de naissance.");;
  }
  
  return setValid(form.birthdate, "Votre date de naissance est valide");
};

// test la validation de l'input tournamement
const validTournament = function () {
  const tournamentRegExp = new RegExp("^[0-9]{1,}$");
  if (tournamentRegExp.test(form.quantity.value)) {
    return setValid(form.quantity, "Vous avez renseigné votre nombre de tournois GameOn joué");
  }
 
  return setError(form.quantity, "Vous devez indiquer le nombre de tournois GameOn déjà joué");
};

// Vérifie si un lieu est coché
const validLocation = function () {
  if (form.location.value) {
    return setValidLocation(form.location, "Vous avez coché un lieu");
  }

  return setErrorLocation(form.location, "Vous devez cocher un lieu !")
};


// Verifie si les conditions d'utilisation sont cochés 
const validCondition = function () {
  if (Condition.checked) {
    return setValid(Condition, "Vous avez accepter les termes d'utilisation");
  }

  return setError(Condition, "Vous devez accepter les termes d'utilisation");
};

// On vérifie que tous les inputs return true dans ce cas validate est true et on peut envoyer le formulaire
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
}