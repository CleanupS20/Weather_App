// Global location variables
// API Variable
var apiKey = "d68e8235857126a61e366100ba5a750e"
var savedCities = JSON.parse(window.localStorage.getItem("cityHistory"))


// Step one: Add typed city to array when button is clicked.

function searchCity() {
    var searchedCities = JSON.parse(window.localStorage.getItem("cityHistory")) || []
    cityName = $("#searchInput").val();
    getWeather(cityName)
    if (searchedCities.indexOf(cityName) >= 0) {
    } else {

        searchedCities.push(cityName);
        localStorage.setItem('cityHistory', JSON.stringify(searchedCities));
    }
    getCoordinates(cityName)

}
$("#searchButton").click(searchCity)

function displaySearchedCity() {
    let listCities = document.getElementById("cityList")
    listCities.innerHTML = ""
    if (savedCities && savedCities.length) {

        for (let i = 0; i < savedCities.length; i++) {
            const element = savedCities[i];
            var cityButton = document.createElement('button')
            cityButton.textContent = element
            cityButton.classList.add('btn', 'btn-dark', "cityButton", "mb-3")
            listCities.append(cityButton);
        }
    }
}
displaySearchedCity()

$(".cityButton").on("click", function () {
    getWeather($(this).text());
    getCoordinates($(this).text())

});

//Get current weather API call

function getWeather(city) {
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=Imperial&appid=" + apiKey;

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $("#City-name").text(data.name)
            $("#date-today").text(dayjs().format('dddd, MMMM D, YYYY '))
            $("#conditions-today").text("Conditions: " + data.weather[0].description)
            $("#humidity-today").text("Humidity: " + data.main.humidity + "%")
            $("#temp-today").text("Temperature: " + data.main.temp + "° Farenheit")
            $("#wind-today").text("Wind Speed: " + data.wind.speed + " miles per hour")
            let icon = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
            $("#icon-today").html(icon)
        })
}

// Get latitude and longitude from input
function getCoordinates(city) {
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=' + apiKey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var latitude = data[0].lat;
            var longitude = data[0].lon;
            getFiveDayApi(latitude, longitude);
        });
};

// Get five day forecast

function getFiveDayApi(latitude, longitude) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;
    fetch(requestUrl)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Day 1
            $("#day-1").text(dayjs().add(1, 'day').format('dddd, MMMM D, YYYY '))
            $("#conditions-1").text("Conditions: " + data.daily[1].weather[0].description)
            $("#humidity-1").text("Humidity: " + data.daily[1].humidity + "%")
            $("#temperature-1").text("Temperature: " + data.daily[1].temp.day + "° Farenheit")
            let icon1 = `<img src="http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png">`;
            $("#icon-1").html(icon1)
            // Day 2
            $("#day-2").text(dayjs().add(2, 'day').format('dddd, MMMM D, YYYY '))
            $("#conditions-2").text("Conditions: " + data.daily[2].weather[0].description)
            $("#humidity-2").text("Humidity: " + data.daily[2].humidity + "%")
            $("#temperature-2").text("Temperature: " + data.daily[2].temp.day + "° Farenheit")
            let icon2 = `<img src="http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png">`;
            $("#icon-2").html(icon2)
            // Day 3
            $("#day-3").text(dayjs().add(3, 'day').format('dddd, MMMM D, YYYY '))
            $("#conditions-3").text("Conditions: " + data.daily[3].weather[0].description)
            $("#humidity-3").text("Humidity: " + data.daily[3].humidity + "%")
            $("#temperature-3").text("Temperature: " + data.daily[3].temp.day + "° Farenheit")
            let icon3 = `<img src="http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png">`;
            $("#icon-3").html(icon3)

            // Day 4
            $("#day-4").text(dayjs().add(4, 'day').format('dddd, MMMM D, YYYY '))
            $("#conditions-4").text("Conditions: " + data.daily[4].weather[0].description)
            $("#humidity-4").text("Humidity: " + data.daily[4].humidity + "%")
            $("#temperature-4").text("Temperature: " + data.daily[4].temp.day + "° Farenheit")
            let icon4 = `<img src="http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png">`;
            $("#icon-4").html(icon4)

            // Day 5
            $("#day-5").text(dayjs().add(5, 'day').format('dddd, MMMM D, YYYY '))
            $("#conditions-5").text("Conditions: " + data.daily[5].weather[0].description)
            $("#humidity-5").text("Humidity: " + data.daily[5].humidity + "%")
            $("#temperature-5").text("Temperature: " + data.daily[5].temp.day + "° Farenheit")
            let icon5 = `<img src="http://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png">`;
            $("#icon-5").html(icon5)
        })
}