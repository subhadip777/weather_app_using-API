let weather={

    "Api":'55e2fd4f99d1bb0bc852823c8ec4ad78',
}

const cityname=document.getElementById("cityname");
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
    console.log(hour);
    console.log(seconds);
    const days=['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THRUSDAY','FRIDAY','SATURNDAY'];
    const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
    $(".time").text(hour+":"+minutes+':'+seconds+" "+ampm);
    $(".date_mon").text(months[month]+" "+date+" "+days[day]+" "+year);


},1000)

window.onload=function(){
    getCoordintes();
}



//pk.2b1801c0feb83bf5afae563104004429