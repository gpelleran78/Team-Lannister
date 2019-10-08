$(document).ready(function () {

  console.log("test123123")

  // Generate weather of current location
  //get location from HTML5
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(weather);
  } else {
    alert("Geolocation is not supported!");
  }

  var queryURL = "https://api.spotify.com/v1"
});



function weather(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  var apiKey = "bb5fc093ae932b3666bfb611ff31e78d";
  url =
    "https://api.darksky.net/forecast/" +
    apiKey +
    "/" +
    lat +
    "," +
    long +
    "?exclude=alerts,hourly,alerts,flags";
  //Pull Current weather from DarkSky
  $.ajax({
    url: url,
    dataType: "jsonp",
    success: function (forecast) {

      var fTemp = forecast.currently.temperature;

      var currentTemp = fTemp;
      var cTemp = Math.floor((fTemp - 32) * 5 / 9);

      $("#temp").html('<h2 style = "float: right">' + currentTemp + "</h2>");
      $("#far").addClass("active");
      celConvert(cTemp, currentTemp, fTemp);
      farConvert(cTemp, currentTemp, fTemp);

      //Skycons
      var iconRequest = forecast.currently.icon;

      var icons = new Skycons({ color: '#eeeeee' });

      var iconList = [
        "clear-day",
        "clear-night",
        "partly-cloudy-day",
        "partly-cloudy-night",
        "cloudy",
        "rain",
        "sleet",
        "snow",
        "wind",
        "fog"
      ];
      console.log(icons);
      for (i = 0; i < iconList.length; i++) {
        if (iconRequest == iconList[i]) {
          icons.set('icon', iconList[i]);

        }
      }
      icons.play();
    }
  });
  GoogleMaps(lat, long);
}
  function GoogleMaps(latitude, longitude) {
    $.get(
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
      latitude +
      "," +
      longitude +
      "&key=AIzaSyAW0tnVQ4-ezK2M9Lq-CDhFWJFn8-JuyCQ&result_type=locality|administrative_area_level_1",
      function (json) {
        var address_comp = json.results[0].address_components;
        var city = "";
        var state = "";

        address_comp.forEach(function (loc) {
          var type = loc.types;
          if (type.indexOf("locality") != -1) {
            city = loc.long_name;
          } else if (type.indexOf("administrative_area_level_1") != -1) {
            state = loc.short_name;
          }
        });
        address = city + ", " + state;
        $("#address").html('<h3 class = "text-center">' + address + "</h3>");
      }
    );
  }
// convert temp from celsius to farheneight 
  function celConvert(cTemp, currentTemp, fTemp) {
    $("#cel").click(function () {
      currentTemp = cTemp;
      $("#temp").html('<h2 style = "float: right">' + currentTemp + "</h2>");
      $("#far").removeClass("active");
      $("#cel").addClass("active");
    });
  }
  
  function farConvert(cTemp, currentTemp, fTemp) {
    $("#far").click(function () {
      currentTemp = fTemp;
      $("#temp").html('<h2 style = "float: right">' + currentTemp + "</h2>");
      $("#cel").removeClass("active");
      $("#far").addClass("active");
    });
}