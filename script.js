const apiKey = "6ab13a2166938b7ccee3871c9faa7065";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const temperature = document.getElementById("temperature");
const cityName = document.getElementById("cityName");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const weatherBox = document.querySelector(".weather-box");

async function getWeather(city) {
    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod != 200) {
            weatherBox.style.display = "none";
            alert(data.message);
            return;
        }

        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        cityName.textContent = data.name;
        description.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed} km/h`;

        const weather = data.weather[0].main;

        switch (weather) {
            case "Clear":
                weatherIcon.src = "sun.png";
                break;
            case "Clouds":
                weatherIcon.src = "clouds.png";
                break;
            case "Rain":
                weatherIcon.src = "rainy-day.png";
                break;
            case "Drizzle":
                weatherIcon.src = "weather.png";
                break;
            case "Snow":
                weatherIcon.src = "snow.png";
                break;
            default:
                weatherIcon.src = "fog.png";
        }

        weatherBox.style.display = "block";

    } catch (error) {
        weatherBox.style.display = "none";
        alert("Network error. Please try again.");
    }
}
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city !== "") {
        getWeather(city);
    }
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});