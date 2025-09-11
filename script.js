const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".msg");
const list = document.querySelector(".cities");

// function to pick icon based on weather code
function getWeatherIcon(code) {
  if (code === 0) return "icons/svg/clear-day.svg";
  if (code >= 1 && code <= 3) return "icons/svg/partly-cloudy-day.svg";
  if (code === 45 || code === 48) return "icons/svg/fog.svg";
  if (code >= 51 && code <= 55) return "icons/svg/drizzle.svg";
  if ((code >= 56 && code <= 67) || (code >= 61 && code <= 65)) return "icons/svg/rain.svg";
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return "icons/svg/snow.svg";
  if (code === 66 || code === 67 || code === 80) return "icons/svg/sleet.svg";
  if (code >= 95) return "icons/svg/thunderstorms.svg";
  return "icons/svg/not-available.svg";
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const inputVal = input.value.trim();

  // check for duplicate cities
// check for duplicate cities (match just the city name part)
const cityCards = Array.from(list.querySelectorAll(".city-name"));
if (cityCards.some(el => el.textContent.toLowerCase().startsWith(inputVal.toLowerCase()))) {
  msg.textContent = "You already have this city 😎";
  form.reset();
  input.focus();
  return;
}


  // geocoding API
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(inputVal)}&count=1`;

  fetch(geoUrl)
    .then(res => res.json())
    .then(geoData => {
      if (!geoData.results || geoData.results.length === 0) {
        msg.textContent = "City not found 😩";
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // weather API
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

      return fetch(weatherUrl)
        .then(res => res.json())
        .then(weatherData => {
          const { temperature, windspeed, weathercode } = weatherData.current_weather;

          // create list item
          const li = document.createElement("li");
          li.classList.add("city");

          // add temperature class for styling
          if (temperature >= 30) {
            li.classList.add("hot");
          } else if (temperature >= 20) {
            li.classList.add("warm");
          } else if (temperature >= 10) {
            li.classList.add("cool");
          } else {
            li.classList.add("cold");
          }

          const iconPath = getWeatherIcon(weathercode);

          li.innerHTML = `
            <h2 class="city-name">${name}, ${country}</h2>
            <div class="city-temp">${Math.round(temperature)}<sup>°C</sup></div>
            <img class="city-icon" src="${iconPath}" alt="Weather icon">
            <figure>
              <figcaption>Wind: ${windspeed} km/h (code: ${weathercode})</figcaption>
            </figure>
          `;

          list.appendChild(li);

          // reset form
          msg.textContent = "";
          form.reset();
          input.focus();
        });
    })
    .catch(() => {
      msg.textContent = "Something went wrong 😩";
    });
});
