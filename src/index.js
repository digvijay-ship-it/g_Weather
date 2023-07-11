// make a function that get live weather of london if user don't provide there location

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      return new Error("Geolocation is not supported by this browser");
    }
  });
}

async function getLocation() {
  try {
    const position = await getCurrentPosition();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // based on these latitude and longitude get city name
    // based on that location load weather
  } catch (error) {
    console.error("Error: " + error.message);
    // else load weather on london
  }
}
getLocation();
