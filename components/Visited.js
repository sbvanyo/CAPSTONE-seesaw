// import { signOut } from '../utils/auth'; // TODO: COMMENT IN FOR AUTH
import { useEffect, useState } from 'react';
import { visitedPlaygrounds } from '../api/playgroundData';
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import PlaygroundCard from './PlaygroundCard';

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

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {/* Map over playgrounds here using PlaygroundCard component. Returns a PlaygroundCard component for every item mapped over */}
        {playgrounds.map((playground) => (
          <PlaygroundCard key={playground.firebaseKey} playgroundObj={playground} onUpdate={getVisitedPlaygrounds} />
        ))}
      </div>
    </div>
  );
}

export default Visited;
