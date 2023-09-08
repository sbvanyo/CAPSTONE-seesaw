import {
  GoogleMap,
  Marker,
  // DirectionsRenderer,
  // Circle,
  // MarkerClusterer,
} from '@react-google-maps/api';
// import { useState } from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import getLatLngFromAddress from '../api/mapData';

function Map({ playground }) {
  const center = useMemo(() => ({ lat: 36.0763082, lng: -86.6262617 }), []);
  const markerAddress = `${playground.address},  ${playground.city}, ${playground.state} ${playground.zip}`;

  // Initialize state for coordinates
  const [coordinates, setCoordinates] = useState(null);

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

  return (
    <>
      <h3>map goes here</h3>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
      >
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
