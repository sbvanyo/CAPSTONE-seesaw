/* eslint-disable @next/next/no-img-element */
// * eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewNeighborhoodDetails } from '../../api/mergedData';
import { getNeighborhoodPlaygrounds } from '../../api/neighborhoodData';
import PlaygroundCard from '../../components/PlaygroundCard';

export default function ViewNeighborhood() {
  const [neighborhoodDetails, setNeighborhoodDetails] = useState({});
  const [neighborhoodPlaygrounds, setNeighborhoodPlaygrounds] = useState([]);
  const router = useRouter();

  // grab firebaseKey from url
  const { firebaseKey } = router.query;

  // make call to API layer to get the data
  useEffect(() => {
    viewNeighborhoodDetails(firebaseKey).then(setNeighborhoodDetails);
  }, [firebaseKey]);

  useEffect(() => {
    getNeighborhoodPlaygrounds(firebaseKey).then(setNeighborhoodPlaygrounds);
  }, [firebaseKey]);

  return (
    <div>
      <div className="d-flex flex-column">
        <img src={neighborhoodDetails.image} alt={neighborhoodDetails.name} className="neighborhoodImage" />
      </div>
      <div className="text-white ms-5 details">
        <h1 className="detailsTitle" style={{ textAlign: 'center', fontSize: 70, color: 'black' }}>{neighborhoodDetails.name}</h1>
      </div>
      <hr />
      <div>
        <h3 style={{ padding: 20 }}>playgrounds in this neighborhood:</h3>
        <div id="neighborhoodPlaygrounds">
          {neighborhoodPlaygrounds.map((playground) => (
            <PlaygroundCard key={playground.firebaseKey} playgroundObj={playground} onUpdate={getNeighborhoodPlaygrounds} />
          ))}
        </div>
      </div>
    </div>
  );
}
