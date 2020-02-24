$(window).on('load', function(){
    currentLocation();
});

var APIKey = "09e0d7e534e41ce68ba5f2577fa5f760";
var q = "";
var now = moment();
var currentDate = now.format("dddd[,] MMMM Do gggg");
$("#dateMain").text(currentDate);

$(".search").on("click", function(){
    q = $(".city").val();
    getWeather(q); 
});

function getWeather(q) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + q + "&units=imperial&appid=" + APIKey;
    $.ajax({ // gets the current weather info
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            console.log(response);
            $("#cityMain").text(response.name);
            $("#degreeMain").text(response.main.temp);
            $("#humidityMain").text(response.main.humidity);
            $("#windMain").text(response.wind.speed);
            $("#iconMain").attr("src","http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");

            var uvIndexcoord = "&lat="+response.coord.lat+"&lon="+response.coord.lon;
            var cityId = response.id;
            displayUVindex(uvIndexcoord);
            displayForecast(cityId);
    });  
};

function displayUVindex(uv) {
    $.ajax({ // gets the UV index info
        url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + uv,
        method: "GET"
        })
        .then(function(response) {
        //console.log(response);
        $("#uvIndexMain").text(response.value);
    });
};

function displayForecast(c) {
    console.log(c);
    $.ajax({ // gets the 5 day forecast
        url: "https://api.openweathermap.org/data/2.5/forecast?id=" + c + "&units=imperial&APPID=" + APIKey,
        method: "GET"
        })
        .then(function(response) {
            var counter = 0;
            for (var i=0; i < 5; i++) {
                var date = response.list[counter].dt_txt;
                var croppedDate = date.substr(5, 5);
                //console.log(croppedDate);
                $( "p[index='"+ i +"']").text(croppedDate);
                counter= counter+8;
                //console.log(counter);
            }
            console.log(response);
           
    });
};

function currentLocation() {
    $.ajax({ 
        url: "http://ip-api.com/json",
        method: "GET"
        })
        .then(function(response) {
            q = response.city;
            getWeather(q);
            // $("#cityMain").text(response.name);
            // $("#degreeMain").text(response.main.temp);
            // $("#humidityMain").text(response.main.humidity);
            // $("#windMain").text(response.wind.speed);
            // $("#iconMain").attr("src","http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");

            // var uvIndexcoord = "&lat="+response.coord.lat+"&lon="+response.coord.lon;
            // var cityId = response.id;
            // displayUVindex(uvIndexcoord);
            // displayForecast(cityId);
    });  
};
