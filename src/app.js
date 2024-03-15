//display the current date and time
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let formattedDate = `${currentDay}, ${hours}:${minutes}.`;
  return formattedDate;
}

//Display weather once form is submitted getting data from API
function displayWeather(response) {
  let cityChange = document.querySelector(".current-city");
  cityChange.innerHTML = response.data.city;

  let temperatureElement = document.querySelector(
    ".current-temperature-number"
  );

  //Displays the Current time & date
  let timeElement = document.querySelector(".date-time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);

  //Displays the condition element
  let conditionElement = document.querySelector("#condition");
  conditionElement.innerHTML = response.data.condition.description;

  //Displays the Current Humidity
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  //Displays the Current windspeed
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;

  //Displays the current temperature
  let currentTemperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = currentTemperature;

  //Display emoji
  let iconElement = document.querySelector("#emoji-icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;

  getForecast(response.data.city);
}

//When searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
function searchCity(city) {
  let apiKey = "67df9233c1ab825065t4781f9f0oea35";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  searchCity(city);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "67df9233c1ab825065t4781f9f0oea35";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecast = document.querySelector("#forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        ` 
         <div class="forecast-day">
              <div class="forecast-date">${formatDay(day.time)}</div>
              <img
                src="${
                  day.condition.icon_url
                }"  class="forecast-icon"/>             
              <div class="forecast-temperature">
                <span class="forecast-temperature-max">${Math.round(
                  day.temperature.maximum
                )}°</span>
                <span class="forecast-temperature-min">${Math.round(
                  day.temperature.minimum
                )}°</span>
              </div>
            </div>`;
    }
  });
  forecast.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Kingston");
