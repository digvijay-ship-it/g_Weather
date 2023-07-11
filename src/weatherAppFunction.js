async function getWeatherData() {
  const weatherApiKey = "e5f965a4b55e4b419e41221032306";
  const cityName = "london";
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key= ${weatherApiKey}&q=${cityName}&days=150`
  );
  return response;
}

export { getWeatherData };
