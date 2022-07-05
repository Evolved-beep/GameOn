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
  validName(this);
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


// Création des fonctions afin de mettre en place la validité

const validName = function(inputName){
  // Création de la regex pour les inputs nom/prénom
  const nameRegExp = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ- \-]{2,}$');

  // Mise en place de la condition de validité pour les inputs nom/prénom
  let msg = "Votre nom est valide";
  if (nameRegExp.test(inputName.value) === false){
    msg = "Entrez un nom valide";
  } 
  console.log(msg);
  console.log(nameRegExp.test(inputName.value));
  console.log(inputName.value);
}



const validEmail = function(inputEmail){
  const emailRegExp = new RegExp ('^[a-zA-Z0-9À-ÖØ-öø-ÿ. \-\_]{1,}[@]{1}[a-zA-Z0-9.-_]{1,}[.]{1}[a-zA-Z]{2,10}$');
  let msg ="Votre email est valide";

  if (emailRegExp.test(inputEmail.value) === false){
    msg = "Entrez une adresse mail valide"
    
  }
  console.log(msg)
    console.log(emailRegExp.test(inputEmail.value));
    console.log(inputEmail.value);
}

const validDate = function(inputDate){
  //On formate la date afin de l'avoir en format fr
  let intl = new Intl.DateTimeFormat("fr-FR", {weekday:"short",month:"2-digit",year:'numeric'});
  let dt = new Date();

  // La condition nous sert à verifié que la date que rentre l'utilisateur n'est pas supérieur à la date d'aujourd'hui 
  if (inputDate.value > intl.format(dt)){
    let msg="Vous devez entrer une date valide";
    console.log(msg)
  }

  else {
    msg = "Date valide"
  }
}

const validTournament = function(inputTournament){
  const tournamentRegExp = new RegExp(
    '/^[0-9]{1,}$/', 'g'
  );

  if (!tournamentRegExp.test(inputTournament.value)){
    let msg = "Veuillez entrer un chiffre";
    console.log(msg);
  }
  else {
    msg = "Nombre valide"
  } 
}
