import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getNeighborhoods } from '../../api/neighborhoodData';
import NeighborhoodCard from '../../components/NeighborhoodCard';

function Neighborhoods() {
  // Set a state for neighborhoods
  const [neighborhoods, setNeighborhoods] = useState([]);

  // Get user ID using useAuth Hook
  const { user } = useAuth();

  // create a function that makes the API call to get all the authors
  const getAllTheNeighborhoods = () => {
    getNeighborhoods(user.uid).then(setNeighborhoods);
  };

  // make the call to the API to get all the authors on component render
  useEffect(() => {
    getAllTheNeighborhoods();
  });

  return (
    <div className="text-center my-4">
      <h1>neighborhoods</h1>
      {/* <Link href="/book/new" passHref>
        <Button>Add A Book</Button>
      </Link> */}
      <div className="d-flex flex-wrap">
        {/* map over neighborhoods here using NeighborhoodCard component */}
        {neighborhoods.map((neighborhood) => (
          <NeighborhoodCard key={neighborhood.firebaseKey} neighborhoodObj={neighborhood} onUpdate={getAllTheNeighborhoods} />
        ))}
      </div>

    </div>
  );
}

export default Neighborhoods;
