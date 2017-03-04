var weatherApiKey = "cc9c5e22a8ea8c2e950be212b856b9c2";

var R = 6371;	// Earth radius in Km
var kMPerMile = 1.60934;

var xhr = new XMLHttpRequest()

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
	summary["Wind"] = dict.wind.speed + " mph " + compassRose(dict.wind.deg);
	summary["Temp"] = dict.main.temp;
	summary["Humidity"] = dict.humidity;
	return summary;
}

function updateWeatherInfo(data) {

	dict = JSON.parse(data)

	var summary = weatherSummary(dict);

	var weatherElement = document.getElementById('weather');
	
	//weather_main
	var mainWeatherDiv = document.getElementById('icon');
	mainWeatherDiv.innerHTML = "<img src=images/" + summary["Icon"] + ".png>";
		
	//temp - Fahrenheit
	var tempDiv = document.getElementById('temp');
	tempDiv.innerHTML = dict.main.temp + "F";
	
	//humidity
	var humidityDiv = document.getElementById('humidity');
	humidityDiv.innerHTML = "Humidity " + dict.main.humidity + "%";
	
	//wind
	var windDiv = document.getElementById('wind');
	windDiv.innerHTML = "Wind " + summary["Wind"];
}

function updateVehicleInfo(data) {
	var speedDiv = document.getElementById('speed');
	speedDiv.innerHTML = data.average_speed + " mph";
	
	var headingDiv = document.getElementById('heading');
	headingDiv.innerHTML = data.gps_heading + " " + compassRose(data.gps_heading);
}

var options = {"frequency":10000};

var positionWatchid = gm.info.watchPosition( processPosition, processFailure, options, true );

var timeThreshold = 0;	//seconds
var distanceThreshold = 0;	//meters

var previousLat = undefined;
var previousLon = undefined;
var previousTimeStamp = undefined;
var latIn10Miles = undefined;
var lonIn10Miles = undefined;

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

function deg2rad(deg) {
	return deg * (Math.PI/180);
}

function elapsedTime(date1, date2) {
	var diff = date2.UTC(); - date1.UTC();
	return diff/1000.0
}

function processPosition(position) {
	
	var ts = position.timestamp;
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	var heading = position.heading;
	var altitude = position.altitude;

	if(previousLat == null && previousLon == null) {
		previousLat = lat;
		previousLon = lon;
	}
	
/*
	φ2 = asin( sin(φ1)*cos(d/R) + cos(φ1)*sin(d/R)*cos(θ) )
	λ2 = λ1 + atan2( sin(θ)*sin(d/R)*cos(φ1), cos(d/R)−sin(φ1)*sin(φ2) )
	
	lat2 = Math.asin( Math.sin(lat) * distanceInMeters/R ) + Math.cos(lat) * Math.sin(distanceInMeters/R) * cos(heading);
	lon2 = lon1 + Math.atan2( sin(heading) * sin(d/R) * cos(lat1), cos(d/R) - sin(lat1) * sin(lat2));
 */
	
	var distance = distanceInKm(previousLat, previousLon, lat, lon);
	if(distance > distanceThreshold) {
		get_current_weather(lat, lon);
	}
	console.log('distance: '+distance);
}

//returns ["Lat", "Lon"]
function nextLocation(lat, lon, heading, distance) {
	var nextPosition = {};
	
	var distanceInKm = 10.0 * 1.60934;
	lat2 = Math.asin( Math.sin(lat) * distanceInKm/R ) + Math.cos(lat) * Math.sin(distanceInMeters/R) * cos(heading);
	lon2 = lon1 + Math.atan2( sin(heading) * sin(d/R) * cos(lat1), cos(d/R) - sin(lat1) * sin(lat2));
	
	nextPosition["lat"] = lat2;
	nextPosition["lon"] = lon2;
	
	return nextPosition;
}

function processFailure(data) {
	//send message to GUI app teo "Unable to get position"?
}

function updateInfo(data) {
	
	var speed = data.average_speed;
	var lat = data.gps_lat * 2.7777777777777776e-7;
	var lon = data.gps_long * 2.7777777777777776e-7;
	var heading = data.gps_heading;
	
	if(speed != undefined) {
		// var speedText = document.getElementById('speed');
		// speedText.innerHTML = speed;
	}
	
	if(heading != undefined) {
		//update the heading block
		//var headingStr = compassHeading(heading);
		//var compassText = document.getElementById('heading');
		//compassText.innerHTML = headingStr;
	}
	
	if(previousLat == null && previousLon == null) {
		previousLat = lat;
		previousLon = lon;
	}

	if(lat != undefined && lon != undefined) {
		//update lat/lon - distance since previous, 
		//and compute projected next point?
		get_current_weather(lat, lon);
	}	
	
	var distance = distanceInKm(previousLat, previousLon, lat, lon);
	if(distance > distanceThreshold) {
		get_current_weather(lat, lon);
	}
	console.log('distance: '+distance);

	updateVehicleInfo(data);
}

//code that kicks things off

//first, check to see if we have a network connection.  if not, 
//unhide a div saying we need an internet connection to work

console.log("starting up");
gm.info.getVehicleData(updateInfo, ['average_speed', 'gps_lat', 'gps_long', 'gps_heading','gps_speed'])
gm.info.watchVehicleData(updateInfo, ['average_speed', 'gps_lat', 'gps_long', 'gps_heading','gps_speed'])
console.log("finished startup");



