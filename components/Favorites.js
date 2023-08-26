// import { signOut } from '../utils/auth'; // TODO: COMMENT IN FOR AUTH
import { useEffect, useState } from 'react';
import { favoritePlaygrounds } from '../api/playgroundData';
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import PlaygroundCard from './PlaygroundCard';
// import SearchBar from './SearchBar';

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

  // const filterResult = (query) => {
  //   if (!query) {
  //     getAllThePlaygrounds();
  //   } else {
  //     const filter = playgrounds.filter((playground) => playground.name.toLowerCase().includes(query) || playground.address.toLowerCase().includes(query) || playground.city.toLowerCase().includes(query) || playground.hot_tip.toLowerCase().includes(query) || playground.zip.toLowerCase().includes(query));

  //     console.warn(filter);

  //     setPlaygrounds(filter);
  //   }
  // };

  return (
    <div className="text-center my-4">

      {/* <SearchBar onKeyUp={(query) => filterResult(query)} /> */}

      <div className="d-flex flex-wrap">
        {/* Map over playgrounds here using PlaygroundCard component. Returns a PlaygroundCard component for every item mapped over */}
        {playgrounds.map((playground) => (
          <PlaygroundCard key={playground.firebaseKey} playgroundObj={playground} onUpdate={getFavoritePlaygrounds} />
        ))}
      </div>

    </div>

  );
}

export default Favorites;
