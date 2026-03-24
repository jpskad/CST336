// Limited daily uses. Will not exceed.
const API_KEY = '54f6d8ddf71da69b732208fd24c88ee5';

const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const zipError = document.getElementById('zipError');
const weatherInfo = document.getElementById('weatherInfo');

// Event Listener for Search
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();

    // JS Validation
    if (!city) {
        zipError.textContent = "City name cannot be empty.";
        cityInput.style.borderColor = "var(--error)";
    } else if (city.length < 2) {
        zipError.textContent = "Please enter a valid city name.";
        cityInput.style.borderColor = "var(--error)";
    } else {
        zipError.textContent = "";
        cityInput.style.borderColor = "transparent";
        fetchWeather(city);
    }
});

// Fetch Call
async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        updateUI(data);
    } catch (err) {
        zipError.textContent = err.message;
        weatherInfo.style.display = 'none';
    }
}

// Display Logic
function updateUI(data) {
    const temp = Math.round(data.main.temp);
    
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('tempDisplay').textContent = `${temp}°C`;
    document.getElementById('weatherDesc').textContent = data.weather[0].description;

    const img = document.getElementById('tempImage');

    // Logic for different images based on temperature
    if (temp <= 0) {
        img.src = "img/snow.jpg"; 
    } else if (temp > 0 && temp <= 20) {
        img.src = "img/overcast.jpg"; 
    } else {
        img.src = "img/sunny.jpg";
    }

    weatherInfo.style.display = 'block';
}