 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyDTcwM5yUknoVre7uyysCuGCmgN0QSO7j0",
  authDomain: "songcast-20115.firebaseapp.com",
  databaseURL: "https://songcast-20115.firebaseio.com",
  projectId: "songcast-20115",
  storageBucket: "songcast-20115.appspot.com",
  messagingSenderId: "446704610592",
  appId: "1:446704610592:web:ca4c50a3de0008d8e7bb45"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(document).ready(function () {

  var database = firebase.database();
  var favorites = database.ref("/favorited")
  var iconRequest;
  

  // Generate weather of current location
  //get location from HTML5
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(weather);
  } else {
    alert("Geolocation is not supported!");
  };


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

        var currentTemp = Math.floor(fTemp);
        var cTemp = Math.floor((fTemp - 32) * 5 / 9);

        $("#temp").html("<h3 style = 'float: left'>" + currentTemp + "</h3>");
        $("#far").addClass("active");
        celConvert(cTemp, currentTemp, fTemp);
        farConvert(cTemp, currentTemp, fTemp);

        var summary = forecast.currently.summary;
        var precipitation = forecast.currently.precipProbability;
        var wind = Math.floor(forecast.currently.windSpeed);
        var infoDiv = $("<div>");
        infoDiv.html(`<h2 style='padding-top: 30px'>${summary}   </h2> <br><br> <p style='margin: none'>Precipitation: ${precipitation}%</p> <p>Wind: ${wind}mph</p>`);
        $("#weather-div").append(infoDiv);

       
        
        //Skycons
        iconRequest = forecast.currently.icon;

        var icons = new Skycons({ color: '#f5f5f5' });

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

        function queryGenerator(){
            
          var searchQuery = {
                    "clear-day": "indie alternative",
                    "clear-night": "lofi jazz",
                    "partly-cloudy-day": "lofi hip hop",
                    "partly-cloudy-night": "lofi r&b",
                    "cloudy": "chill sad",
                    "rain": "rainy relax",
                    "sleet": "deep focus",
                    "snow": "cozy",
                    "wind": "classical",
                    "fog": "autumn indie pop folk"
                  };
              
          var q = searchQuery[iconRequest];
          var APIkey = "AIzaSyCuNPBqRoDPqyMP-Jbp66ukLAK0EPPO1js";
            $.ajax({
                url: `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=playlist&key=${APIkey}`,
                method: "GET"
            }).then(function(response){
                console.log(response); 
                playlistId = response.items[Math.floor(Math.random()*5)].id.playlistId;
                 
                 musicGenerator();
               });
      
        };
     
        queryGenerator();
        function musicGenerator() {
          var videoArray = [];
          $.ajax({
            url: `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=AIzaSyCuNPBqRoDPqyMP-Jbp66ukLAK0EPPO1js`,
            method: "GET"
          }).then(function(response){
            console.log(playlistId)
            console.log(response)
            console.log(response.items)
            for (var i = 0; i < response.items.length; i++){
              
              videoArray.push(response.items[i].snippet.resourceId.videoId);

              var trackDiv = $("<div>").attr("class","track-list");
              trackDiv.html(`<button type="button" data-id="${response.items[i].snippet.title}" style="width: 30px; height: 30px;" class="btn btn-light btn-sm">&hearts;</button> ${response.items[i].snippet.title} <br>`);
              $("#playlist").append(trackDiv);
              
            };
            $(".track-list").on("click", "button", function(){
                console.log("clicked this favorite" + $(this).attr("data-id"));
                favorites.set($(this).attr("data-id"));
                favorites.on("value", function(snapshot){
                  
                  let favTrack = snapshot.val();
                  var favoritedTrack = $("<div>");
                  favoritedTrack.html(`&bull; ${favTrack}`);
                  $("#favorite-div").append(favoritedTrack);

                });
              });
              $("#playlist").prepend(`<h3>Track List: </h3>`)
              $("#playlistTitle").html("{{trackList}}");
                
                  var playlistinfo = new Vue({
                          el: '#playlistTitle',
                          data: {
                            trackList: `Current Track: ` + response.items[i].snippet.title,
                          }
                        });  
              
          });
          var ytPlayer = $("<iframe>").css("height", "200").css("width", "300");
          ytPlayer.attr("src", `https://www.youtube.com/embed?listType=playlist&list=${playlistId}`);
          $("#player").append(ytPlayer);

          


        };


      }
    });
         GoogleMaps(lat, long);
  };

  
    function GoogleMaps(latitude, longitude) {
      $.get(
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        latitude +
        "," +
        longitude +
        "&key=AIzaSyCCSlA-4fCG7vb4HGXLX3dslJdndJ6btUQ",
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
          $("#address").html('<h2 class = "text-center">' + address + "</h2>");
        }
      );
    };
  // convert temp from celsius to farheneight 
    function celConvert(cTemp, currentTemp, fTemp) {
      $("#cel").click(function () {
        currentTemp = cTemp;
        $("#temp").html('<h3 style = "float: right">' + currentTemp + "</h3>");
        $("#far").removeClass("active");
        $("#cel").addClass("active");
      });
    }
    
    function farConvert(cTemp, currentTemp, fTemp) {
      $("#far").click(function () {
        currentTemp = fTemp;
        $("#temp").html('<h3 style = "float: right">' + currentTemp + "</h3>");
        $("#cel").removeClass("active");
        $("#far").addClass("active");
      });
  }



  
});