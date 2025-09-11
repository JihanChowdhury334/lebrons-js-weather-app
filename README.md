# Simple Weather App

A modern **weather dashboard** built with **HTML, CSS, and Vanilla JavaScript**.  
This project demonstrates **API integration, async/await fetch calls, localStorage persistence, and modular JS**.

## 🚀 Features
- **City Search**: Enter a city name to fetch weather data  
- **Geocoding**: Converts city names into latitude/longitude using the Open-Meteo Geocoding API  
- **Current Conditions**: Shows temperature, wind speed, and weather icon  
- **3-Day Forecast**: Displays daily min/max temperatures  
- **Local Storage**: Remembers searched cities across reloads  
- **Duplicate Prevention**: Stops adding the same city twice  
- **Delete Functionality**: Remove city cards and update storage  
- **Error Handling**: User-friendly messages when city not found or API fails

## 🛠️ Tech Stack
- **HTML5** for structure  
- **CSS3** (responsive grid layout, animations, glassmorphism, hover states)  
- **Vanilla JavaScript (ES6+)** with modules (`script.js`, `utils.js`)  
- **Open-Meteo API** for geocoding and weather data

## 📂 Project Structure
weather-app/  
├── index.html      # HTML structure  
├── style.css       # Styles and layout  
├── script.js       # App logic (fetch, DOM updates, localStorage)  
└── utils.js        # Helper functions (e.g., weather icons)

## ⚙️ How It Works
- On page load, the app restores saved cities from `localStorage` and rebuilds their cards  
- Search form triggers `addCityCard(name)` which:  
  1. Calls **Geocoding API** to get latitude/longitude  
  2. Fetches **current weather** and **3-day forecast** in parallel  
  3. Renders a city card with current conditions and a forecast list  
  4. Adds a **delete button** to remove the card and update storage  
- Weather codes are mapped to SVG icons via `getWeatherIcon()` in `utils.js`  
- Messages appear for errors (e.g., “City not found”)

## 🎨 Preview
(Add a screenshot or GIF of the weather app UI once deployed)

## 📦 Setup & Usage
1. Clone or download this repository  
2. Open `index.html` in your browser  
3. Search for any city to see live weather and a 3-day forecast  

No build tools or API keys required (uses Open-Meteo’s free endpoints).  

## 📈 Learning Purpose
Built to practice:
- Fetch API with **async/await**  
- Working with **multiple API endpoints**  
- **Dynamic DOM rendering** with templates and loops  
- **Persistent storage** using localStorage  
- Modular JavaScript (`utils.js` for reusable helpers)  
- Responsive and visually polished CSS

## 🔮 Future Enhancements
- Hourly forecast with charts  
- Toggle between °C and °F  
- Geolocation button for “current location” weather  
- Improved error UI with retry option  

## 📄 License
This project is open source and free to use.
