function getLatLngFromAddress(address) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsApiKey}`;

  return fetch(endpoint)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`Error: ${response.status}`));
    })
    .then((data) => {
      if (data.status === 'OK') {
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
