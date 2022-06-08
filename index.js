
// const cityname=document.getElementById("cityname");


function getCoordintes() {
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	function success(pos) {
		var crd = pos.coords;
		var lat = crd.latitude.toString();
		var lng = crd.longitude.toString();
		var coordinates = [lat, lng];
		console.log(`Latitude: ${lat}, Longitude: ${lng}`);
		getCity(coordinates);
		return;

	}

	function error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	navigator.geolocation.getCurrentPosition(success, error, options);
}

function getCity(coordinates) {
	var xhr = new XMLHttpRequest();
	var lat = coordinates[0];
	var lng = coordinates[1];

	// Paste your LocationIQ token below.
	xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.2b1801c0feb83bf5afae563104004429&lat=" +
	lat + "&lon=" + lng + "&format=json", true);
	xhr.send();
	xhr.onreadystatechange = processRequest;
	xhr.addEventListener("readystatechange", processRequest, false);

	function processRequest(e) {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var response = JSON.parse(xhr.responseText);
			var city = response.address.city;
            var cityn=city.toString();
            const city_l=lat+lng;
			console.log(city_l);
            $("#city_name").text(cityn);
            $("#latitude").text("Latitude :"+lat);
            $("#longitude").text("Longitude :"+lng);
			return;
		}
	}
}
setInterval(()=>{
    const time=new Date();
    const month= time.getMonth();
    const hour=time.getHours();
    const minutes=time.getMinutes();
    const seconds=time.getSeconds();
    const date=time.getDate();
    const day=time.getDay();
    const year=time.getFullYear();
    const ampm=hour>13 ?"pm":'am';
    const days=['SUN DAY','MON DAY','TUES DAY','WEDNES DAY','THRUS DAY','FRI DAY','SATURN DAY'];
    const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
    $(".time").text(hour+":"+minutes+':'+seconds+" "+ampm);
    $(".date_mon").text(months[month]+" "+date+" "+days[day]+" "+year);


},1000)
 const API_KEY='55e2fd4f99d1bb0bc852823c8ec4ad78';
 function getWeatherData(){
	 navigator.geolocation.getCurrentPosition((success)=>{
		 let{latitude, longitude}=success.coords;
		 fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res=>res.json()).then(
			 data=>{
				 console.log(data);
				showWeatherData(data); 
			 }
		 )
	 })


	
 }

 function getWeatherDataonsearch(coordinates){
	 let latitude=coordinates[0];
	 let longitude=coordinates[1];
	 fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res=>res.json()).then(
			 data=>{
				 console.log(data);
				showWeatherData(data); 
			 }
		 )

 }


window.onload=function(){
    getCoordintes();
	getWeatherData();
}
function showWeatherData(data){
	let{humidity,pressure,sunrise,sunset,wind_speed,temp,feels_like}=data.current;
	let{icon}=data.current.weather[0];
	console.log(icon);
	$(".weather_today").html(
		`
		<img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="cloud_icon"/>
                <div class="temp">temparature:${temp}°C</div>
                <div class="temp_details">
                    <div class="precipitation">Precipitation:${pressure} %</div>
                    <div class="Humidity">Humidity:${humidity}%</div>
                    <div class="Wind">Air speed:${wind_speed} km/h</div>
                </div>
		`
	)

	let daily=data.daily;
	const days=['SUN DAY','MON DAY','TUES DAY','WEDNES DAY','THRUS DAY','FRI DAY','SATURN DAY'];
	const time=new Date();
	const day=time.getDay();
	const d=day;
	$(".container_future").html(


		`
		<div class="f_days">
		<div class="future_day">${d+1>6 ?days[d-7+1].toLowerCase():days[d+1].toLowerCase()}</div>
		<img src="http://openweathermap.org/img/wn/${daily[1].weather[0].icon}@2x.png"/>
		<div class="temp_details">
			<div class="cloud">Cloud:${daily[1].clouds}</div>
			<div class="Humidity">Humidity:${daily[1].humidity}%</div>
			<div class="Wind">Air speed:${daily[1].wind_speed} km/h</div>
		</div>

	</div>
	<div class="f_days">
                <div class="future_day">${d+2>6 ?days[d-7+2].toLowerCase():days[d+2].toLowerCase()}</div>
                <img src="http://openweathermap.org/img/wn/${daily[2].weather[0].icon}@2x.png"/>
                <div class="temp_details">
					<div class="cloud">Cloud:${daily[2].clouds}</div>
                    <div class="Humidity">Humidity:${daily[2].humidity}%</div>
                    <div class="Wind">Air speed:${daily[2].wind_speed} km/h</div>
                </div>

            </div>
			<div class="f_days">
                <div class="future_day">${d+3>6 ?days[d-7+3].toLowerCase():days[d+3].toLowerCase()}</div>
                <img src="http://openweathermap.org/img/wn/${daily[3].weather[0].icon}@2x.png"/>
                <div class="temp_details">
                    <div class="cloud">Cloud:${daily[3].clouds}</div>
                    <div class="Humidity">Humidity:${daily[3].humidity}%</div>
                    <div class="Wind">Air speed:${daily[3].wind_speed} km/h</div>
                </div>

            </div>
			<div class="f_days">
                <div class="future_day">${d+4>6 ?days[d-7+4].toLowerCase():days[d+4].toLowerCase()}</div>
                <img src="http://openweathermap.org/img/wn/${daily[4].weather[0].icon}@2x.png"/>
                <div class="temp_details">
					<div class="cloud">Cloud:${daily[4].clouds}</div>
                    <div class="Humidity">Humidity:${daily[4].humidity}%</div>
                    <div class="Wind">Air speed:${daily[4].wind_speed} km/h</div>
                </div>

            </div>
			<div class="f_days">
                <div class="future_day">${d+5>6 ?days[d-7+5].toLowerCase():days[d+5].toLowerCase()}</div>
                <img src="http://openweathermap.org/img/wn/${daily[5].weather[0].icon}@2x.png"/>
                <div class="temp_details">
					<div class="cloud">Cloud:${daily[5].clouds}</div>
                    <div class="Humidity">Humidity:${daily[5].humidity}%</div>
                    <div class="Wind">Air speed:${daily[5].wind_speed} km/h</div>
                </div>

            </div>
		`
	)

}
function searchFunction(){
	console.log("clicked the search btn");
	let search_city=$("#search_bar").val();
	fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search_city}&limit=5&appid=${API_KEY}`).then(res=>res.json()).then(
		data=>{
			console.log(data);
			let{lat,lon}=data[0];
			let coordinates=[lat,lon];
			search_city=search_city.toString();
			let res=search_city.toUpperCase();
			$("#city_name").text(res);
			$(".location_indicator_name").text("Showing Weather of "+search_city);
			$("#latitude").text("Latitude :"+lat);
            $("#longitude").text("Longitude :"+lon);
			getWeatherDataonsearch(coordinates);
		}
	)
	

}






//pk.2b1801c0feb83bf5afae563104004429