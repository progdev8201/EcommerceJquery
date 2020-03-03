function creerFinDeListe(sousTotal,taxe){
finDeListe = `  <li class="list-group-item d-flex justify-content-between bg-light">
		              <div class="text-success">
		                <h6 class="my-0">Taxe</h6>
		                <small>TPS+TVQ</small>
		              </div>
		              <span class="text-success">$${(sousTotal*0.14975).toFixed(2)}</span>
		            </li>
		             <li class="list-group-item d-flex justify-content-between bg-light">
		              <div class="text-success">
		                <h6 class="my-0">Sous-Total</h6>
		              </div>
		              <span class="text-success">$${sousTotal.toFixed(2)}</span>
		            </li>
		            <li class="list-group-item d-flex justify-content-between">
		              <span>Total (CAD)</span>
		              <strong>$${(sousTotal + taxe).toFixed(2)}</strong>
		            </li>`
}

function creerFactureProduit(){
	total = 0;
	taxe = 0;
	$('#maListe').empty();
	for (var i = tableau.length - 1; i >= 0; i--) {
		if (tableau[i].qty > 0) {
			tableau[i].partialViewFacture = ` <li class="list-group-item d-flex justify-content-between lh-condensed">
			              <div>
			                <h6 class="my-0">${tableau[i].name}</h6>
			                <small class="text-muted">${tableau[i].description}</small>
			              </div>
			              <span class="text-muted">$${(tableau[i].basicPrice * tableau[i].qty).toFixed(2)}</span>
			            </li>`

		$('#maListe').append(tableau[i].partialViewFacture);
		total += tableau[i].qty * tableau[i].basicPrice.toFixed(2);
		}
	}
	taxe = total * 0.14975;
	creerFinDeListe(total,taxe)
	$('#maListe').append(finDeListe);
}	

function ajouterEventListenerPourEraseStorage(){
	$('#boutonClear').click(function(){
		if (typeof(Storage) !== 'undefined'){
			localStorage.clear();
		}
		else {
			console.log('Désolé, votre navigateur ne supporte pas le Web Storage...');
		}
	})
}
function creerLaDate(){
	/*var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	var year = d.getFullYear();
	var jour = ['dima']*/
	var d = new Date();
            
    //On récupère les informatoins relatives à notre date
    var dy = d.getFullYear();
    var dmo = d.getMonth();
    var dday = d.getDay();
    var ddate = d.getDate();
    var dh = d.getHours();
    var dmi = d.getMinutes();
    var ds = d.getSeconds();
    
    /*On se rappelle que le premier élément d'un tableau
     *possède l'indice 0*/
    var mois = ['janvier', 'février', 'mars', 'avril', 'mai','juin', 'juillet', 'août', 'septembre','octobre', 'novembre', 'décembre'];
    
    var jour = ['dimanche', 'lundi', 'mardi', 'mercredi','jeudi', 'vendredi', 'samedi'];

	 $('#maDate').text("Date: "+jour[dday]+ " le "+ddate+" " + mois[dmo] + " " +dy);
	 console.log(ddate)
}

function functionCheckout(){
	creerLaDate();
	if (localStorage.getItem('listeProduit') != null){
		ajouterEventListenerPourEraseStorage();
		tableau = JSON.parse(localStorage.getItem('listeProduit'));
		creerFactureProduit();
	}
}

window.onload = functionCheckout();