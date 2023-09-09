import {
  GoogleMap,
  Marker,
  // DirectionsRenderer,
  // Circle,
  // MarkerClusterer,
} from '@react-google-maps/api';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import getLatLngFromAddress from '../api/mapData';

function Map({ playground }) {
  const markerAddress = `${playground.address},  ${playground.city}, ${playground.state} ${playground.zip}`;

  // Initialize state for coordinates
  const [coordinates, setCoordinates] = useState(null);

  // Runs when component mounts or when markerAddress changes (dependency array). Calls Promise to convert standard address into lat/lng coordinates, dynamically passing in the playground address. If coords are fetched successfully, setter function (setCoordinates) sets 'coordinates' state to the returned coordinates.
  useEffect(() => {
    getLatLngFromAddress(markerAddress)
      .then((coords) => {
        if (coords) {
          setCoordinates(coords);
          console.warn(`Latitude: ${coordinates.lat}, Longitude: ${coordinates.lng}`);
        }
      })
      .catch((error) => {
        console.warn(`An error occurred: ${error}`);
      });
  }, [markerAddress]);

  const center = coordinates ? { lat: coordinates.lat, lng: coordinates.lng } : null;

  return (
    <>
      <GoogleMap
        zoom={12}
        center={center}
        mapContainerClassName="map-container"
      >
        {/* Only renders Marker if coordinates are not null */}
        {coordinates && <Marker position={{ lat: coordinates.lat, lng: coordinates.lng }} key={playground.firebaseKey} />}
      </GoogleMap>
    </>
  );
}

export default Map;

Map.propTypes = {
  playground: PropTypes.shape({
    address: PropTypes.string,
    city: PropTypes.string,
    comm_center: PropTypes.bool,
    favorite: PropTypes.bool,
    favoritedBy: PropTypes.arrayOf(PropTypes.string),
    firebaseKey: PropTypes.string,
    hiking: PropTypes.bool,
    hot_tip: PropTypes.string,
    image: PropTypes.string,
    indoor: PropTypes.bool,
    latlng: PropTypes.string,
    library: PropTypes.bool,
    name: PropTypes.string,
    neighborhood: PropTypes.string,
    neighborhood_id: PropTypes.string,
    paved_trail: PropTypes.bool,
    pavilion: PropTypes.bool,
    sandbox: PropTypes.bool,
    state: PropTypes.string,
    uid: PropTypes.string,
    visited: PropTypes.bool,
    visitedBy: PropTypes.arrayOf(PropTypes.string),
    water: PropTypes.bool,
    zip: PropTypes.string,
  }).isRequired,
};
