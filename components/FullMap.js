import {
  GoogleMap,
  Marker,
} from '@react-google-maps/api';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import getLatLngFromAddress from '../api/mapData';

function FullMap({ playgrounds }) {
  // Initialize state to hold coordinates of all playgrounds
  const [allCoordinates, setAllCoordinates] = useState([]);
  const [selectedPlayground, setSelectedPlayground] = useState(null);

  useEffect(() => {
    const coordsArray = [];

    // Creates an array of Promises (one for each playground) to fetch all the coordinates. '.map' only executes if 'playgrounds' exists.
    const promiseArray = playgrounds && playgrounds.map((playground) => {
      const markerAddress = `${playground.address},  ${playground.city}, ${playground.state} ${playground.zip}`;
      return getLatLngFromAddress(markerAddress)
        .then((coords) => {
          if (coords) {
            coordsArray.push({ ...coords, ...playground });
          }
        })
        .catch((error) => {
          console.error(`An error occurred: ${error}`);
        });
    });
    // When all Promises in 'promiseArray' are resolved (or rejected), 'Promise.all' resolves with the array of fulfilled Promises and sets the state of 'allCoordinates' with the coordsArray. Reruns anytime 'playgrounds' array changes (dependency array).
    Promise.all(promiseArray)
      .then(() => {
        setAllCoordinates(coordsArray);
      })
      .catch((error) => {
        console.error(`An error occurred while fetching all coordinates: ${error}`);
      });
  }, [playgrounds]);

  const handleMarkerClick = (markerData) => {
    setSelectedPlayground(markerData);
  };

  const center = { lat: 36.174465, lng: -86.767960 };

  return (
    <>
      <GoogleMap
        zoom={11}
        center={center}
        mapContainerClassName="full-map-container"
      >
        {/* Only renders Marker if coordinates are not null */}
        {allCoordinates.map((coord) => (
          <Marker position={{ lat: coord.lat, lng: coord.lng }} key={coord.firebaseKey} onClick={() => handleMarkerClick(coord)} />
        ))}
      </GoogleMap>

      {selectedPlayground && (
        <div className="details-modal">
          <h2>{selectedPlayground.name}</h2>
          <p>Address: {selectedPlayground.address}, {selectedPlayground.city}, {selectedPlayground.state} {selectedPlayground.zip}</p>
          <button type="button" onClick={() => setSelectedPlayground(null)}>Close</button>
        </div>
      )}
    </>
  );
}

export default FullMap;

FullMap.propTypes = {
  playgrounds: PropTypes.arrayOf(
    PropTypes.shape({
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
    }),
  ).isRequired,
};
