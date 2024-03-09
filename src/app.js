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
let now = new Date();
let dateChange = document.querySelector(".date-time");
dateChange.innerHTML = formatDate(now);

//Display weather once form is submitted getting data from API
function displayWeather(response) {
  let cityChange = document.querySelector(".current-city");
  cityChange.innerHTML = response.data.city;

  let temperatureElement = document.querySelector(
    ".current-temperature-number"
  );
  let currentTemperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = currentTemperature;
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
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Kingston");
