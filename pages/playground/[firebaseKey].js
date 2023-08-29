/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { viewPlaygroundDetails } from '../../api/mergedData';
import { deletePlayground } from '../../api/playgroundData';

export default function ViewPlayground({ onUpdate }) {
  const [playgroundDetails, setPlaygroundDetails] = useState({});
  const router = useRouter();

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

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={playgroundDetails.image} alt={playgroundDetails.name} style={{ width: '300px' }} />
        {/* DYNAMIC LINK TO EDIT THE PLAYGROUND DETAILS  */}
        <Link href={`./edit/${playgroundDetails.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPlayground} className="m-2">
          DELETE
        </Button>
      </div>
      <div className="text-white ms-5 details">
        <h3>{playgroundDetails.name}</h3>
        <h5>Neighborhood: {playgroundDetails.neighborhoodObject?.name}</h5>
        <p>
          {playgroundDetails.visited ? ' ✅ i\'ve been here! ' : ' '}
          {playgroundDetails.favorite ? '💛 i love this playground' : ''}
        </p>
        <hr />
        <p>
          Address: {playgroundDetails.address}, {playgroundDetails.city}, {playgroundDetails.state} {playgroundDetails.zip}
        </p>
        <p>HOT TIP: {playgroundDetails.hot_tip}</p>
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
        <hr />
      </div>
    </div>
  );
}

ViewPlayground.propTypes = {
  playgroundObj: PropTypes.shape({
    address: PropTypes.string,
    city: PropTypes.string,
    comm_center: PropTypes.bool,
    favorite: PropTypes.bool,
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
    water: PropTypes.bool,
    zip: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func,
};

// Assigns an empty function as default val for 'onUpdate', which does nothing when called (common practice for optional props)
ViewPlayground.defaultProps = {
  onUpdate: () => {},
};
