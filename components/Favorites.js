import { useEffect, useState } from 'react';
import { favoritePlaygrounds } from '../api/playgroundData';
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import PlaygroundCard from './PlaygroundCard';

function Favorites() {
  // Set a state for playgrounds
  const [playgrounds, setPlaygrounds] = useState([]);
  // Get user ID via useAuth hook
  const { user } = useAuth();
  // Make API call to get all the playgrounds
  const getFavoritePlaygrounds = () => {
    favoritePlaygrounds(user.uid).then(setPlaygrounds);
  };

  // Make API call to get all the playgrounds on component render
  useEffect(() => {
    getFavoritePlaygrounds();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {/* Map over playgrounds here using PlaygroundCard component. Returns a PlaygroundCard component for every item mapped over */}
        <div className="cardContainer">
          {playgrounds.map((playground) => (
            <PlaygroundCard key={playground.firebaseKey} playgroundObj={playground} onUpdate={getFavoritePlaygrounds} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
