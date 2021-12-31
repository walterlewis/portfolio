// get url from webpage form
var URL="https://lewisww.aws.csi.miamioh.edu/final.php?method=getTemp";
var reqCounter=0;
var errorCounter =0;
getUrl();

// update to use placeholders like $placeholder for address php to santize input

function getUrl(){
	$(document).ready(function (){
		$("form").submit(function (event) {
			console.log("form submitted at least");
			var date = $("#date").val();
			var sort = $(".sorting:checked").val();
			console.log("data: " + date + sort);
			URL= URL + "&date=" + date + "&sort=" + sort;
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
		$("#zipDataList").empty();
		len = data.result.length;
		for(i=0; i < len; i++){
			$("#zipDataList").append("<div class='card bg-dark border-light' style='width:300px; margin-right: 10px; margin-bottom: 10px;' >" 
						+ "<div class='card-body'>" + 
						"<h4>Date: " + data.result[i].date + "</h4>" +  
						"<h4>Location (Zipcode): " +  data.result[i].location + "</h4>" +
						"High: " + data.result[i].High + " &#176;F<br>" +
						"Low: " + data.result[i].Low + " &#176;F<br>" + "Forecast: " + data.result[i].Forecast +
						"<br>Date Uploaded: " + data.result[i].DateRequested + 
						"</div></div>");
		}
		// put append data to html
	}).fail(function(error) {
		// record error
		errorCounter++;
		console.log("error", error.statusText);
	});
}

