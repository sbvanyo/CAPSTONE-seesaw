/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useLoadScript } from '@react-google-maps/api';
import Map from '../../components/Map';
import { viewPlaygroundDetails } from '../../api/mergedData';
import { deletePlayground } from '../../api/playgroundData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewPlayground({ onUpdate }) {
  const [playgroundDetails, setPlaygroundDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  // grab firebaseKey from url
  const { firebaseKey } = router.query;

  // make call to API layer to get the data
  useEffect(() => {
    viewPlaygroundDetails(firebaseKey).then(setPlaygroundDetails);
  }, [firebaseKey]);

  const deleteThisPlayground = () => {
    if (window.confirm(`Delete ${playgroundDetails.name}?`)) {
      deletePlayground(playgroundDetails.firebaseKey)
        .then(() => {
          onUpdate();
          router.push('/');
        });
    }
  };

  // GOOGLE MAPS SETUP
  const [libraries] = useState(['places']);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div>
          <div id="playgroundDetailsTop">
            <img src={playgroundDetails.image} alt={playgroundDetails.name} className="playgroundImage" />
            <div id="playgroundDetailsHeader">
              <h1 className="detailsTitle">{playgroundDetails.name}</h1>
              <h5>Neighborhood: {playgroundDetails.neighborhoodObject?.name}</h5>
              <p>
                {playgroundDetails?.visitedBy?.includes(user.uid) ? ' ✅ i\'ve been here! ' : ''}
                {playgroundDetails?.favoritedBy?.includes(user.uid) ? '💛 i love this playground' : ''}
              </p>
              <p>
                Address: {playgroundDetails.address}, {playgroundDetails.city}, {playgroundDetails.state} {playgroundDetails.zip}
              </p>
              <h6>Features:</h6>
              <ul>
                <li>{playgroundDetails.hiking ? '✅ Hiking' : '❌ Hiking'}</li>
                <li>{playgroundDetails.paved_trail ? '✅ Paved Trail' : '❌ Paved Trail'}</li>
                <li>{playgroundDetails.pavilion ? '✅ Picnic Pavilion' : '❌ Picnic Pavilion'}</li>
                <li>{playgroundDetails.water ? '✅ Water Play' : '❌ Water Play'}</li>
                <li>{playgroundDetails.sandbox ? '✅ Sandbox' : '❌ Sandbox'}</li>
                <li>{playgroundDetails.library ? '✅ Next to a Library' : '❌ Next to a Library'}</li>
                <li>{playgroundDetails.comm_center ? '✅ Next to a Community Center' : '❌ Next to a Community Center'}</li>
                <li>{playgroundDetails.indoor ? '✅ Indoor' : '❌ Indoor'}</li>
              </ul>
            </div>
          </div>
          <p><strong>HOT TIP:</strong> {playgroundDetails.hot_tip}</p>
          <hr />
        </div>
      </div>
      {!isLoaded ? 'Loading...' : <Map playground={playgroundDetails} />}
      <div className="detailBtnGroup">
        <Link href={`./edit/${playgroundDetails.firebaseKey}`} passHref>
          <Button variant="info">edit</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPlayground} className="m-2">
          delete
        </Button>
      </div>
    </>
  );
}

ViewPlayground.propTypes = {
  playgroundObj: PropTypes.shape({
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
  onUpdate: PropTypes.func,
};

// Assigns an empty function as default val for 'onUpdate', which does nothing when called (common practice for optional props)
ViewPlayground.defaultProps = {
  onUpdate: () => {},
};
