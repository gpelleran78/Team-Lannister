$(document).ready(function(){


// Weather part//

console.log("test")
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
          $("#temp").html(data.currently.temperature + "° F");
          $("#minutely").html(data.minutely.summary);
        }
      );
    }
    function error() {
      location.innerHTML = "Unable to retrieve your location";
    }
    location.innerHTML = "Locating...";
  }
  weather();

     














  //video background//

    



      function vidFade() {
          vid.classList.add("stopfade");
      }
      vid.addEventListener('ended', function () {
      
          vid.pause();
      
          vidFade();
      });
      pauseButton.addEventListener("click", function () {
          vid.classList.toggle("stopfade");
          if (vid.paused) {
              vid.play();
              pauseButton.innerHTML = "Pause";
          } else {
              vid.pause();
              pauseButton.innerHTML = "Paused";
          }
      })
   
    });