function replaceCity(event) {
  event.preventDefault();
  let city = document.querySelector("#titlecity");
  let cityInput = document.querySelector("#search-bar");
  city.innerHTML = cityInput.value;
}
let search = document.querySelector("#formSubmit");
search.addEventListener("submit", replaceCity);

let now = new Date();

let year = now.getFullYear();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let date = now.getDate();
let time = now.getHours();
let minute = now.getMinutes();

let todaysDate = document.querySelector("#date");
todaysDate.innerHTML = `${day}, ${month} ${date}th, ${year}, ${time}:${minute}`;

function getCity(response) {
  console.log(response.data.main.temp);
  let temp = Math.round(response.data.main.temp);
  console.log(temp);
  let cityInput = document.querySelector("#search-bar");
  let city = `${cityInput.value}`;
  let displayCity = document.querySelector("h1");
  displayCity.innerHTML = `It is currently ${temp}°C in ${city}.`;
}

function submitSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-bar");
  let city = `${cityInput.value}`;
  callApi(city);
}
function callApi(city) {
  let apiKey = "b1a8336ff1e05b64da5625e4158fbea3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getCity);
}
let searchButton = document.querySelector("#formSubmit");
searchButton.addEventListener("submit", submitSearch);

function displayGeoWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentCity = document.querySelector("h1");
  console.log(response.data);
  currentCity.innerHTML = `It is currently ${temperature}°C in ${response.data.name}`;
}

function getGeoWeather(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayGeoWeather);
}

function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getGeoWeather);
}
let findLocation = document.querySelector("#geoLocation");
findLocation.addEventListener("click", retrievePosition);
