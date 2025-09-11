// utils.js
export function getWeatherIcon(code) {
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
export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", { weekday: "short" }); 
  // e.g. "Thu"
}
