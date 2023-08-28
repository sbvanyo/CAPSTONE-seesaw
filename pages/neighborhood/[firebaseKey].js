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

  // console.warn(neighborhoodPlaygrounds);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={neighborhoodDetails.image} alt={neighborhoodDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {neighborhoodDetails.name}
          {neighborhoodDetails.favorite ? ' 💛 i love this neighborhood' : ''}
        </h5>
      </div>

      <h3>playgrounds in this neighborhood:</h3>
      <div className="d-flex flex-wrap">
        {/* map over playgrounds here using PlaygroundCard component */}
        {neighborhoodPlaygrounds.map((playground) => (
          <PlaygroundCard key={playground.firebaseKey} playgroundObj={playground} onUpdate={getNeighborhoodPlaygrounds} />
        ))}
      </div>
    </div>
  );
}
