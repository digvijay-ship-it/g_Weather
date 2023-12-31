import { format } from "date-fns";

async function getWeatherData(cityName) {
  const weatherApiKey = "a1fea6468d8c4123b3e100519231707";
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key= ${weatherApiKey}&q=${cityName}&days=15`
  );
  return response;
}

function fillHeaderWeatherInfo(current, location) {
  const weatherInfoDescription = document.querySelector(
    ".weather-info_description"
  );
  weatherInfoDescription.textContent = current.condition.text;

  const weatherInfoCity = document.querySelector(".weather-info_city");
  weatherInfoCity.textContent = location.name;

  const weatherInfoDate = document.querySelector(".weather-info_date");
  const date = new Date(location.localtime);
  const dayOfWeek = date.getDay();
  // Create an array of weekday names
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the name of the day
  const dayName = weekdays[dayOfWeek];
  const temp = format(date, "Lo LLL yy");
  weatherInfoDate.textContent = `${dayName} ${temp}`;

  const weatherInfoTime = document.querySelector(".weather-info__time");
  const time = format(date, "h a");
  weatherInfoTime.textContent = time;

  const weatherInfoTemperature = document.querySelector(
    ".weather-info__temperature"
  );
  weatherInfoTemperature.textContent = `${current.temp_c} C.`;

  const weatherInfoIcon = document.querySelector(".weather-info_icon");
  const weatherIcon = new Image();
  weatherIcon.src = current.condition.icon;
  weatherInfoIcon.append(weatherIcon);
}

function makeWeatherInfo() {
  // Create the weather-info container element
  const weatherInfoContainer = document.createElement("div");
  weatherInfoContainer.classList.add("weather-info");

  // Create the weather-info_description element
  const descriptionElement = document.createElement("div");
  descriptionElement.classList.add("weather-info_description");

  // Create the weather-info_city element
  const cityElement = document.createElement("div");
  cityElement.classList.add("weather-info_city");

  // Create the weather-info_date element
  const dateElement = document.createElement("div");
  dateElement.classList.add("weather-info_date");

  // Create the weather-info__time element
  const timeElement = document.createElement("div");
  timeElement.classList.add("weather-info__time");

  // Create the weather-info__temperature element
  const temperatureElement = document.createElement("div");
  temperatureElement.classList.add("weather-info__temperature");

  // Create the weather-info_icon element
  const iconElement = document.createElement("div");
  iconElement.classList.add("weather-info_icon");

  // Create the search-box container element
  const searchBoxContainer = document.createElement("div");
  searchBoxContainer.classList.add("search-box");

  // Create the search-box-input element
  const searchBoxInput = document.createElement("input");
  searchBoxInput.classList.add("search-box-input");
  searchBoxInput.placeholder = "Search Location...";
  searchBoxInput.addEventListener("blur", () => {
    try {
      fillWeatherData(searchBoxInput.value);
    } catch (error) {
      console.error(error);
    }
  });

  // Create the search element
  const searchElement = document.createElement("div");
  searchElement.classList.add("search");

  // Create the error-msg element
  const errorMsgElement = document.createElement("div");
  errorMsgElement.classList.add("error-msg");
  errorMsgElement.style.visibility = "hidden";
  errorMsgElement.innerHTML =
    'Location not found.<br>Search must be in the form of "City", "City, State" or "City, Country".';

  // Append child elements to their respective parent elements
  weatherInfoContainer.appendChild(descriptionElement);
  weatherInfoContainer.appendChild(cityElement);
  weatherInfoContainer.appendChild(dateElement);
  weatherInfoContainer.appendChild(timeElement);
  weatherInfoContainer.appendChild(temperatureElement);
  weatherInfoContainer.appendChild(iconElement);

  searchBoxContainer.appendChild(searchBoxInput);
  searchBoxContainer.appendChild(searchElement);

  // Append the search-box container to the weather-info container
  weatherInfoContainer.appendChild(searchBoxContainer);
  weatherInfoContainer.appendChild(errorMsgElement);

  // Return the weather-info container
  return weatherInfoContainer;
}

function createWeatherDetail(label, id, data, svg) {
  // Create weather details container
  const weatherDetailContainer = document.createElement("div");
  weatherDetailContainer.className = "weather-details";

  // Create weather icon
  const weatherIcon = document.createElement("div");
  weatherIcon.className = "weather-details__icon";
  weatherIcon.innerHTML = svg;
  weatherDetailContainer.appendChild(weatherIcon);

  // Create Weather Details Info container
  const weatherDetailsInfo = document.createElement("div");
  weatherDetailsInfo.classList.add("weatherDetailsInfo");

  // Create weather label
  const weatherLabel = document.createElement("div");
  weatherLabel.className = "weather-details__label";
  weatherLabel.textContent = label;

  // Create weather data
  const weatherData = document.createElement("div");
  weatherData.className = "weather-details__data";
  weatherData.id = id;
  weatherData.textContent = data;

  weatherDetailsInfo.append(weatherLabel, weatherData);
  weatherDetailContainer.append(weatherDetailsInfo);

  return weatherDetailContainer;
}

function makeWeatherDetailContainer(current) {
  // Create weather details container
  const weatherDetailsContainer = document.createElement("div");
  weatherDetailsContainer.className = "weather-details-container";

  // Create weather details for "Feels Like"
  const feelsLikeContainer = createWeatherDetail(
    "Feels Like",
    "feels-like",
    `${current.feelslike_c}C.`,
    `<svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" enable-background="new 0 0 512.002 512.002" viewBox="41.12 0 429.76 512" fill="#f5f5f5"><g><path d="m249.63 327.699v-243.448c0-19.162-15.589-34.751-34.751-34.751s-34.751 15.589-34.751 34.751v243.448c-22.755 12.568-37.127 36.593-37.127 62.92 0 39.634 32.244 71.878 71.878 71.878s71.878-32.244 71.878-71.878c0-26.327-14.372-50.352-37.127-62.92zm-34.751-258.199c8.134 0 14.751 6.617 14.751 14.751v114.422h-29.502v-114.422c0-8.134 6.617-14.751 14.751-14.751zm0 372.997c-28.605 0-51.878-23.272-51.878-51.878 0-20.621 12.22-39.286 31.132-47.552 3.642-1.592 5.995-5.189 5.995-9.163v-115.231h29.502v115.231c0 3.974 2.354 7.571 5.995 9.163 18.912 8.266 31.132 26.931 31.132 47.552 0 28.606-23.273 51.878-51.878 51.878z"></path><path d="m51.123 156.795h49.502c5.522 0 10-4.477 10-10s-4.478-10-10-10h-49.502c-5.522 0-10 4.477-10 10s4.477 10 10 10z"></path><path d="m75.874 94.917h24.751c5.522 0 10-4.477 10-10s-4.478-10-10-10h-24.751c-5.522 0-10 4.477-10 10s4.477 10 10 10z"></path><path d="m110.625 270.551c0-5.523-4.478-10-10-10h-49.502c-5.522 0-10 4.477-10 10s4.478 10 10 10h49.502c5.522 0 10-4.477 10-10z"></path><path d="m100.625 198.673h-24.751c-5.522 0-10 4.477-10 10s4.478 10 10 10h24.751c5.522 0 10-4.477 10-10s-4.478-10-10-10z"></path><path d="m430.503 137.715c-4.568-45.288-42.912-80.755-89.384-80.755-15.329 0-30.298 3.943-43.533 11.275-7.505-38.821-41.727-68.235-82.707-68.235-46.458 0-84.254 37.796-84.254 84.254v219.071c-24.692 23.832-38.153 56.815-37.064 91.206 2.006 63.366 53.192 114.924 116.532 117.377 1.62.063 3.234.094 4.845.094 31.506-.001 61.19-11.946 84.043-33.932 24.04-23.127 37.279-54.184 37.279-87.45 0-9.693-1.179-19.267-3.435-28.539h26.856c17.292 0 31.36-14.073 31.36-31.37 0-14.051-9.295-25.972-22.06-29.943-4.113-25.004-25.879-44.137-52.029-44.137-6.123 0-12.146 1.074-17.818 3.111v-23.112h121.826c27.526 0 49.92-22.394 49.92-49.92-.001-24.258-17.4-44.53-40.377-48.995zm-113.552 138.915c15.279 0 28.144 10.526 31.731 24.707-2.099.786-4.117 1.799-6.02 3.03-4.638 3-5.966 9.19-2.966 13.828 1.913 2.959 5.126 4.57 8.406 4.57 1.86 0 3.742-.518 5.421-1.604 1.807-1.169 3.906-1.79 6.076-1.805.027 0 .054.004.081.004 6.264 0 11.36 5.092 11.36 11.35 0 6.27-5.097 11.37-11.36 11.37h-33.61c-6.311-14.417-15.412-27.622-26.937-38.754v-21.422c5.271-3.424 11.46-5.274 17.818-5.274zm104.008-60h-121.826v-29.835c0-5.523-4.477-10-10-10-5.522 0-10 4.477-10 10v120.883c0 2.842 1.209 5.55 3.326 7.447 21.48 19.251 33.801 46.767 33.801 75.494 0 27.777-11.061 53.715-31.145 73.037-20.066 19.304-46.426 29.345-74.249 28.266-52.895-2.048-95.641-45.105-97.315-98.025-.95-29.988 11.351-58.7 33.748-78.773 2.117-1.897 3.326-4.604 3.326-7.447v-223.423c0-35.43 28.824-64.254 64.254-64.254s64.254 28.824 64.254 64.254v22.541c0 5.523 4.478 10 10 10 5.523 0 10-4.477 10-10v-15.785c12.058-9.08 26.795-14.05 41.986-14.05 35.501 0 64.879 26.633 69.256 60.964-5.84 1.262-11.422 3.568-16.493 6.847-4.638 2.999-5.967 9.189-2.968 13.827 1.913 2.96 5.127 4.571 8.407 4.571 1.859 0 3.741-.518 5.42-1.604 4.811-3.111 10.399-4.758 16.161-4.769.019 0 .037.003.056.003 16.498 0 29.92 13.417 29.92 29.91.001 16.499-13.421 29.921-29.919 29.921z"></path><circle cx="289.131" cy="146.795" r="10"></circle></g></svg>`
  );
  weatherDetailsContainer.appendChild(feelsLikeContainer);

  // Create weather details for "Humidity"
  const humidityContainer = createWeatherDetail(
    "Humidity",
    "humidity",
    `${current.humidity}%`,
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" style="enable-background:new 0 0 512.005 512.005" xml:space="preserve" fill="#f5f5f5" viewBox="0 0 512 512.01"><g><g><g><path d="M327.159,2.766c-4.063-3.688-10.25-3.688-14.313,0c-4.642,4.186-110.889,101.292-160.228,213.839      c-5.318-1.867-11.44-3.266-19.355-3.266c-18.677,0-28.698,6.969-36.75,12.573c-7.031,4.896-12.583,8.76-24.573,8.76      c-11.969,0-17.521-3.865-24.542-8.75c-8.042-5.604-18.063-12.583-36.729-12.583c-5.896,0-10.667,4.771-10.667,10.667      c0,5.896,4.771,10.667,10.667,10.667c11.969,0,17.521,3.865,24.542,8.75c8.042,5.604,18.063,12.583,36.729,12.583      c18.677,0,28.708-6.979,36.76-12.583c7.031-4.885,12.583-8.75,24.563-8.75c12,0,17.563,3.865,24.604,8.76      c8.052,5.604,18.083,12.573,36.771,12.573c18.677,0,28.708-6.969,36.771-12.573c7.031-4.896,12.594-8.76,24.594-8.76      c5.896,0,10.667-4.771,10.667-10.667c0-5.896-4.771-10.667-10.667-10.667c-18.687,0-28.719,6.969-36.781,12.573      c-7.031,4.896-12.594,8.76-24.583,8.76c-11.208,0-16.823-3.419-23.242-7.854c40.121-92.661,123.661-177.466,148.607-201.49      c33.219,32.01,170.667,171.865,170.667,294.677c0,94.104-76.563,170.667-170.667,170.667c-42.477,0-82.669-15.822-113.78-43.758      c11.542-2.138,18.994-7.177,25.186-11.482c7.031-4.896,12.594-8.76,24.594-8.76c5.896,0,10.667-4.771,10.667-10.667      s-4.771-10.667-10.667-10.667c-18.687,0-28.719,6.969-36.781,12.573c-7.031,4.896-12.594,8.76-24.583,8.76      c-12,0-17.563-3.865-24.594-8.76c-8.063-5.604-18.094-12.573-36.781-12.573c-18.677,0-28.698,6.969-36.75,12.573      c-7.031,4.896-12.583,8.76-24.573,8.76c-11.969,0-17.521-3.865-24.542-8.75c-8.042-5.604-18.063-12.583-36.729-12.583      c-5.896,0-10.667,4.771-10.667,10.667s4.771,10.667,10.667,10.667c11.969,0,17.521,3.865,24.542,8.75      c8.042,5.604,18.063,12.583,36.729,12.583c18.677,0,28.708-6.979,36.76-12.583c7.031-4.885,12.583-8.75,24.563-8.75      c12,0,17.563,3.865,24.604,8.76c4.345,3.023,9.414,6.355,15.961,8.865c36.6,42.996,89.655,67.708,146.174,67.708      c105.865,0,192-86.135,192-192C512.003,171.641,334.701,9.589,327.159,2.766z"></path><path d="M10.669,362.672c11.969,0,17.521,3.865,24.542,8.75c8.042,5.604,18.063,12.583,36.729,12.583      c5.896,0,10.667-4.771,10.667-10.667c0-5.896-4.771-10.667-10.667-10.667c-11.969,0-17.521-3.865-24.542-8.75      c-8.042-5.604-18.063-12.583-36.729-12.583c-5.896,0-10.667,4.771-10.667,10.667S4.773,362.672,10.669,362.672z"></path><path d="M133.263,341.339c-5.896,0-10.667,4.771-10.667,10.667s4.771,10.667,10.667,10.667c12,0,17.563,3.865,24.594,8.76       c8.063,5.604,18.094,12.573,36.781,12.573c18.677,0,28.708-6.969,36.771-12.573c7.031-4.896,12.594-8.76,24.594-8.76       c12.198,0,18.406,3.969,26.25,8.99c9.052,5.781,19.313,12.344,37.75,12.344c5.896,0,10.667-4.771,10.667-10.667       c0-5.896-4.771-10.667-10.667-10.667c-12.198,0-18.406-3.969-26.25-8.99c-9.052-5.781-19.313-12.344-37.75-12.344       c-18.687,0-28.719,6.969-36.781,12.573c-7.031,4.896-12.594,8.76-24.583,8.76c-12,0-17.563-3.865-24.604-8.76       C161.982,348.307,151.951,341.339,133.263,341.339z"></path><path d="M133.263,277.339c-18.677,0-28.698,6.969-36.75,12.573c-7.031,4.896-12.583,8.76-24.573,8.76       c-11.969,0-17.521-3.865-24.542-8.75c-8.042-5.604-18.063-12.583-36.729-12.583c-5.896,0-10.667,4.771-10.667,10.667       c0,5.896,4.771,10.667,10.667,10.667c11.969,0,17.521,3.865,24.542,8.75c8.042,5.604,18.063,12.583,36.729,12.583       c18.677,0,28.708-6.979,36.76-12.583c7.031-4.885,12.583-8.75,24.563-8.75c5.896,0,10.667-4.771,10.667-10.667       C143.93,282.109,139.159,277.339,133.263,277.339z"></path><path d="M231.409,307.432c7.031-4.896,12.594-8.76,24.594-8.76c11.969,0,17.521,3.865,24.542,8.75       c8.042,5.604,18.063,12.583,36.729,12.583c18.677,0,28.708-6.979,36.76-12.583c7.031-4.885,12.583-8.75,24.563-8.75       c5.896,0,10.667-4.771,10.667-10.667c0-5.896-4.771-10.667-10.667-10.667c-18.677,0-28.698,6.969-36.75,12.573       c-7.031,4.896-12.583,8.76-24.573,8.76c-11.969,0-17.521-3.865-24.542-8.75c-8.042-5.604-18.063-12.583-36.729-12.583       c-18.687,0-28.719,6.969-36.781,12.573c-7.031,4.896-12.594,8.76-24.583,8.76c-5.896,0-10.667,4.771-10.667,10.667       s4.771,10.667,10.667,10.667C213.315,320.005,223.346,313.036,231.409,307.432z"></path></g></g></g></svg>`
  );
  weatherDetailsContainer.appendChild(humidityContainer);

  // Create weather details for "Wind Speed"
  const windSpeedContainer = createWeatherDetail(
    "Wind Speed",
    "wind-speed",
    `${current.wind_kph}Km/h`,
    `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#f5f5f5" viewBox="3 6 27 20"><title>wind</title><path d="M30 14c0-2.209-1.795-4-4-4-2.209 0-4 1.789-4 4h2c0-1.105 0.888-2 2-2 1.105 0 2 0.888 2 2 0 1.105-0.89 2-2.004 2h-22.996v2h23.002c2.208 0 3.998-1.795 3.998-4v0zM21 10c0-2.209-1.795-4-4-4-2.209 0-4 1.789-4 3.997v0.003h2c0-1.105 0.888-2 2-2 1.105 0 2 0.888 2 2 0 1.105-0.897 2-2.006 2h-11.994v2h12.004c2.207 0 3.996-1.795 3.996-4v0zM26 23c0 1.657-1.347 3-3 3v0c-1.657 0-3-1.342-3-2.991v-0.009h2c0 0.552 0.444 1 1 1v0c0.552 0 1-0.444 1-1v0c0-0.552-0.449-1-1.007-1h-13.993v-2h14c1.657 0 3 1.347 3 3v0 0z"></path></svg>`
  );
  weatherDetailsContainer.appendChild(windSpeedContainer);

  // Append weather details container to the document body
  document.body.appendChild(weatherDetailsContainer);

  return weatherDetailsContainer;
}

function makePageHeader(current) {
  // Create the header element
  const header = document.createElement("div");
  header.id = "header";

  // Append weatherInfo and weatherDetail to the header
  // Create the weatherInfo element
  header.appendChild(makeWeatherInfo());
  header.appendChild(makeWeatherDetailContainer(current));
  return header;
}

function fillHourlyContainer(forecast) {
  const hourlyContainer = document.querySelector("#hourly");
  // run a loop for 0-23 and make createForecastHourly
  for (let index = 0; index < forecast.forecastday[0].hour.length; index += 1) {
    const date = new Date(forecast.forecastday[0].hour[index].time);
    const hour = format(date, "hh:a	");
    const temp = forecast.forecastday[0].hour[index].temp_c;
    const svg = forecast.forecastday[0].hour[index].condition.icon;
    hourlyContainer.append(createForecastHourly(temp, hour, svg));
  }
}

function fillAllDaysContainer(forecast) {
  const allDaysContainer = document.querySelector("#allDays");
  allDaysContainer.textContent = `Next ${forecast.forecastday.length} days forecast`;
  // run a loop for available  days and make
  const forecastDailyContainer = document.createElement("div");
  forecastDailyContainer.classList.add("forecast-daily-container");
  for (let index = 0; index < forecast.forecastday.length; index += 1) {
    const minTemp = forecast.forecastday[index].day.mintemp_c;
    const maxTemp = forecast.forecastday[index].day.maxtemp_c;
    const date = new Date(forecast.forecastday[index].date);
    const day = format(date, "EEEE do");
    const svg = forecast.forecastday[index].day.condition.icon;
    forecastDailyContainer.append(
      createForecastDays(minTemp, maxTemp, day, svg)
    );
  }
  allDaysContainer.append(forecastDailyContainer);
}

function createForecastDays(minTemp, maxTemp, day, svgData) {
  const forecastDaily = document.createElement("div");
  forecastDaily.classList.add("forecast-daily");

  const forecastDailyDay = document.createElement("div");
  forecastDailyDay.classList.add("forecast-daily__day");
  forecastDailyDay.textContent = day;
  forecastDaily.appendChild(forecastDailyDay);

  const forecastDailyTemperature = document.createElement("div");
  forecastDailyTemperature.classList.add("forecast-daily__temperature");

  const forecastDailyTemperatureHigh = document.createElement("div");
  forecastDailyTemperatureHigh.classList.add(
    "forecast-daily__temperature-high"
  );
  forecastDailyTemperatureHigh.textContent = `${maxTemp} °C`;
  forecastDailyTemperature.appendChild(forecastDailyTemperatureHigh);

  const forecastDailyTemperatureLow = document.createElement("div");
  forecastDailyTemperatureLow.classList.add("forecast-daily__temperature-low");
  forecastDailyTemperatureLow.textContent = `${minTemp} °C`;
  forecastDailyTemperature.appendChild(forecastDailyTemperatureLow);

  forecastDaily.appendChild(forecastDailyTemperature);

  const forecastDailyIcon = document.createElement("div");
  forecastDailyIcon.classList.add("forecast-daily__icon");

  const svg = new Image();
  svg.src = svgData;

  forecastDailyIcon.appendChild(svg);
  forecastDaily.appendChild(forecastDailyIcon);

  return forecastDaily;
}

function createForecastHourly(temp, time, svgData) {
  const forecastHourly = document.createElement("div");
  forecastHourly.classList.add("forecast-hourly");

  const forecastHourlyDay = document.createElement("div");
  forecastHourlyDay.classList.add("forecast-hourly-day");
  forecastHourlyDay.textContent = time;
  forecastHourly.appendChild(forecastHourlyDay);

  const forecastHourlyTemperature = document.createElement("div");
  forecastHourlyTemperature.classList.add("forecast-hourly-temperature");

  const forecastHourlyTemperatureHigh = document.createElement("div");
  forecastHourlyTemperatureHigh.classList.add(
    "forecast-hourly-temperature-high"
  );
  forecastHourlyTemperatureHigh.textContent = `${temp}C.`;
  forecastHourlyTemperature.appendChild(forecastHourlyTemperatureHigh);

  forecastHourly.appendChild(forecastHourlyTemperature);

  const forecastHourlyIcon = document.createElement("div");
  forecastHourlyIcon.classList.add("forecast-hourly-icon");

  const icon = new Image();
  icon.src = svgData;

  forecastHourlyIcon.appendChild(icon);
  forecastHourly.appendChild(forecastHourlyIcon);

  return forecastHourly;
}

function makeWeatherForecast() {
  // Create the weatherForecast element
  const weatherForecast = document.createElement("div");
  weatherForecast.classList.add("weatherForecast");

  const forecastHourlyContainer = document.createElement("div");
  forecastHourlyContainer.classList.add("forecastHourlyContainer");
  forecastHourlyContainer.textContent = "Today forecast by hours";

  // Create the hourly element
  const hourly = document.createElement("div");
  hourly.id = "hourly";
  forecastHourlyContainer.append(hourly);

  // Create the allDays element
  const allDays = document.createElement("div");
  allDays.id = "allDays";

  // Append hourly and allDays to the weatherForecast
  weatherForecast.appendChild(forecastHourlyContainer);
  weatherForecast.appendChild(allDays);
  return weatherForecast;
}

function weatherPageMaker(current) {
  // Create the main container element
  const mainContainer = document.createElement("div");
  mainContainer.id = "main";

  // Append header and weatherForecast to the main container
  mainContainer.appendChild(makePageHeader(current));
  mainContainer.appendChild(makeWeatherForecast());

  // Append the main container to the document body
  document.body.appendChild(mainContainer);
}

async function fillWeatherData(cityName) {
  const errorMsgContainer = document.querySelector(".error-msg");
  try {
    const weatherData = await getWeatherData(cityName);
    if (weatherData.ok) {
      if (errorMsgContainer) {
        errorMsgContainer.style.visibility = "hidden";
      }
      document.body.innerText = "";

      const data = await weatherData.json();
      const { current } = data;
      const { forecast } = data;
      const { location } = data;
      weatherPageMaker(current);
      fillHeaderWeatherInfo(current, location);
      fillHourlyContainer(forecast);
      fillAllDaysContainer(forecast);
    } else {
      errorMsgContainer.style.visibility = "visible";
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

export { getWeatherData, weatherPageMaker, fillWeatherData };
