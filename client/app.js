function getBathValue(){
	var bath = document.getElementById('uibath');
	return parseInt(bath.value);
}

function getBhkValue(){
	var bhk = document.getElementById('uibhk');
	return parseInt(bhk.value);
}

function onClickEstimatePrice(){
	console.log("Estimated Price Button Clicked");
	var sqft = document.getElementById('uisqft').value;
	var bhk = getBhkValue();
	var bathrooms = getBathValue();
	var ln = document.getElementById('uilocations');
	var estPrice = document.getElementById('estimated-price');

	//console.log(sqft,bhk, bathrooms,location, estPrice);
	var url = "http://127.0.0.1:5000/predict_home_price"
	$.post(url,{
		sqft : parseFloat(sqft),
		bhk : bhk,
		bath : bathrooms,
		location : ln.value
	}, function(data, status){
		console.log(data);
		estPrice.innerHTML = '<h2>' + data.estimated_price.toString() + " Lakhs"+'</h2>';
		console.log(status);
	});

}


function onPageLoad(){
	console.log('Page Loaded');
	var url = "http://127.0.0.1:5000/get_location_names"

	$.get(url, function(data, status){
		console.log("getting response from the server");
		if(data){
			var locations = data.locations;
			var uilocations = document.getElementById('uilocations');
			$('#uilocations').empty();
			for(var i in locations){
				var opt = new Option(locations[i]);
				$('#uilocations').append(opt)
			}
		}
	});
}

window.onLoad = onPageLoad();