// Function returns a Promise that either resolves to latitude and longitude coordinates of a given address or gets rejected.

function getLatLngFromAddress(address) {
  // Fetches my API key from .env file
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsApiKey}`;
  // Network request from API URL
  return fetch(endpoint)
    // Receives HTTP response
    .then((response) => {
      // Checks response status code to make sure fetch succeeded. If successful, parse response as JSON. Otherwise, reject with an error.
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`Error: ${response.status}`));
    })
    // Receives parsed JSON
    .then((data) => {
      // Checks if Google's API successfully geocoded the address
      if (data.status === 'OK') {
        // Destructures 'location' which contains 'lat' and 'lng' and returns location object containing latitude and longitude.
        const { location } = data.results[0].geometry;
        return location;
      }
      return Promise.reject(new Error(`Geocoding error: ${data.status}`));
    })
    .catch((error) => {
      console.warn(`An error occurred: ${error}`);
      return null;
    });
}

export default getLatLngFromAddress;
