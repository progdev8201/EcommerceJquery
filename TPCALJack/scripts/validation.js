// creer les variables
const TOUCHE_INTERDITE = [36,37,38,42,63,64,192,194,199,200,201,
202,203,206,207,212,217,219,224,226,232,231,233,234,235,238,239,244,249,251];
var prenomValid = /[^0-9]/;
var buttonSubmit = document.getElementById('submitButton');
var envoi = document.querySelector('input[type=submit]');
envoi.addEventListener('click',valider);
var prenom = document.getElementById('username');
var password = document.getElementById('password');
// la validation
$('#username').keypress(function(e){
					var touche = document.getElementById('username').value;
					// si le caractère est interdit, on change la couleur
					if (isInterdit(e.which)) {
                    	$(this).css('background-color', 'red');
                    	document.getElementById('username').setCustomValidity('La touche entrée est interdite');
					}else{
					 	$(this).css('background-color', 'white');
					 	document.getElementById('username').setCustomValidity('');
					}

					// tant que le caractère interdit est la, on change la couleur
					if (isInterditEncoreLa(touche)) {
						$(this).css('background-color', 'red');
						document.getElementById('username').setCustomValidity('La touche entrée interdite est toujours la');
					}else {
						$(this).css('background-color', 'white');
						document.getElementById('username').setCustomValidity('');
					}
                });

 $('#password').keypress(function(e){
 				var bouche = document.getElementById('password').value;
 				// si le caractère est interdit, on change la couleur
 				if (isNotANumber(e.which)) {
 					$(this).css('background-color', 'red');
 					document.getElementById('password').setCustomValidity('La touche entrée n\'est pas un numéro');
 				}else{
 					document.getElementById('password').setCustomValidity('');
 					$(this).css('background-color', 'white');
 				}
 				// tant que le caractère interdit est la, on change la couleur
 				if (isNotANumberToujoursLa(bouche)) {
 					$(this).css('background-color', 'red');
 					document.getElementById('password').setCustomValidity('le caractère interdit est toujours present dans le password');
				}else{
					$(this).css('background-color', 'white');
					document.getElementById('password').setCustomValidity('');
				}
                });
 // LA VALIDATION LORS DU CLIC DU BOUTON SUBMIT

function valider(){
	 prenom = document.getElementById('username');
	 password = document.getElementById('password');
	 choix = null;
	 var listeRadio = document.getElementsByClassName('carte');
	
	if(!prenom.checkValidity()) { //ou pour seulement la contrainte due à l'attribut required if(prenom.validity.valueMissing)
		prenom.style.backgroundColor = 'red';
		prenom.setCustomValidity('Mauvais format dans le username');
		alert('Mauvais format dans le username');
		event.preventDefault();
	}

	if(!password.checkValidity()){
		password.setCustomValidity('Mauvais format au password');
		alert('Mauvais format dans le password');
		password.style.backgroundColor = 'red';
		event.preventDefault();
	}else password.setCustomValidity('');

	if(isNotANumberToujoursLa(password.value)){
		password.setCustomValidity('le caractère interdit est toujours present dans le password');
		event.preventDefault();
	}else password.setCustomValidity('');

	if (isInterditEncoreLa(prenom.value)) {
		prenom.setCustomValidity('La touche entrée interdite est toujours la');
		event.preventDefault();
	}

	for (var i = 0; i < listeRadio.length; i++) {
		console.log(listeRadio[i].checked);
		if (listeRadio[i].checked) {
			choix = listeRadio[i].value;
		}
	}

	if (password.checkValidity && prenom.checkValidity && choix != null) {
		sauvegardePrenomPasswordEtChoix(prenom,password,choix);
	}
}

// function filtrant les donnés par le tableau
// return true si ce nest pas un nombre
function isNotANumber(nombreAscii){
	return nombreAscii <= 47 || nombreAscii > 57;
}

function isNotANumberToujoursLa(inputt){
	for (var i = 0; i < inputt.length; i++) {
		if(isNotANumber(inputt.charAt(i).charCodeAt(0))){
			return true;
		}
	}
	return false;
}

function isInterdit(nombreAscii){
	for (var i = 0; i < TOUCHE_INTERDITE.length; i++) {
		if(TOUCHE_INTERDITE[i] == nombreAscii){
			return true;
		}
	}
	return false;
}

function isInterditEncoreLa(input){
	for (var i = 0; i < TOUCHE_INTERDITE.length; i++) {
		if(input.indexOf(String.fromCharCode(TOUCHE_INTERDITE[i])) >= 0){
			return true;
		}
	}
	return false;
}



// SAUVEGARDER DANS LE SESSION STORAGE
function sauvegardePrenomPasswordEtChoix(prenom,password,choix){
	if (typeof(Storage) !== 'undefined'){
		//On sauvegarde 
		localStorage.setItem('prenom',prenom.value);
		localStorage.setItem('password',password.value);
		localStorage.setItem('Choix',choix);
	
	}
	else {
		console.log('Désolé, votre navigateur ne supporte pas le Web Storage...');
	}
}





 /*String.fromCharCode(e.which);*/