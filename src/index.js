let now = new Date();
let date = now.getDate();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
document.querySelector(
  "#current-date"
).innerHTML = `${day}, ${date}, ${hours}:${minutes}`;

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "d78e071d9d2a90c9a4f0918bd303e097";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "d78e071d9d2a90c9a4f0918bd303e097";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let celsiusTemperature = null;

function searchCurrentLocationPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "d78e071d9d2a90c9a4f0918bd303e097";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocationPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocationPosition);
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentLocationPosition);

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class ="row">`;
  let daysForecast = ["Mo", "Tue", "Wed", "Thu"];
  daysForecast.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
 
   <div class="col-3">
     <div class="weekdays">${day}</div>
     <div class="card">
       ☀
       <div class="card-body">
         <h5 class="card-title">Sunny</h5>
         <p class="card-text">
           <span class="weather-forecast-max"> 18° </span> Max
           <br />
           <span class="weather-forecast-min">12°</span> Min
         </p>
       </div>
     </div>
   </div>
 `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

searchCity("New York");
