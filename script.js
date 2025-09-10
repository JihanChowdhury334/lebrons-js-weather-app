const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");

form.addEventListener("submit", e => {
  e.preventDefault();
  const apiKey = "YOUR_OWN_KEY";
  const inputVal = input.value;

  const url = "https://api.open-meteo.com/v1/forecast?latitude=43.7&longitude=-79.42&current_weather=true";

fetch(url)
  .then(response => response.json())  // unwrap Response → parse JSON
  .then(data => {
    console.log("✅ Full data:", data);
    console.log("🌡 Temp:", data.current_weather.temperature);
    console.log("💨 Wind:", data.current_weather.windspeed);
  })
  .catch(err => {
    console.error("❌ Something went wrong:", err);
  });
});
