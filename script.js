import { getWeatherIcon } from "./utils.js";

const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".msg");
const list = document.querySelector(".cities");

let cities = []; // in-memory list of city names

// read saved cities from localStorage on page load
const saved = JSON.parse(localStorage.getItem("cities")) || [];
cities = saved;

// rebuild cards for saved cities
cities.forEach(async (name) => {
  await addCityCard(name);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const inputVal = input.value.trim();
  if (!inputVal) return;

  try {
    // optional: prevent duplicates using existing in-memory array
    if (cities.some(c => c.toLowerCase() === inputVal.toLowerCase())) {
      msg.textContent = "City already added!";
      form.reset();
      return;
    }

    // use a helper so submit & reload use same code
    await addCityCard(inputVal);

    // update in-memory array immutably
    cities = [...cities, inputVal];

    // persist updated array to localStorage
    localStorage.setItem("cities", JSON.stringify(cities));

    msg.textContent = "";
  } catch (error) {
    console.error(error);
    msg.textContent = "Error fetching weather 😩";
  }

  form.reset();
});

// helper that fetches data and builds a card (also used on reload)
async function addCityCard(name) {
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1`;
  const geoRes = await fetch(geoUrl);
  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    msg.textContent = "City not found 😩";
    return;
  }

  const { latitude, longitude, country } = geoData.results[0];

  // fetch current + forecast in parallel (faster)
  const [currentRes, forecastRes] = await Promise.all([
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`),
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&forecast_days=3&timezone=auto`)
  ]);

  const currentData = await currentRes.json();
  const forecastData = await forecastRes.json();
  const { temperature, windspeed, weathercode } = currentData.current_weather;

  const li = document.createElement("li");
  li.classList.add("city");
  li.innerHTML = `
    <h2 class="city-name">${name}, ${country}</h2>
    <div class="city-temp">${Math.round(temperature)}<sup>°C</sup></div>
    <figure>
      <img class="city-icon" src="${getWeatherIcon(weathercode)}" alt="Weather Icon">
      <figcaption>Wind ${windspeed} km/h</figcaption>
    </figure>
  `;

  const forecast = forecastData.daily;
  const forecastHtml = forecast.temperature_2m_max
    .map((maxTemp, i) => {
      const minTemp = forecast.temperature_2m_min[i];
      const day = forecast.time[i];
      return `<li>${day}: ${Math.round(minTemp)}°C / ${Math.round(maxTemp)}°C</li>`;
    })
    .join("");

  const ul = document.createElement("ul");
  ul.classList.add("forecast");
  ul.innerHTML = forecastHtml;
  li.appendChild(ul);

  const btn = document.createElement("button");
  btn.textContent = "❌";
  btn.classList.add("delete");
  li.appendChild(btn);

  btn.addEventListener("click", () => {
    // update in-memory array
    cities = cities.filter(c => c !== name);

    // write the new array to localStorage after delete
    localStorage.setItem("cities", JSON.stringify(cities));

    li.remove();
  });

  list.appendChild(li);
}
