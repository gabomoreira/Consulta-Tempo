const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const inputCity = document.querySelector(".inputCity");
const searchBtn = document.querySelector(".search");
const KELVIN = 273;
const key = "78bcaa08fcc1645b2520a108ca7588eb";
const weather = {
  temperature: {
    value: 0,
    unit: "celsius",
  },
  description: "few clouds",
  iconId: "01d",
  city: "London",
  country: "GB",
};

searchBtn.addEventListener("click", () => {
  notificationElement.innerHTML = "";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${key}&lang=pt`;
  let time = "";
  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
      time = data.weather[0].icon;
    })
    .then(function () {
      displayWeather();

      if (time.toString().indexOf("d") >= 0) {
        document.body.style.background = "#f5d082";
      } else {
        document.body.style.background = "#191970";
      }
    })
    .catch(() => {
      notificationElement.style.display = "block";
      notificationElement.innerHTML = `<p>Cidade não encontrada!!<p>`;
    });

  document.querySelector(".inputCity").value = "";
});

tempElement.addEventListener("click", () => {
  if (weather.temperature.value === undefined) return;
  if (weather.temperature.unit === "celsius") {
    let fahrenhait = celsiusToFarenhait(weather.temperature.value);
    fahrenheit = Math.floor(fahrenhait);
    tempElement.innerHTML = `${fahrenhait} ° <span>F<span>`;
    weather.temperature.unit = "fahrenheit";
  } else {
    tempElement.innerHTML = `${weather.temperature.value} ° <span>C<span>`;
    weather.temperature.unit = "celsius";
  }
});

function celsiusToFarenhait(temperature) {
  return (temperature * 9) / 5 + 32;
}

function displayWeather() {
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;

  tempElement.innerHTML = `${weather.temperature.value} ° <span>C<span>`;

  descElement.innerHTML = `${weather.description}`;

  locationElement.innerHTML = `${weather.city}, ${weather.country} `;
}
