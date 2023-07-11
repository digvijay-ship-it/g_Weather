// make a function that get live weather of london if user don't provide there location
import { getWeatherData } from "./weatherAppFunction";

async function fillWeatherData(cityName) {
  try {
    const weatherData = await getWeatherData(cityName);
    // weatherData = weatherData.json();
    if (weatherData.ok) {
      const data = await weatherData.json();
      const { current } = data;
      const { forecast } = data;
    }
  } catch (error) {
    // it hits when city don't exist
    console.error("Error: " + error.message);
  }
}

const cityName = "london";

fillWeatherData(cityName);
