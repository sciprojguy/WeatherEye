var weatherApiKey = "cc9c5e22a8ea8c2e950be212b856b9c2";

var R = 6371;	// Earth radius in Km
var kMPerMile = 1.60934;

var windowsAreDown = false;
var headlightsAreOff = false;

var xhr = new XMLHttpRequest()

var options = {"frequency":10000};

var timeThreshold = 0;	//seconds
var distanceThreshold = 100;	//meters

var previousLat = undefined;
var previousLon = undefined;
var previousTimeStamp = undefined;
var latIn10Miles = undefined;
var lonIn10Miles = undefined;
var previousHeading = 0;
var currentSpeed = 0;
var currentHeading = undefined;

function get_current_weather(lat,lon) {
	if(lat != undefined && lon != undefined) {
		xhr.onreadystatechange = function() {
		    if (xhr.readyState == XMLHttpRequest.DONE) {
				console.log(xhr.responseText)
				updateWeatherInfo(xhr.responseText);
		    }
		}
		var current_weather_url = "http://api.openweathermap.org/data/2.5/weather?units=imperial&lat="+lat+"&lon="+lon+"&appid="+weatherApiKey;
		xhr.open('GET', current_weather_url);
		xhr.send(null);	
	}
}

//code -> dict with title and icon stub
var weatherConditions = {

	//thunderstorms
	"200" : { "Title" : "Thunderstorm w/ Light Rain", "Icon" : "ThunderStorm" },
	"201" : { "Title" : "Thunderstorm w/ Rain", "Icon" : "ThunderStorm" },
	"202" : { "Title" : "Thunderstorm w/ Heavy Rain", "Icon" : "ThunderStorm" },
	"210" : { "Title" : "Light Thunderstorm", "Icon" : "ThunderStorm" },
	"211" : { "Title" : "Thunderstorm", "Icon" : "ThunderStorm" },
	"212" : { "Title" : "Heavy Thunderstorm", "Icon" : "ThunderStorm" },
	"221" : { "Title" : "Ragged Thunderstorm", "Icon" : "ThunderStorm" },
	"230" : { "Title" : "Thunderstorm w/ Light Drizzle", "Icon" : "ThunderStorm" },
	"231" : { "Title" : "Thunderstorm w/ Drizzle", "Icon" : "ThunderStorm" },
	"232" : { "Title" : "Thunderstorm w/ Heavy Drizzle", "Icon" : "ThunderStorm" },
	
	//drizzle
	"300" : { "Title" : "Light Drizzle", "Icon" : "Drizzle" },
	"301" : { "Title" : "Drizzle", "Icon" : "Drizzle" },
	"302" : { "Title" : "Heavy Drizzle", "Icon" : "Drizzle" },
	"310" : { "Title" : "Light Drizzle Rain", "Icon" : "Drizzle" },
	"311" : { "Title" : "Drizzle Rain", "Icon" : "Drizzle" },
	"312" : { "Title" : "Heavy Drizzle Rain", "Icon" : "Drizzle" },
	"313" : { "Title" : "Shower w/ Drizzle", "Icon" : "Drizzle" },
	"314" : { "Title" : "Heavy Shower w/ Drizzle", "Icon" : "Drizzle" },
	"321" : { "Title" : "Shower w/ Drizzle", "Icon" : "Drizzle" },
	
	//rain 
	"500" : { "Title" : "Light Rain", "Icon" : "Rain" },
	"501" : { "Title" : "Moderate Rain", "Icon" : "Rain" },
	"502" : { "Title" : "Heavy Rain", "Icon" : "Rain" },
	"503" : { "Title" : "Very Heavy Rain", "Icon" : "Rain" },
	"504" : { "Title" : "Extreme Rain", "Icon" : "Rain" },
	"511" : { "Title" : "Freezing Rain", "Icon" : "Rain" },
	"520" : { "Title" : "Lieght Rain Showers", "Icon" : "Rain" },
	"521" : { "Title" : "Rain Showers", "Icon" : "Rain" },
	"522" : { "Title" : "Heavy Rain Showers", "Icon" : "Rain" },
	"531" : { "Title" : "Scattered Rain Showers", "Icon" : "Rain" },
	
	//snow
	"600" : { "Title" : "Light Snow", "Icon" : "Snow" },
	"601" : { "Title" : "Snow", "Icon" : "Snow" },
	"602" : { "Title" : "Heavy Snow", "Icon" : "Snow" },
	"611" : { "Title" : "Sleet", "Icon" : "Snow" },
	"612" : { "Title" : "Sleet Shower", "Icon" : "Snow" },
	"615" : { "Title" : "Light Rain and Snow", "Icon" : "Snow" },
	"616" : { "Title" : "Rain and Snow", "Icon" : "Snow" },
	"620" : { "Title" : "Light Snow Showers", "Icon" : "Snow" },
	"621" : { "Title" : "Snow Showers", "Icon" : "Snow" },
	"622" : { "Title" : "Heavy Snow Showers", "Icon" : "Snow" },
	
	//atmosphere - mist, smoke etc.
	"701" : { "Title" : "Mist", "Icon" : "Fog" },
	"711" : { "Title" : "Smoke", "Icon" : "Fog" },
	"721" : { "Title" : "Haze", "Icon" : "Fog" },
	"731" : { "Title" : "Sand, Dust Whirls", "Icon" : "DustDevil" },
	"741" : { "Title" : "Fog", "Icon" : "Fog" },
	"751" : { "Title" : "Sand", "Icon" : "Dune" },
	"761" : { "Title" : "Dust", "Icon" : "Dust" },
	"762" : { "Title" : "Volcanic Ash", "Icon" : "Volcano" },
	"771" : { "Title" : "Squalls", "Icon" : "Wind" },
	"782" : { "Title" : "Tornado", "Icon" : "Tornado" },
	
	
	//clear
	"800" : { "Title" : "Clear Sky", "Icon" : "Clear" },
	
	//clouds
	"801" : { "Title" : "Few Clouds", "Icon" : "Clouds" },
	"802" : { "Title" : "Scattered Clouds", "Icon" : "Clouds" },
	"803" : { "Title" : "Cloudy", "Icon" : "Clouds" },
	"804" : { "Title" : "Overcast", "Icon" : "Clouds" },
	
	//extreme
	"900" : { "Title" : "Tornado", "Icon" : "Clouds" },
	"901" : { "Title" : "Tropical Storm", "Icon" : "Clouds" },
	"902" : { "Title" : "Hurrcane", "Icon" : "Clouds" },
	"903" : { "Title" : "Cold", "Icon" : "Clouds" },
	"904" : { "Title" : "Hot", "Icon" : "Clouds" },
	"905" : { "Title" : "Windy", "Icon" : "Clouds" },
	"906" : { "Title" : "Hail", "Icon" : "Clouds" },
	
	//additional
	"951" : { "Title" : "Calm", "Icon" : "" },
	"952" : { "Title" : "Light Breeze", "Icon" : "Clouds" },
	"953" : { "Title" : "Gentle Breeze", "Icon" : "Clouds" },
	"954" : { "Title" : "Moderate Breeze", "Icon" : "Clouds" },
	"955" : { "Title" : "Fresh Breeze", "Icon" : "Clouds" },
	"956" : { "Title" : "Strong Breeze", "Icon" : "Clouds" },
	"957" : { "Title" : "High Wind", "Icon" : "Clouds" },
	"958" : { "Title" : "Gale", "Icon" : "Clouds" },
	"959" : { "Title" : "Severe Gale", "Icon" : "Clouds" },
	"960" : { "Title" : "Storm", "Icon" : "Clouds" },
	"961" : { "Title" : "Violent Storm", "Icon" : "Clouds" },
	"962" : { "Title" : "Hurricane", "Icon" : "Clouds" }
	
}

//adapted from https://gist.github.com/basarat/4670200
function compassRose(angle) {

      var directions = 8;
      
      var degree = 360 / directions;
      angle = angle + degree/2;
      
      if (angle >= 0 * degree && angle < 1 * degree)
          return "N";
      if (angle >= 1 * degree && angle < 2 * degree)
          return "NE";
      if (angle >= 2 * degree && angle < 3 * degree)
          return "E";
      if (angle >= 3 * degree && angle < 4 * degree)
          return "SE";
      if (angle >= 4 * degree && angle < 5 * degree)
          return "S";
      if (angle >= 5 * degree && angle < 6 * degree)
          return "SW";
      if (angle >= 6 * degree && angle < 7 * degree)
          return "W";
      if (angle >= 7 * degree && angle < 8 * degree)
          return "NW";
      //Should never happen: 
      return "N";
}

function weatherSummary(dict) {
	var summary = {
	};
	console.log(dict.weather[0]);
	if(undefined != weatherConditions[dict.weather[0].id]) {
		summary["Title"] = weatherConditions[dict.weather[0].id].Title;
		summary["Icon"] = weatherConditions[dict.weather[0].id].Icon;
	}
	summary["Place"] = dict.name;
	summary["Wind"] = dict.wind.speed.toFixed(1) + " mph " + compassRose(dict.wind.deg);
	summary["Temp"] = dict.main.temp;
	summary["Humidity"] = dict.humidity;
	return summary;
}

function updateWeatherInfo(data) {

	dict = JSON.parse(data)

	var summary = weatherSummary(dict);

	if("Rain" == summary["Icon"] && windowsAreDown) {
		sayRollUpWindows();
	}
	
	var weatherElement = document.getElementById('weather');
	
	//weather_main
	var mainWeatherDiv = document.getElementById('icon');
	mainWeatherDiv.innerHTML = "<img src=images/" + summary["Icon"] + ".png>";
		
	//temp - Fahrenheit
	var tempDiv = document.getElementById('temp');
	tempDiv.innerHTML = dict.main.temp.toFixed(1) + "F";
	
	//humidity
	var humidityDiv = document.getElementById('humidity');
	humidityDiv.innerHTML = "Humidity " + dict.main.humidity + "%";
	
	//wind
	var windDiv = document.getElementById('wind');
	windDiv.innerHTML = "Wind " + summary["Wind"];
	
	//place
	var placeDiv = document.getElementById('place');
	placeDiv.innerHTML = summary["Place"];
}

function updateVehicleInfo(data) {
	var speedDiv = document.getElementById('speed');
	if(undefined != currentSpeed) {
		speedDiv.innerHTML = currentSpeed + " mph";
	}
	else {
		speedDiv.innerHTML = "0 mph";
	}
	
	var headingDiv = document.getElementById('heading');
	if(undefined != currentHeading) {
		headingDiv.innerHTML = currentHeading.toFixed(1) + " deg " + compassRose(currentHeading);
	}
	else {
		headingDiv.innerHTML = "";
	}
}

function kelvinToFahrenheit(kelvin) {
	var f = (kelvin * 9.0 / 5.0) - 459.67;
	return f;
}

function distanceInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
	Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

function headingFrom(lat1, lon1, lat2, lon2) {
	var dLon = this.deg2rad(lon2-lon1);
	var y = Math.sin(dLon) * Math.cos(deg2rad(lat2));
	var x = Math.cos(deg2rad(lat1))*Math.sin(deg2rad(lat2)) - Math.sin(deg2rad(lat1))*Math.cos(deg2rad(lat2))*Math.cos(dLon);
	var brng = radiansToDegrees(Math.atan2(y, x));
	return ((brng + 360) % 360);	
}

function deg2rad(deg) {
	return deg * (Math.PI/180);
}

function elapsedTime(date1, date2) {
	var diff = date2.UTC(); - date1.UTC();
	return diff/1000.0
}

function degreesToRadians(deg) {
	return 3.1415927 * deg / 180.0;
}

function radiansToDegrees(rad) {
	return 180.0 * rad / 3.1415927;
}

//returns ["Lat", "Lon"]
function nextLocation(lat, lon, headingDegrees, distance) {
	
	var nextPosition = {};
	
	var heading = degreesToRadians(headingDegrees);
	var rLat = degreesToRadians(lat);
	var rLon = degreesToRadians(lon);
	
	var distanceInKm = distance * 1.60934;
	var angularDistance = distanceInKm / R;
	
	lat2 = Math.asin( Math.sin(rLat) * Math.cos(distanceInKm/R) ) + 
	      Math.cos(rLat) * Math.sin(distanceInKm/R) * Math.cos(heading);
	lon2 = rLon + Math.atan2( Math.sin(heading) * Math.sin(distanceInKm/R) * Math.cos(rLat), Math.cos(distanceInKm/R) - Math.sin(rLat) * Math.sin(rLat));

	nextPosition["lat"] = radiansToDegrees(lat2);
	nextPosition["lon"] = radiansToDegrees(lon2);
	
	return nextPosition;
}

function processFailure(data) {
	//send message to GUI app teo "Unable to get position"?
}

function sayRollWindowsUp() {
	var tts = gm.voice.startTTS(doneTalking, "You might want to roll your windows up");
	function doneTalking() {
		gm.voice.stopTTS(tts);
	}
}

const window_cracked = 1;

function updateInfo(data) {
	
	console.log(data);
	var drivers_window_open = data.window_driver > window_cracked;
	var passenger_window_open = data.window_passenger > window_cracked;
	var left_rear_window_open = data.window_leftrear > window_cracked;
	var right_rear_window_open = data.window_rightrear > window_cracked;
	
	if(drivers_window_open || passenger_window_open || left_rear_window_open || right_rear_window_open) {
		windowsOpen = true;
	}
	
	if(undefined != data.average_speed) {
		currentSpeed = data.average_speed;
	}
	
	if(undefined != data.gps_heading) {
		currentHeading = data.gps_heading;
	}
	
	var lat = data.gps_lat * 2.7777777777777776e-7;
	var lon = data.gps_long * 2.7777777777777776e-7;
	var heading = data.gps_heading;
		
	if(previousLat == null && previousLon == null) {
		previousLat = lat;
		previousLon = lon;
	}

	if(heading != undefined) {
		currentHeading = data.gps_heading;
	}
	else {
		currentHeading = headingFrom(previousLat, previousLon, lat, lon);
	}
	
	if(lat != undefined && lon != undefined) {
		//update lat/lon - distance since previous, 
		//and compute projected next point?
		get_current_weather(lat, lon);
	}	
	
	var headingChange = (heading - previousHeading);
	
	var distance = distanceInKm(previousLat, previousLon, lat, lon);
	if(distance > distanceThreshold || Math.abs(headingChange)>10) {
		get_current_weather(lat, lon);
	}

	var nextPos = nextLocation(lat, lon, heading, 20.0);	

	updateVehicleInfo(data);
}

//code that kicks things off

//first, check to see if we have a network connection.  if not, 
//unhide a div saying we need an internet connection to work

console.log("starting up");

var data_items = [
	'average_speed', 'gps_lat', 'gps_long', 'gps_heading',
	'window_driver', 'window_leftrear', 'window_rightrear', 'window_passenger',
	'wipers_on', 'light_level', 'headlamp_beam', 'light_level'
];

gm.info.getVehicleData(updateInfo, data_items);
gm.info.watchVehicleData(updateInfo, data_items);

console.log("finished startup");



