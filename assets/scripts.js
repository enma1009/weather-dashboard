var APIKey = "09e0d7e534e41ce68ba5f2577fa5f760";
var q = "Miami,US";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q=" + q + "&units=imperial&appid=" + APIKey;

$.ajax({
    url: queryURL,
    method: "GET"
    })
    .then(function(response) {
    console.log(response);
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".temp").text("Temperature (F) " + response.main.temp);

    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + response.main.temp);
});
