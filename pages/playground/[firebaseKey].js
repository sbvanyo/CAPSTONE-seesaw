/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewPlaygroundDetails } from '../../api/mergedData';

export default function ViewPlayground() {
  const [playgroundDetails, setPlaygroundDetails] = useState({});
  const router = useRouter();

  // grab firebaseKey from url
  const { firebaseKey } = router.query;

  // make call to API layer to get the data
  useEffect(() => {
    viewPlaygroundDetails(firebaseKey).then(setPlaygroundDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={playgroundDetails.image} alt={playgroundDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {playgroundDetails.name} in the {playgroundDetails.neighborhoodObject?.name} neighborhood
          {playgroundDetails.neighborhoodObject?.favorite ? ' 🤍 favorite neighborhood' : ''}
        </h5>
        {/* <p>{playgroundDetails.description || ''}</p> */}
        <p>
          Address: {playgroundDetails.address}, {playgroundDetails.city}, {playgroundDetails.state} {playgroundDetails.zip}
          Hot Tip: {playgroundDetails.hot_tip}
        </p>
        <h6>Features:</h6>
        <ul>
          <li>{playgroundDetails.indoor ? 'Indoor' : ''}</li>
          <li>{playgroundDetails.hiking ? 'Hiking' : ''}</li>
          <li>{playgroundDetails.paved_trail ? 'Paved walking trail' : ''}</li>
          <li>{playgroundDetails.pavilion ? 'Picninc pavilions' : ''}</li>
          <li>{playgroundDetails.water ? 'Water play' : ''}</li>
          <li>{playgroundDetails.sandbox ? 'Sandbox' : ''}</li>
          <li>{playgroundDetails.library ? 'Next to a library' : ''}</li>
          <li>{playgroundDetails.comm_center ? 'Next to a community center' : ''}</li>
        </ul>
        <hr />
        <p>
          {playgroundDetails.visited ? ' ✅ visited' : ''}
          {playgroundDetails.favorite ? '🤍 favorite' : ''}
        </p>
      </div>
    </div>
  );
}
