var weatherApiKey = "3a5a5533643dadd75a8c095541dea0ed";


var xhr = new XMLHttpRequest()

function get_current_weather(lat,lon) {
	xhr.onreadystatechange = function() {
	    if (xhr.readyState == XMLHttpRequest.DONE) {
			console.log(xhr.responseText)
			updateWeatherInfo(xhr.responseText);
	    }
	}
	var current_weather_url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID="+weatherApiKey;
	xhr.open('GET', current_weather_url);
	xhr.send(null);	
}

function updateWeatherInfo(data) {
	dict = JSON.parse(data)
	console.log(dict);
	console.log(dict.name);
	console.log(dict.weather[0].main);
	console.log(dict.main.temp);
	console.log(dict.main.humidity);
	console.log(dict.visibility);
	console.log(dict.wind.speed);
	console.log(dict.wind.deg);
	var weatherElement = document.getElementById('weather');
	
	var weatherId = dict.weather[0].id;
	var weatherIcon = dict.weather[0].icon;
	
	//weather_main
	var mainWeatherDiv = document.getElementById('weather_main');
	console.log(dict.weather.description);
	
	//clouds
	var cloudsDiv = document.getElementById('clouds');
	cloudsDiv.innerHTML = dict.weather[0].main;
	
	//temp - convert from Kelvin to Fahrenheit
	var tempDiv = document.getElementById('temp');
	tempDiv.innerHTML = dict.main.temp + " degrees Kelvin";
	
	//humidity
	var humidityDiv = document.getElementById('humidity');
	humidityDiv.innerHTML = "Humidity " + dict.main.humidity + "%";
	
	//wind
	var windDiv = document.getElementById('wind');
	windDiv.innerHTML = "Wind " + dict.wind.speed + " knots /" + dict.wind.deg + " degrees";
}

var options = {"frequency":10000};

var positionWatchid = gm.info.watchPosition( processPosition, processFailure, options, true );

var timeThreshold = 0		//seconds
var distanceThreshold = 0	//meters

var previousLat = null
var previousLon = null
var previousTimeStamp = null; //Date()

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
  return deg * (Math.PI/180)
}

function elapsedTime(date1, date2) {
	var diff = date2.UTC - date1.UTC
	return diff/1000.0
}

function processPosition(position) {
	console.log(position)
	var ts = position.timestamp
	var lat = position.coords.latitude
	var lon = position.coords.longitude
	var heading = position.heading
	var altitude = position.altitude

	if(previousLat == null && previousLon == null) {
		console.log("NULL");
		previousLat = lat
		previousLon = lon
	}
	
	var distance = distanceInKm(previousLat, previousLon, lat, lon);
	console.log('distance: '+distance);
	
	
	get_current_weather(lat, lon)
}

function processFailure(data) {
	//send message to GUI app teo "Unable to get position"?
}

function updateTimeThreshold(newValue) {
}

function updateDistanceThreshold(newValue) {
}

function updateAction(type, value) {
}

function showSpeed(data) {
	console.log(data)
	var speed = data.average_speed;
	if(speed != undefined) {
		var speedText = document.getElementById('speed');
		speedText.innerHTML = speed;
	}
}

//code that kicks things off

console.log("starting up");
gm.info.getVehicleData(showSpeed, ['average_speed', 'gps_lat', 'gps_long'])
gm.info.watchVehicleData(showSpeed, ['average_speed'])
console.log("finished startup");

gm.info.getCurrentPosition( processPosition, processFailure, {}, true );
gm.info.watchPosition( processPosition, processFailure, {"frequency":60}, true );

//get_current_weather(27.9506, -82.4572);

