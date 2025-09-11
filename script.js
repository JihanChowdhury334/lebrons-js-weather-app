const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".msg");
const list = document.querySelector(".cities");

form.addEventListener("submit", e => {
  e.preventDefault();

  const inputVal = input.value.trim();
  if (!inputVal) return;

  // Step 1: fetch lat/lon
  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${inputVal}`)
    .then(res => res.json())
    .then(geoData => {
      if (!geoData.results || geoData.results.length === 0) {
        msg.textContent = "City not found 😩";
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Step 2: fetch weather using coords
      return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
        .then(res => res.json())
        .then(weatherData => {
          const { temperature, windspeed, weathercode } = weatherData.current_weather;

          const li = document.createElement("li");
          li.classList.add("city");

          li.innerHTML = `
            <h2 class="city-name">${name}, ${country}</h2>
            <div class="city-temp">${Math.round(temperature)}<sup>°C</sup></div>
            <figure>
              <figcaption>
                Wind: ${windspeed} km/h (code: ${weathercode})
              </figcaption>
            </figure>
          `;

          list.appendChild(li);
          msg.textContent = "";
form.reset();
input.focus();
        });
    })
    .catch(() => {
      msg.textContent = "Error fetching weather data 😩";
    });
});
