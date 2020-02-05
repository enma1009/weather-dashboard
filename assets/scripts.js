var APIKey = "09e0d7e534e41ce68ba5f2577fa5f760";

$(".search").on("click", function(){
    
    var q = $(".city").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + q + "&units=imperial&appid=" + APIKey;

    var forecastURL = "api.openweathermap.org/data/2.5/forecast?q="+ q;

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

   
});
var now = moment();
var currentDate = now.format("dddd[,] MMMM Do gggg");
$("#dateMain").text(currentDate);

function displayUVindex(uv) {
    //var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + k + uv;
    
    $.ajax({ // gets the UV index info
        url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + uv,
        method: "GET"
        })
        .then(function(response) {
        //console.log(response);
        $("#uvIndexMain").text(response.value);
    });
}

function displayForecast(c) {
    console.log(c);
    $.ajax({ // gets the 5 day forecast
        url: "http://api.openweathermap.org/data/2.5/forecast?id=" + c + "&units=imperial&APPID=" + APIKey + "&cnt=5",
        method: "GET"
        })
        .then(function(response) {

            var date = response.list[0].dt_txt;
            //date.toString();
            date.replace(/-/g, "/");
            //console.log(response);
            console.log(date);
            $(".date").text(date);
    });
}
