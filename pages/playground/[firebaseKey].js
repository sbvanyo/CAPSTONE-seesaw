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
        <h3>
          {playgroundDetails.name}
        </h3>
        <h5>Neighborhood: {playgroundDetails.neighborhoodObject?.name}</h5>
        {playgroundDetails.neighborhoodObject?.favorite ? ' 🤍 i love this neighborhood' : ''}
        {/* <p>{playgroundDetails.description || ''}</p> */}
        <p>
          Address: {playgroundDetails.address}, {playgroundDetails.city}, {playgroundDetails.state} {playgroundDetails.zip}
        </p>
        <p>Hot Tip: {playgroundDetails.hot_tip}</p>
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
        <p>{playgroundDetails.visited ? ' ✅ i\'ve been here!' : ''}</p>
        <p>{playgroundDetails.favorite ? '🤍 favorite' : ''}</p>
      </div>
    </div>
  );
}
