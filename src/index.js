import { fillWeatherData } from "./weatherAppFunction";
import "./index.css";

const cityName = "london";

await fillWeatherData(cityName);
