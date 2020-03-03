/******************************************************************
************LES CONSTANTES ET LES VARIABLES GLOBALES***************
*******************************************************************/
const FRAMES_PER_SECOND = 60;
const SECONDE = 1000;
const DEBUTSEARCH = location.search.indexOf('carte');
const COULEUR = location.search.slice(DEBUTSEARCH + 6,DEBUTSEARCH + 14).trim();
const POINT_POUR_GAGNER = 21;
var tourComputer = false;
var player, computer;
var timer = 0;
var ComputerGagne = true;
var tempsSeconde;

/******************************************************************
*****************************LES OBJETS****************************
*******************************************************************/
class Carte{

	constructor(name, value){
		this.name = name;
		this.value = value;

		this.image = new Image();
		this.image.src = "images/" + COULEUR + "/" + this.name;
	}

}

class Personne{
	constructor(){
		this.deck = new Array();
	}

	get points(){
		var points = 0;
		for(var i = 0; i < this.deck.length; i++)
			points += this.deck[i].value;
		return points;
	}

	addCard(){
		if(this.deck.length >= TABLEAU.length){
			alert('Il n\'y a plus de carte ')
			return;
		}
		var carte;
		do{
			carte = TABLEAU[Math.floor(Math.random() * TABLEAU.length)]
		}while(this.hasCard(carte));
		this.deck.push(carte);
	}

	hasCard(card){
		for(var i = 0; i < this.deck.length; i++)
			if(this.deck[i] == card)
				return true;
		return false;
	}

	get derniereCarte(){
		return this.deck[this.deck.length - 1];
	}

}

const TABLEAU = 
[
new Carte('as.jpg',1),
new Carte('deux.jpg',2),
new Carte('trois.jpg',3),
new Carte('quatre.jpg',4),
new Carte('cinq.jpg',5),
new Carte('six.jpg',6),
new Carte('sept.jpg',7),
new Carte('huit.jpg',8),
new Carte('neuf.jpg',9),
new Carte('dix.jpg',10),
new Carte('valet.jpg',10),
new Carte('dame.jpg',10),
new Carte('roi.jpg',10)
];

/******************************************************************
************LES ACTIONS AU CHARGEMENT DE LA PAGE*******************
*******************************************************************/
window.onload = init();

function init(){
	reset(); // Nouveau jeux
	renderDate();
	update();
	document.getElementsByTagName("button")[2].addEventListener('click', reset);
	setInterval(render, SECONDE / FRAMES_PER_SECOND);
}
/******************************************************************
************LES FONCTIONS RELIÉES AUX BOUTONS**********************
*******************************************************************/
function stop(){
	//TODO
	if (tourComputer) {tourComputer = false}else tourComputer = true; 	
	clearInterval(tempsSeconde);
	addCard();
	document.getElementsByTagName("button")[0].removeEventListener('click', addCard);
	document.getElementsByTagName("button")[1].removeEventListener('click', stop);
}

function addCard(){

	if (tourComputer) {
		var tempsQuick = setInterval(ajouterCarte,200)
		function ajouterCarte(){
			computer.addCard();
			if (computer.deck.length%4 == 1) {
				render();
				quiGagne();
				clearInterval(tempsQuick);
			}
		}
	}else player.addCard();
}

function reset(){
	player = new Personne();
	computer = new Personne();


	player.addCard();
	computer.addCard();
	tourComputer = false;
	timer = 0;
	clearInterval(tempsSeconde);
	tempsSeconde = setInterval(update, SECONDE);

	document.getElementsByTagName("button")[0].addEventListener('click', addCard);
	document.getElementsByTagName("button")[1].addEventListener('click', stop);
	alert('NOUVELLE PARTIE');
}

// VERIFICATION DU GAGNANT 
function quiGagne(){
	alert('point banque: ' + computer.points  + '\n point joueur: '+ player.points)
	if (computer.points > player.points) {
		if (computer.points < POINT_POUR_GAGNER) {
			alert('LA BANQUE A GAGNER');
		}else {
			alert('MATCH NUL, LA BANQUE A DEPASSÉ '+POINT_POUR_GAGNER+' POINTS');
		}
	}else if (computer.points > POINT_POUR_GAGNER || player.points > POINT_POUR_GAGNER) {
		alert('MATCH NUL');
	}else if (computer.points == player.points) {
		alert('MATCH NUL');
		
	}else{
		alert('VOUS AVEZ GAGNÉ!!!');
	}
}

/******************************************************************
**DESSINER LE CANVAS ET LES IMAGES QUI SERA APPELER PLUSIEUR FOIS**
*******************************************************************/

function render(){

	pointsPlayer = document.getElementById("span2").textContent = 'point player: '+player.points;
	pointsComputer = document.getElementById("span3").textContent = 'point computer: '+computer.points;

	var canvasPlayer = document.getElementsByTagName('canvas')[0];
	var canvasComputer = document.getElementsByTagName('canvas')[1];

	var contextePlayer = canvasPlayer.getContext('2d');
	var contexteComputer = canvasComputer.getContext('2d');

	contextePlayer.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
	contexteComputer.clearRect(0, 0, canvasComputer.width, canvasComputer.height);
		
	contextePlayer.lineWidth = '5';
	contextePlayer.strokeStyle = 'black';
	contextePlayer.strokeRect(0, 0, 250, 300);

	contexteComputer.lineWidth = '5';
	contexteComputer.strokeStyle = 'black';
	contexteComputer.strokeRect(0, 0, 250, 300);

	contextePlayer.drawImage(player.derniereCarte.image, 70, 50,120,200);
	contexteComputer.drawImage(computer.derniereCarte.image, 70, 50,120,200);
}
/******************************************************************
************LA CREATION DE LA DATE ET LES SECONDES*****************
*******************************************************************/

function update(){
	timer++;
	//date
	document.getElementById("span1").textContent = getTime();
	
}

function getTime(){
	var minutes = Math.floor(timer / 60);
	var secondes = timer % 60;

	if(minutes < 10) minutes = "0" + minutes;
	if(secondes < 10) secondes = "0" + secondes;

	return minutes + ":" + secondes;
}

function renderDate(){
	  //On crée un objet de type date stockant la date actuelle
  var d = new Date();
            
  //On récupère les informatoins relatives à notre date
  var dy = d.getFullYear();
  var dmo = d.getMonth();
  var dday = d.getDay();
  var ddate = d.getDate();
  var dh = d.getHours();
  var dmi = d.getMinutes();
  var ds = d.getSeconds();
            
 /* On se rappelle que le premier élément d'un tableau
             *possède l'indice 0*/
 var mois = ['janvier', 'février', 'mars', 'avril', 'mai',
                        'juin', 'juillet', 'août', 'septembre',
                        'octobre', 'novembre', 'décembre'];
            
 var jour = ['dimanche', 'lundi', 'mardi', 'mercredi',
                        'jeudi', 'vendredi', 'samedi'];
            
/*On utilise les informations récupérées comme indices pour
 *nos tableaux pour récupérer les valeurs en français*/
date = document.getElementById('span0');
date.innerHTML = 'Le ' +jour[dday]+' '+ddate+' '+mois[dmo]+' '+dy;

}
