const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".msg");
const list = document.querySelector(".cities");

form.addEventListener("submit", e => {
  e.preventDefault();
  const apiKey = "YOUR_OWN_KEY";
  const inputVal = input.value;

  const url = "https://api.open-meteo.com/v1/forecast?latitude=43.7&longitude=-79.42&current_weather=true";

 fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log("✅ Data:", data);
    // assume you already got 'data' from fetch
const temperature = data.current_weather.temperature;
const windspeed = data.current_weather.windspeed;
const weathercode = data.current_weather.weathercode;

// create a new list item
const li = document.createElement("li");
li.classList.add("city");

// build the HTML string
const markup = `
  <h2 class="city-name">Toronto</h2>
  <div class="city-temp">${Math.round(temperature)}<sup>°C</sup></div>
  <figure>
    <figcaption>
      Wind: ${windspeed} km/h (code: ${weathercode})
    </figcaption>
  </figure>
`;

// put the markup inside the li
li.innerHTML = markup;

// append the li to the list (ul.cities)
list.appendChild(li);

  })
  .catch(() => {
    msg.textContent = "Please search for a valid city 😩";
  });
});
