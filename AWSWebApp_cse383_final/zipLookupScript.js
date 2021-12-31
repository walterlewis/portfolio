// get url from webpage form
var URL="https://api.clearllc.com/api/v2/miamidb/_table/zipcode?method=GET&api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818";
var reqCounter=0;
var errorCounter =0;
var zipLat=0;
var zipLong=0;
getUrl();

// update to use $placeholder instead of URL + ...
// just like PHP

function getUrl(){
	$(document).ready(function (){
		$("form").submit(function (event) {
			console.log("form submitted at least");
			var zipcode = $("#zipCode").val();
			console.log("zip: " + zipcode);
			URL= URL + "&ids=" + zipcode;
			console.log(URL);
			getHistory();
			event.preventDefault();	
		});
	});
}


function getHistory(){

	a=$.ajax({
		url: URL,
		method: "GET"
	}).done(function(data) {
		reqCounter++;
		
		// experimental code to get google call to work
		for(var i = 0; i < data.resource.length; i++){
    			var obj = data.resource[i];
    			for(var prop in obj){
        			if(obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])){
            				obj[prop] = +obj[prop];   
        			}
    			}
		}

		zipLat = data.resource[0].latitude;
		zipLong = data.resource[0].longitude;
		$("#zipDataList").empty();
		$("#zipDataList").append("<div class='card shadow-lg bg-dark' style='width: 500px;'>" +
					"<div id='map'></div>" + "<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyD1rRahBirtULCYkkWLR9oh_0aXC4XRukQ&callback=initMap'></script>" 
					+ "<div class='card-body'>" + 
					"<h4>" + data.resource[0].zip + "</h4>" + "Lat: " + data.resource[0].latitude +
					", Long: " + data.resource[0].longitude + "<br>City: " + data.resource[0].city +
					", State: " + data.resource[0].state + "<br>Timezone: " + data.resource[0].timezone +
					", Daylight Savings? " + data.resource[0].daylightSavingsFlag + "<br>Geopoint: " + data.resource[0].geopoint + 
					"</div></div><br>");
		// put append data to html page
	}).fail(function(error) {
		$("#zipDataList").empty();
		$("#zipDataList").append("<div class='card shadow-lg bg-dark' style='width:500px;'>"
						+ "The requested zip was not found" +
					"</div>");
		// record error
		errorCounter++;
		console.log("error", error.statusText);
	});
}

// Initialize and add the map
function initMap() {
        // The location of zipcode
        const zipPoint = { lat: zipLat, lng: zipLong };
        // The map, centered at zipcode
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 10,
          center: zipPoint,
        });
        // The marker, positioned at zipcode
        const marker = new google.maps.Marker({
          position: zipPoint,
          map: map,
        });
}
