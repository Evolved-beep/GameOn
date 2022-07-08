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
  modalbg.style.display ="block";
}

// Modal element 
const closemodal = document.querySelector(".close");

// Fermeture du modal event
closemodal.addEventListener("click", removeClick);

//Fonction pour faire disparaître le modal au clic
function removeClick() {
  modalbg.style.display="none";
}

// Variable pour récupèrer le form 
let form = document.querySelector('#form-action');

// On découpe chaque input pour pouvoir y effectuer les validations nécéssaires
form.first.addEventListener('change', function(){
  validName(this);
});

form.last.addEventListener('change', function(){
  validFamilyName(this);
});

form.email.addEventListener('change', function(){
  validEmail(this);
});
form.birthdate.addEventListener('change', function(){
  validDate(this);
});

form.quantity.addEventListener('change', function(){
  validTournament(this);
});

form.location.forEach(radioBtn => {
  radioBtn.addEventListener('change', function(){
    validLocation(this);
  })
});

const Condition = document.getElementById("checkbox1");

Condition.addEventListener('click', function(){
  validCondition(this);
})

form.addEventListener('submit', function(event){
  event.preventDefault();
  if (validate() === true){
    form.submit();

  } else {
    alert("Votre formulaire ne peut pas être envoyé");
  }

})


// Création des fonctions afin de mettre en place la validité

const validName = function(inputName){
  // Création de la regex pour les inputs nom/prénom
  const nameRegExp = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ- \-]{2,}$');
  // Mise en place de la condition de validité pour les inputs nom/prénom
  let msg = "Votre nom est valide";
  if (nameRegExp.test(form.first.value) === false){
    msg = "Entrez un nom valide";
  }
  console.log(msg);
  console.log(form.first.value)
  return inputName;
}

const validFamilyName = function(inputFamilyName){
  const FamNameRegExp = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ- \-]{2,}$');

  let msg = "Votre nom de Famille est valide";
  if(FamNameRegExp.test(form.last.value) === false){
    msg="Entrez votre nom de famille";
  }
  console.log(msg);
  return inputFamilyName;
}

const validEmail = function(inputEmail){
  const emailRegExp = new RegExp ('^[a-zA-Z0-9À-ÖØ-öø-ÿ. \-\_]{1,}[@]{1}[a-zA-Z0-9.-_]{1,}[.]{1}[a-zA-Z]{2,10}$');
  let msg ="Votre email est valide";

  if (emailRegExp.test(form.email.value) === false){
    msg = "Entrez une adresse mail valide"
    return alert("Erreur Mail")
  }
  return inputEmail;


}

const validDate = function(inputDate){
  //On formate la date afin de l'avoir en format fr
  let dt = new Date();
  let dateL= dt.toLocaleString('fr-FR', {
    weekday:"short",
    month:"2-digit",
    year:"numeric"
  })
  let msg = "Votre date de naissance est valide";
  
  // La condition nous sert à verifié que la date que rentre l'utilisateur n'est pas supérieur à la date d'aujourd'hui 
  if (inputDate.value > dateL){
    let msg="Vous devez entrer une date valide";
  }
 
}

const validTournament = function(inputTournament){
  const tournamentRegExp = new RegExp('^[0-9]{1,}$');
  let msg = "Votre chiffre est valide";
  
  if (tournamentRegExp.test(form.quantity.value) === false){
    msg = "Veuillez entrer un chiffre valide";
    return alert("Erreur blbk")
  }
  return inputTournament;
}

const validLocation = function(inputLocation){
  let msg = "Vous avez cochez au moins un des propositions";

  if (form.location.value === ""){
    msg = "Vous devez cochez au minimum un lieu";
    return alert("Erreur vous devez cochez au moins une proposition");
  }
  console.log(msg);
  return inputLocation;
}

const validCondition = function(Condition){
  let msg = "Vous avez accepté les conditions";
  if(Condition.checked == false){
    msg = "Vous devez accepter les termes";
    return alert("Vous devez acceptez les termes")
  }
  return Condition;
}

const validate = function(){
  if((validName(form.first.value)) && (validEmail(form.email.value)) && (validTournament(form.quantity.value)) && (validLocation(form.location.value)) && (validCondition(Condition.checked === true)) === true){
    alert("Félicitation votre réservation est effectué");
    return true;
    }
    console.log(form.first.value);
    console.log(form.last.value);
    console.log(form.email.value);
    console.log(form.quantity.value);
    console.log(form.location.value);
    console.log(Condition.checked);
}

