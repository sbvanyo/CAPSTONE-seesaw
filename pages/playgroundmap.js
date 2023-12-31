import { React, useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import FullMap from '../components/FullMap';
import { getPlaygrounds } from '../api/playgroundData';

function PlaygroundMap() {
  // GOOGLE MAPS SETUP
  const [libraries] = useState(['places']);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [playgrounds, setPlaygrounds] = useState(null);

  useEffect(() => {
    getPlaygrounds().then(setPlaygrounds);
  }, []);

  return (
    <>
      <h1 className="subtitle">discover playgrounds</h1>
      {!isLoaded ? 'Loading...' : <FullMap playgrounds={playgrounds} />}
    </>
  );
}

export default PlaygroundMap;
