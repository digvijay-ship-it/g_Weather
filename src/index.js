// make a function that get live weather of london if user don't provide there location
import { fillWeatherData } from "./weatherAppFunction";
import "./index.css";

const cityName = "london";

await fillWeatherData(cityName);
