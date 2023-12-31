import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getNeighborhoods } from '../../api/neighborhoodData';
import NeighborhoodCard from '../../components/NeighborhoodCard';

function Neighborhoods() {
  // Set a state for neighborhoods
  const [neighborhoods, setNeighborhoods] = useState([]);

  // Get user ID using useAuth hook
  const { user } = useAuth();

  // create a function that makes the API call to get all the neighborhoods
  const getAllTheNeighborhoods = () => {
    getNeighborhoods(user.uid).then(setNeighborhoods);
  };

  // make the call to the API to get all the neighborhoods on component render
  useEffect(() => {
    getAllTheNeighborhoods();
  });

  return (
    <div id="neighborhoodContainer">
      <h1 className="title">neighborhoods</h1>
      <div id="neighborhoodCardList">
        {/* map over neighborhoods here using NeighborhoodCard component */}
        {neighborhoods.map((neighborhood) => (
          <NeighborhoodCard key={neighborhood.firebaseKey} neighborhoodObj={neighborhood} onUpdate={getAllTheNeighborhoods} />
        ))}
      </div>
      <Link passHref href="/neighborhood/new">
        <Button id="addNeighborhoodBtn">add a neighborhood</Button>
      </Link>
    </div>
  );
}

export default Neighborhoods;
