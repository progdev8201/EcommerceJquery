// MES FONCTIONS
function creerDescriptionProduit(){
	tableau = JSON.parse(localStorage.getItem('listeProduit'));
	total = 0;
	$('#monCart').empty();
	for (var i = tableau.length - 1; i >= 0; i--) {
		tableau[i].partialViewDescription = `<tr>
							<td class="premier" data-th="Product">
								<div class="row">
									<div class="col-sm-2 hidden-xs">
										<img src="${tableau[i].image}" alt="..." class="img-fluid"/>
									</div>
									<div class="col-sm-10 avantNom">
										<h4 class="nomargin leNom">${tableau[i].name}</h4>
										<p>${tableau[i].description}</p>
									</div>
								</div>
							</td>
							<td data-th="Price">${tableau[i].basicPrice.toFixed(2)}$</td>
							<td data-th="Quantity">
								<p class="text-center mt-3">${tableau[i].qty}</p>
							</td>
							<td data-th="Subtotal" class="text-center">${(tableau[i].qty * tableau[i].basicPrice).toFixed(2)}</td>
							<td><button class="btn bg-danger text-white w-100 mesRetrait">Retirer</button></td>
						</tr>`
		if (tableau[i].qty > 0) {
			//console.log('le nom: ' + tableau[i].name + '\nla quantite: ' + tableau[i].qty + '\nle prix de base: ' + tableau[i].basicPrice + '\nle prix: ' + tableau[i].qty * tableau[i].basicPrice);
			$('#monCart').append(tableau[i].partialViewDescription);
			total += tableau[i].qty * tableau[i].basicPrice.toFixed(2);
		}
	}
	$('#monTotal').text('Total: '+ total.toFixed(2) + '$');
	if(total > 0){
		$('.payer').attr("disabled",false);
	}else {
		$('.payer').attr("disabled",true);
	}
	ajouterMesEventListeners();
}

function ajouterMesEventListeners(){
	$('.mesRetrait').each(function(){
		$(this).click(function(){
			// cela représente le nom et la quantite du produits
			console.log($(this).parent().parent().children('.premier').children('.row').children('.avantNom').children('.leNom').text())
			deleteLeProduit($(this).parent().parent().children('.premier').children('.row').children('.avantNom').children('.leNom').text())
		});
	});
}

function deleteLeProduit(name){
	for (var i = tableau.length - 1; i >= 0; i--) {
			if(tableau[i].name == name){
				tableau[i].qty = 0;
				saveDansLeStorage();
				creerDescriptionProduit();
				break;
			}
	}
}

function saveDansLeStorage(){
	if (typeof(Storage) !== 'undefined'){
		//On sauvegarde 
		localStorage.clear();
		localStorage.setItem('listeProduit',JSON.stringify(tableau));
	}
	else {
		console.log('Désolé, votre navigateur ne supporte pas le Web Storage...');
	}
}
// APPELER LA FONCTION AU DEMARRAGE
function fonctioncart(){
	if (localStorage.getItem('listeProduit') != null){
		var tableau = JSON.parse(localStorage.getItem('listeProduit'));
		creerDescriptionProduit();
		console.log('hey')
	}else {
		$('.payer').attr("disabled",true);
	}
}
window.onload = fonctioncart();