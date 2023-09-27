// import { signOut } from '../utils/auth'; // TODO: COMMENT IN FOR AUTH
import { useEffect, useState } from 'react';
import { visitedPlaygrounds } from '../api/playgroundData';
import { useAuth } from '../utils/context/authContext';

function Visited() {
  // Set a state for playgrounds
  const [playgrounds, setPlaygrounds] = useState([]);
  // Get user ID via useAuth hook
  const { user } = useAuth();
  // Make API call to get all the playgrounds
  const getVisitedPlaygrounds = () => {
    visitedPlaygrounds(user.uid).then(setPlaygrounds);
  };

  // Make API call to get all the playgrounds on component render
  useEffect(() => {
    getVisitedPlaygrounds();
  }, []);

  const visitedTotal = playgrounds.length;

  return (
    <div className="text-center my-4">
      <div id="visitedTotal">
        {visitedTotal === 1 ? <h2>you&apos;ve visited <strong>{visitedTotal}</strong> playground!</h2> : <h2>you&apos;ve visited <strong>{visitedTotal}</strong> playgrounds!</h2>}
        {visitedTotal === 0 ? <h5>get out there and P L A Y.</h5> : <h5>look at you go!</h5>}

      </div>
      <div className="d-flex flex-wrap">
        {/* Map over playgrounds here using PlaygroundCard component. Returns a PlaygroundCard component for every item mapped over */}
        {/* <div className="cardContainer">
          {playgrounds.map((playground) => (
            <PlaygroundCard key={playground.firebaseKey} playgroundObj={playground} onUpdate={getVisitedPlaygrounds} id="visitedList" />
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default Visited;
