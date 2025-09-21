# Lebron's JS Weather App

Learning project: a modern weather dashboard built with **HTML, CSS, and Vanilla JavaScript**.  
Created to practice **API integration, async/await fetch calls, localStorage persistence, modular JS, and responsive UI design**.

## 🚀 Features
- **City Search**: Enter a city name to fetch weather data  
- **Geocoding**: Converts city names into latitude/longitude with Open-Meteo Geocoding API  
- **Current Conditions**: Displays temperature, wind speed, and an SVG weather icon  
- **3-Day Forecast**: Shows daily min/max temperatures  
- **Local Storage**: Remembers searched cities across reloads  
- **Duplicate Prevention**: Avoids adding the same city twice  
- **Delete Functionality**: Remove city cards and update storage  
- **Error Handling**: User-friendly messages for missing cities or API errors

## 🛠️ Tech Stack
- **HTML5** for structure  
- **CSS3** for responsive grid layout, animations, and glassmorphism  
- **JavaScript (ES6+)** with modules (`script.js`, `utils.js`)  
- **Open-Meteo API** for geocoding and weather data  

## 📂 Project Structure
```
lebrons-js-weather-app/
├── index.html        # App layout and form
├── style.css         # Styles, grid layout, animations
├── script.js         # Core logic: fetch, DOM updates, localStorage
├── utils.js          # Helper functions (e.g., icon mapping, date formatting)
├── icons/            # SVG weather icons
│   └── svg/          # Contains all weather/condition icons
└── README.md         # Project documentation
```

## ⚙️ How It Works
- On page load, saved cities are restored from `localStorage`  
- The search form calls `addCityCard(name)` which:  
  1. Geocodes the city into latitude/longitude  
  2. Fetches current weather + 3-day forecast in parallel  
  3. Builds a **city card** with temperature, wind speed, icon, and forecast  
  4. Adds a delete button that removes the city and updates storage  
- Weather codes are mapped to SVG icons with `getWeatherIcon()` in `utils.js`  
- Messages display for duplicates or errors  

## 📦 Setup & Usage
1. Clone or download this repository  
2. Open `index.html` in your browser  
3. Search for any city to see its weather and forecast  

No build tools or API keys required (uses Open-Meteo’s free endpoints).

## 📈 Learning Purpose
This project helped me practice:  
- Fetch API with **async/await**  
- Using **multiple API endpoints** in parallel  
- **Dynamic DOM rendering** with templates and loops  
- **Persistent storage** with localStorage  
- Modular JavaScript with reusable helpers  
- Responsive CSS and polished UI interactions  

## 🔮 Future Enhancements
- Hourly forecast with charts  
- °C / °F toggle  
- Geolocation button for “current location”  
- Improved error UI with retry option  

---

⚠️ **Note**: This was built purely as a **learning project** and is not intended for production use.
