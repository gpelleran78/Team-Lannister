$(document).ready(function(){

  console.log("test123123")

  //Declaring global variables
  
   
  // Generates weather of current location

     function weather() {
        var location = document.getElementById("location");
        var apiKey = "bb5fc093ae932b3666bfb611ff31e78d";
        var url = "https://api.forecast.io/forecast/";
        navigator.geolocation.getCurrentPosition(success, error);
        function success(position) {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          location.innerHTML =
            "Latitude is " + latitude + "° Longitude is " + longitude + "°";
          $.getJSON(
            url + apiKey + "/" + latitude + "," + longitude + "?callback=?",
            function(data) {
              console.log(data);
              $("#temp").html(` <h3>${data.currently.temperature}°F <small class="text-muted">${data.currently.summary}</small></h3>`);
              icons = data.currently.icon;
                      function displayIcon(icons) {
              $("canvas").attr("id", icons);
              console.log(icons)
            };
              displayIcon(icons);
             
            });
        }
        function error() {
          location.innerHTML = "Unable to retrieve your location";
        }
        location.innerHTML = "Locating...";
      }
      weather();

          var icons = new Skycons(),
              list  = [
                "clear-day", "clear-night", "partly-cloudy-day",
                "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
                "fog" ],
                i;
            for(i = list.length; i--; )
              icons.set(list[i], list[i]);
            icons.play();
           
      
    var queryURL = "https://api.spotify.com/v1"
    
  
    
    
    
    
    
    
    
    
    
        });