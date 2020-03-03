// MES OBJETS
window.onload= function(){


	class Produit{

		constructor(name, basicPrice,id,description){
			this.name = name;
			this.image = 'images/' + this.name+'.jpg';
			this.basicPrice = basicPrice;
			this.qty = 0;
			this.id = "00"+id;
			this.description = description;
			this.partialViewDescription = '';
			this.partialViewCatalogue = '';
			this.partialViewFacture = '';
			this.facture = '';
		}
	}
	// MES VARIABLES GLOBALES
	if (localStorage.getItem('listeProduit') == null) {
		var tableauProduit =
		[
		new Produit('Death',50.50,61,"Le café de la mort"),
		new Produit('CaféGold',60.50,62,"Le café doré"),
		new Produit('McCafé',70.50,63,"Le café ayant le plus de ventes"),
		new Produit('Jungle',80.50,64,"Le café de la jungle"),
		new Produit('Clumsy',90.50,65,"Le café d'argent"),
		new Produit('OldCity',100.50,66,"Le café de la vieille ville"),
		new Produit('Britt',110.50,67,"Le café britannique"),
		new Produit('Lavazza',120.50,68,"Le café de la force"),
		new Produit('Blend',130.50,69,"Le sachet magique")
		];
	}else var tableauProduit = JSON.parse(localStorage.getItem('listeProduit'));

	// CREER LE PARTIALVIEWCATALOGUE
		for (var i = 0; i < tableauProduit.length; i++) {
			tableauProduit[i].partialViewCatalogue = `<div class="col-lg-4 col-md-6 mb-4 col-sm-12">
						<div class="card">
						  <img class="card-img-top" src="${tableauProduit[i].image}" alt="Card image cap">
						   <div class="overlay">
   							 <div class="text">${tableauProduit[i].description}</div>
 						   </div>
						  <div class="card-body">
							  <h5 class="card-title">${tableauProduit[i].name}</h5>
							    <p class="mb-0">id#: ${tableauProduit[i].id}</p> 
							    <p class="mt-0">prix: ${tableauProduit[i].basicPrice.toFixed(2)}$</p>
							  <span class="span">Quantité:</span> 
							  <input class="inputNumber" type="number" value="0">
							 <button id="premier" class="btn btn-primary">Ajouter au panier</button>
						  </div>
						</div>
					</div>`
					$('#monCatalogue').append(tableauProduit[i].partialViewCatalogue);
		}

	var quantite = 0;

	$('.btn-primary').each(function(){
		$(this).click(function(){
			// cela représente le nom et la quantite du produits
			console.log($(this).parent().children('.card-title').text());
			console.log($(this).parent().children('.inputNumber').val());

			//console.log(event.target.parentElement.childNodes[1].innerHTML);
			// s'assurer que le nombre soit plus haut que zero
			if ($(this).parent().children('.inputNumber').val() > 0) {
				quantite = $(this).parent().children('.inputNumber').val();
				updateQuantite($(this));
			}

		
		});
	});

	//MES FONCTIONS PRIVER
	function updateQuantite(button){
		for (var i = 0; i < tableauProduit.length; i++) {
			// retrouver l'objet pour modifier sa quantité
			if(tableauProduit[i].name ==  button.parent().children('.card-title').text()){
				// ajouter la quantité
				tableauProduit[i].qty += parseInt(quantite);

				console.log('la valeur du produit: ' + tableauProduit[i].qty * tableauProduit[i].basicPrice);
				console.log('la valeur de base: ' + tableauProduit[i].basicPrice);
				console.log('la quantite du produit: ' + tableauProduit[i].qty);
			}
			//ajouter au tableau
		}
			quantite = 0;
			button.parent().children('.inputNumber').val('0');
			sauvegardeListeProduit();
	}

	//LA VALIDATION
	$('.inputNumber').each(function(){
		$(this).keyup(function(){

		 	// condition pour prendre seulement les nombres en haut de zero
		 	if (!(isNaN(parseInt($(this).val())))) {						

		 		// condition pour ne pas qu'il met un nombre en bas de zero
			 	if (parseInt($(this).val()) < 0) {$(this).val('0')}
		 	}
		 })
	});

	$('.inputNumber').each(function(){
		$(this).change(function(){

		 	// condition pour prendre seulement les nombres en haut de zero
		 	if (!(isNaN(parseInt($(this).val())))) {						

		 		// condition pour ne pas qu'il met un nombre en bas de zero
			 	if (parseInt($(this).val()) < 0) {$(this).val('0')}
		 	}
		 })
	});

	function sauvegardeListeProduit(listeProduit){
		if (typeof(Storage) !== 'undefined'){
			//On sauvegarde 
			localStorage.clear();
			localStorage.setItem('listeProduit',JSON.stringify(tableauProduit));
			
		}
		else {
			console.log('Désolé, votre navigateur ne supporte pas le Web Storage...');
		}
	}
}