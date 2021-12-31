// get url from webpage form
var zipURL="https://api.clearllc.com/api/v2/miamidb/_table/zipcode?method=GET&api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818";
var weathermapURL="https://api.openweathermap.org/data/2.5/onecall?method=GET&units=imperial";
var uploadURL = "https://lewisww.aws.csi.miamioh.edu/final.php?method=setTemp";
var reqCounter=0;
var errorCounter =0;
var zipReq;
getUrl();


// update to use placeholders $...
// like php script

function getUrl(){
	$(document).ready(function (){
		$("form").submit(function (event) {
			console.log("form submitted at least");
			var zipcode = $("#zipCode").val();
			console.log("zip: " + zipcode);
			URL= URL + "&ids=" + zipcode;
			zipReq = zipcode;
			console.log(URL);
			getHistory();
			event.preventDefault();	
		});
	});
}


function getHistory(){

	a=$.ajax({
		url: zipURL,
		method: "GET"
	}).done(function(data) {
		reqCounter++;
		var latitude = 0;
		var longitude = 0;
		len = data.resource.length;
		for(i=0; i < len; i++){
			latitude = data.resource[i].latitude;
			longitude = data.resource[i].longitude;
		}
		weathermapURL = weathermapURL + "&lat=" + latitude + "&lon=" + longitude +
				"&exclude=hourly&APPID=2932c37deb2e950562d0f174c9532275";
		//make this data using call openweathermap
		console.log(weathermapURL);
		getWeatherMap();
	}).fail(function(error) {
		// record error
		errorCounter++;
		console.log("error", error.statusText);
	});
}

function getWeatherMap(){
	a=$.ajax({
		url: weathermapURL,
		method: "GET"
	}).done(function(data) {
		reqCounter++;
		$("#forecastDataList").empty();
		let len = data.daily.length;
		for(i=0; i< len - 1; i++){
			// convert date
			let dte = new Date(data.daily[i].dt * 1000);
			let dateUpload = formatDateForPHP(dte);
			let dateOutput = formatDateOutput(dte);
			// get rest of needed info
			$("#forecastDataList").append("<div class='card bg-secondary border-light' style='width: 240px; margin-right: 11px; margin-bottom: 10px;'>" +
								"<img src='http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png' height='100px' width='100px'>" +
							"<div class='card-body'>" + 
								"<h4>" + dateOutput + "</h4>" + 
								"<p>" + 
							" High: " + data.daily[i].temp.max + " &#176;F<br>Low: " + data.daily[i].temp.min +
							  " &#176;F<br>Weather: " + data.daily[i].weather[0].main + ", " + 
							data.daily[i].weather[0].description + " " + "</p>" + 
							"</div>" + "</div>" );
			setUploadUrl(data.daily[i].temp.max, data.daily[i].temp.min, data.daily[i].weather[0].description, zipReq, dateUpload);
			uploadURL = "https://lewisww.aws.csi.miamioh.edu/final.php?method=setTemp";
		}
		// after output 7 day forecast, insert request into sqlserver
	}).fail(function(error) {
		errorCounter++;
		console.log("error", error.statusText);
	});
}

function formatDateOutput(date) {
	let d = new Date(date);
	let dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
	let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'];
	return dayNames[d.getDay()] + "<br> "+monthNames[d.getMonth()]+" "+d.getDate(); 
}

function formatDateForPHP(date) {
    var d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

// get icon function? 
function getIcon(){
}

function setUploadUrl(hi, low, forecast, loc, dt){
	uploadURL = uploadURL + "&date=" + dt + "&location=" + loc + "&high=" + hi + "&low=" + low + "&forecast=" + forecast;
	a=$.ajax({
		url: uploadURL,
		method: "setTemp"
	}).done(function(data){
		console.log(data);
	}).fail(function(error) {
		errorCounter++;
		console.log("error", error.statusText);
	});
}

